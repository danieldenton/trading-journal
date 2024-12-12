"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/sessions";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "daniel@danieldentondev.com",
  password: "password",
};

const loginSchemaa = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchemaa.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return { errors: { email: ["Invalid email or password"] } };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
