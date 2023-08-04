import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UpdateProductValidator } from "@/lib/validators/product";
import { Variant } from "@prisma/client";
import ImageKit from "imagekit";

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

export async function POST (req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id, name, categoryId, description, variants: incomingVariants } = UpdateProductValidator.parse(body);

    try{
      await db.product.update({
        where: { id },
        data: { name, categoryId, description },
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
        imagekit.bulkDeleteFiles(deletedImagesIds)
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
    return new Response('Error', { status: 500 });
  }
}