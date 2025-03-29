"use client";

import React from "react";
import { useForm } from "react-hook-form";
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


export function BasicInfoForm() {
    const form = useForm<BasicInfoFormData>({
        resolver: zodResolver(basicInfoSchema),
        defaultValues: {
            fullName: "",
            email: "",
            countryOfOrigin: "",
            currentCountry: "",
        },
    });

    const onSubmit = (data: BasicInfoFormData) => {
        console.log("Profile Data:", data);
        // Implement profile update logic here (e.g., API call, Redux dispatch)
    };

    const currentCountry = useWatch({
        control: form.control,
        name: "currentCountry",
    });

    return (
        <div className="space-y-8 p-6">
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
                    <div className="flex items-stretch gap-8">

                        {/* Left Side */}
                        <div className="w-[20vw] space-y-6">
                            {/* Email Address */}
                            <FormField
                                control={form.control}
                                name="email"
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
                                name="fullName"
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

                            <CountrySelect name="countryOfOrigin" label="Country of Origin" />
                            <CountrySelect name="currentCountry" label="Select Current Location" />
                        </div>
                        {/* Vertical Divider */}
                        <div className="w-px bg-gray-300" />
                        {/* Right Side */}
                        <div className="w-[20vw] space-y-6">
                            <AddressInput
                                disabled={!currentCountry}
                                countryField="currentCountry"
                                addressLine1Field="addressLine1"
                                cityField="city"
                                stateField="state"
                                postalCodeField="postalCode"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-6 pt-8">
                        <Button type="button" variant="outline" className="min-w-[6rem] text-center">
                            Back
                        </Button>
                        <Button type="submit" className="min-w-[6rem] text-center">
                            Continue
                        </Button>
                    </div>

                </form>
            </Form>

        </div>
    );
}
