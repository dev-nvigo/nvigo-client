import { z } from "zod";

export const incomingStudentSchema = z.object({
    chosen_university: z.string().optional(),
    admit_universities: z.array(z.string()).optional(), // ✅ NEW FIELD
    admission_status: z.enum(["accepted", "waiting", "not_applied"]),
    intake_semester: z.enum(["spring", "summer", "fall", "winter"]),
    intake_year: z.string().min(4, "Enter a valid year"),
    planned_program: z.string().min(1, "Program is required"),
    visa_status_incoming: z.enum([
        "applied",
        "approved",
        "pending",
        "not_applied",
    ]),
});

export type IncomingStudentFormData = z.infer<typeof incomingStudentSchema>;
