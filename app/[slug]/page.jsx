import React from "react";
import { notFound } from "next/navigation";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";
import SlugDetailClient from "../component/blog/SlugDetailClient";
import {
  getAllBlogSlugs,
  getBlogBySlug,
  isCaseStudySlug,
} from "../../lib/caseStudyApi";
import { getSlugDetailPageData } from "../../lib/blogServerData";

const PLACEHOLDER_SLUG = "__placeholder__";

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    console.log("Total Slugs:", slugs.length);
    const params = slugs
      .filter((slug) => typeof slug === "string" && slug.trim())
      .map((slug) => ({ slug: slug.trim() }));

    if (params.length) return params;
  } catch (error) {
    console.warn("generateStaticParams (slug) failed:", error);
  }

  // `output: "export"` cannot build dynamic routes with an empty params list.
  return [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug === PLACEHOLDER_SLUG) {
    return { title: "Blog | Ritz Media World" };
  }

  const blog = await getBlogBySlug(slug);
  const caseStudy = await isCaseStudySlug(slug);
  const fallbackTitle = caseStudy
    ? "Case Study | Ritz Media World"
    : "Blog | Ritz Media World";

  if (!blog) {
    return { title: fallbackTitle };
  }

  const pageUrl = `https://ritzmediaworld.com/${blog.slug || slug}`;
  const keywords = String(blog.meta_keywords || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    title: blog.meta_title || blog.title || fallbackTitle,
    description: blog.meta_description || undefined,
    keywords: keywords.length ? keywords : undefined,
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      url: pageUrl,
      siteName: "Ritz Media World",
      locale: "en",
      type: "article",
    },
  };
}

export default async function SlugDetailPage({ params }) {
  const { slug } = await params;

  if (slug === PLACEHOLDER_SLUG) {
    notFound();
  }

  const data = await getSlugDetailPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <SlugDetailClient
          slug={slug}
          blog={data.blog}
          sidebar={data.sidebar}
          caseStudy={data.caseStudy}
        />
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
}
