'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from '@/components/ui/form'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react"
import debounce from 'lodash.debounce'
import { cn } from "@/lib/utils"
import { useFormContext } from 'react-hook-form'

type Suggestion = {
    fullAddress: string
    city: string
    state: string
    postalCode: string
}

type AddressInputProps = {
    countryField: string
    addressLine1Field: string
    cityField: string
    stateField: string
    postalCodeField: string
    disabled: boolean
}

export const AddressInput: React.FC<AddressInputProps> = ({
    countryField,
    addressLine1Field,
    cityField,
    stateField,
    postalCodeField,
    disabled
}) => {
    const { control, setValue, watch } = useFormContext()
    const selectedCountry = watch(countryField)
    const [addressSuggestions, setAddressSuggestions] = useState<Suggestion[]>([])
    const [isAddressPopoverOpen, setIsAddressPopoverOpen] = useState(false)
    const [typedAddress, setTypedAddress] = useState("")

    const fetchAddressSuggestions = async (query: string, country: string) => {
        if (!query || !country) return
        try {
            const res = await fetch(`/api/address-autocomplete?query=${encodeURIComponent(query)}&country=${country}`)
            const data = await res.json()
            setAddressSuggestions(data.suggestions ?? [])
            setIsAddressPopoverOpen(true)
        } catch (error) {
            console.error('Autocomplete fetch error:', error)
            setAddressSuggestions([])
        }
    }

    const debouncedFetchSuggestions = useMemo(
        () =>
            debounce((query: string, country: string) => {
                if (query.length < 2) return
                fetchAddressSuggestions(query, country)
            }, 300),
        [selectedCountry]
    )

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel()
        }
    }, [debouncedFetchSuggestions])

    return (
        <>
            {/* Address Line 1 */}
            <FormField
                control={control}
                name={addressLine1Field}
                render={({ field }) => (
                    <FormField
                        control={control}
                        name={addressLine1Field}
                        render={({ field }) => (
                            <FormItem className={cn("flex flex-col", disabled ? "pointer-events-none" : "")}>
                                <FormLabel>Address</FormLabel>

                                <Popover open={isAddressPopoverOpen} onOpenChange={setIsAddressPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                {...(disabled && { disabled: true })}
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between text-left",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value || "Start typing your address..."}
                                                <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search address..."
                                                className="h-9"
                                                value={typedAddress}
                                                onValueChange={(val) => {
                                                    setTypedAddress(val)
                                                    debouncedFetchSuggestions(val, selectedCountry)
                                                }}
                                            />

                                            <CommandList>
                                                {addressSuggestions.length > 0 ? (
                                                    <CommandGroup>
                                                        {addressSuggestions.map((suggestion, index) => (
                                                            <CommandItem
                                                                key={index}
                                                                value={suggestion.fullAddress}
                                                                onSelect={() => {
                                                                    field.onChange(suggestion.fullAddress)
                                                                    setValue(cityField, suggestion.city)
                                                                    setValue(stateField, suggestion.state)
                                                                    setValue(postalCodeField, suggestion.postalCode)
                                                                    setIsAddressPopoverOpen(false)
                                                                }}
                                                            >
                                                                {suggestion.fullAddress}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        field.value === suggestion.fullAddress ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                ) : typedAddress ? (
                                                    <CommandGroup>
                                                        <CommandItem
                                                            value={typedAddress}
                                                            onSelect={() => {
                                                                field.onChange(typedAddress)
                                                                setIsAddressPopoverOpen(false)
                                                            }}
                                                        >
                                                            Use “{typedAddress}”
                                                            <Check className="ml-auto h-4 w-4 opacity-100" />
                                                        </CommandItem>
                                                    </CommandGroup>
                                                ) : (
                                                    <CommandEmpty>No suggestions found.</CommandEmpty>
                                                )}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            />

            {/* City */}
            <FormField
                control={control}
                name={cityField}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter city" {...field}
                                                {...(disabled && { disabled: true })} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* State */}
            <FormField
                control={control}
                name={stateField}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter state" {...field}
                                                {...(disabled && { disabled: true })} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Postal Code */}
            <FormField
                control={control}
                name={postalCodeField}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. 12345" {...field}
                                                {...(disabled && { disabled: true })} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
