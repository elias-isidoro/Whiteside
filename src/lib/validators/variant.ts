import { z } from 'zod'

export const VariantsValidator = z.object({
  collection: z.array(z.object({
    id: z.string(),
    tags: z.string(),
    price: z.number(),
    imageUrl: z.string(),
  })),
});

export type CreateVariantsPayload = z.infer<typeof VariantsValidator>