import { z } from "zod";

export const newSetupSchema = z.object({
    name: z.string().trim().min(1, "Setup needs a name"),
    triggerIds: z.array(z.number().int()),
  });

  export const updateSetupSchema = z.object({
    id: z.number().int(),
    name: z.string().trim().min(1, "Setup needs a name"),
    triggerIds: z.array(z.number().int()),
    successCount: z.number().int(),
    failureCount: z.number().int(),
  });