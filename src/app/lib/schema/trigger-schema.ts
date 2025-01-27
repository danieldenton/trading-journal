import { z } from "zod";

export const triggerSchema = z.object({
    name: z.string().trim(),
    successCount: z.number(),
    failureCount: z.number(),
  });