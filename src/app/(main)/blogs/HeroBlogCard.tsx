import Image from "next/image";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/api/blog";
import { formatDate } from '@/utils/format';
import TrackerLink from "@/components/TrackerLink";


interface HeroBlogCardProps {
    blog: BlogPost;
    size?: "large" | "small"; // Determines layout style
}

const HeroBlogCard: React.FC<HeroBlogCardProps> = ({ blog, size = "large" }) => {
    return (
        <TrackerLink
            action="card-click" category="Blogs" label={blog.slug}
            className={cn(
                "relative block cursor-pointer transition-transform hover:scale-[1.02] rounded-lg overflow-hidden",
                size === "large" ? "w-full aspect-[4/3]" : "w-full aspect-[3/5] md:aspect-[4/3]"
            )}
            href={`/blogs/${blog.slug}`}
        >
            {/* Blog Image */}
            <Image
                src={`/images/blogs/${blog.slug}.jpg`}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none"></div>

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                <span className={cn(
                "uppercase text-[#16B57F]  !font-circular font-bold",
                size === "large" ? "text-lg" : "text-sm"
            )}>
                    #{blog.category.name}
                </span>
                <h2 className={cn(
                "leading-tight !font-circular font-bold",
                size === "large" ? "text-2xl" : "text-lg"
            )}>{blog.title}</h2>
                <p className={cn(
                "text-white opacity-80 !font-circular-book",
                size === "large" ? "text-lg" : "text-xs"
            )}>
                    {blog.author.name} - {formatDate(blog.date)}
                </p>
            </div>
        </TrackerLink>
    );
};


export default HeroBlogCard;
