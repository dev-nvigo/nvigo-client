import AuthorInfo from "./AuthorInfo";
import Cards from "@/components/ui/cards";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import supabase from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import { fetchBlogBySlug, fetchRecentBlogs } from "@/lib/blogService";
import { formatDate } from '@/utils/formatDate';
import { BLOGS } from "@/components/ConstantLinks";
import Image from "next/image";
import Subscribe from "@/components/Subscribe";
import { Metadata } from "next";


export const dynamic = "force-static";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;

    const { data: blog } = await supabase
        .from("blog_posts")
        .select("title, excerpt")
        .eq("slug", slug)
        .single();

    if (!blog) return {};

    return {
        title: blog.title,
        description: blog.excerpt,
    };
}


const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const { blog, error } = await fetchBlogBySlug(slug);
    if (!blog || error) return notFound();
    if (!blog) return <p>Loading...</p>;

    const { data: recent_blogs } = await fetchRecentBlogs(9, blog.id);

    return (
        <div className="flex flex-col items-center px-10 py-10">
            {/* Blog Header */}
            <div className="max-w-6xl w-full flex flex-col gap-4">
                {/* Author & Date */}
                <div className="flex items-center gap-3">
                    <div className="w-1/2 max-w-[4rem] aspect-square rounded-full overflow-hidden bg-gray-800">
                        <Image
                            src={`/images/authors/${blog.author.avatar}`}
                            alt={blog.author.name}
                            layout="responsive"
                            width={1}
                            height={1}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-c-green-0 text-lg !font-circular font-bold">
                            {blog.author.name}
                        </p>
                        <p className="text-c-white-700 text-sm !font-circular-book">
                            Posted on {formatDate(blog.date)}
                        </p>
                    </div>
                </div>

                {/* Blog Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-[#232536] !font-circular leading-tight">
                    {blog.title}
                </h1>

                {/* Category Tag */}
                <div
                    className="px-3 py-1 rounded-lg inline-flex justify-start items-start w-fit"
                    style={{ backgroundColor: blog.category.color }}
                >
                    <span className="text-black text-xs md:text-base !font-circular-book font-bold tracking-wide">
                        #{blog.category.name}
                    </span>
                </div>
                <div className="relative w-full aspect-[5/2] mt-4 rounded-lg overflow-hidden">
                    <Image
                        src={`/images/blogs/${blog.slug}.jpg`}
                        alt={blog.title}
                        fill
                        className="object-cover object-center"
                    />
                </div>
            </div>

            {/* Blog Content */}
            <div className="flex flex-col item-center md:flex-row max-w-6xl w-full gap-8 mt-10">
                <div className="flex-1 prose prose-lg prose-invert">
                    {/* <BlogContent content={blog.content} /> */}
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </div>
                <div className="md:w-85">
                    <AuthorInfo author={blog.author} />
                </div>
            </div>

            {/* Related Blogs */}
            <div className="max-w-6xl w-full mt-16">
                <h2 className="text-4xl !font-circular font-bold text-c-white-800 mb-6">
                    What To Read Next
                </h2>
                <Cards cards={recent_blogs} basePath={BLOGS} className="overflow-x-auto whitespace-nowrap px-4 py-2 flex gap-6" cardClassName="w-[min(80vw,20rem)] flex-shrink-0" />
            </div>
            {/* Newsletter Section */}
            <div className="max-w-6xl w-full mt-16">
                <Subscribe isNewsletter={true} />
            </div>
        </div>
    );
};

export default BlogPostPage;
