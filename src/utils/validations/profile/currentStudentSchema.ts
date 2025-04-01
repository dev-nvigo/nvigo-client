import { z } from "zod";


export const currentStudentSchema = z.object({
    enrolled_university: z.string().min(1, "University is required"),
    program_of_study: z.string().min(1, "Program is required"),
    current_year_of_study: z.enum(["undergraduate", "masters", "phd"]),
    expected_grad_month: z.string(),
    expected_grad_year: z.string(),
    student_visa_status: z.enum(["f1", "m1", "j1"]),
});

export type CurrentStudentFormData = z.infer<typeof currentStudentSchema>;
