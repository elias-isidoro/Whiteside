import { db } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET (request: Request) {
  try {
    const products = await db.product.findMany({ include:{ variants: true } });

    return NextResponse.json({ products })

  }catch(error){
    return new Response('Could not fetch products', {status: 500})
  }
}