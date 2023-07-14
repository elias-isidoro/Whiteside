import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from 'next/server';

export async function GET () {
  try {
    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const categories = await db.category.findMany();

    return NextResponse.json({ categories })

  }catch(error){
    return new Response('Could not fetch categories', {status: 500})
  }
}