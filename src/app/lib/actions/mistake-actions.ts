"use server";

import { sql } from "@vercel/postgres";
import { mistakeSchema } from "../schema/mistake-schema";

export async function createMistake(prevState: any, formData: FormData) {
  try {
    const result = mistakeSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { name, userId } = result.data;

    const existingMistake = await sql`
        SELECT 1 FROM mistakes WHERE name= ${name} AND user_id = ${userId};
        `;

    if (existingMistake.rows.length > 0) {
      console.log("Mistake already exist");
      return { errors: { name: ["Mistake already exists"] } };
    }

    const response = await sql`
        INSERT INTO mistake (name)
        VALUES ($${name}, ${userId})
        RETURNING id, name;
        `;

    const mistake = response.rows[0];

    if (!mistake) {
      console.log("Failed to create mistake");
      return { errors: { name: ["Falied to create mistake"] } };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getMistakes(userId: number) {
  try {
    const response = await sql`
        SELECT * FROM mistakes WHERE user_id = ${userId};
        `;

    console.log(response.rows);
    const mistakes = response.rows[0];

    if (!mistakes) {
      console.log("User has no mistakes");
      return [];
    }

    return mistakes;
  } catch (error) {
    console.error(error);
  }
}
