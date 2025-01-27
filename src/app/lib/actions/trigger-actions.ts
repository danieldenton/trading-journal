"use server";

import { sql } from "@vercel/postgres";
import { triggerSchema } from "../schema/trigger-schema";

export async function createTrigger(
  formData: FormData,
  userId: number | undefined
) {
  try {
    if (!userId) {
      console.error("User ID is missing");
      return { errors: { name: ["User ID is missing"] } };
    }

    const result = triggerSchema.safeParse(Object.fromEntries(formData));

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
             RETURNING name
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
