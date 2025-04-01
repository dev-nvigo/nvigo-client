"use client";

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
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BasicInfoFormData, basicInfoSchema } from "@/utils/validations";
import { AddressInput } from "@/components/forms/AddressInput";
import { CountrySelect } from "@/components/forms/CountrySelect";
import { useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { fetchBasicProfile, updateBasicProfile } from "@/lib/api/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/storeClient";


interface BasicInfoFormProps {
    redirectTo?: string;
}

const BasicInfoForm = ({ redirectTo = "/" }: BasicInfoFormProps) => {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<BasicInfoFormData>({
        resolver: zodResolver(basicInfoSchema),
        defaultValues: {
            full_name: "",
            email: user?.email || "",
            country_of_origin: "",
            current_country: "",
        },
    });

    useEffect(() => {
        const prefill = async () => {
            if (user?.id) {
                const profile = await fetchBasicProfile(user.id);
                if (profile) {
                    form.reset({
                        full_name: profile.full_name || "",
                        email: profile.email || "",
                        country_of_origin: profile.country_of_origin || "",
                        current_country: profile.current_country || "",
                        address_line1: profile.address_line1 || "",
                        city: profile.city || "",
                        state: profile.state || "",
                        postal_code: profile.postal_code || "",
                    });
                }
            }
        };

        prefill();
    }, [user?.id, form]);

    const onSubmit = async (data: BasicInfoFormData) => {
        if (user) {
            try {
                await updateBasicProfile(user.id, {
                    full_name: data.full_name,
                    email: data.email,
                    country_of_origin: data.country_of_origin,
                    current_country: data.current_country,
                    address_line1: data.address_line1,
                    city: data.city,
                    state: data.state,
                    postal_code: data.postal_code,
                    profile_completed: true,
                });

                dispatch(
                    setUser({
                        ...user,
                        full_name: data.full_name,
                    })
                );

                router.push(`/profile/status?redirectTo=${redirectTo}`);
            } catch (error) {
                console.error("Profile update failed:", error);
            }
        }
    };

    const current_country = useWatch({
        control: form.control,
        name: "current_country",
    });

    return (
        <div className="space-y-8 p-6 mt-2">
            {/* Profile Image Section */}
            {/* <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src="/placeholder-profile.jpg" alt="Profile Image" />
                    <AvatarFallback className="bg-[#ECF0FF]">
                        <FaBriefcase size={32} className="text-primary" />
                    </AvatarFallback>
                </Avatar>
                <div className="flex space-x-4">
                    <Button variant="outline">Upload Profile Image</Button>
                    <Button variant="outline">Edit Profile Image</Button>
                </div>
            </div> */}

            {/* Profile Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-stretch gap-8">

                        {/* Left Side */}
                        <div className="md:w-[20vw] space-y-6">
                            {/* Email Address */}
                            <FormField
                                control={form.control}
                                name="email"
                                disabled={true}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Email Address" {...field} className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your full name" {...field} className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <CountrySelect name="country_of_origin" label="Country of Origin" />

                            <CountrySelect name="current_country" label="Select Current Location" />
                        </div>
                        {/* Vertical Divider */}
                        <div className="hidden md:block w-px bg-gray-300" />
                        {/* Right Side */}
                        <div className="md:w-[20vw] space-y-6">
                            <AddressInput
                                disabled={!current_country}
                                countryField="current_country"
                                address_line1Field="address_line1"
                                cityField="city"
                                stateField="state"
                                postal_codeField="postal_code"
                            />
                        </div>
                    </div>

                    
                    {/* Buttons */}
                    <div className="flex justify-center gap-6 pt-8">
                        {/* <Button type="button" variant="outline" className="min-w-[6rem] text-center">
                            Back
                        </Button> */}
                        <Button type="submit" className="min-w-[8rem] text-center">
                            Continue
                        </Button>
                    </div>

                </form>
            </Form>

        </div>
    );
}

export default BasicInfoForm;
