"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { normalizeBlogItem, resolveBlogImageUrl, sortBlogsByDateDesc } from "../../../lib/caseStudyApi";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const POSTS_PER_PAGE = 8;

const latestHeadingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "46px",
  lineHeight: "69px",
  letterSpacing: "0px",
  color: "#000000",
};

const postCategoryStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  textTransform: "capitalize",
  color: "#000000",
};

const postTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "21.6px",
  letterSpacing: "0px",
  color: "#000000",
};

const postTakeawayStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16.8px",
  letterSpacing: "0.3px",
  color: "#00000099",
};

const postMetaStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16.1px",
  letterSpacing: "0px",
  color: "#919191",
};

const categoriesHeadingStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "17.6px",
  letterSpacing: "0px",
  color: "#000000",
};

const categoryTagStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16.1px",
  letterSpacing: "0px",
  textAlign: "center",
  color: "#000000",
};

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTakeaway(blog, maxLength = 90) {
  const text = stripHtml(blog?.description || "");
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

function getCategory(blog) {
  const keyword = String(blog?.meta_keywords || "")
    .split(",")
    .map((item) => item.trim())
    .find(Boolean);
  return keyword || "Blog";
}

function formatMetaLine(blog) {
  if (!blog?.created_at) return "Ritz Media World";
  const date = new Date(blog.created_at);
  if (Number.isNaN(date.getTime())) return "Ritz Media World";
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `Ritz Media World ${formatted}`;
}

function slugifyCategoryLink(name) {
  return String(name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapBlogToPost(blog) {
  return {
    slug: blog.slug,
    category: getCategory(blog),
    title: blog.title,
    takeaway: getTakeaway(blog),
    meta: formatMetaLine(blog),
    image: resolveBlogImageUrl(blog.banner) || "/blog/latest.png",
  };
}

function getVisiblePages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = [1];
  if (current > 3) pages.push("ellipsis");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

async function fetchAllBlogsClient() {
  const allBlogs = [];

  for (let page = 1; page <= 60; page += 1) {
    const response = await fetch(`/api/get_all_blogs?page=${page}`);
    if (!response.ok) break;
    const data = await response.json();
    const items = Array.isArray(data?.blogs) ? data.blogs : [];
    if (!items.length) break;
    allBlogs.push(...items.map(normalizeBlogItem));
    if (items.length < 10) break;
  }

  return sortBlogsByDateDesc(allBlogs);
}

function Section2Skeleton() {
  return (
    <section className={`${montserrat.className} bg-[#FAFAFA] pb-12 md:pb-16 lg:pb-20`}>
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
        <div className="h-12 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-5 sm:flex-row">
                <div className="h-[140px] w-full animate-pulse rounded-2xl bg-gray-200 sm:w-[240px]" />
                <div className="flex flex-1 flex-col gap-3">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
            <div className="mt-5 flex flex-wrap gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-10 w-28 animate-pulse rounded-[8px] bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Section2 = () => {
  const sectionRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [blogItems, categoriesResponse] = await Promise.all([
          fetchAllBlogsClient(),
          fetch("/api/blog/categories"),
        ]);

        if (!cancelled) {
          setBlogs(blogItems);
        }

        if (categoriesResponse.ok && !cancelled) {
          const data = await categoriesResponse.json();
          if (Array.isArray(data)) {
            setCategories(data.map((category) => category.name).filter(Boolean));
          }
        }
      } catch {
        if (!cancelled) {
          setBlogs([]);
          setCategories([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const latestPosts = useMemo(() => blogs.map(mapBlogToPost), [blogs]);

  const totalPages = Math.max(1, Math.ceil(latestPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const visiblePosts = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return latestPosts.slice(start, start + POSTS_PER_PAGE);
  }, [latestPosts, safePage]);

  const visiblePages = getVisiblePages(safePage, totalPages);
  const showPagination = latestPosts.length > POSTS_PER_PAGE;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPage = useCallback(
    (page) => {
      const nextPage = Math.min(Math.max(1, page), totalPages);
      setCurrentPage(nextPage);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [totalPages],
  );

  if (loading) {
    return <Section2Skeleton />;
  }

  return (
    <section
      ref={sectionRef}
      className={`${montserrat.className} bg-[#FAFAFA] pb-12 md:pb-16 lg:pb-20`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
        <h2
          className="m-0 text-[32px] leading-[48px] md:text-[40px] md:leading-[60px] lg:text-[46px] lg:leading-[69px]"
          style={latestHeadingStyle}
        >
          Latest
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-16 xl:gap-20">
          <div className="flex min-w-0 flex-col gap-10 xl:col-span-6 lg:col-span-8">
            {visiblePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="flex flex-col gap-5 no-underline sm:flex-row sm:items-start sm:gap-6 md:gap-8"
              >
                <div className="w-full shrink-0 sm:w-[200px] md:w-[240px] lg:w-[260px] xl:w-[280px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="block h-auto w-full rounded-2xl object-cover object-center"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col py-1 lg:py-2 xl:py-3">
                  <p className="m-0" style={postCategoryStyle}>
                    {post.category}
                  </p>

                  <h3
                    className="m-0 mt-2 line-clamp-1 md:line-clamp-1 lg:line-clamp-1 xl:line-clamp-1"
                    style={postTitleStyle}
                  >
                    {post.title}
                  </h3>

                  <p className="m-0 mt-3 line-clamp-1 md:line-clamp-2 lg:line-clamp-2 xl:line-clamp-2" style={postTakeawayStyle}>
                    {post.takeaway}
                  </p>

                  <p className="m-0 mt-2 lg:mt-4" style={postMetaStyle}>
                    {post.meta}
                  </p>
                </div>
              </Link>
            ))}

            {showPagination ? (
              <nav
                aria-label="Blog pagination"
                className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
              >
                {visiblePages.map((page, index) =>
                  page === "ellipsis" ? (
                    <span
                      key={`ellipsis-${index}`}
                      aria-hidden
                      className="inline-flex h-10 min-w-10 cursor-default items-center justify-center rounded-md border border-[#000000] bg-transparent px-3 text-[14px] font-normal leading-none text-[#000000]"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      aria-current={page === safePage ? "page" : undefined}
                      className={`inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-[14px] font-normal leading-none transition-opacity hover:opacity-70 ${
                        page === safePage
                          ? "border-[#0D1334] bg-[#0D1334] text-white"
                          : "border-[#000000] bg-transparent text-[#000000]"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className="inline-flex h-10 items-center justify-center gap-1 rounded-md border border-[#000000] bg-transparent px-4 text-[14px] font-normal leading-none text-[#000000] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <i className="ri-arrow-right-s-line text-[16px]" aria-hidden />
                </button>
              </nav>
            ) : null}
          </div>

          <aside className="min-w-0 xl:col-span-6 lg:col-span-4">
            <p className="m-0" style={categoriesHeadingStyle}>
              Categories
            </p>

            <div className="mt-4 h-px w-full bg-[#D9D9D9]" />

            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${slugifyCategoryLink(category)}`}
                  className="inline-flex items-center justify-center rounded-[8px] border border-[#D9D9D9] px-4 py-2 no-underline transition-opacity hover:opacity-70"
                  style={categoryTagStyle}
                >
                  {category}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Section2;
