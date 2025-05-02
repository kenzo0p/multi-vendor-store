import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be 5 length long")
    .max(12, "Password should be less then 12 so that you can remember it"),
  username: z
    .string()
    .min(3, "Username must be at least 2 characters")
    .max(60, "Username must be less than 60 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username only contains lowercase letters, numbers and hyphens. It must start and end with a letter or number"
    )
    .refine(
      (val) => !val.includes("--"),
      "username cannot container consequtive hyphens"
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
