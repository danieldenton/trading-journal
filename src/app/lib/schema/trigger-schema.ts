import { z } from "zod";

export const triggerSchema = z.object({
    name: z.string().trim(),
  });