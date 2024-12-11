"use server";

import { z } from "zod";

const testUser = {
  id: 1,
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

export async function login(prevState: any, formData: FormData) {}

export async function logout() {}
