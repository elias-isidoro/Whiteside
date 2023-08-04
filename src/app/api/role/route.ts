import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateRoleValidator, UpdateRoleValidator } from "@/lib/validators/role";
import { NextResponse } from "next/server";
import { z } from "zod";


export const dynamic = 'force-dynamic'



export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') || ''

    const role = await db.role.findFirst({ 
      where: { id },
      include: { User: true }
    });

    if(role){
      return NextResponse.json({ role })
    }else{
      return new Response('Role does not exist.', {status: 200})
    }

  }catch(error){
    return new Response('Could not fetch the role', {status: 500})
  }
}

export async function POST (req: Request) {
  
  try{

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const body = await req.json()

    const { name, ...roleData  } = CreateRoleValidator.parse(body)


    const roleExists = await db.role.findFirst({ where: {name} })

    if(roleExists){
      return new Response('Role already exists', {status: 409})
    }

    await db.role.create({ data:{ name, ...roleData } })

    return new Response('Role has been created', { status: 200 })
    
  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create role', {status: 500})

  }
}


export async function PUT (req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id, name, ...newRoleData } = UpdateRoleValidator.parse(body);

    await db.role.update({
      where: { id },
      data: { name, ...newRoleData },
    });

    return new Response('Role updated successfully:');

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
    
    const roleExists = await db.role.findFirst({ where: { id } })

    if(roleExists){
      await db.user.updateMany({ where:{roleId: id}, data:{ roleId: null } })
      await db.role.delete({ where: { id }});
      return new Response('Role deleted.', {status: 200})
    }else{
      return new Response('Role does not exist.', {status: 200})
    }

  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not delete role', {status: 500})

  }
}