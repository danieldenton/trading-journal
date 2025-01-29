import { z } from "zod";

export const newTriggerSchema = z.object({
    name: z.string().trim().min(1, "Trigger needs a name"),
  });

  export const updateTriggerSchema = z.object({
    id: z.number().int(),
    name: z.string().trim().min(1, "Trigger needs a name"),
    successCount: z.number().int(),
    failureCount: z.number().int(),
  });