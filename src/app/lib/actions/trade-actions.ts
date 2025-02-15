"use server";

import { sql } from "@vercel/postgres";
import {
  newTriggerSchema,
  updateTriggerSchema,
} from "../schema/trigger-schema";
import { TriggerWithWinRate, Trigger } from "../types";

// TODO: This was copied from trigger actions. Updatye this to be trade actions.s

export async function getTrades(userId: number | undefined) {
  try {
    const response =
      await sql`SELECT * FROM trades WHERE user_id = ${userId}`;
// TODO: finsh below
    const trades = response.rows.map((row) => ({
    //   id: row.id,
    //   name: row.name,
    //   successCount: row.success_count,
    //   failureCount: row.failure_count,
    }));

    if (!trades) {
      console.log("User has no triggers");
      return;
    }

    return trades;
  } catch (error) {
    console.error(error);
  }
}

export async function createTrigger(
  formData: FormData,
  userId: number | undefined
) {
  try {
    if (!userId) {
      console.error("User ID is missing");
      return { errors: { name: ["User ID is missing"] } };
    }

    const result = newTriggerSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { name } = result.data;

    const existingTrigger = await sql`
        SELECT 1 FROM triggers WHERE name= ${name} AND user_id = ${userId};
      `;

    if (existingTrigger.rows.length > 0) {
      console.log("Trigger already exists");
      return { errors: { name: ["Trigger already exists"] } };
    }

    const response = await sql`
            INSERT INTO triggers (name, user_id)
            VALUES (${name}, ${userId})
             RETURNING id, name
          `;

    const trigger = response.rows[0];

    if (!trigger) {
      console.log("Failed to create trigger");
      return { errors: { name: ["Failed to create trigger"] } };
    }

    return trigger;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTrigger(trigger: TriggerWithWinRate) {
  try {
    const result = updateTriggerSchema.safeParse(trigger);

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { id, name, successCount, failureCount } = result.data;

    const response = await sql`
        UPDATE triggers
        SET 
          name = ${name},
          success_count = ${successCount},
          failure_count = ${failureCount}
        WHERE id = ${id}
        RETURNING id, name, success_count, failure_count;
      `;

    if (response.rowCount === 0) {
      console.log("Failed to update trigger");
      return { errors: { name: ["Failed to update trigger"] } };
    }

    const updatedTrigger: Trigger = {
      id: response.rows[0].id,
      name: response.rows[0].name,
      successCount: response.rows[0].success_count,
      failureCount: response.rows[0].failure_count,
    };

    return updatedTrigger;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTrigger(
  triggerId: number,
  userId: number | undefined
) {
  try {
    const response = await sql`
        DELETE FROM triggers WHERE id = ${triggerId} AND user_id = ${userId}
      `;

    if (response.rowCount === 0) {
      console.log("Failed to delete trigger");
      return { errors: { name: ["Failed to delete trigger"] } };
    }

    return { success: true, message: "Trigger deleted" };
  } catch (error) {
    console.error(error);
  }
}
