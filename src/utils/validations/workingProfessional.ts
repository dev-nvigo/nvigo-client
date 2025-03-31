import { z } from "zod";

export const workingProfessionalSchema = z.object({
    graduated_university: z.string().optional(),
    education_level: z.enum(["bachelors", "masters", "phd"]),
    program_of_study: z.string().optional(),
    current_employer: z.string().min(1, "Employer is required"),
    job_title: z.string().min(1, "Job title is required"),
    visa_status: z.enum([
        "h1b", "h2a", "h2b", "o1", "l1", "tn",
        "e1", "e2", "eb1", "eb4", "eb5"
    ]),
});

export type WorkingProfessionalFormData = z.infer<typeof workingProfessionalSchema>;
