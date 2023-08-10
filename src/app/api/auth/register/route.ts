import { db } from "@/lib/db";
import { RegisterUserValidator } from "@/lib/validators/auth";
import { z } from "zod";
import bcrypt from 'bcrypt'

export async function POST (req: Request) {
  
  try{

    const body = await req.json()

    const { email, password, name } = RegisterUserValidator.parse(body)

    const emailExists = await db.user.findFirst({ where: { email } })

    if(emailExists){
      return new Response('Email Already Used', {status: 409})
    }

    const nameExists = await db.user.findFirst({ where: { OR: [{ name }, { username: name }] } })

    if(nameExists){
      return new Response('Name Already Used', {status: 410})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({ 
      data:{  
        name,
        email,
        password: hashedPassword,
      }
    })

    return new Response('Sign up success!', { status: 200 })
    
  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not sign up. Internal server error.', {status: 500})

  }
}