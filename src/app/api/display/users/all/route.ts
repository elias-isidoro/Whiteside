import { db } from "@/lib/db";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET () {
  try {
    const users = await db.user.findMany({ include:{ role: true } });

    return NextResponse.json({ users })

  }catch(error){
    return new Response('Could not fetch users', {status: 500})
  }
}