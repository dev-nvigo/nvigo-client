import { z } from "zod";

export const workingProfessionalSchema = z.object({
    us_grad_university: z.string().optional(),
    education_level_work: z.enum(["bachelors", "masters", "phd"]),
    program_of_study_work: z.string().optional(),
    current_employer_work: z.string().min(1, "Employer is required"),
    job_title_work: z.string().min(1, "Job title is required"),
    work_visa_status: z.enum([
        "h1b", "h2a", "h2b", "o1", "l1", "tn",
        "e1", "e2", "eb1", "eb4", "eb5"
    ]),
});

export type WorkingProfessionalFormData = z.infer<typeof workingProfessionalSchema>;
