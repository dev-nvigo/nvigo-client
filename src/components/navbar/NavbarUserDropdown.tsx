'use client';

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/slices/userSlice";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";


const NavbarUserDropdown = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.clear();
        dispatch(clearUser());
        router.push("/auth");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-10 w-10 border border-primary bg-[#ECF0FF]">
                    {/* If you have a profile image in future */}
                    <AvatarImage src={undefined} alt="Profile" />

                    {/* Fallback: icon centered */}
                    <AvatarFallback className="flex items-center justify-center p-1">
                        <User2 className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mt-2">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile/status")}>
                    Update Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Update Information
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavbarUserDropdown;
