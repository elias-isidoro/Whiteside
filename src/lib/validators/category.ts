import { z } from 'zod'

export const CategoryValidator = z.object({
  name: z.string().min(3, 'Category name should be at least 3 characters').max(21, 'Category name should not exceed 21 characters'),

});
export type CreateCategoryPayload = z.infer<typeof CategoryValidator>