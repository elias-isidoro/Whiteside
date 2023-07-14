import { z } from 'zod'


export const FetchProductsByCategoryValidator = z.object({ categoryId: z.string() })

export const FetchProductsNotUnderCategoryValidator = z.object({ categoryId: z.string() })

export type FetchProductsByCategoryPayload = z.infer<typeof FetchProductsByCategoryValidator>

export type FetchProductsNotUnderCategoryPayload = z.infer<typeof FetchProductsNotUnderCategoryValidator>
