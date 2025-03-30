import { supabase } from "@/lib/supabaseClient";
import { BasicInfoFormData } from "@/utils/validations";


export async function createUserProfile(userId: string, email: string) {
    console.log("here");
    
    console.log(userId, email);
    
    const { error } = await supabase.from("profiles").insert({
        id: userId,
        email,
        profile_completed: false,
    });

    if (error) {
        console.error("Failed to create user profile:", error);
        throw error;
    }
}


export async function signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    console.log(data);
    

    if (error) {
        throw error;
    }

    return data;
}


export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    if (!data.user) {
        throw new Error("Login succeeded but user is missing.");
    }

    const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("id, email, full_name, profile_completed")
        .eq("id", data.user.id)
        .single();

    if (fetchError) {
        console.error("Failed to fetch user profile:", fetchError.message);
    }

    return profile;
}


export async function updateBasicProfile(userId: string, data: Partial<BasicInfoFormData> & { profile_completed?: boolean }) {
    const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", userId);

    if (error) {
        throw error;
    }
}
