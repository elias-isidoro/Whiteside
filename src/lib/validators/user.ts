import { z } from 'zod'

export const FetchUserValidator = z.object({
  id: z.string()
})

export type FetchUserPayload = z.infer<typeof FetchUserValidator>

export const UpdateUserRoleValidator = z.object({
  id: z.string(),
  roleId: z.string().nullable()
});

export type UpdateUserRolePayload = z.infer<typeof UpdateUserRoleValidator>
