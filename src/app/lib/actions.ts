"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./sessions";
import { registerSchema, loginSchema } from "./schema";

const testUser = {
  id: "1",
  email: "daniel@danieldentondev.com",
  password: "password",
};



export async function register(prevState: any, formData: FormData) {
  try {
    const result = registerSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors };
    }

    const { email, firstName, lastName, password } = result.data;

    if (email === testUser.email) {
      return { errors: { email: ["Email already in use"] } };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
    };

    const response = await sql`
          INSERT INTO users (user_id, email, first_name, last_name)
          VALUES (${email}, ${firstName}, ${lastName}, ${hashedPassword})
          RETURNING *;
        `;

    const validatedUser = registerSchema.safeParse(response.rows[0]);
    // TODO: Save user to database and get the return with the user id.

    await createSession(testUser.id);

    redirect("/dashboard");
  } catch (error) {
    console.error(error);
  }
}

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  const error = { errors: { email: ["Invalid email or password"] } };

  // find user by email
  const user = testUser;

  if (!user) {
    return error;
  }

  const matchedPassowrd = await bcrypt.compare(password, testUser.password);

  if (!matchedPassowrd) {
    return error;
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
