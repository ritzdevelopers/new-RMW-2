"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { resolveBlogImageUrl, slugifyTag } from "../../../lib/caseStudyApi";

const PREVIEW_COUNT = 6;

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SidebarCard({ title, children }) {
  return (
    <div className="relative w-full rounded-[8px] border border-[#E3E0E0] pt-0 xl:rounded-[10px]">
      <div className="absolute -top-5 left-1/2 flex w-[140px] -translate-x-1/2 items-center justify-center bg-white text-center sm:w-[170px] xl:-top-6">
        <p
          className="text-[16px] font-semibold sm:text-[18px] xl:text-[20px]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

function RelatedItem({ blog }) {
  const image = resolveBlogImageUrl(blog.banner);
  return (
    <Link
      href={`/${blog.slug}`}
      title={blog.title}
      className="group -m-2 flex w-full cursor-pointer items-start justify-start gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-gray-50/80 sm:gap-4"
    >
      <div className="relative h-[52px] w-[80px] shrink-0 overflow-hidden rounded-[2px] sm:h-[60px] sm:w-[92px] xl:h-[69px] xl:w-[108px]">
        {image ? (
          <img src={image} alt={blog.title} title={blog.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-[#E8EBFF]" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 text-left sm:gap-2">
        <p
          className="line-clamp-2 text-[13px] font-semibold text-[#000000] group-hover:text-[#0F1640] sm:text-[14px] xl:text-[16px]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          {blog.title}
        </p>
        <p
          className="text-[11px] font-normal text-[#535353] sm:text-[12px]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          {formatDate(blog.created_at)}
        </p>
      </div>
    </Link>
  );
}

export default function CaseStudySidebar({
  allBlogs = [],
  categories = [],
  keywords = [],
  relatedBlogs = [],
}) {
  const [searchValue, setSearchValue] = useState("");
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [keywordsExpanded, setKeywordsExpanded] = useState(false);

  const filteredBlogs = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return [];
    return allBlogs
      .filter((blog) => blog.title?.toLowerCase().includes(query))
      .slice(0, 5);
  }, [allBlogs, searchValue]);

  const visibleCategories = categoriesExpanded
    ? categories
    : categories.slice(0, PREVIEW_COUNT);

  const visibleKeywords = keywordsExpanded
    ? keywords
    : keywords.slice(0, PREVIEW_COUNT);

  return (
    <aside className="flex w-full flex-col gap-8 sm:gap-10 lg:gap-12 xl:gap-14">
      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-[8px] bg-[#F5F5F5] px-3 py-5 text-center sm:gap-4 sm:px-4 sm:py-6 xl:rounded-[10px] xl:py-8">
        <p
          className="text-[16px] font-semibold sm:text-[18px] xl:text-[20px]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Search
        </p>
        <div className="h-[1px] w-full bg-[#E5E4E3]" />
        <div className="flex h-[42px] w-full items-center gap-3 rounded-full border border-[#ffffff] bg-white px-3 transition-shadow focus-within:border-[#0F1640]/40 focus-within:ring-2 focus-within:ring-[#0F1640]/10 xl:h-[46px]">
          <i className="ri-search-line shrink-0 text-[20px] text-[#484848] xl:text-[22px]" aria-hidden />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search blogs ..."
            className="h-full flex-1 bg-transparent text-[13px] font-normal text-[#484848] outline-none placeholder:text-[#484848] xl:text-[14px]"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          />
        </div>
        {filteredBlogs.map((blog) => (
          <RelatedItem key={blog.slug} blog={blog} />
        ))}
      </div>

      <SidebarCard title="Categories">
        <div className="flex w-full flex-col gap-3 p-5 sm:gap-4 sm:p-7 xl:p-10">
          {visibleCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.link}`}
              title={category.name}
              className="-mx-2 -my-1 flex w-full cursor-pointer justify-between rounded border-b border-[#F0F0F0] px-2 py-1 pb-4 transition-colors duration-200 hover:bg-gray-50/80"
            >
              <div className="flex items-center gap-2">
                <div className="h-[7px] w-[7px] rounded-full border border-[#5E5E5E]" />
                <p
                  className="text-[12px] font-normal text-[#484848] sm:text-[13px] xl:text-[14px]"
                  style={{ fontFamily: '"Montserrat", sans-serif' }}
                >
                  {category.name}
                </p>
              </div>
              <p
                className="text-[12px] font-normal text-[#969696] sm:text-[13px] xl:text-[14px]"
                style={{ fontFamily: '"Montserrat", sans-serif' }}
              >
                ({category.total_blogs})
              </p>
            </Link>
          ))}
          {categories.length > PREVIEW_COUNT ? (
            <button
              type="button"
              onClick={() => setCategoriesExpanded((prev) => !prev)}
              className="self-start text-[12px] font-semibold text-[#0F1640] hover:underline sm:text-[13px] xl:text-[14px]"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              {categoriesExpanded ? "Show less" : "Show more"}
            </button>
          ) : null}
        </div>
      </SidebarCard>

      <SidebarCard title="Tags">
        <div className="flex w-full flex-col gap-3 p-4 sm:p-5 xl:p-7">
          <div className="flex w-full flex-wrap gap-2 sm:gap-3 xl:gap-4">
            {visibleKeywords.map((keyword, index) => (
              <Link
                key={`${keyword}-${index}`}
                href={`/tags?keyword=${slugifyTag(keyword)}`}
                title={keyword}
                className="flex items-center justify-center rounded-[50px] border border-[#F0F0F0] px-4 py-1.5 text-center transition-colors duration-200 hover:border-[#0F1640]/40 hover:bg-[#0F1640]/5 sm:px-5 sm:py-2 xl:px-5"
              >
                <p
                  className="text-[12px] font-normal text-[#484848] sm:text-[13px] xl:text-[14px]"
                  style={{ fontFamily: '"Montserrat", sans-serif' }}
                >
                  {keyword}
                </p>
              </Link>
            ))}
          </div>
          {keywords.length > PREVIEW_COUNT ? (
            <button
              type="button"
              onClick={() => setKeywordsExpanded((prev) => !prev)}
              className="self-start text-[12px] font-semibold text-[#0F1640] hover:underline sm:text-[13px] xl:text-[14px]"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              {keywordsExpanded ? "Show less" : "Show more"}
            </button>
          ) : null}
        </div>
      </SidebarCard>

      {/* <SidebarCard title="Related Blogs">
        <div className="flex w-full flex-col gap-3 p-4 sm:gap-4 sm:p-5 xl:p-7">
          {relatedBlogs.map((blog) => (
            <RelatedItem key={blog.slug} blog={blog} />
          ))}
        </div>
      </SidebarCard> */}
    </aside>
  );
}
