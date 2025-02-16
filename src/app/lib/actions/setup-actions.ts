"use server";

import { sql } from "@vercel/postgres";
import { newSetupSchema, updateSetupSchema } from "../schema/setup-schema";
import { SetupWithWinRate, Setup } from "../types";

export async function getSetups(userId: number | undefined) {
  try {
    const response = await sql`SELECT * FROM setups WHERE user_id = ${userId}`;

    const setups = response.rows.map((row) => ({
      id: row.id,
      name: row.name,
      triggerIds: row.trigger_ids,
      successCount: row.success_count,
      failureCount: row.failure_count,
    }));

    if (!setups) {
      console.log("User has no setups");
      return;
    }

    return setups;
  } catch (error) {
    console.error(error);
  }
}

export async function createSetup(
  formData: FormData,
  userId: number | undefined
) {
  if (!userId) {
    console.error("User ID is missing");
    return { errors: { name: ["User ID is missing"] } };
  }

  const formDataObject = Object.fromEntries(formData);
  const triggerIds = formDataObject.triggerIds
    ? JSON.parse(formDataObject.triggerIds as string)
    : [];
  const result = newSetupSchema.safeParse({
    name: formDataObject.name,
    triggerIds,
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, triggerIds: validTriggerIds } = result.data;

  try {
    const existingSetup = await sql`
    SELECT 1 FROM setups WHERE name = ${name} AND user_id = ${userId};
  `;

    if (existingSetup.rows.length > 0) {
      console.log("Setup already exists");
      return { errors: { name: ["Setup already exists"] } };
    }

    const formattedTriggerIds = `{${validTriggerIds.join(",")}}`;

    const response = await sql`
    INSERT INTO setups (name, trigger_ids, user_id)
    VALUES (${name}, ${formattedTriggerIds}, ${userId})
    RETURNING id, name, trigger_ids;
  `;

    const setup = response.rows[0];
    if (!setup) {
      console.log("Failed to create setup");
      return { errors: { name: ["Failed to create setup"] } };
    }

    return setup;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSetup(setup: SetupWithWinRate) {
  try {
    const result = updateSetupSchema.safeParse(setup);

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { id, name, triggerIds, successCount, failureCount } = result.data;

    const formattedTriggerIds = `{${triggerIds.join(",")}}`;

    const response = await sql`
        UPDATE setups
        SET
          name = ${name},
          trigger_ids = ${formattedTriggerIds},
          success_count = ${successCount},
          failure_count = ${failureCount}
        WHERE id = ${id}
        RETURNING id, name, trigger_ids, success_count, failure_count;
      `;

    if (response.rowCount === 0) {
      console.log("Failed to update setup");
      return { errors: { name: ["Failed to update setup"] } };
    }

    const updatedSetup: Setup = {
      id: response.rows[0].id,
      name: response.rows[0].name,
      triggerIds: response.rows[0].trigger_ids,
      successCount: response.rows[0].success_count,
      failureCount: response.rows[0].failure_count,
    };

    return updatedSetup;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSetup(setupId: number, userId: number | undefined) {
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
