import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().trim(),
});

export const registerSchema = z
  .object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

  export const userDBSchema = z.object({    
    id: z.number(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
  });
