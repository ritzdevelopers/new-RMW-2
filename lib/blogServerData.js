import "server-only";

import { cache } from "react";
import {
  fetchAllBlogsFromApi,
  formatCategoryTitle,
  getBlogBySlug,
  getBlogCategories,
  getBlogSidebarData,
  getCaseStudySidebarData,
  getCaseStudySlugs,
  getCategoryBlogs,
  prefetchSlugDetailCaches,
  sortBlogsByDateDesc,
} from "./caseStudyApi";

const getCachedBlogBySlug = cache(getBlogBySlug);
const getCachedCaseStudySlugs = cache(getCaseStudySlugs);

const LISTING_EXCERPT_LENGTH = 160;
const SECTION4_POSTS_PER_CATEGORY = 4;

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toBlogListingItem(blog) {
  const text = stripHtml(blog?.description || "");
  return {
    slug: blog?.slug || "",
    title: blog?.title || "",
    banner: blog?.banner || "",
    created_at: blog?.created_at || "",
    meta_keywords: blog?.meta_keywords || "",
    description:
      text.length <= LISTING_EXCERPT_LENGTH
        ? text
        : text.slice(0, LISTING_EXCERPT_LENGTH),
  };
}

/**
 * Server-only data for /blog - keeps upstream API URLs out of the client bundle.
 */
export async function getBlogListingPageData() {
  const [blogs, allCategories] = await Promise.all([
    fetchAllBlogsFromApi(),
    getBlogCategories(),
  ]);

  const section4Categories = allCategories.slice(0, 4);
  const blogsByCategoryEntries = await Promise.all(
    section4Categories.map(async (category) => {
      const items = await getCategoryBlogs(category.link);
      return [
        category.link,
        sortBlogsByDateDesc(items)
          .slice(0, SECTION4_POSTS_PER_CATEGORY)
          .map(toBlogListingItem),
      ];
    }),
  );

  return {
    blogs: blogs.map(toBlogListingItem),
    categoryNames: allCategories.map((category) => category.name).filter(Boolean),
    categories: section4Categories,
    blogsByCategory: Object.fromEntries(blogsByCategoryEntries),
  };
}

/**
 * Server-only data for /[slug] blog & case-study detail pages.
 */
export const getSlugDetailPageData = cache(async function getSlugDetailPageData(slug) {
  prefetchSlugDetailCaches();

  const [blog, caseStudySlugs] = await Promise.all([
    getCachedBlogBySlug(slug),
    getCachedCaseStudySlugs(),
  ]);
  if (!blog) return null;

  const caseStudy = caseStudySlugs.includes(slug);
  const sidebar = caseStudy
    ? await getCaseStudySidebarData(slug, blog)
    : await getBlogSidebarData(slug, blog);

  return { blog, sidebar, caseStudy };
});

/** Shared cached lookups for generateMetadata + page render. */
export const getSlugPageMetaInputs = cache(async function getSlugPageMetaInputs(slug) {
  prefetchSlugDetailCaches();

  const [blog, caseStudySlugs] = await Promise.all([
    getCachedBlogBySlug(slug),
    getCachedCaseStudySlugs(),
  ]);

  return {
    blog,
    caseStudy: caseStudySlugs.includes(slug),
  };
});

/**
 * Server-only data for /category/[categorypage].
 */
export async function getCategoryPageData(categorypage) {
  if (!categorypage) {
    return { blogs: [], title: "" };
  }

  const blogs = await getCategoryBlogs(categorypage);
  return {
    blogs: sortBlogsByDateDesc(blogs),
    title: formatCategoryTitle(categorypage),
  };
}
