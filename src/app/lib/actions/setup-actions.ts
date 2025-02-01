"use server";

import { sql } from "@vercel/postgres";
import { newSetupSchema, updateSetupSchema } from "../schema/setup-schema";
import { SetupWithWinRate, Setup } from "../types";

// export async function getTriggers(userId: number | undefined) {
//   try {
//     const response =
//       await sql`SELECT * FROM triggers WHERE user_id = ${userId}`;

//     const triggers = response.rows.map((row) => ({
//       id: row.id,
//       name: row.name,
//       successCount: row.success_count,
//       failureCount: row.failure_count,
//     }));

//     if (!triggers) {
//       console.log("User has no triggers");
//       return;
//     }

//     return triggers;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function createSetup(
  formData: FormData,
  userId: number | undefined
) {
  try {
    if (!userId) {
      console.error("User ID is missing");
      return { errors: { name: ["User ID is missing"] } };
    }

    const result = newSetupSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { name, triggerIds } = result.data;

    const existingSetup = await sql`
        SELECT 1 FROM triggers WHERE name= ${name} AND user_id = ${userId};
      `;

    if (existingSetup.rows.length > 0) {
      console.log("Setup already exists");
      return { errors: { name: ["Setup already exists"] } };
    }
    const formattedTriggerIds = `{${triggerIds.join(",")}}`;

    const response = await sql`
        INSERT INTO triggers (name, trigger_ids, user_id)
        VALUES (${name}, ${formattedTriggerIds}, ${userId})
        RETURNING id,trigger_ids, name;
        `;
    const setup = response.rows[0];

    if (!setup) {
      console.log("Failed to create setup");
      return { errors: { name: ["Failed to create setup "] } };
    }

    return setup;
  } catch (error) {
    console.error(error);
  }
}

// export async function updateTrigger(trigger: TriggerWithWinRate) {
//   try {
//     const result = updateTriggerSchema.safeParse(trigger);

//     if (!result.success) {
//       console.log(result.error.flatten().fieldErrors);
//       return { errors: result.error.flatten().fieldErrors };
//     }

//     const { id, name, successCount, failureCount } = result.data;

//     const response = await sql`
//         UPDATE triggers
//         SET
//           name = ${name},
//           success_count = ${successCount},
//           failure_count = ${failureCount}
//         WHERE id = ${id}
//         RETURNING id, name, success_count, failure_count;
//       `;

//     if (response.rowCount === 0) {
//       console.log("Failed to update trigger");
//       return { errors: { name: ["Failed to update trigger"] } };
//     }

//     const updatedTrigger: Trigger = {
//       id: response.rows[0].id,
//       name: response.rows[0].name,
//       successCount: response.rows[0].success_count,
//       failureCount: response.rows[0].failure_count,
//     };

//     return updatedTrigger;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function deleteSetup(
  setupId: number,
  userId: number | undefined
) {
  try {
    const response = await sql`
        DELETE FROM setups WHERE id = ${setupId} AND user_id = ${userId}
      `;

    if (response.rowCount === 0) {
      console.log("Failed to delete setup");
      return { errors: { name: ["Failed to delete setup"] } };
    }

    return { success: true, message: "Setup deleted" };
  } catch (error) {
    console.error(error);
  }
}
