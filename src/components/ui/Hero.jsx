"use client"
import Link from "next/link";
import { formatDate } from "../helpers/formatDate";
import truncateText from "../helpers/truncateText";

export default function Hero({ posts, loading }) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

      {loading ? (
        <>
          {/* Left — Skeleton Hero */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />
          </div>

          {/* Right — Skeleton Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl h-48 bg-gray-200 animate-pulse" />
            <div className="rounded-2xl h-48 bg-gray-200 animate-pulse" />
          </div>
        </>
      ) : (
        <>
          {/* LEFT — Large Featured Art Posts */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {posts.slice(0, 2).map((post) => (
              <div
                key={post._id}
                className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group"
              >
                <Link href={`/post/${post.slug}`}>
                  <img
                    src={post.thumbnail || "https://source.unsplash.com/1200x675/?art,design"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Soft artistic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                  {/* Text overlay */}
                  <div className="absolute bottom-0 p-6 text-white">
                    
                    <h2 className="text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-lg">
                      {truncateText(post.title, 70)}
                    </h2>

                    <p className="mt-2 text-sm md:text-base text-gray-200 max-w-xl drop-shadow md:block hidden">
                      {truncateText(post.excerpt, 120)}
                    </p>

                    <div className="mt-3 text-xs text-orange-300 font-semibold">
                      By {post.author} • {formatDate(post.createdAt)}
                    </div>

                    {/* Orange underline stroke */}
                    <div className="mt-3 w-20 h-[3px] bg-[#F97316] rounded-full"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* RIGHT — Small Featured Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {posts.slice(2, 5).map((post) => (
              <div
                key={post._id}
                className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] group"
              >
                <Link href={`/post/${post.slug}`}>
                  <img
                    src={post.thumbnail || "https://source.unsplash.com/600x450/?art,abstract"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-semibold leading-tight drop-shadow">
                      {truncateText(post.title, 50)}
                    </h3>

                    <div className="mt-2 w-16 h-[3px] bg-[#F97316] rounded-full"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom Ad or Banner Slot */}
      <div className="flex lg:col-span-12 justify-center mt-6">
        <div className="w-[970px] h-[50px] rounded-md flex items-center justify-center text-gray-400">
          {/* Ad Space */}
        </div>
      </div>

    </section>
  );
}
