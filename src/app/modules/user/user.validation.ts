import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be a string" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  email: z
    .string({ error: "Email must be a string" })
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(50, { message: "Email must be at most 50 characters long" }),
  password: z
    .string({ error: "Password must be a string" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  phone: z
    .string({ error: "Phone must be a string" })
    .regex(/^\+8801[3-9]\d{8}$/, {
      message:
        "Phone number must be valid for Bangladeshi format (+8801XXXXXXXXX)",
    })
    .optional(),
  address: z
    .string({ error: "Address must be a string" })
    .max(200, { message: "Address must be at most 200 characters long" })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be a string" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" })
    .optional(),
  password: z
    .string({ error: "Password must be a string" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .optional(),
  phone: z
    .string({ error: "Phone must be a string" })
    .regex(/^\+8801[3-9]\d{8}$/, {
      message:
        "Phone number must be valid for Bangladeshi format (+8801XXXXXXXXX)",
    })
    .optional(),

  role: z.enum(Object.values(Role)).optional(),
  IsActive: z.enum(Object.values(IsActive)).optional(),
  isDeleted: z
    .boolean({ error: "isDeleted must be a true or false value" })
    .optional(),
  isVerified: z
    .boolean({ error: "isVerified must be a true or false value" })
    .optional(),
  address: z
    .string({ error: "Address must be a string" })
    .max(200, { message: "Address must be at most 200 characters long" })
    .optional(),
});
