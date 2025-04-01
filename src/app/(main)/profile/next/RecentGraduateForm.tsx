"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    recentGraduateSchema,
    RecentGraduateFormData,
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


export default function RecentGraduateForm({
    onSubmit,
}: {
    onSubmit: (data: RecentGraduateFormData) => void;
}) {
    const form = useForm<RecentGraduateFormData>({
        resolver: zodResolver(recentGraduateSchema)
    });

    const currentYear = new Date().getFullYear();
    const gradYears = Array.from({ length: 10 }, (_, i) => `${currentYear - i}`);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";
    const employmentStatus = form.watch("employment_status");

    return (
        <div className="space-y-8 p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center not-visited:space-y-6 max-w-3xl mx-auto mt-2"
                >
                    <div className="flex flex-col md:flex-row items-stretch gap-8">
                        {/* === LEFT === */}
                        <div className="md:w-[20vw] space-y-6">
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
                        </div>

                        {/* Vertical Divider */}
                        <div className="hidden md:block w-px bg-gray-300" />

                        {/* === RIGHT === */}
                        <div className="md:w-[20vw] space-y-6">
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
                                name="visa_status_opt"
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
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch md:min-w-xs md:w-[20vw] space-y-6">

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
