import { z } from "zod";

export const triggerSchema = z.object({
    name: z.string().trim().min(1, "Trigger needs a name"),
  });