import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from 'next/server';

export async function GET (req: Request) {
  try {
    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || ''

    const products = await db.product.findMany({
      where: {
        OR: [
          { categoryId: null }, 
          { NOT: { categoryId } },
        ],
      },
      include: { variants: true },
    });

    return NextResponse.json({ products })

  }catch(error){
    return new Response('Could not fetch products', {status: 500})
  }
}