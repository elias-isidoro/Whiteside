import { db } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET () {
  try {
    
    const categories = await db.category.findMany();

    const headers = {
      'Cache-Control': 'no-store', // Set no-store to prevent caching
      'Content-Type': 'application/json',
    };

    return NextResponse.json({ categories }, { headers })

  }catch(error){
    return new Response('Could not fetch categories', {status: 500})
  }
}