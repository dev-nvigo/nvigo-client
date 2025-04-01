'use client';


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeClient";
import { zodResolver } from "@hookform/resolvers/zod";
// import { FaBriefcase } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group"
import { useRouter, useSearchParams } from "next/navigation";
import { fetchBasicProfile, updateProfileStatus } from "@/lib/api/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/storeClient";
import { StatusFormData, statusSchema } from "@/utils/validations";
import { cn } from "@/lib/utils";
import StepIndicator from "@/components/StepIndicator";
import Image from "next/image";


const StatusPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<StatusFormData>({
        resolver: zodResolver(statusSchema)
    });

    useEffect(() => {
        const prefill = async () => {
            if (user?.id) {
                const profile = await fetchBasicProfile(user.id);
                if (profile) {
                    form.reset({
                        current_status: profile.current_status || "",
                    });
                }
            }
        };

        prefill();
    }, [user?.id, form]);

    const onSubmit = async (data: StatusFormData) => {
        if (user) {
            try {
                await updateProfileStatus(user.id, {
                    current_status: data.current_status,
                });

                dispatch(
                    setUser({
                        ...user,
                        current_status: data.current_status
                    })
                );

                router.push(`/profile/next?redirectTo=${redirectTo}`);
            } catch (error) {
                console.error("Profile update failed:", error);
            }
        }
    };

    return (
        <div className="relative md:h-[85vh] flex flex-col items-center bg-c-white-150">
            <StepIndicator
                step={2}
                totalSteps={3}
                title="What's your current visa status?"
                subtitle="This will help us recommend the best resources for you"
            />

            <div className="space-y-8 p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto px-4">
                        <div className="flex justify-center gap-6 mt-2">
                            <FormField
                                control={form.control}
                                name="current_status"
                                render={({ field }) => (
                                    <FormItem className="min-w-[55%]">
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="space-y-4"
                                            >
                                                {[
                                                    {
                                                        value: "incoming_student",
                                                        title: "Incoming Student",
                                                        desc: "I need to apply for a visa",
                                                    },
                                                    {
                                                        value: "current_student",
                                                        title: "Current Student",
                                                        desc: "I have an F1 visa",
                                                    },
                                                    {
                                                        value: "recent_graduate",
                                                        title: "Recent Graduate",
                                                        desc: "I have STEM OPT",
                                                    },
                                                    {
                                                        value: "working_professional",
                                                        title: "Working Professional",
                                                        desc: "I have H1B/O1 etc.",
                                                    },
                                                ].map((option) => (
                                                    <FormItem
                                                        key={option.value}
                                                        className={cn(
                                                            "border-1 bg-white rounded-lg px-4 py-4 md:pr-30 flex items-center justify-start cursor-pointer transition-colors",
                                                            field.value === option.value
                                                                ? "border-[#0A8ED9] bg-[#569ddf2b]"
                                                                : "border-gray-300"
                                                        )}
                                                        onClick={() => field.onChange(option.value)}
                                                    >
                                                        <div className="font-semibold text-sm md:text-base">{option.title},</div>
                                                        <div className="text-gray-500 text-xs md:text-sm">{option.desc}</div>
                                                    </FormItem>

                                                ))}
                                            </RadioGroup>
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Buttons */}
                        <div className="flex justify-center gap-6 pt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push(`/profile?redirectTo=${redirectTo}`)}
                                className="min-w-[8rem]"
                            >
                                Back
                            </Button>
                            <Button type="submit" className="min-w-[8rem] text-center">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="hidden lg:flex absolute inset-0 items-end justify-end z-0 pointer-events-none">
                <Image
                    src="/svgs/profile/status.svg"
                    alt="Profile Illustration"
                    width={200}
                    height={200}
                    className="object-contain pr-10"
                    priority
                />
            </div>
        </div>
    );
};

export default StatusPage;
