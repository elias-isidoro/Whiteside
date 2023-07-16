import { z } from 'zod'

export const CreateVariantValidator = z.object({
  tags: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  productId: z.string(),
});

export type CreateVariantsPayload = z.infer<typeof CreateVariantValidator>

export const UpdateVariantValidator = z.object({
  id: z.string(),
  tags: z.string(),
  price: z.number(),
  imageUrl: z.string(),
});

export type UpdateVariantsPayload = z.infer<typeof UpdateVariantValidator>