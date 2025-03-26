"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SidebarProps {
    title: string;
    items: { name: string; slug: string; icon: string; color: string }[];
    queryParam: string;
    basePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title, items, queryParam, basePath }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedSlug = searchParams.get(queryParam) || "all";

    const [selectedItem, setSelectedItem] = useState(selectedSlug);

    useEffect(() => {
        setSelectedItem(selectedSlug);
    }, [selectedSlug]);

    const handleSelect = (slug: string) => {
        const params = new URLSearchParams();
        if (slug !== "all") {
            params.set(queryParam, slug);
        }
        router.push(`${basePath}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="w-[35vh] flex flex-col gap-2">
            <h2 className="text-gray-500 text-lg font-bold">{title}</h2>
            {items.map((item) => (
                <button
                    key={item.slug}
                    onClick={() => handleSelect(item.slug)}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-all",
                        selectedItem === item.slug
                            ? "bg-[#535353] text-white"
                            : "text-c-white-700 hover:bg-gray-200"
                    )}
                >
                    <span
                        className="w-7 h-7 flex items-center justify-center p-2 rounded-md"
                        style={{ backgroundColor: item.color }}
                    >
                        <Image src={`/icons/${item.icon}.svg`} alt={item.name} width={20} height={20} className="max-w-none" />
                    </span>

                    <span className="text-sm !font-circular-book">{item.name}</span>
                </button>
            ))}
        </div>
    );
};

export default Sidebar;
