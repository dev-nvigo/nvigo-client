import { supabase } from "@/lib/supabaseClient";
import type { PostgrestError } from '@supabase/supabase-js';

export type Service = {
    id: number;
    name: string;
    icon: string;
    slug: string;
    color: string;
    description?: string | null;
};

export type Vendor = {
    id: string;
    title: string;
    description: string;
    url: string;
    frame: string;
    service: Service;
};

type VendorListResponse = {
    data: Vendor[];
    totalPages: number;
    currentPage: number;
    error?: PostgrestError | null;
};

// Fetch all vendors (optionally by service category, paginated)
export const fetchVendors = async (
    serviceSlug: string | null = null,
    page: number = 1,
    limit: number = 6
): Promise<VendorListResponse> => {
    const offset = (page - 1) * limit;

    let query = supabase
        .from('vendors')
        .select(
            `
            id,
            title,
            description,
            url,
            frame,
            service:service_id (
                id,
                name,
                icon,
                slug,
                color,
                description
            )
            `,
            { count: 'exact' }
        )
        .range(offset, offset + limit - 1)
        .order('title', { ascending: true });

    if (serviceSlug) {
        const { data: serviceData } = await supabase
            .from('services')
            .select('id')
            .eq('slug', serviceSlug)
            .single();

        if (serviceData) {
            query = query.eq('service_id', serviceData.id);
        }
    }

    const { data, count, error } = await query as unknown as {
        data: Vendor[];
        error: PostgrestError | null;
        count: number | null;
    };

    return {
        data: data || [],
        totalPages: count ? Math.ceil(count / limit) : 0,
        currentPage: page,
        error,
    };
};

// Fetch the most recent vendors
export const fetchRecentVendors = async (
    limit: number = 5,
    excludeId?: string
): Promise<VendorListResponse> => {
    let query = supabase
        .from('vendors')
        .select(
            `
            id,
            title,
            description,
            url,
            fetch,
            service:service_id (
                id,
                name,
                icon,
                slug,
                color,
                description
            )
            `,
            { count: 'exact' }
        )
        .order('id', { ascending: false }) // assuming recent = latest added by id
        .limit(limit);

    if (excludeId !== undefined) {
        query = query.not('id', 'eq', excludeId);
    }

    const { data, error } = await query as unknown as {
        data: Vendor[];
        error: PostgrestError | null;
        count: number | null;
    };

    return {
        data: data || [],
        totalPages: 1,
        currentPage: 1,
        error,
    };
};

// Fetch a single vendor by slug
export const fetchVendorBySlug = async (
    slug: string
): Promise<{ vendor: Vendor | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('vendors')
        .select(
            `
            id,
            title,
            description,
            url,
            fetch,
            service:service_id (
                id,
                name,
                icon,
                slug,
                color,
                description
            )
            `
        )
        .eq('slug', slug)
        .single<Vendor>();

    return {
        vendor: data ?? null,
        error,
    };
};

// Get all service categories
export async function getServiceCategories(): Promise<{
    services: Service[] | null;
    error: PostgrestError | null;
}> {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });

    return { services: data, error };
}
