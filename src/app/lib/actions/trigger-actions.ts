"use server";

import { sql } from "@vercel/postgres";
import { triggerSchema } from "../schema/trigger-schema";

export async function createTrigger(prevState: any, formData: FormData) {
  try {
    const result = triggerSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { name, successCount, failureCount, userId } = result.data;

    const existingTrigger = await sql`
        SELECT 1 FROM triggers WHERE name= ${name} AND user_id = ${userId};
      `;

    if (existingTrigger.rows.length > 0) {
      console.log("Trigger already exists");
      return { errors: { name: ["Trigger already exists"] } };
    }

    const response = await sql`
            INSERT INTO triggers (name, successCount, failureCount)
            VALUES (${name}, ${successCount}, ${failureCount}, ${userId})
             RETURNING id, name, successCount, failureCount;
          `;

    const trigger = response.rows[0];

    if (!trigger) {
      console.log("Failed to create trigger");
      return { errors: { name: ["Failed to create trigger"] } };
    }
  } catch (error) {
    console.error(error);
  }
}

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
