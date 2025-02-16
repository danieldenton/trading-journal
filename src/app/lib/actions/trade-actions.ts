"use server";

import { sql } from "@vercel/postgres";
import { Trade } from "../types";
import { newTradeSchema, updateTradeSchema } from "../schema/trade-schema";

// TODO: This was copied from trigger actions. Update this to be trade actions.

export async function getTrades(userId: number | undefined) {
  try {
    const response = await sql`SELECT * FROM trades WHERE user_id = ${userId}`;

    const trades = response.rows.map((row) => ({
      id: row.id,
      date: row.date,
      name: row.date,
      symbol: row.symbol,
      long: row.long,
      setupIds: row.setup_ids,
      triggerIds: row.trigger_ids,
      entryTime: row.entry_time,
      entryPrice: row.entry_price,
      numberOfContracts: row.number_of_contracts,
      stop: row.stop,
      takeProfits: row.take_profits,
      exitTime: row.exit_time,
      exitPrice: row.exit_price,
      pnl: row.pnl,
      mistakeIds: row.mistake_ids,
      notes: row.notes,
    }));

    if (!trades) {
      console.log("User has no trades");
      return;
    }

    return trades;
  } catch (error) {
    console.error(error);
  }
}

export async function createTrade(
  formData: FormData,
  userId: number | undefined
) {
  if (!userId) {
    console.error("User ID is missing");
    return { errors: { name: ["User ID is missing"] } };
  }

  const result = newTradeSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  const {
    date,
    symbol,
    long,
    setupIds,
    triggerIds,
    entryTime,
    entryPrice,
    numberOfContracts,
    stop,
    takeProfits,
    exitTime,
    exitPrice,
    pnl,
    mistakeIds,
    notes,
  } = result.data;

  const formattedSetupIds = `{${setupIds.join(",")}}`;
  const formattedTriggerIds = `{${triggerIds.join(",")}}`;
  const formattedTakeProfits = `{${takeProfits.join(",")}}`;
  const formattedMistakeIds = `{${mistakeIds.join(",")}}`;

  try {
    const response = await sql`
            INSERT INTO trades (date, symbol, long, setup_ids, trigger_ids, entry_time, entry_price, number_of_contracts, stop, take_profits, exit_time, exit_price, pnl, mistake_ids, notes, user_id)
            VALUES (${date}, ${symbol}, ${long}, ${formattedSetupIds}, ${formattedTriggerIds}, ${entryTime}, ${entryPrice}, ${numberOfContracts}, ${stop}, ${formattedTakeProfits}, ${exitTime}, ${exitPrice}, ${pnl}, ${formattedMistakeIds}, ${notes}, ${userId})
             RETURNING id, date, symbol, long, setup_ids, trigger_ids, entry_time, entry_price, number_of_contracts, stop, take_profits, exit_time, exit_price, pnl, mistake_ids, notes;
          `;

    const trade = response.rows[0];

    if (!trade) {
      console.log("Failed to create trade");
      return { errors: { name: ["Failed to create trade"] } };
    }

    return trade;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTrade(trade: Trade) {
  const result = updateTradeSchema.safeParse(trade);
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }
  const {
    id,
    date,
    symbol,
    long,
    setupIds,
    triggerIds,
    entryTime,
    entryPrice,
    numberOfContracts,
    stop,
    takeProfits,
    exitTime,
    exitPrice,
    pnl,
    mistakeIds,
    notes,
  } = result.data;

  const formattedSetupIds = `{${setupIds.join(",")}}`;
  const formattedTriggerIds = `{${triggerIds.join(",")}}`;
  const formattedTakeProfits = `{${takeProfits.join(",")}}`;
  const formattedMistakeIds = `{${mistakeIds.join(",")}}`;

  try {
    const response = await sql`
        UPDATE trades
         SET
            date = ${date},
            symbol = ${symbol},
            long = ${long},
            setup_ids = ${formattedSetupIds},
            trigger_ids = ${formattedTriggerIds},
            entry_time = ${entryTime},
            entry_price = ${entryPrice},
            number_of_contracts = ${numberOfContracts},
            stop = ${stop},
            take_profits = ${formattedTakeProfits},
            exit_time = ${exitTime},
            exit_price = ${exitPrice},
            pnl = ${pnl},
            mistake_ids = ${formattedMistakeIds},
            notes = ${notes}
         WHERE id = ${id}
         RETURNING id, date, symbol, long, setup_ids, trigger_ids, entry_time, entry_price, number_of_contracts, stop, take_profits, exit_time, exit_price, pnl, mistake_ids, notes;
       `;

    const updatedTrade = response.rows[0];

    if (!updatedTrade) {
      console.log("Failed to update trade");
      return { errors: { name: ["Failed to update trade"] } };
    }

    return updatedTrade;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTrade(tradeId: number, userId: number | undefined) {
  try {
    const response = await sql`
        DELETE FROM trades WHERE id = ${tradeId} AND user_id = ${userId}
      `;

    if (response.rowCount === 0) {
      console.log("Failed to delete trade");
      return { errors: { name: ["Failed to delete trade"] } };
    }

    return { success: true, message: "Trade deleted" };
  } catch (error) {
    console.error(error);
  }
}
