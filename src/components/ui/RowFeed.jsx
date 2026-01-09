"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import truncateText from "../helpers/truncateText";

const RowFeed = ({ feedName, posts = [], popularPosts = [], loading }) => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedArticles, setPaginatedArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;

  function categoryBadgeClass(category = "") {
    switch (category.toLowerCase()) {
      case "art-design":
        return "bg-yellow-500";
      case "photography":
        return "bg-purple-600";
      default:
        return "bg-gray-400";
    }
  }

  function toggleBookmark(id) {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function handleShare(e, post) {
    e.stopPropagation();
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/post/${post.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        });
      } catch (err) {
        console.log(err);
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      window.alert("Link copied to clipboard");
    }
  }

  useEffect(() => {
    if (!posts.length) return;

    const total = Math.ceil(posts.length / perPage);
    setTotalPages(total);

    const paginated = posts.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
    setPaginatedArticles(paginated);
  }, [posts, currentPage, loading]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN – FEED */}
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-bold mb-6 capitalize">
            All {feedName && feedName} Posts
          </h2>

          <div className="space-y-6">
            {!loading && paginatedArticles.length > 0 ? (
              paginatedArticles.map((post) => (
                <article
                  key={post._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/post/${post.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      router.push(`/post/${post.slug}`);
                  }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden flex flex-col md:flex-row"
                >
                  {/* IMAGE */}
                  <div className="md:w-1/3 w-full h-52 md:h-60">
                    <img
                      src={post.thumbnail || "https://source.unsplash.com/600x400/?news"}
                      className="w-full h-full object-cover"
                      alt={post.title}
                      loading="lazy"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col justify-between md:w-2/3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded text-white ${categoryBadgeClass(
                            post.category
                          )}`}
                        >
                          {post?.category === "finance" ? "personal-finance" : post.category}
                        </span>

                        {/* {post.sponsored && (
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                            Sponsored
                          </span>
                        )} */}
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-slate-900 leading-tight">
                        {truncateText(post.title, 55)}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {truncateText(post.excerpt, 100)}
                      </p>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <div>
                        By {post.author} • {post.readTime}
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Bookmark */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(post._id);
                          }}
                          className="p-1 rounded hover:bg-gray-100 transition"
                        >
                          {bookmarked[post._id] ? (
                            <svg className="h-5 w-5 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5 2a2 2 0 00-2 2v13l7-4 7 4V4a2 2 0 00-2-2H5z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"/>
                            </svg>
                          )}
                        </button>

                        {/* Share */}
                        <button
                          onClick={(e) => handleShare(e, post)}
                          className="p-1 rounded hover:bg-gray-100 transition"
                        >
                          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 10-2.83-4H9a3 3 0 100 6h3.17A3 3 0 1015 8zM8 20v-2a2 2 0 012-2h4"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              !loading && (
                <p className="text-gray-500 text-center py-10">No posts available.</p>
              )
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-[#F97316] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR – POPULAR POSTS */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Popular Posts
            </h3>

            <div className="space-y-4">
              {popularPosts?.length > 0 ? (
                popularPosts.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => router.push(`/post/${p.slug}`)}
                    className="cursor-pointer group"
                  >
                    <p className="text-sm font-medium text-slate-800 group-hover:text-[#F97316] transition leading-snug">
                      {truncateText(p.title, 70)}
                    </p>
                    <span className="text-xs text-slate-500">{p.readTime}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No popular posts found.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default RowFeed;
