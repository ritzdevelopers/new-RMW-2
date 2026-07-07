"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";
import CaseStudyDetail from "../case-study/CaseStudyDetail";
import {
  checkCaseStudySlugClient,
  fetchBlogBySlugClient,
  fetchBlogSidebarDataClient,
  fetchCaseStudySidebarDataClient,
} from "../../../lib/caseStudyApi";
import { refreshFooterScroll } from "../../../lib/footerRefresh";

export default function SlugDetailClient({ slug }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [sidebar, setSidebar] = useState(null);
  const [caseStudy, setCaseStudy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function loadDetail() {
      try {
        const blogData = await fetchBlogBySlugClient(slug);
        if (cancelled) return;

        if (!blogData) {
          notFound();
          return;
        }

        const isCaseStudy = await checkCaseStudySlugClient(slug);
        if (cancelled) return;

        const sidebarData = isCaseStudy
          ? await fetchCaseStudySidebarDataClient(slug, blogData)
          : await fetchBlogSidebarDataClient(slug, blogData);

        if (cancelled) return;

        setBlog(blogData);
        setSidebar(sidebarData);
        setCaseStudy(isCaseStudy);
      } catch {
        if (!cancelled) notFound();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDetail();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    refreshFooterScroll();
  }, [slug]);

  useEffect(() => {
    if (loading) return;
    refreshFooterScroll();
    const timer = window.setTimeout(refreshFooterScroll, 400);
    const lateTimer = window.setTimeout(refreshFooterScroll, 1200);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(lateTimer);
    };
  }, [loading, blog]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p
          className="text-center text-[16px] text-[#666]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Loading...
        </p>
      </div>
    );
  }

  if (!blog) return null;

  if (caseStudy) {
    return <CaseStudyDetail blog={blog} sidebar={sidebar} />;
  }

  return <BlogDetail blog={blog} sidebar={sidebar} />;
}
