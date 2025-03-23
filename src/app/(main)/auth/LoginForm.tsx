"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { signInSchema, SignInFormData } from "@/utils/validations/signInSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/slices/userSlice";

// 1. Zod Schema
// - Validates email format
// - Ensures password is at least 8 characters
// - rememberMe is optional (defaults to false if not provided)


export default function LoginForm() {
    // 2. React Hook Form Setup
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });
    const dispatch = useDispatch<AppDispatch>();

    // 3. Form Submit Handler
    const onSubmit = (data: SignInFormData) => {
        console.log("Sign In Data:", data);

        // Example:
        // 1) Make an API call to sign the user in
        // 2) If successful, dispatch an action to Redux or store token in cookies
        // 3) Redirect user or show success message
        try {
            // 1. Make an API call to your backend to create the user
            //    For demonstration, let's pretend it returns a token
            //    const response = await fetch("/api/signup", { method: "POST", body: JSON.stringify(data) });
            //    const result = await response.json();

            // 2. Dispatch to Redux
            dispatch(setUser({ email: data.email, token: "someAuthTokenFromServer" }));

            console.log("Form submitted, user set in Redux store", data);
        } catch (error) {
            console.error("Sign up failed", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 w-[50%] h-[85%]">
                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Remember Me Checkbox */}
                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(!!checked)}
                                />
                            </FormControl>
                            <FormLabel className="leading-none">Remember on this site</FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Sign In Button */}
                <Button type="submit" className="w-full">
                    Sign In
                </Button>
            </form>
        </Form>
    );
}
