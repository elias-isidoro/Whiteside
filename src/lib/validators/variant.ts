import { ImageOrientation } from '@prisma/client';
import { z } from 'zod'

export const CreateVariantValidator = z.object({
  tags: z.string(),
  price: z.number().min(100,'Price should be a minimum of 100.'),
  imageUrl: z.string(),
  imageSignature: z.string(),
  imageOrientation: z.nativeEnum(ImageOrientation),
  productId: z.string()
});

export type CreateVariantsPayload = z.infer<typeof CreateVariantValidator>

export const UpdateVariantValidator = z.object({
  id: z.string(),
  tags: z.string(),
  price: z.number().min(100,'Price should be a minimum of 100.00'),
  imageUrl: z.string(),
  imageSignature: z.string(),
  imageOrientation: z.nativeEnum(ImageOrientation),
});

export type UpdateVariantsPayload = z.infer<typeof UpdateVariantValidator>