import { z } from 'zod'

export const CategorizerValidator = z.object({
  categoryId: z.string(),
  selectedProducts: z.array(z.string())
})

export type CategorizeProductsPayload = z.infer<typeof CategorizerValidator>

export const UncategorizerValidator = z.object({
  selectedProducts: z.array(z.string())
})

export type UncategorizeProductsPayload = z.infer<typeof UncategorizerValidator>

