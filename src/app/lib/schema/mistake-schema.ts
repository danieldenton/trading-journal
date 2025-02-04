import { z } from "zod";

export const newMistakeSchema = z.object({
  name: z.string().trim().min(1, "Mistake needs a name"),
});

export const updateMistakeSchema = z.object({
  id: z.number().int(),
  name: z.string().trim().min(1, "Mistake needs a name"),
});
