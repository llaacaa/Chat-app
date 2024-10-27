import { z } from "zod";

export const registerSchema = 
z.object({
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters." })
      .regex(/^[a-zA-Z0-9_]*$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),
    email: z.string().email("Invalid email adress."),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const loginSchema = z
  .object({
    usernameOrEmail: z
      .string()
      .min(4, { message: "Username must be at least 4 characters." })
      .regex(/^[a-zA-Z0-9_]*$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });
