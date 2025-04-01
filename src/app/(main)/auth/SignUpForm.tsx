"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
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
import {
    isLongEnough,
    containsNumberOrSymbol,
    doesNotContainEmailUsername,
} from "@/utils/validations/profile/passwordUtils";
import { signUpSchema, SignUpFormData } from "@/utils/validations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/storeClient";
import { createUserProfile, signUpWithEmail } from "@/lib/api/user";
import { setUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";


interface SignUpFormProps {
    redirectTo?: string;
}

const SignUpForm = ({ redirectTo = "/" }: SignUpFormProps) => {
    const router = useRouter();
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const dispatch = useDispatch<AppDispatch>();

    const passwordValue = form.watch("password", "");
    const emailValue = form.watch("email", "");

    const [passwordStrength, setPasswordStrength] = useState('Weak');
    const [isPasswordValid, setIsPasswordValid] = useState({
        length: false,
        number: false,
        notNameOrEmail: false,
    });

    const checkPasswordStrength = (password: string) => {
        const lengthValid = password.length >= 8;
        const numberValid = /\d/.test(password);
        const symbolValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setPasswordStrength(
            lengthValid && numberValid && symbolValid ? 'Strong' :
                (lengthValid && (numberValid || symbolValid)) ? 'Medium' : 'Weak'
        );
    };

    useEffect(() => {
        checkPasswordStrength(passwordValue);
        setIsPasswordValid({
            length: isLongEnough(passwordValue),
            number: containsNumberOrSymbol(passwordValue),
            notNameOrEmail: doesNotContainEmailUsername(passwordValue, emailValue),
        });
    }, [passwordValue, emailValue]);

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const { user } = await signUpWithEmail(data.email, data.password);

            if (user) {
                console.log(user);
                
                await createUserProfile(user.id, user.email!);
                dispatch(
                    setUser({
                        id: user.id,
                        email: user.email!,
                        profile_completed: false,
                    })
                );

                router.push(`/profile?redirectTo=${redirectTo}`);
            }
        } catch (error) {
            console.error("Sign up failed", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6 md:p-6 w-[80%] md:w-[50%] md:h-[100%]">
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
                            <div className="mt-2 text-xs text-gray-500">
                                Password Strength:{" "}
                                <span className="font-semibold">{passwordStrength}</span>
                            </div>
                            {/* Password Requirements */}
                            <div className="space-y-2 text-xs text-gray-600 mt-2">
                                <div
                                    className={`flex items-center ${isPasswordValid.length ? "text-[#61C986]" : "text-gray-500"
                                        }`}
                                >
                                    <FaCheck
                                        className="mr-2"
                                        style={{ color: isPasswordValid.length ? "#61C986" : "#ddd" }}
                                    />
                                    At least 8 characters
                                </div>
                                <div
                                    className={`flex items-center ${isPasswordValid.number ? "text-[#61C986]" : "text-gray-500"
                                        }`}
                                >
                                    <FaCheck
                                        className="mr-2"
                                        style={{
                                            color: isPasswordValid.number ? "#61C986" : "#ddd",
                                        }}
                                    />
                                    Contains a number or symbol
                                </div>
                                <div className={`flex !font-circular-book items-center ${isPasswordValid.notNameOrEmail ? 'text-[#61C986]' : 'text-gray-500'}`}>
                                    <FaCheck className="mr-2" style={{ color: isPasswordValid.notNameOrEmail ? '#61C986' : '#ddd' }} />
                                    Cannot contain your name or email address
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password Field */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Re-enter your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Create Account Button */}
                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </form>
        </Form>
    );
}

export default SignUpForm;
