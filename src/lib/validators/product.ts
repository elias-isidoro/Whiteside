import { z } from 'zod'

export const FetchProductValidator = z.object({ id: z.string() })

export const DeleteProductValidator = z.object({ id: z.string() })

export const CreateProductValidator = z.object({
  id: z.string(),
  name: z.string().min(2, 'Product name should be at least 2 characters').max(21, 'Product name should not exceed 21 characters'),
  description: z.string().max(200,'Product description should not exceed 200 characters.'),
  categoryId: z.string().nullable(),
  variants: z.array(z.object({
    id: z.string(),
    tags: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    imageSignature: z.string(),
  }))
});

export const UpdateProductValidator = z.object({
  id: z.string(),
  name: z.string().min(2, 'Product name should be at least 2 characters').max(21, 'Product name should not exceed 21 characters'),
  description: z.string().max(200,'Product description should not exceed 200 characters.'),
  categoryId: z.string().nullable(),
  variants: z.array(z.object({
    id: z.string(),
    tags: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    imageSignature: z.string(),
  }))
});

export type CreateProductPayload = z.infer<typeof CreateProductValidator>

export type UpdateProductPayload = z.infer<typeof UpdateProductValidator>

export type FetchProductPayload = z.infer<typeof FetchProductValidator>

export type DeleteProductPayload = z.infer<typeof DeleteProductValidator>

