import { z } from "zod";

export const newSetupSchema = z.object({
    name: z.string().trim().min(1, "Trigger needs a name"),
  });

  export const updateSetupSchema = z.object({
    id: z.number().int(),
    name: z.string().trim().min(1, "Trigger needs a name"),
    successCount: z.number().int(),
    failureCount: z.number().int(),
  });