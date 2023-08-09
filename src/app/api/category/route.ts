import { z } from "zod";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CreateCategoryValidator, UpdateCategoryValidator } from "@/lib/validators/category";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic'

export async function GET (req: Request) {
  try {

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') || ''

    const category = await db.category.findFirst({ 
      where: { id }});
      
    if(category){
      return NextResponse.json({ category })
    }else{
      return new Response('Category does not exist.', {status: 200})
    }

  }catch(error){
    return new Response('Could not fetch the category', {status: 500})
  }
}


export async function POST (req: Request) {
  try{

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const body = await req.json()
    const { name } = CreateCategoryValidator.parse(body)

    const categoryExists = await db.category.findFirst({ where: {name} })

    if(categoryExists){
      return new Response('Category Already Exists', {status: 409})
    }

    const category = await db.category.create({ data:{ name, authorId: session.user.id } })

    return new Response(category.name)
    
  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create category', {status: 500})

  }
}

export async function PUT (req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id, name } = UpdateCategoryValidator.parse(body);

    const existingCategory = await db.category.findUnique({
      where: { name }, // Check if a category with the same name already exists
    });

    if (existingCategory && existingCategory.id !== id) {
      return new Response('Category name already exists. Please choose a different name.', { status: 400 });
    }

    const authoredCategory= await db.category.findFirst({ where: { id, authorId: session.user.id } })

    if(!authoredCategory){
      return new Response('Unauthorized', { status: 401 });
    }

    try{
      await db.category.update({
        where: { id },
        data: { name },
      });
    }catch(err){
      return new Response('Failed to update category', { status: 500 });
    }

    return new Response('Category updated successfully:');

  } catch (error) {
    
    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Error', { status: 500 });
  }
}

export async function DELETE (req: Request) {
  
  try{

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') || ''

    const categoryExists = await db.category.findFirst({ where: { id } })

    if(!categoryExists){
      return new Response('Category does not exist.', {status: 200})
    }

    if(categoryExists.authorId !== session.user.id){
      return new Response('Unauthorized', { status: 401 });
    }

    try{
      await db.product.updateMany({ where: { categoryId: id, authorId: session.user.id }, data: { categoryId: null } });
    }catch(err){
      return new Response('Could not remove category from products.', {status: 500})
    }

    try{
      await db.category.delete({ where: { id }});
    }catch(err){
      return new Response('Could not delete category.', {status: 500})
    }
    
    return new Response('Category deleted.', {status: 200})

  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not delete category', {status: 500})

  }
}