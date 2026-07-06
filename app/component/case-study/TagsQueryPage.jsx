"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogListingGrid from "./BlogListingGrid";
import { formatTagTitle, normalizeBlogItem } from "../../../lib/caseStudyApi";

function TagsContent({ keyword }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const title = formatTagTitle(keyword);

  useEffect(() => {
    if (!keyword) {
      setBlogs([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/my-sql/find-blogs-using-key/${encodeURIComponent(keyword)}`)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        const items = Array.isArray(data?.blogs) ? data.blogs : [];
        setBlogs(items.map(normalizeBlogItem));
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
  }, [keyword]);

  return (
    <>
      <section className="bg-[#0D1334] px-8 py-16 md:px-12">
        <div className="mx-auto w-full max-w-8xl text-left">
          <span
            className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#E8542A]"
            style={{ fontFamily: '"League Spartan", sans-serif' }}
          >
            Tags
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
            <BlogListingGrid
              blogs={blogs}
              emptyMessage="No blogs found for this keyword."
            />
          )}
        </div>
      </section>
    </>
  );
}

function TagsQueryInner() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  return <TagsContent keyword={keyword} />;
}

export default function TagsQueryPage() {
  return (
    <Suspense
      fallback={
        <p
          className="py-10 text-center text-[16px] text-[#666]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Loading...
        </p>
      }
    >
      <TagsQueryInner />
    </Suspense>
  );
}

export function TagsKeywordPage({ keyword }) {
  return <TagsContent keyword={keyword} />;
}
