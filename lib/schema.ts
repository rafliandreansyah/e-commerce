import { z } from "zod";

export const schemaSignIn = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Min length must be at least 6" }),
});

export const schemaCategory = z.object({
  name: z
    .string({ required_error: "category is required" })
    .min(4, { message: "Category should have 4 characters" }),
});

export const schemaLocation = z.object({
  name: z
    .string({ required_error: "category is required" })
    .min(4, { message: "Category should have 4 characters" }),
});
