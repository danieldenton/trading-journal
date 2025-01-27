import { z } from "zod";

export const mistakeSchema = z.object({
  name: z.string().trim(),
  userId: z.number(),
});
