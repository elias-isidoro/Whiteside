import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UpdateUserProfileValidator } from "@/lib/validators/user";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') || ''

    const user = await db.user.findFirst({ 
      where: { id },
      include: { Role: true, Orders: true }
    });

    if(user){
      return NextResponse.json({ user })
    }else{
      return new Response('User does not exist.', {status: 200})
    }

  }catch(error){
    return new Response('Could not fetch the user', {status: 500})
  }
}

export async function PUT (req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id, ...newUserData } = UpdateUserProfileValidator.parse(body);

    if(session.user.id !== id /* && is not owner */){
      return new Response('Unauthorized', { status: 401 });
    }

    await db.user.update({
      where: { id },
      data: { ...newUserData },
    });

    return new Response("User's role has been updated successfully!", { status: 200 });

  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}