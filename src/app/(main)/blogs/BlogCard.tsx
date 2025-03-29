import { BlogPost } from "@/lib/blogService";
import Image from "next/image";
import TrackerLink from "@/components/TrackerLink";
import { BLOGS } from "@/components/ConstantLinks";
import { formatDate } from '@/utils/formatDate';

interface BlogCardProps {
    blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    
    return (
        <TrackerLink
            className="relative flex flex-col md:flex-row gap-4 p-4 md:p-2 bg-white rounded-lg cursor-pointer transition-transform  shadow-md md:shadow-none hover:scale-[1.02] hover:shadow-lg"
            href={`${BLOGS}/${blog.slug}`} action="card-click" label={blog.slug} category="Blogs"
        >
            {/* Blog Image - Square Crop */}
            <div className="relative w-full md:w-[20vw] md:max-w-[12rem] h-auto aspect-[5/3] md:aspect-square overflow-hidden rounded-lg">
                <Image
                    src={`/images/blogs/${blog.slug}.jpg`}
                    alt={blog.title}
                    fill
                    className="object-cover object-center w-full h-full"
                />
            </div>

            {/* Blog Content */}
            <div className="flex flex-col justify-center">
                <div
                    className="px-3 py-1 rounded-lg inline-flex justify-start items-start w-fit mb-2"
                    style={{ backgroundColor: blog.category.color }}
                >
                    <span className="text-black text-base !font-circular-book font-bold tracking-wide">
                        #{blog.category.name}
                    </span>
                </div>

                {/* Blog Title */}
                <h2 className="text-[#232536] text-xl font-bold leading-snug !font-circular">
                    {blog.title}
                </h2>

                {/* Blog Description */}
                <p className="text-[#6D6E76] text-base leading-snug !font-circular-book">
                    {blog.excerpt}
                </p>

                {/* Author & Date */}
                <p className="text-[#718096] text-sm mt-2 !font-circular-book">
                    {blog.author.name} | {formatDate(blog.date)}
                </p>
            </div>
        </TrackerLink>
    );
};

export default BlogCard;
