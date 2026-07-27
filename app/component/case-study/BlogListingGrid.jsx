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
              <div className="relative flex w-full items-center justify-center bg-[#E8EBFF] md:h-[243px] md:overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={blog.title}
                    className="h-auto w-full object-contain md:h-full md:max-h-[243px]"
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-auto inline-flex cursor-pointer items-center gap-2 self-center overflow-hidden rounded-full bg-white py-2.5 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#1D1D1B] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <span className="relative z-10 font-league-spartan text-[12px] font-medium uppercase tracking-[0.08em] text-[#1D1D1B] transition-colors duration-300 group-hover:text-white md:text-[14px]">
                    Read more
                  </span>
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white transition-[background-color,color,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-[#1D1D1B] md:h-9 md:w-9">
                    <i className="ri-arrow-right-up-line text-[14px] md:text-[16px]" aria-hidden />
                  </span>
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
            className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white py-2.5 pl-2 pr-5 shadow-[0_6px_24px_rgba(0,0,0,0.22)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:gap-2.5 md:py-2 md:pl-2 md:pr-6"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#1D1D1B] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white transition-[background-color,color,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45 group-hover:bg-white group-hover:text-[#1D1D1B] md:h-9 md:w-9">
              <i className="ri-arrow-left-line text-[14px] md:text-[16px]" aria-hidden />
            </span>
            <span className="relative z-10 font-league-spartan text-[12px] font-medium uppercase tracking-[0.08em] text-[#1D1D1B] transition-colors duration-300 group-hover:text-white md:text-[14px]">
              Previous
            </span>
          </button>
          <span className="text-sm text-[#666]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage >= totalPages}
            className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white py-2.5 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#1D1D1B] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <span className="relative z-10 font-league-spartan text-[12px] font-medium uppercase tracking-[0.08em] text-[#1D1D1B] transition-colors duration-300 group-hover:text-white md:text-[14px]">
              Next
            </span>
            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white transition-[background-color,color,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-[#1D1D1B] md:h-9 md:w-9">
              <i className="ri-arrow-right-up-line text-[14px] md:text-[16px]" aria-hidden />
            </span>
          </button>
        </nav>
      ) : null}
    </>
  );
}
