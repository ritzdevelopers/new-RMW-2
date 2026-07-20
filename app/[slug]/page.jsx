import React from "react";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";
import SlugDetailClient from "../component/blog/SlugDetailClient";
import {
  getAllBlogSlugs,
  getBlogBySlug,
  isCaseStudySlug,
} from "../../lib/caseStudyApi";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const caseStudy = await isCaseStudySlug(slug);
  const fallbackTitle = caseStudy ? "Case Study | Ritz Media World" : "Blog | Ritz Media World";

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

  return (
    <>
      <Header />
      <main>
        <SlugDetailClient slug={slug} />
      </main>
      <Footer section={< OverlaySection1 />} />
    </>
  );
}
