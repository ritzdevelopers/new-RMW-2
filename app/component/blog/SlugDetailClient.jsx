"use client";

import React, { useEffect, useLayoutEffect } from "react";
import BlogDetail from "./BlogDetail";
import CaseStudyDetail from "../case-study/CaseStudyDetail";
import { refreshFooterScroll } from "../../../lib/footerRefresh";

export default function SlugDetailClient({ slug, blog, sidebar, caseStudy }) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    refreshFooterScroll();
  }, [slug]);

  useEffect(() => {
    refreshFooterScroll();
    const timer = window.setTimeout(refreshFooterScroll, 400);
    const lateTimer = window.setTimeout(refreshFooterScroll, 1200);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(lateTimer);
    };
  }, [slug, blog]);

  if (!blog) return null;

  if (caseStudy) {
    return <CaseStudyDetail blog={blog} sidebar={sidebar} />;
  }

  return <BlogDetail blog={blog} sidebar={sidebar} />;
}
