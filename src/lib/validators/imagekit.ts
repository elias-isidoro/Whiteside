import { z } from 'zod'

export const ImageKitAuthValidator = z.object({
  token: z.string(),
  expire: z.number(),
  signature: z.string(),
});

export type CreateImageKitAuthPayload = z.infer<typeof ImageKitAuthValidator>

export const ImageKitCredsValidator = z.object({
  publicKey: z.string(),
  privateKey: z.string(),
  urlEndpoint: z.string(),
  authenticationEndpoint: z.string(),
});

export type CreateImageKitCredsPayload = z.infer<typeof ImageKitCredsValidator>