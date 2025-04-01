import { z } from "zod";


export const basicInfoSchema = z.object({
    full_name: z.string().min(1, { message: "Full Name is required" }),
    email: z.string().email("Invalid email address"),
    country_of_origin: z.string().min(1, { message: "Country of Origin is required" }),
    current_country: z.string().min(1, { message: "Current Country is required" }),
    address_line1: z.string().min(1, { message: "Address Line 1 is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    postal_code: z.string().min(1, { message: "Postal Code is required" }),
});

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
