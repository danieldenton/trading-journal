"use server";

import { sql } from "@vercel/postgres";
import {
  newMistakeSchema,
  updateMistakeSchema,
} from "../schema/mistake-schema";
import { Mistake } from "../types";

export async function getMistakes(userId: number | undefined) {
  try {
    const response =
      await sql`SELECT * FROM mistakes WHERE user_id = ${userId};`;

    const mistakes: Mistake[] = response.rows.map((row) => ({
      id: row.id,
      name: row.name,
      onSuccessfulTrades: row.on_successful_trades,
      onFailedTrades: row.on_failed_trades,
    }));

    if (!mistakes.length) {
      console.log("User has no mistakes");
      return [];
    }

    return mistakes;
  } catch (error) {
    console.error(error);
  }
}

export async function createMistake(
  formData: FormData,
  userId: number | undefined
) {
  try {
    if (!userId) {
      console.error("User ID is missing");
      return { errors: { name: ["User ID is missing"] } };
    }

    const result = newMistakeSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return {
        errors: { errors: result.error.flatten().fieldErrors },
      };
    }

    const { name } = result.data;

    const existingMistake = await sql`
      SELECT 1 FROM mistakes WHERE name = ${name} AND user_id = ${userId};
    `;

    if (existingMistake.rows.length > 0) {
      console.log("Mistake already exists");
      return { errors: { name: ["Mistake already exists"] } };
    }

    const response = await sql`
      INSERT INTO mistakes (name, user_id)
      VALUES (${name}, ${userId})
      RETURNING id, name, on_successful_trades, on_failed_trades;
    `;

    const mistake = response.rows[0];

    if (!mistake) {
      console.log("Failed to create mistake");
      return { errors: { name: ["Failed to create mistake"] } };
    }

    return mistake;
  } catch (error) {
    console.error(error);
    return { errors: { name: ["An unexpected error occurred"] } };
  }
}

export async function updateMistake(mistake: Mistake) {
  try {
    const result = updateMistakeSchema.safeParse(mistake);

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { id, name } = result.data;

    const response = await sql`
      UPDATE mistakes
      SET name = ${name}
      WHERE id = ${id}
      RETURNING *;
    `;

    const updatedMistake = response.rows[0];
    if (!updatedMistake) {
      console.log("Failed to update mistake");
      return { errors: { name: ["Failed to update mistake"] } };
    }

    return updateMistake
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMistake(mistakeId: number) {
  try {
    const response = await sql`
      DELETE FROM mistakes WHERE id = ${mistakeId};
    `;

    if (response.rowCount === 0) {
      console.log("Failed to delete mistake");
      return { errors: { name: ["Failed to delete mistake"] } };
    }

    return { success: true, message: "Mistake deleted" };
  } catch (error) {
    console.error(error);
  }
}
