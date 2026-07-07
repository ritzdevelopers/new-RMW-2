"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { normalizeBlogItem, resolveBlogImageUrl, sortBlogsByDateDesc } from "../../../lib/caseStudyApi";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const categoryStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  textTransform: "capitalize",
  color: "#000000CC",
};

const featuredTitleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  letterSpacing: "0",
  color: "#000000",
};

const excerptStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0",
  color: "#000000CC",
};

const authorStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#00000099",
};

const gridTitleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "26px",
  letterSpacing: "0",
  color: "#000000",
};

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(blog, maxLength = 150) {
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

function formatAuthorLine(blog) {
  if (!blog?.created_at) return "Ritz Media World";
  const date = new Date(blog.created_at);
  if (Number.isNaN(date.getTime())) return "Ritz Media World";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function mapBlogToPost(blog) {
  return {
    slug: blog.slug,
    category: getCategory(blog),
    title: blog.title,
    excerpt: getExcerpt(blog),
    author: formatAuthorLine(blog),
    image: resolveBlogImageUrl(blog.banner) || "/blog/Mobile.jpg",
  };
}

function Section1Skeleton() {
  return (
    <>
      <div className={`${montserrat.className} bg-white`}>
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 py-10 sm:px-10 md:px-[50px] md:py-12">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <section className={`${montserrat.className} bg-[#FAFAFA] py-12 md:py-16 lg:py-20`}>
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16">
            <div className="h-[280px] w-full animate-pulse rounded-2xl bg-gray-200 lg:w-[52%] xl:w-[55%]" />
            <div className="flex w-full flex-col gap-4 lg:w-[48%] xl:w-[45%]">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-20 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:mt-20 xl:gap-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-auto min-h-[160px] w-full animate-pulse rounded-2xl bg-gray-200" />
                <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const Section1 = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadBlogs() {
      try {
        const response = await fetch("/api/get_all_blogs?page=1");
        if (!response.ok) throw new Error(String(response.status));
        const data = await response.json();
        const items = Array.isArray(data?.blogs) ? data.blogs : [];
        if (!cancelled) {
          setBlogs(sortBlogsByDateDesc(items.map(normalizeBlogItem)));
        }
      } catch {
        if (!cancelled) setBlogs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

  const { featuredPost, gridPosts } = useMemo(() => {
    if (!blogs.length) {
      return { featuredPost: null, gridPosts: [] };
    }

    const posts = blogs.map(mapBlogToPost);
    return {
      featuredPost: posts[0],
      gridPosts: posts.slice(1, 4),
    };
  }, [blogs]);

  if (loading) {
    return <Section1Skeleton />;
  }

  if (!featuredPost) {
    return null;
  }

  return (
    <>
      <div className={`${montserrat.className} bg-white`}>
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 py-10 sm:px-10 md:px-[50px] md:py-12">
          <button
            type="button"
            aria-label="Search blog posts"
            className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-[#000000] transition-opacity duration-300 hover:opacity-70"
          >
            <i className="ri-search-line text-[18px] md:text-[20px]" aria-hidden />
            <span className="text-[16px] font-normal leading-none md:text-[18px]">Search</span>
          </button>
        </div>
      </div>

      <section className={`${montserrat.className} bg-[#FAFAFA] py-12 md:py-16 lg:py-20`}>
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
          <Link
            href={`/${featuredPost.slug}`}
            className="flex flex-col gap-8 no-underline lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16"
          >
            <div className="w-full min-w-0 lg:w-[52%] xl:w-[55%]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="block h-auto w-full rounded-2xl object-contain object-center"
              />
            </div>

            <div className="flex w-full min-w-0 flex-col lg:w-[48%] xl:w-[45%] lg:py-5">
              <p className="m-0" style={categoryStyle}>
                {featuredPost.category}
              </p>

              <h1
                className="m-0 mt-3 text-[24px] leading-[32px] sm:leading-[36px] line-clamp-1 md:line-clamp-2 lg:line-clamp-1 md:text-[36px] lg:leading-[36px] xl:line-clamp-none"
                style={featuredTitleStyle}
              >
                {featuredPost.title}
              </h1>

              <p className="m-0 mt-4 sm:mt-5" style={excerptStyle}>
                {featuredPost.excerpt}
              </p>

              <p className="m-0 mt-auto pt-4 lg:pt-4 xl:pt-10" style={authorStyle}>
                {featuredPost.author}
              </p>
            </div>
          </Link>

          <div className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:mt-20 xl:gap-10">
            {gridPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="flex flex-col no-underline"
              >
                <p className="m-0" style={categoryStyle}>
                  {post.category}
                </p>

                <div className="mt-3 overflow-hidden rounded-2xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="block h-auto w-full object-contain object-center"
                  />
                </div>

                <h2 className="m-0 mt-4 line-clamp-1 lg:line-clamp-1" style={gridTitleStyle}>
                  {post.title}
                </h2>

                <p className="m-0 mt-3 line-clamp-2 md:line-clamp-2 lg:line-clamp-2" style={excerptStyle}>
                  {post.excerpt}
                </p>

                <p className="m-0 mt-4" style={authorStyle}>
                  {post.author}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Section1;
