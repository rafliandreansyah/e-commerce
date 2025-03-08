import { z } from "zod";

const IMAGE_MIME_TYPES = ["image/png", "image/jgp", "image/jpeg"];

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

export const schemaBrand = z.object({
  name: z
    .string({ required_error: "Brand is required" })
    .min(1, { message: "Brand should have 1 characters" }),
  image: z
    .any()
    .refine((file: File) => IMAGE_MIME_TYPES.includes(file.type), {
      message: "Image file only accept jpeg, jpg, and png",
    })
    .refine((file: File) => file.name != null || file.name !== "", {
      message: "Image is required",
    }),
});
