import { z } from "zod";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CategoryValidator } from "@/lib/validators/category";

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