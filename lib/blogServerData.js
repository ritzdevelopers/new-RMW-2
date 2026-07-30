import "server-only";

import {
  fetchAllBlogsFromApi,
  formatCategoryTitle,
  getBlogBySlug,
  getBlogCategories,
  getBlogSidebarData,
  getCaseStudySidebarData,
  getCategoryBlogs,
  isCaseStudySlug,
  sortBlogsByDateDesc,
} from "./caseStudyApi";

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
      return [category.link, sortBlogsByDateDesc(items)];
    }),
  );

  return {
    blogs,
    categoryNames: allCategories.map((category) => category.name).filter(Boolean),
    categories: section4Categories,
    blogsByCategory: Object.fromEntries(blogsByCategoryEntries),
  };
}

/**
 * Server-only data for /[slug] blog & case-study detail pages.
 */
export async function getSlugDetailPageData(slug) {
  const blog = await getBlogBySlug(slug);
  if (!blog) return null;

  const caseStudy = await isCaseStudySlug(slug);
  const sidebar = caseStudy
    ? await getCaseStudySidebarData(slug, blog)
    : await getBlogSidebarData(slug, blog);

  return { blog, sidebar, caseStudy };
}

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
