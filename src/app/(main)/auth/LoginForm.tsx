"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signInSchema, SignInFormData } from "@/utils/validations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/storeClient";
import { setUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/lib/api/user";


interface LoginFormProps {
    redirectTo?: string;
}

const LoginForm = ({ redirectTo = "/" }: LoginFormProps) => {
    const router = useRouter();
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (data: SignInFormData) => {
        try {
            const user = await signInWithEmail(data.email, data.password);

            if (!user) {
                throw new Error("Login succeeded but user is missing.");
            }

            dispatch(
                setUser({
                    id: user.id,
                    email: user.email!,
                    full_name: user.full_name ?? "",
                    profile_completed: user.profile_completed ?? false,
                })
            );

            router.push(redirectTo);
        } catch (error) {
            console.error("Unexpected login error:", error);
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

export default LoginForm;
