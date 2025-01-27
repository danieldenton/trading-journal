"use server";

import { sql } from "@vercel/postgres";
import { newTriggerSchema } from "../schema/trigger-schema";
import { Trigger } from "../types";

export async function getTriggers(userId: number | undefined) {
  try {
    const response =
      await sql`SELECT * FROM triggers WHERE user_id = ${userId}`;

    const triggers = response.rows;

    if (!triggers) {
      console.log("User has no triggers");
      return;
    }

    return triggers;
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

export async function updateTrigger(trigger: Trigger) {
  try {
    const response = await sql`
        UPDATE triggers
        SET 
          name = ${trigger.name},
          success_count = ${trigger.successCount},
          failure_count = ${trigger.failureCount},
        WHERE id = ${trigger.id}
        RETURNING *;
      `;

    if (response.rowCount === 0) {
      console.log("Failed to update trigger");
      return { errors: { name: ["Failed to update trigger"] } };
    }

    const updatedTrigger = response.rows[0];

    return updatedTrigger;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTrigger(
  triggerName: string,
  userId: number | undefined
) {
  try {
    const response = await sql`
        DELETE FROM triggers WHERE name = ${triggerName} AND user_id = ${userId}
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
