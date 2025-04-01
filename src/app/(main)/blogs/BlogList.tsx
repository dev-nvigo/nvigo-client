import BlogCard from "./BlogCard";
import Pagination from "@/components/ui/pagination";
import { BlogPost } from "@/lib/api/blog";


export const dynamic = "force-static";

export default async function BlogList({ blogs, totalPages }: { blogs: BlogPost[]; totalPages: number }) {

    return (
        <div className="flex flex-col gap-2 w-full">
            {blogs.length === 0 ? (
                <p className="text-center text-gray-500">No blogs found.</p>
            ) : (
                blogs.map((blog: BlogPost) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))
            )}
            <Pagination
                totalPages={totalPages}
                basePath="/blogs"
                scrollBehavior={false}
            />
        </div>
    );
}
