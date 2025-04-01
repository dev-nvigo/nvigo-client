"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronsUpDown, Check } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { BlogCategory } from "@/lib/api/blog";


interface SidebarProps {
    title: string;
    items: BlogCategory[];
    queryParam: string;
    basePath: string;
}

const CategorySwitcher: React.FC<SidebarProps> = ({ title, items, queryParam, basePath }) => {
    const searchParams = useSearchParams();
    const selectedValue = searchParams.get(queryParam) || "all";
    const [selected, setSelected] = useState(selectedValue);
    const router = useRouter();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        setSelected(selectedValue);
    }, [selectedValue]);

    const handleSelect = (value: string) => {
        setSelected(value);
        const params = new URLSearchParams();
        if (value !== "all") {
            params.set(queryParam, value);
        }
        router.push(`${basePath}?${params.toString()}`, { scroll: false });
    };

    const selectedItem = items.find((item) => item.slug === selected);

    return (
        <>
            {/* 👨‍💻 Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar
                    title={title}
                    items={items}
                    queryParam={queryParam}
                    basePath={basePath}
                />
            </div>

            {/* 📱 Mobile Combobox */}
            <div className="md:hidden w-full">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                        >
                            <div className="flex items-center gap-2">
                                {selectedItem && (
                                    <span
                                        className="w-6 h-6 flex items-center justify-center rounded"
                                        style={{ backgroundColor: selectedItem.color }}
                                    >
                                        <Image
                                            src={`/icons/${selectedItem.icon}.svg`}
                                            alt={selectedItem.name}
                                            width={16}
                                            height={16}
                                        />
                                    </span>
                                )}
                                <span>{selectedItem?.name ?? "Select Category"}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                                <CommandEmpty>No category found.</CommandEmpty>
                                <CommandGroup>
                                    {items.map((item) => (
                                        <CommandItem
                                            key={item.slug}
                                            value={item.name}
                                            onSelect={() => {
                                                handleSelect(item.slug);
                                                setOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="w-6 h-6 flex items-center justify-center rounded"
                                                    style={{ backgroundColor: item.color }}
                                                >
                                                    <Image
                                                        src={`/icons/${item.icon}.svg`}
                                                        alt={item.name}
                                                        width={16}
                                                        height={16}
                                                    />
                                                </span>
                                                <span>{item.name}</span>
                                            </div>
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selected === item.slug ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
};

export default CategorySwitcher;
