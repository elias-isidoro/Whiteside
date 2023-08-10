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
  variantsWithNewData: Variant[]
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
      include: { variants: true, category: true, author: true }
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

    const { id, name, variants, ...productData } = CreateProductValidator.parse(body)

    const variantsData = variants.map((variant)=>({...variant, productId:id}))

    const productExists = await db.product.findFirst({ where: {name} })

    if(productExists){
      return new Response('Product Already Exists', {status: 409})
    }

    const product = await db.product.create({ data:{  id, name, authorId: session.user.id, ...productData } })

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
    const { id, variants: incomingVariants, ...newProductData } = UpdateProductValidator.parse(body);

    const authoredProduct = await db.product.findFirst({
      where: {
        id, authorId: session.user.id
      }
    })

    if(!authoredProduct){
      return new Response('Unauthorized', { status: 401 });
    }

    try{
      await db.product.update({
        where: { id, authorId: session.user.id },
        data: { ...newProductData },
      });
    }catch(err){
      return new Response('Failed to update product', { status: 500 });
    }
   
    const existingVariants = await db.variant.findMany({ where: { productId: id } });

    const newVariants = incomingVariants.filter((variant) => !existingVariants.some(({ id }) => id === variant.id));

    const { 
      deletedImagesIds, 
      deletedVariantsIds, 
      variantsWithNewData,
    } = existingVariants.reduce(
      (acc: divisions, existingVariant) => {
        const stayingVariant = incomingVariants.find((variant) => variant.id === existingVariant.id);
        if (stayingVariant) {
          if(stayingVariant.imageSignature !== existingVariant.imageSignature){
            acc.deletedImagesIds.push(existingVariant.imageSignature);
          }
          acc.variantsWithNewData.push({ ...stayingVariant, id: existingVariant.id, productId: id });
        }else{
          acc.deletedVariantsIds.push(existingVariant.id);
          acc.deletedImagesIds.push(existingVariant.imageSignature);
        }
        return acc;
      },
      { deletedVariantsIds: [], deletedImagesIds: [], variantsWithNewData: [] }
    );

    try{
      if(deletedImagesIds.length>0)
        await imagekit.bulkDeleteFiles(deletedImagesIds)
    }catch(err){
      return new Response('Failed to delete images', { status: 500 });
    }

    try{
      await db.variant.deleteMany({ where: { id: { in: deletedVariantsIds } } });
    }catch(err){
      return new Response('Failed to delete variants', { status: 500 });
    }

    try{
      await db.variant.createMany({ data: newVariants.map((variant) => ({ ...variant, productId: id })) });
    }catch(err){
      return new Response('Failed to create new variants', { status: 500 });
    }

    try{
      for (const { id, ...newVariantData } of variantsWithNewData) {
        await db.variant.update({ where: { id }, data: { ...newVariantData } });
      }
    }catch(err){
      return new Response('Failed to update variants', { status: 500 });
    }

    return new Response('Product updated successfully', { status: 200 });

  } catch (error) {

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

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

    if(!productExists){
      return new Response('Product does not exist.', {status: 200})
    }

    if(productExists.authorId !== session.user.id){
      return new Response('Unauthorized', { status: 401 });
    }

    try{
      await db.variant.deleteMany({ where:{productId: id} })
    }catch(err){
      return new Response('Could not delete variants.', {status: 500})
    }

    try{
      await db.product.delete({ where: { id }})
    }catch(err){
      return new Response('Could not delete product.', {status: 500})
    }

    return new Response('Product deleted.', {status: 200})

  }catch(error){

    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not delete product', {status: 500})

  }
}