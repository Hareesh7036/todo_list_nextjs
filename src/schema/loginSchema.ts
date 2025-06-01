import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z
    .string()
    .min(3, "password must be atleast 3 characters")
    .max(20, "password must be not exceed 20 characters"),
});
