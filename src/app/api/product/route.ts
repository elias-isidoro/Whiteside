import { z } from "zod";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CreateProductValidator } from "@/lib/validators/product";
import { NextResponse } from "next/server";


export async function GET (req: Request) {
  try {
    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') || ''

    const product = await db.product.findFirst({ 
      where: { id },
      include: { variants: true }
    });

    if(product){
      return NextResponse.json({ product })
    }else{
      return new Response('Product does not exist.', {status: 200})
    }

  }catch(error){
    return new Response('Could not fetch the product', {status: 500})
  }
}

export async function POST (req: Request) {
  
  try{

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const body = await req.json()

    const { id, name, description, variants } = CreateProductValidator.parse(body)

    const variantsData = variants.map((variant)=>({...variant, productId:id}))

    const productExists = await db.product.findFirst({ where: {name} })

    if(productExists){
      return new Response('Product Already Exists', {status: 409})
    }

    const product = await db.product.create({ data:{ name, description, id } })

    await db.variant.createMany({ data: variantsData });

    

    return new Response(product.name)
    
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
    
    const productExists = await db.product.findFirst({ where: { id } })

    if(productExists){
      await db.variant.deleteMany({ where:{productId: id} })
      await db.product.delete({ where: { id }});
      return new Response('Product deleted.', {status: 200})
    }else{
      return new Response('Product does not exist.', {status: 200})
    }

  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not delete product', {status: 500})

  }
}