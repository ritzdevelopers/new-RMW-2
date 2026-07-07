"use client";

import React, { useEffect, useState } from "react";
import BlogListingGrid from "./BlogListingGrid";
import { fetchCategoryBlogsClient, formatCategoryTitle } from "../../../lib/caseStudyApi";
import { refreshFooterScroll } from "../../../lib/footerRefresh";

export default function CategoryPageClient({ categorypage }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const title = formatCategoryTitle(categorypage);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchCategoryBlogsClient(categorypage)
      .then((items) => {
        if (!cancelled) setBlogs(items);
      })
      .catch(() => {
        if (!cancelled) setBlogs([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categorypage]);

  useEffect(() => {
    if (loading) return;
    refreshFooterScroll();
    const timer = window.setTimeout(refreshFooterScroll, 400);
    return () => window.clearTimeout(timer);
  }, [loading, blogs]);

  return (
    <>
      <section className="bg-[#0D1334] px-8 py-16 md:px-12">
        <div className="mx-auto w-full max-w-8xl text-left">
          <span
            className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#E8542A]"
            style={{ fontFamily: '"League Spartan", sans-serif' }}
          >
            Category
          </span>
          <h1
            className="mt-3 text-[clamp(28px,4.5vw,52px)] font-semibold leading-tight text-white"
            style={{ fontFamily: '"League Spartan", sans-serif' }}
          >
            {title}
          </h1>
        </div>
      </section>

      <section className="bg-white px-8 py-12 md:px-12 md:py-16">
        <div className="mx-auto w-full max-w-8xl">
          {loading ? (
            <p
              className="py-10 text-center text-[16px] text-[#666]"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Loading...
            </p>
          ) : (
            <BlogListingGrid blogs={blogs} />
          )}
        </div>
      </section>
    </>
  );
}
