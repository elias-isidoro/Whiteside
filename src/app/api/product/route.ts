import { z } from "zod";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CreateProductValidator, UpdateProductValidator } from "@/lib/validators/product";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { Variant } from "@prisma/client";


export const dynamic = 'force-dynamic'

interface divisions { 
  deletedImagesIds: string[]
  updatedVariants: Variant[]
  deletedVariantsIds: string[]
}

const imagekit = new ImageKit({
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT!
});


export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') || ''

    const product = await db.product.findFirst({ 
      where: { id },
      include: { variants: true, Category: true }
    });

    if(product){
      return NextResponse.json({ product })
    }else{
      return new Response('Product does not exist.', {status: 200})
    }

  }catch(error){
    return new Response('Could not fetch the product', {status: 500})
  }
}

export async function POST (req: Request) {
  
  try{

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const body = await req.json()

    const { id, name, description, variants, categoryId } = CreateProductValidator.parse(body)

    const variantsData = variants.map((variant)=>({...variant, productId:id}))

    const productExists = await db.product.findFirst({ where: {name} })

    if(productExists){
      return new Response('Product Already Exists', {status: 409})
    }

    const product = await db.product.create({ data:{ name, description, id, categoryId } })

    await db.variant.createMany({ data: variantsData });

    
    return new Response(product.name, { status: 200 })
    
  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create product', {status: 500})

  }
}


export async function PUT (req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id, name, categoryId, description, variants: incomingVariants } = UpdateProductValidator.parse(body);

    await db.product.update({
      where: { id },
      data: { name, categoryId, description },
    });

    const existingVariants = await db.variant.findMany({ where: { productId: id } });

    const newVariants = incomingVariants.filter((variant) => !existingVariants.some(({ id }) => id === variant.id));

    const { deletedVariantsIds, deletedImagesIds, updatedVariants } = existingVariants.reduce(
      (acc: divisions, existingVariant) => {
        const stayingVariant = incomingVariants.find((variant) => variant.id === existingVariant.id);
        if (stayingVariant) {
          if(stayingVariant.imageSignature !== existingVariant.imageSignature){
            acc.deletedImagesIds.push(existingVariant.imageSignature);
            acc.updatedVariants.push({ ...stayingVariant, id: existingVariant.id, productId: id });
          }
        }else{
          acc.deletedVariantsIds.push(existingVariant.id);
          acc.deletedImagesIds.push(existingVariant.imageSignature);
        }
        return acc;
      },
      { deletedVariantsIds: [], deletedImagesIds: [], updatedVariants: [] }
    );

    try{
      imagekit.bulkDeleteFiles(deletedImagesIds)
    }catch(err){}

    await db.variant.deleteMany({ where: { id: { in: deletedVariantsIds } } });

    await db.variant.createMany({ data: newVariants.map((variant) => ({ ...variant, productId: id })) });

    for (const {id, imageSignature, imageUrl} of updatedVariants) {
      await db.variant.update({ where: { id }, data: { imageSignature, imageUrl } });
    }

    return new Response('Product updated successfully:');

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
    
    const productExists = await db.product.findFirst({ where: { id } })

    if(productExists){
      await db.variant.deleteMany({ where:{productId: id} })
      await db.product.delete({ where: { id }});
      return new Response('Product deleted.', {status: 200})
    }else{
      return new Response('Product does not exist.', {status: 200})
    }

  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not delete product', {status: 500})

  }
}