"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    incomingStudentSchema,
    IncomingStudentFormData,
} from "@/utils/validations";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";


export default function IncomingStudentForm({
    onSubmit,
}: {
    onSubmit: (data: IncomingStudentFormData) => void;
}) {
    const form = useForm<IncomingStudentFormData>({
        resolver: zodResolver(incomingStudentSchema)
    });

    const currentYear = new Date().getFullYear();
    const intakeYears = Array.from({ length: 6 }, (_, i) => `${currentYear + i}`);
    const semesters = ["spring", "summer", "fall", "winter"];
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    return (
        <div className="space-y-8 p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 max-w-3xl mx-auto mt-2"
                >
                    <div className="flex flex-col md:flex-row items-stretch md:gap-8">
                        {/* === LEFT === */}
                        <div className="md:w-[20vw] space-y-6">
                            {/* Chosen University */}
                            <FormField
                                control={form.control}
                                name="chosen_university"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chosen University (optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. NYU" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Intake Semester */}
                            <FormField
                                control={form.control}
                                name="intake_semester"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Intended Intake Semester</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Semester" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {semesters.map((s) => (
                                                    <SelectItem key={s} value={s}>
                                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Planned Program */}
                            <FormField
                                control={form.control}
                                name="planned_program"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Planned Program of Study</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Business Analytics" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Vertical Divider */}
                        <div className="hidden md:block w-px bg-gray-300" />

                        {/* === RIGHT === */}
                        <div className="md:w-[20vw] space-y-6 mt-5 md:mt-0">
                            {/* Intake Year */}
                            <FormField
                                control={form.control}
                                name="intake_year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Intended Intake Year</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {intakeYears.map((year) => (
                                                    <SelectItem key={year} value={year}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Admission Status */}
                            <FormField
                                control={form.control}
                                name="admission_status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Admission Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="accepted">Accepted</SelectItem>
                                                <SelectItem value="waiting">Waiting</SelectItem>
                                                <SelectItem value="not_applied">Not Applied Yet</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Visa Status */}
                            <FormField
                                control={form.control}
                                name="visa_status_incoming"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visa Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Visa Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="applied">Applied</SelectItem>
                                                <SelectItem value="approved">Approved</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="not_applied">Not Applied Yet</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="admit_universities"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admit Received Universities</FormLabel>
                                <div className="space-y-2">
                                    {["NYU", "Columbia", "USC", "UCLA", "Northeastern"].map((uni) => (
                                        <label key={uni} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={uni}
                                                checked={field.value?.includes(uni)}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    const value = e.target.value;

                                                    const updated = isChecked
                                                        ? [...(field.value || []), value]
                                                        : field.value?.filter((item) => item !== value);

                                                    field.onChange(updated);
                                                }}
                                            />
                                            <span>{uni}</span>
                                        </label>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Buttons */}
                    <div className="pt-6 flex justify-center gap-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push(`/profile/status?redirectTo=${redirectTo}`)}
                            className="min-w-[8rem]"
                        >
                            Back
                        </Button>
                        <Button type="submit" className="min-w-[8rem]">
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
