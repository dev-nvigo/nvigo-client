import { z } from "zod";

export const recentGraduateSchema = z.object({
    graduated_university: z.string().min(1, "University is required"),
    education_level: z.enum(["bachelors", "masters", "phd"]),
    graduation_year: z.string().min(4, "Graduation year is required"),
    employment_status: z.enum(["employed", "searching"]),
    current_employer: z.string().optional(),
    job_title: z.string().optional(),
    visa_status_opt: z.enum(["opt_ead", "stem_opt"]),
});

export type RecentGraduateFormData = z.infer<typeof recentGraduateSchema>;
