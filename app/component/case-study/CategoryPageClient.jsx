"use client";

import React, { useEffect } from "react";
import BlogListingGrid from "./BlogListingGrid";
import { refreshFooterScroll } from "../../../lib/footerRefresh";

export default function CategoryPageClient({
  categorypage,
  blogs = [],
  title = "",
  hasSeoHeadings = false,
}) {
  useEffect(() => {
    refreshFooterScroll();
    const timer = window.setTimeout(refreshFooterScroll, 400);
    return () => window.clearTimeout(timer);
  }, [categorypage, blogs]);

  const titleClassName =
    'mt-3 text-[clamp(28px,4.5vw,52px)] font-semibold leading-tight text-white';
  const titleStyle = { fontFamily: '"League Spartan", sans-serif' };

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
          {hasSeoHeadings ? (
            <p className={titleClassName} style={titleStyle} aria-hidden="true">
              {title}
            </p>
          ) : (
            <h1 className={titleClassName} style={titleStyle}>
              {title}
            </h1>
          )}
        </div>
      </section>

      <section className="bg-white px-8 py-12 md:px-12 md:py-16">
        <div className="mx-auto w-full max-w-8xl">
          <BlogListingGrid blogs={blogs} />
        </div>
      </section>
    </>
  );
}
