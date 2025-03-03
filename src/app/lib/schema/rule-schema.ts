import { z } from "zod";

export const newRuleSchema = z.object({
  rule: z.string().trim().min(1, "RUle needs a name"),
});

export const updateRuleSchema = z.object({
  id: z.number().int(),
  rule: z.string().trim().min(1, "You need to provide a rule"),
});
