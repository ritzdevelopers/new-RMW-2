import React from "react";
import { notFound } from "next/navigation";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";
import SlugDetailClient from "../component/blog/SlugDetailClient";
import { getSlugDetailPageData, getSlugPageMetaInputs } from "../../lib/blogServerData";
import { resolveBlogImageUrl } from "../../lib/caseStudyApi";

/** ISR: new blog slugs render on first request; known slugs refresh periodically. */
export const revalidate = 60;

const SITE_URL = "https://ritzmediaworld.com";

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toIsoDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function buildArticleJsonLd(blog, slug, caseStudy) {
  const pageUrl = `${SITE_URL}/${blog.slug || slug}`;
  const bodyText = stripHtml(blog.description);
  const description =
    blog.meta_description || (bodyText ? bodyText.slice(0, 160) : undefined);
  const image = resolveBlogImageUrl(blog.blog_image || blog.banner);
  const datePublished = toIsoDate(blog.created_at);
  const dateModified = toIsoDate(blog.updated_at) || datePublished;
  const keywords = String(blog.meta_keywords || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const organization = {
    "@type": "Organization",
    name: "Ritz Media World",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo/rmw.logo.png`,
    },
  };

  return {
    "@context": "https://schema.org",
    "@type":  "Article" ,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
    headline: blog.title,
    description,
    image: image ? [image] : undefined,
    datePublished,
    dateModified,
    author: organization,
    publisher: organization,
    keywords: keywords.length ? keywords.join(", ") : undefined,
    articleSection: caseStudy ? "Case Study" : "Blog",
    wordCount: bodyText ? bodyText.split(" ").length : undefined,
    inLanguage: "en",
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { blog, caseStudy } = await getSlugPageMetaInputs(slug);
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
    title: blog.meta_title || blog.blogBody?.[0]?.metaTitle || blog.title || fallbackTitle,
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

  const data = await getSlugDetailPageData(slug);

  if (!data) {
    notFound();
  }

  const articleJsonLd = buildArticleJsonLd(data.blog, slug, data.caseStudy);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
