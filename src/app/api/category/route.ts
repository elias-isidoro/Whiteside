import { z } from "zod";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CategoryValidator, UpdateCategoryValidator } from "@/lib/validators/category";

export async function POST (req: Request) {
  try{

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const body = await req.json()
    const { name } = CategoryValidator.parse(body)

    const categoryExists = await db.category.findFirst({ where: {name} })

    if(categoryExists){
      return new Response('Category Already Exists', {status: 409})
    }

    const category = await db.category.create({ data:{ name } })

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

    await db.category.update({
      where: { id },
      data: { name },
    });

    return new Response('Category updated successfully:');

  } catch (error) {
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

    if(categoryExists){
      await db.product.updateMany({ where: { categoryId: id }, data: { categoryId: null } });
      await db.category.delete({ where: { id }});
      return new Response('Category deleted.', {status: 200})
    }else{
      return new Response('Category does not exist.', {status: 200})
    }

  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not delete category', {status: 500})

  }
}