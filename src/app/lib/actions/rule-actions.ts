"use server";

import { sql } from "@vercel/postgres";
import { newRuleSchema, updateRuleSchema } from "../schema/rule-schema";
import { Rule } from "../types";

export async function getRules(userId: number | undefined) {
  try {
    const response = await sql`SELECT * FROM rules WHERE user_id = ${userId};`;

    const rules = response.rows;

    if (!rules.length) {
      console.log("User has no Rules");
      return;
    }

    return rules;
  } catch (error) {
    console.error(error);
  }
}

export async function createRule(
  formData: FormData,
  userId: number | undefined
) {
  try {
    if (!userId) {
      console.error("User ID is missing");
      return { errors: { rule: ["User ID is missing"] } };
    }

    const result = newRuleSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return {
        errors: { errors: result.error.flatten().fieldErrors },
      };
    }

    const { rule } = result.data;

    const existingRule = await sql`
      SELECT 1 FROM rules WHERE rule = ${rule} AND user_id = ${userId};
    `;

    if (existingRule.rows.length > 0) {
      console.log("Rule already exists");
      return { errors: { rule: ["Rule already exists"] } };
    }

    const response = await sql`
      INSERT INTO Rules (rule, user_id)
      VALUES (${rule}, ${userId})
      RETURNING *;
    `;

    const returnedRule = response.rows[0];

    if (!returnedRule) {
      console.log("Failed to create Rule");
      return { errors: { rule: ["Failed to create Rule"] } };
    }

    return returnedRule;
  } catch (error) {
    console.error(error);
    return { errors: { rule: ["An unexpected error occurred"] } };
  }
}

export async function updateRule(updatedRule: Rule) {
  try {
    const result = updateRuleSchema.safeParse(updatedRule);

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { id, rule } = result.data;

    const response = await sql`
      UPDATE rules
      SET rule = ${rule}
      WHERE id = ${id}
      RETURNING *;
    `;

    const returnedRule = response.rows[0];
    if (!updatedRule) {
      console.log("Failed to update Rule");
      return { errors: { rule: ["Failed to update Rule"] } };
    }

    return returnedRule;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteRule(ruleId: number) {
  try {
    const response = await sql`
      DELETE FROM rules WHERE id = ${ruleId};
    `;

    if (response.rowCount === 0) {
      console.log("Failed to delete Rule");
      return { errors: { rule: ["Failed to delete Rule"] } };
    }

    return { success: true, message: "Rule deleted" };
  } catch (error) {
    console.error(error);
  }
}
