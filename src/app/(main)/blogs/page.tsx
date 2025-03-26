import React from 'react';
import Hero from "./Hero";
import BlogList from "./BlogList";
import CategorySwitcher from "@/components/CategorySwitcher";
import { getBlogCategories, fetchBlogs, fetchRecentBlogs } from '@/lib/blogService';
import BlogCarousel from './BlogCarousel';
import { notFound } from "next/navigation";


export default async function Blogs({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
    const { category, page } = await searchParams;
    const { blogCategories, error } = await getBlogCategories();
    if (!blogCategories || error) return notFound();
    
    const blog_category = category || "all";
    const blog_page = parseInt(page || "1", 10);
    const { data: all_blogs, totalPages } = await fetchBlogs(
        blog_category !== "all" ? blog_category : null,
        blog_page
    );
    if (!all_blogs) return notFound();

    const { data: recent_blogs } = await fetchRecentBlogs(9);
    if (!recent_blogs) return notFound();

    return (
        <div className="flex h-full px-5 md:px-20 py-5 flex-col">
            {/* Hero Section with Featured Blogs */}
            <Hero featuredBlogs={recent_blogs} />
            <BlogCarousel featuredBlogs={recent_blogs} />

            {/* Blog List & Sidebar */}
            <div className="flex flex-col md:flex-row gap-10 mt-8">
                <div className="sticky top-14 max-h-[calc(100vh-5rem)] overflow-auto">
                    <CategorySwitcher
                        title="Categories"
                        items={blogCategories}
                        queryParam="category"
                        basePath="/blogs"
                    />
                </div>
                <div className="flex-1">
                    <BlogList blogs={all_blogs} totalPages={totalPages} />
                </div>
            </div>
        </div>
    )
}
