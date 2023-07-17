import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateVariantValidator, UpdateVariantValidator } from "@/lib/validators/variant";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET (req: Request) {
  try {
    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') || ''

    const variant = await db.variant.findFirst({ where: { id } });

    if(variant){
      return NextResponse.json({ variant })
    }else{
      return new Response('Variant does not exist.', {status: 200})
    }

  }catch(error){
    return new Response('Could not fetch the variant', {status: 500})
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id, ...variantData } = UpdateVariantValidator.parse(body);

    await db.variant.update({
      where: { id },
      data: { ...variantData },
    });


    return new Response('Variant updated successfully:');
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}

export async function POST (req: Request) {
  try{

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const body = await req.json()
    const variantData = CreateVariantValidator.parse(body)

    await db.variant.create({ data:{ ...variantData, id: nanoid() } })

    return new Response('Variant has been successfully created!')
    
  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create product', {status: 500})

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
    

    await db.variant.delete({ where:{ id}  })

    return new Response('Variant deleted.', {status: 200})
   
  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not delete variant', {status: 500})

  }
}