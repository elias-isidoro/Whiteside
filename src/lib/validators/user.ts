import { z } from 'zod'

export const FetchUserValidator = z.object({
  id: z.string()
})

export type FetchUserPayload = z.infer<typeof FetchUserValidator>

export const UpdateUserProfileValidator = z.object({
  id: z.string(),
  roleId: z.string().nullable(),
  username: z.string().max(21,'Username should not exceed 21 characters')
});

export type UpdateUserProfilePayload = z.infer<typeof UpdateUserProfileValidator>

