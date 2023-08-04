import { db } from "@/lib/db";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET () {
  try {
    const roles = await db.role.findMany();

    return NextResponse.json({ roles })

  }catch(error){
    return new Response('Could not fetch roles', {status: 500})
  }
}