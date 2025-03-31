"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    workingProfessionalSchema,
    WorkingProfessionalFormData,
} from "@/utils/validations/workingProfessional";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeClient";
import { fetchBasicProfile } from "@/lib/api/user";

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

export default function WorkingProfessionalForm({
    onSubmit,
}: {
    onSubmit: (data: WorkingProfessionalFormData) => void;
}) {
    const form = useForm<WorkingProfessionalFormData>({
        resolver: zodResolver(workingProfessionalSchema),
        defaultValues: {
            graduated_university: "",
            education_level: "bachelors",
            program_of_study: "",
            current_employer: "",
            job_title: "",
            visa_status: "h1b",
        },
    });

    const visaOptions = [
        "h1b", "h2a", "h2b", "o1", "l1", "tn", "e1", "e2", "eb1", "eb4", "eb5"
    ];

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
                        {/* Graduated From */}
                        <FormField
                            control={form.control}
                            name="graduated_university"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Graduated From (optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. USC" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Education Level */}
                        <FormField
                            control={form.control}
                            name="education_level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Highest Level of Education</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="bachelors">Bachelor’s</SelectItem>
                                            <SelectItem value="masters">Master’s</SelectItem>
                                            <SelectItem value="phd">PhD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Employer Name */}
                        <FormField
                            control={form.control}
                            name="current_employer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Employer</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Amazon" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* === RIGHT === */}
                    <div className="space-y-4">
                        {/* Program of Study */}
                        <FormField
                            control={form.control}
                            name="program_of_study"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Program of Study (optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Computer Science" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Visa Status */}
                        <FormField
                            control={form.control}
                            name="visa_status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visa Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Visa" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {visaOptions.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option.toUpperCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Job Title */}
                        <FormField
                            control={form.control}
                            name="job_title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Software Engineer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

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
