import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { ClockIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 lg:px-8 w-full pt-32 pb-20">
        {/* BACK */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-600 transition-colors mb-10"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* META */}
        <div className="mb-8">
          <span className="text-green-600 text-xs font-semibold uppercase tracking-widest">
            {post.category}
          </span>
          <h1 className="title-font text-4xl lg:text-5xl mt-3 mb-5">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <ClockIcon className="w-4 h-4" />
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* HERO IMAGE PLACEHOLDER */}
        <div
          className={`${post.color} rounded-3xl h-56 lg:h-72 flex items-center justify-center mb-12`}
        >
          <span className="text-8xl">{post.emoji}</span>
        </div>

        {/* EXCERPT */}
        <p className="text-lg text-gray-500 leading-8 mb-10 font-medium border-l-4 border-green-500 pl-5">
          {post.excerpt}
        </p>

        {/* CONTENT */}
        <div className="space-y-8">
          {post.content.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-bold text-xl mb-3">{section.heading}</h2>
              )}
              <p className="text-gray-600 leading-8">{section.body}</p>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="border-t my-14" />

        {/* MORE POSTS */}
        {others.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-6">More from the blog</h3>
            <div className="space-y-4">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blogs/${other.slug}`}
                  className="flex items-center gap-4 border rounded-2xl p-4 hover:shadow-md transition-shadow group"
                >
                  <div
                    className={`${other.color} w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-2xl`}
                  >
                    {other.emoji}
                  </div>
                  <div className="min-w-0">
                    <span className="text-green-600 text-xs font-semibold uppercase tracking-wide">
                      {other.category}
                    </span>
                    <p className="font-semibold text-sm mt-0.5 group-hover:text-green-600 transition-colors truncate">
                      {other.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <ClockIcon className="w-3 h-3" />
                      <span>{other.readTime}</span>
                      <span>·</span>
                      <span>{other.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPostPage;
