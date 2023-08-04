import { z } from 'zod'

export const FetchRoleValidator = z.object({
  id: z.string()
})

export type FetchRolePayload = z.infer<typeof FetchRoleValidator>

export const CreateRoleValidator = z.object({
  name: z.string().min(3, 'Role name should be at least 3 characters').max(21, 'Role name should not exceed 21 characters'),
  canManageOrders: z.boolean(),
  canManageProducts: z.boolean(),
  canManageCategories: z.boolean(),
  canViewSalesAndAnalytics: z.boolean(),
});

export type CreateRolePayload = z.infer<typeof CreateRoleValidator>

export const UpdateRoleValidator = z.object({
  id: z.string(),
  name: z.string().min(3, 'Role name should be at least 3 characters').max(21, 'Role name should not exceed 21 characters'),
  canManageOrders: z.boolean(),
  canManageProducts: z.boolean(),
  canManageCategories: z.boolean(),
  canViewSalesAndAnalytics: z.boolean(),
});

export type UpdateRolePayload = z.infer<typeof UpdateRoleValidator>

export const DeleteRoleValidator = z.object({
  id: z.string()
})

export type DeleteRolePayload = z.infer<typeof DeleteRoleValidator>