import { db } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET () {
  try {
    
    const categories = await db.category.findMany();

    return NextResponse.json({ categories, time: new Date().toISOString() })

  }catch(error){
    return new Response('Could not fetch categories', {status: 500})
  }
}