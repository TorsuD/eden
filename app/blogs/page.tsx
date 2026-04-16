import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import { posts } from "./data";

const BlogPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full pt-32 pb-20">
        {/* HEADER */}
        <div className="mb-16">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            The Eden Blog
          </p>
          <h1 className="title-font text-5xl lg:text-6xl">
            Grow your <span className="text-green-600">knowledge</span>.
          </h1>
          <p className="text-gray-500 mt-5 max-w-xl leading-7">
            Tips, guides, and stories for plant lovers at every level. From
            beginner basics to advanced care — there&apos;s something here for
            everyone.
          </p>
        </div>

        {/* FEATURED POST */}
        <Link href={`/blogs/${posts[0].slug}`} className="block">
          <div className="bg-muted rounded-3xl p-8 lg:p-12 mb-12 grid lg:grid-cols-2 gap-8 items-center hover:shadow-md transition-shadow">
            <div>
              <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
              <h2 className="title-font text-green-600 text-3xl lg:text-4xl mt-4 mb-4">
                {posts[0].title}
              </h2>
              <p className="text-gray-400 leading-7 mb-6">{posts[0].excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <ClockIcon className="w-4 h-4" />
                <span>{posts[0].readTime}</span>
                <span>·</span>
                <span>{posts[0].date}</span>
              </div>
            </div>
            <div className="bg-green-200 rounded-2xl h-56 lg:h-72 flex items-center justify-center">
              <span className="text-6xl">{posts[0].emoji}</span>
            </div>
          </div>
        </Link>

        {/* POST GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div
                className={`${post.color} h-40 flex items-center justify-center`}
              >
                <span className="text-5xl">{post.emoji}</span>
              </div>
              <div className="p-6">
                <span className="text-green-600 text-xs font-semibold uppercase tracking-wide">
                  {post.category}
                </span>
                <h3 className="font-bold text-lg mt-2 mb-2 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                  <ClockIcon className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
