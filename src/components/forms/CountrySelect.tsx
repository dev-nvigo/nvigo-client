// components/form-elements/CountrySelect.tsx
"use client"

import { useState, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { countries as countriesData } from "countries-list"

import { ChevronsUpDown, Check } from "lucide-react"
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandList,
    CommandInput,
    CommandEmpty,
    CommandItem,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

type CountrySelectProps = {
    name: string
    label?: string
    placeholder?: string
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
    name,
    label = "Country",
    placeholder = "Select country",
}) => {
    const { control, setValue } = useFormContext()
    const [open, setOpen] = useState(false)

    const countries = useMemo(
        () =>
            Object.entries(countriesData)
                .map(([code, data]) => ({
                    code,
                    name: data.name,
                }))
                .sort((a, b) => a.name.localeCompare(b.name)),
        []
    )

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const selected = countries.find((c) => c.code === field.value)
                return (
                    <FormItem className="flex flex-col">
                        <FormLabel>{label}</FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                    >
                                        {selected?.name || placeholder}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search country..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No country found.</CommandEmpty>
                                        <CommandGroup>
                                            {countries.map((country) => (
                                                <CommandItem
                                                    key={country.code}
                                                    value={country.name}
                                                    onSelect={() => {
                                                        setValue(name, country.code)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {country.name}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            field.value === country.code ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}
