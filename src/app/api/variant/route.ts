import { z } from "zod";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { ProductValidator } from "@/lib/validators/product";

export async function POST (req: Request) {
  try{

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const body = await req.json()
    const { name, description } = ProductValidator.parse(body)

    const productExists = await db.product.findFirst({ where: {name} })

    if(productExists){
      return new Response('Product Already Exists', {status: 409})
    }

    const product = await db.product.create({ data:{ name, description } })

    return new Response(product.name)
    
  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create product', {status: 500})

  }
}