import supabase from "@/lib/supabaseClient";
import type { PostgrestError } from '@supabase/supabase-js';


export type BlogCategory = {
    id: number;
    name: string;
    icon: string;
    slug: string;
    color: string;
    description?: string | null;
};

export type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    slug: string;
    author: {
        id: number;
        name: string;
        avatar: string;
        bio: string;
    };
    category: BlogCategory;
};

type BlogListResponse = {
    data: BlogPost[];
    totalPages: number;
    currentPage: number;
    error?: PostgrestError | null;
};

// Fetch all blogs (optionally by category, paginated)
export const fetchBlogs = async (
    category: string | null = null,
    page: number = 1,
    limit: number = 5
): Promise<BlogListResponse> => {
    const offset = (page - 1) * limit;

    let query = supabase
        .from('blog_posts')
        .select(
            `
        id,
        title,
        excerpt,
        content,
        date,
        slug,
        author:author_id (
            id,
            name,
            avatar,
            bio
        ),
        category:category_id (
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
        .order('date', { ascending: false });

    const { data: categoryData } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', category)
        .single();

    if (categoryData) {
        query = query.eq('category_id', categoryData.id);
    }


    const { data, count, error } = await query as unknown as {
        data: BlogPost[];
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

// Fetch the 5 most recent blog posts
export const fetchRecentBlogs = async (
    limit: number = 5,
    excludeId?: string
): Promise<BlogListResponse> => {
    let query = supabase
        .from('blog_posts')
        .select(
            `
            id,
            title,
            excerpt,
            content,
            date,
            slug,
            author:author_id (
                id,
                name,
                avatar,
                bio
            ),
            category:category_id (
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
        .order('date', { ascending: false })
        .limit(limit);

    if (excludeId !== undefined) {
        query = query.not('id', 'eq', excludeId);
    }

    const { data, error } = await query as unknown as {
        data: BlogPost[];
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

// Fetch single blog by slug
export const fetchBlogBySlug = async (
    slug: string
): Promise<{ blog: BlogPost | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select(
            `
        id,
        title,
        excerpt,
        content,
        date,
        slug,
        author:author_id (
            id,
            name,
            avatar,
            bio
        ),
        category:category_id (
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
        .single<BlogPost>();

    return {
        blog: data ?? null,
        error,
    };
};

export async function getBlogCategories(): Promise<{
    blogCategories: BlogCategory[] | null;
    error: PostgrestError | null;
}> {
    const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("id", { ascending: true });

    return { blogCategories: data, error };
}
