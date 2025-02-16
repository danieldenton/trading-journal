import { z } from "zod";

export const newTradeSchema = z.object({
  date: z.string().trim().min(1, "Trade needs a date"),
  symbol: z.string().trim().min(1, "Trade needs a symbol"),
  long: z.boolean(),
  setupIds: z.array(z.number().int()),
  triggerIds: z.array(z.number().int()),
  entryTime: z.string().trim().min(1, "Trade needs an entry time"),
  entryPrice: z.number().int(),
  numberOfContracts: z.number().int(),
  stop: z.number().int(),
  takeProfits: z.array(z.number().int()),
  exitTime: z.string().trim().min(1, "Trade needs an exit time"),
  exitPrice: z.number().int(),
  pnl: z.number().int(),
  mistakeIds: z.array(z.number().int()),
  notes: z.string().trim().min(1, "Trade needs notes"),
});

export const updateTradeSchema = z.object({
  id: z.number().int(),
  date: z.string().trim().min(1, "Trade needs a date"),
  symbol: z.string().trim().min(1, "Trade needs a symbol"),
  long: z.boolean(),
  setupIds: z.array(z.number().int()),
  triggerIds: z.array(z.number().int()),
  entryTime: z.string().trim().min(1, "Trade needs an entry time"),
  entryPrice: z.number().int(),
  numberOfContracts: z.number().int(),
  stop: z.number().int(),
  takeProfits: z.array(z.number().int()),
  exitTime: z.string().trim().min(1, "Trade needs an exit time"),
  exitPrice: z.number().int(),
  pnl: z.number().int(),
  mistakeIds: z.array(z.number().int()),
  notes: z.string().trim().min(1, "Trade needs notes"),
});
