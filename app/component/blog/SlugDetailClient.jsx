"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";
import CaseStudyDetail from "../case-study/CaseStudyDetail";
import {
  checkCaseStudySlugClient,
  fetchBlogBySlugClient,
  fetchBlogSidebarDataClient,
  fetchCaseStudySidebarDataClient,
} from "../../../lib/caseStudyApi";

export default function SlugDetailClient({ slug }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [sidebar, setSidebar] = useState(null);
  const [caseStudy, setCaseStudy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadDetail() {
      setLoading(true);

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

  if (loading) {
    return (
      <p
        className="py-20 text-center text-[16px] text-[#666]"
        style={{ fontFamily: '"Montserrat", sans-serif' }}
      >
        Loading...
      </p>
    );
  }

  if (!blog) return null;

  if (caseStudy) {
    return <CaseStudyDetail blog={blog} sidebar={sidebar} />;
  }

  return <BlogDetail blog={blog} sidebar={sidebar} />;
}
