"use server";

import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { createSession, deleteSession, decrypt } from "../sessions";
import { registerSchema, loginSchema } from "../schema/auth-schema";

export async function registerUser(prevState: unknown, formData: FormData) {
  try {
    const result = registerSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { email, firstName, lastName, password } = result.data;

    const existingUser = await sql`
      SELECT 1 FROM users WHERE email = ${email};
    `;

    if (existingUser.rows.length > 0) {
      console.log("Email already in use");
      return { errors: { email: ["Email already in use"] } };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const response = await sql`
          INSERT INTO users (email, first_name, last_name, password)
          VALUES (${email}, ${firstName}, ${lastName}, ${hashedPassword})
           RETURNING id, first_name, email;
        `;

    const user = {
      id: response.rows[0].id,
      email: response.rows[0].email,
      first_name: response.rows[0].first_name,
    };

    if (!user) {
      console.log("Failed to create user");
      return { errors: { email: ["Failed to create user"] } };
    }

    await createSession(user.id);

    return { user, errors: undefined };
  } catch (error) {
    console.error(error);
  }
}

export async function login(prevState: unknown, formData: FormData) {
  try {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors };
    }

    const { email, password } = result.data;

    const existingUser = await sql`
  SELECT id, email, first_name, password FROM users WHERE email = ${email};
`;

    if (existingUser.rows.length === 0) {
      return { success: false, error: "User not found" };
    }

    const validPassword = await bcrypt.compare(
      password,
      existingUser.rows[0].password
    );

    if (!validPassword) {
      return { error: "Invalid login credentials" };
    }

    const user = {
      id: existingUser.rows[0].id,
      email: existingUser.rows[0].email,
      first_name: existingUser.rows[0].first_name,
    };

    await createSession(user.id);

    return user;
  } catch (error) {
    console.error(error);
  }
}

export const getUserIdFromSessionAndUserFromDb = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);
  const userId = session?.userId;
  if (userId && typeof userId === "number") {
    try {
      const response = await sql`
      SELECT id, email, first_name FROM users WHERE id = ${userId}
    `;
      const user = {
        id: response.rows[0].id,
        email: response.rows[0].email,
        first_name: response.rows[0].first_name,
      };
      return user;
    } catch (error) {
      console.error(error);
    }
  }
};

export async function logout() {
  try {
    await deleteSession();
  } catch (error) {
    console.error(error);
  }
}
