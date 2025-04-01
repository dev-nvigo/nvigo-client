import { z } from "zod";


export const statusSchema = z.object({
    current_status: z.enum([
        "current_student",
        "incoming_student",
        "recent_graduate",
        "working_professional",
    ], { required_error: "Current Status is required" })
});

export type StatusFormData = z.infer<typeof statusSchema>;
