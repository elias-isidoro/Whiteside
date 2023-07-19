import { z } from 'zod';

export const CreatePaymongoLinkValidator = z.object({
  amount: z.number(),
  description: z.string(),
  remarks: z.string(),
});

export type CreatePaymongoLinkPayload = z.infer<typeof CreatePaymongoLinkValidator>;
