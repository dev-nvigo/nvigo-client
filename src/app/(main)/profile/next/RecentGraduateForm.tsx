"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    recentGraduateSchema,
    RecentGraduateFormData,
} from "@/utils/validations/recentGraduate";
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
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeClient";
import { fetchBasicProfile } from "@/lib/api/user";

export default function RecentGraduateForm({
    onSubmit,
}: {
    onSubmit: (data: RecentGraduateFormData) => void;
}) {
    const form = useForm<RecentGraduateFormData>({
        resolver: zodResolver(recentGraduateSchema),
        defaultValues: {
            graduated_university: "",
            education_level: "bachelors",
            graduation_year: "",
            employment_status: "searching",
            current_employer: "",
            job_title: "",
            visa_status: "opt_ead",
        },
    });

    const currentYear = new Date().getFullYear();
    const gradYears = Array.from({ length: 10 }, (_, i) => `${currentYear - i}`);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";
    const employmentStatus = form.watch("employment_status");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-3xl mx-auto mt-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* === LEFT === */}
                    <div className="space-y-4">
                        {/* Graduated University */}
                        <FormField
                            control={form.control}
                            name="graduated_university"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Graduated From</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. NYU" {...field} />
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

                        {/* Employment Status */}
                        <FormField
                            control={form.control}
                            name="employment_status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Employment Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="employed">Employed</SelectItem>
                                            <SelectItem value="searching">Searching</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* === RIGHT === */}
                    <div className="space-y-4">
                        {/* Graduation Year */}
                        <FormField
                            control={form.control}
                            name="graduation_year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Graduation Year</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {gradYears.map((year) => (
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

                        {/* Visa Status */}
                        <FormField
                            control={form.control}
                            name="visa_status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Visa Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="opt_ead">OPT-EAD</SelectItem>
                                            <SelectItem value="stem_opt">STEM OPT</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Current Employer (if employed) */}
                        {employmentStatus === "employed" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="current_employer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Employer</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Company name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="job_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Job Title (optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Job title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
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
