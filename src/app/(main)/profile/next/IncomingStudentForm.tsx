"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    incomingStudentSchema,
    IncomingStudentFormData,
} from "@/utils/validations/incomingStudent";

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
import { useState } from "react";

export default function IncomingStudentForm({
    onSubmit,
}: {
    onSubmit: (data: IncomingStudentFormData) => void;
}) {
    const form = useForm<IncomingStudentFormData>({
        resolver: zodResolver(incomingStudentSchema),
        defaultValues: {
            chosen_university: "",
            admit_universities: [],
            admission_status: "not_applied",
            intake_semester: "fall",
            intake_year: "",
            planned_program: "",
            visa_status_incoming: "not_applied",
        },
    });

    const currentYear = new Date().getFullYear();
    const intakeYears = Array.from({ length: 6 }, (_, i) => `${currentYear + i}`);
    const semesters = ["spring", "summer", "fall", "winter"];
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-3xl mx-auto mt-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* === LEFT === */}
                    <div className="space-y-4">
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

                    {/* === RIGHT === */}
                    <div className="space-y-4">
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
                        onClick={() => router.push(`/profile?redirectTo=${redirectTo}`)}
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
    );
}
