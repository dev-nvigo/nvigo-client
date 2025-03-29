// utils/validations.ts
import { z } from "zod";
import {
    isLongEnough,
    containsNumberOrSymbol,
    doesNotContainEmailUsername,
} from "./passwordUtils";

// Sign Up Schema
export const signUpSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => isLongEnough(data.password), {
        message: "Password must be at least 8 characters",
        path: ["password"],
    })
    .refine((data) => containsNumberOrSymbol(data.password), {
        message: "Password must contain a number or symbol",
        path: ["password"],
    })
    .refine((data) => doesNotContainEmailUsername(data.password, data.email), {
        message: "Password cannot contain your email username",
        path: ["password"],
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignUpFormData = z.infer<typeof signUpSchema>;
