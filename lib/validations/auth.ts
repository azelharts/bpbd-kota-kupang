// lib/validations/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
});

export type LoginInput = z.infer<typeof loginSchema>;
