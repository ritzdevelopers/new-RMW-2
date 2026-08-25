"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Montserrat, Inter } from "next/font/google";
import { resolveBlogImageUrl } from "../../../lib/caseStudyApi";
import { formatBlogDate } from "../../../lib/formatBlogDate";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const sectionTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  letterSpacing: "0px",
  color: "#000000",
};

const tabStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#000000",
};

const postCategoryStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  textTransform: "capitalize",
  color: "#00000099",
};

const featuredTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "22px",
  lineHeight: "26.4px",
  letterSpacing: "0px",
  color: "#000000",
};

const featuredExcerptStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19.2px",
  letterSpacing: "0.3px",
  color: "#5C5757",
};

const featuredAuthorStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16.1px",
  letterSpacing: "0px",
  color: "#919191",
};

const listCategoryStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  textTransform: "capitalize",
  color: "#001D33",
};

const listTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  letterSpacing: "0px",
  color: "#000000",
};

const listAuthorStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.8px",
  letterSpacing: "0px",
  color: "#919191",
};

const sidebarTitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  letterSpacing: "0px",
  color: "#FFFFFF",
};

const sidebarBodyStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "24px",
  letterSpacing: "0px",
  color: "#FFFFFF",
};

const sidebarButtonStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "23px",
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

function getExcerpt(blog, maxLength = 120) {
  const text = stripHtml(blog?.description || "");
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

function formatAuthorLine(blog) {
  const formatted = formatBlogDate(blog?.created_at);
  return formatted || "Ritz Media World";
}

function mapBlogToSection4Post(blog, categoryName) {
  return {
    slug: blog.slug,
    category: categoryName,
    title: blog.title,
    excerpt: getExcerpt(blog),
    author: formatAuthorLine(blog),
    image: resolveBlogImageUrl(blog.banner) || "/blog/vector-1.png",
  };
}

const Section4 = ({ categories = [], blogsByCategory = {} }) => {
  const [activeCategoryLink, setActiveCategoryLink] = useState(
    () => categories[0]?.link || "",
  );

  const blogs = blogsByCategory[activeCategoryLink] || [];

  const activeCategoryName =
    categories.find((category) => category.link === activeCategoryLink)?.name || "";

  const { featuredPost, listPosts } = useMemo(() => {
    const posts = blogs.map((blog) => mapBlogToSection4Post(blog, activeCategoryName));
    return {
      featuredPost: posts[0] || null,
      listPosts: posts.slice(1, 4),
    };
  }, [blogs, activeCategoryName]);

  return (
    <section className={`${montserrat.className} py-[35px] md:py-[70px]`}>
      <div className="mx-auto w-full max-w-8xl px-8 md:px-12">
        <h2
          className="m-0 text-[22px] leading-[32px] md:text-[32px] md:leading-[48px] lg:text-[46px] lg:leading-[69px] text-[#000000]"
          style={sectionTitleStyle}
        >
          Marketing Insights & Trends
        </h2>

        <div className="mt-6 pb-4 md:mt-8">
          <div className="inline-flex max-w-full flex-wrap gap-x-6 gap-y-3 border-b border-[#D9D9D9] pb-4 md:gap-x-8 lg:gap-x-10">
            {categories.map((category) => (
              <button
                key={category.link}
                type="button"
                onClick={() => setActiveCategoryLink(category.link)}
                className="cursor-pointer border-0 bg-transparent p-0 transition-opacity hover:opacity-70"
                style={tabStyle}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-15 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6">
          {featuredPost ? (
            <>
              <Link
                href={`/${featuredPost.slug}`}
                title={featuredPost.title}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start no-underline lg:col-span-3"
              >
                <div className="w-[340px] max-w-full">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl xl:aspect-auto xl:h-[200px]">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      title={featuredPost.title}
                      className="block h-full w-full object-cover"
                    />
                  </div>

                  <p className="m-0 mt-3" style={postCategoryStyle}>
                    {featuredPost.category}
                  </p>

                  <h3 className="m-0 mt-2 lg:line-clamp-2 xl:line-clamp-none" style={featuredTitleStyle}>
                    {featuredPost.title}
                  </h3>

                  <p className="m-0 mt-2 lg:line-clamp-3 xl:line-clamp-none" style={featuredExcerptStyle}>
                    {featuredPost.excerpt}
                  </p>

                  <p className={`m-0 mt-3 ${inter.className}`} style={featuredAuthorStyle}>
                    {featuredPost.author}
                  </p>
                </div>
              </Link>

              <div className="flex flex-col lg:col-span-5 xl:pl-[60px]">
                <div className="flex w-full max-w-full flex-col">
                  {listPosts.map((post, index) => (
                    <Link
                      key={post.slug}
                      href={`/${post.slug}`}
                      title={post.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col gap-3 no-underline sm:flex-row sm:gap-4 ${index > 0 ? "mt-10 border-t border-[#D9D9D9] pt-10" : ""}`}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg sm:aspect-auto sm:h-[120px] sm:w-[160px] sm:shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          title={post.title}
                          className="block h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1 lg:py-4 xl:py-4">
                        <p className="m-0" style={listCategoryStyle}>
                          {post.category}
                        </p>

                        <h3
                          className="m-0 mt-2 text-[19px] leading-[21.8px] sm:text-[14px] sm:leading-[16.8px]"
                          style={listTitleStyle}
                        >
                          {post.title}
                        </h3>

                        <p className="m-0 mt-3" style={listAuthorStyle}>
                          {post.author}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="m-0 text-[16px] text-[#666] lg:col-span-8">No blogs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section4;
