"use client";

import React, { useState } from "react";
import Link from "next/link";
import { resolveBlogImageUrl } from "../../../lib/caseStudyApi";

const DISPLAY_FONT = '"League Spartan", sans-serif';
const BODY_FONT = '"Montserrat", sans-serif';

export default function BlogListingGrid({
  blogs = [],
  emptyMessage = "No blogs found.",
  itemsPerPage = 6,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(blogs.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  if (!blogs.length) {
    return (
      <p
        className="py-10 text-center text-[16px] text-[#666]"
        style={{ fontFamily: BODY_FONT }}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleBlogs.map((blog) => {
          const image = resolveBlogImageUrl(blog.banner);
          return (
            <article
              key={blog.slug}
              className="flex h-full flex-col overflow-hidden rounded-[8px] border border-[#E3E0E0] bg-white"
            >
              <div className="relative h-[200px] w-full overflow-hidden bg-[#E8EBFF]">
                {image ? (
                  <img
                    src={image}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5 text-center">
                <h3
                  className="mb-4 text-[18px] font-semibold leading-snug text-[#1D1D1B]"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  {blog.title}
                </h3>
                <Link
                  href={`/${blog.slug}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#6ea2ee] px-5 py-2 text-[13px] font-semibold uppercase tracking-wide text-black"
                  style={{ fontFamily: BODY_FONT }}
                >
                  Read more <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {totalPages > 1 ? (
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          aria-label="Blog pages"
        >
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage <= 1}
            className="rounded-full bg-[#6ea2ee] px-5 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-[#666]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage >= totalPages}
            className="rounded-full bg-[#6ea2ee] px-5 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      ) : null}
    </>
  );
}
