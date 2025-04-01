"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { CurrentStudentFormData, currentStudentSchema } from "@/utils/validations";


export default function CurrentStudentForm({
    onSubmit,
}: {
    onSubmit: (data: CurrentStudentFormData) => void;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";
    const form = useForm<CurrentStudentFormData>({
        resolver: zodResolver(currentStudentSchema)
    });

    const currentYear = new Date().getFullYear();
    const gradYears = Array.from({ length: 6 }, (_, i) => `${currentYear + i}`);
    const gradMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    return (
        <div className="space-y-8 p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-5xl mx-auto px-4 mt-2"
                >
                    <div className="flex flex-col md:flex-row items-stretch md:gap-8">
                        {/* === LEFT SIDE === */}
                        <div className="md:w-[20vw] space-y-6">
                            {/* Current Year of Study */}
                            <FormField
                                control={form.control}
                                name="current_year_of_study"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Year of Study</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                                <SelectItem value="masters">Masters</SelectItem>
                                                <SelectItem value="phd">PhD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Enrolled University */}
                            <FormField
                                control={form.control}
                                name="enrolled_university"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enrolled University</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Select or type university name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Expected Graduation Month */}
                            <FormField
                                control={form.control}
                                name="expected_grad_month"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expected Graduation Month</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Month" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {gradMonths.map((month) => (
                                                    <SelectItem key={month} value={month}>
                                                        {month}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Vertical Divider */}
                        <div className="hidden md:block w-px bg-gray-300" />

                        {/* === RIGHT SIDE === */}
                        <div className="md:w-[20vw] space-y-6 mt-5 md:mt-0">

                            {/* Visa Status */}
                            <FormField
                                control={form.control}
                                name="student_visa_status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visa Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Visa Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="f1">F-1</SelectItem>
                                                <SelectItem value="m1">M-1</SelectItem>
                                                <SelectItem value="j1">J-1</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Program of Study */}
                            <FormField
                                control={form.control}
                                name="program_of_study"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Program of Study</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Computer Science" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Expected Graduation Year */}
                            <FormField
                                control={form.control}
                                name="expected_grad_year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expected Graduation Year</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
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
                        </div>
                    </div>

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
