import { z } from 'zod'

export const AuthenticateUserValidator = z.object({
  email: z.string(),
  password: z.string(),
})

export type AuthenticateUserPayload = z.infer<typeof AuthenticateUserValidator>

export const RegisterUserValidator = z.object({
  name: z.string().nonempty({ message: 'Name is required' }).min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address. Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export type RegisterUserPayload = z.infer<typeof RegisterUserValidator>

export const ChangePasswordValidator = z.object({
  userId: z.string(),
  oldPassword: z.string(),
  newPassword: z.string(),
});

export type ChangePasswordPayload = z.infer<typeof ChangePasswordValidator>
