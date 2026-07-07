const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ritzmediaworld.com";

export function resolveBlogImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.trim();
  if (!normalized) return "";
  if (normalized.includes("/images")) {
    const tail = normalized.split("/images")[1] || "";
    return tail ? `${API_BASE}/api/images${tail}` : "";
  }
  return `${API_BASE}/blogs/${normalized.replace(/^\/+/, "")}`;
}

export function normalizeBlogItem(item) {
  return {
    title: item?.title || item?.blogTitle || "",
    slug: item?.slug || item?.blogSlug || "",
    banner: item?.blog_image || item?.blogBanner || item?.banner || "",
    meta_description: item?.meta_description || item?.mtDesc || "",
    description: item?.description || item?.blogDescription || "",
    meta_keywords: item?.meta_keywords || item?.metaKeywords || "",
    created_at: item?.created_at || item?.createdAt || "",
  };
}

function getBlogTime(blog) {
  const parsed = new Date(blog?.created_at || "").getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function sortBlogsByDateDesc(blogs) {
  return [...blogs].sort((a, b) => getBlogTime(b) - getBlogTime(a));
}

export async function fetchAllBlogsFromApi() {
  const allBlogs = [];

  for (let page = 1; page <= 60; page += 1) {
    try {
      const response = await fetch(`${API_BASE}/api/get_all_blogs?page=${page}`, {
        next: { revalidate: 3600 },
      });
      if (!response.ok) break;
      const data = await response.json();
      const blogs = Array.isArray(data?.blogs) ? data.blogs : [];
      if (!blogs.length) break;
      allBlogs.push(...blogs.map(normalizeBlogItem));
      if (blogs.length < 10) break;
    } catch {
      break;
    }
  }

  return sortBlogsByDateDesc(allBlogs);
}

function slugifyCategoryLink(name) {
  return String(name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugifyTag(keyword) {
  return String(keyword || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/,/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function addKeywordsToSet(blog, tagSet) {
  const raw = blog?.meta_keywords || blog?.metaKeywords || "";
  String(raw)
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .forEach((keyword) => {
      const slug = slugifyTag(keyword);
      if (slug) tagSet.add(slug);
    });
}

export async function getAllTagSlugs() {
  const tagSet = new Set();

  for (let page = 1; page <= 60; page += 1) {
    try {
      const response = await fetch(`${API_BASE}/api/get_all_blogs?page=${page}`, {
        next: { revalidate: 3600 },
      });
      if (!response.ok) break;
      const data = await response.json();
      const blogs = Array.isArray(data?.blogs) ? data.blogs : [];
      if (!blogs.length) break;
      blogs.forEach((blog) => addKeywordsToSet(blog, tagSet));
      if (blogs.length < 10) break;
    } catch {
      break;
    }
  }

  const caseSlugs = await getCaseStudySlugs();
  await Promise.all(
    caseSlugs.map(async (slug) => {
      const blog = await getBlogBySlug(slug);
      if (blog) addKeywordsToSet(blog, tagSet);
    }),
  );

  return [...tagSet];
}

export async function getTagSlugsFromCaseStudies() {
  return getAllTagSlugs();
}

export function formatCategoryTitle(slug) {
  return String(slug || "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatTagTitle(slug) {
  return formatCategoryTitle(slug);
}

export async function getCategoryLinks() {
  try {
    const response = await fetch(`${API_BASE}/api/blog/categories`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const categories = await response.json();
    if (!Array.isArray(categories)) return [];
    return categories
      .map((category) => slugifyCategoryLink(category.name))
      .filter(Boolean);
  } catch (error) {
    console.warn("Category links fetch failed:", error);
    return [];
  }
}

export async function getCategoryBlogs(categoryLink) {
  if (!categoryLink) return [];

  try {
    const response = await fetch(`${API_BASE}/api/category/${categoryLink}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const items = await response.json();
    if (!Array.isArray(items)) return [];
    return items.map(normalizeBlogItem);
  } catch (error) {
    console.warn("Category blogs fetch failed:", error);
    return [];
  }
}

export async function getBlogsByTagSlug(tagSlug) {
  if (!tagSlug) return [];

  try {
    const response = await fetch(
      `${API_BASE}/api/my-sql/find-blogs-using-key/${encodeURIComponent(tagSlug)}`,
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) return [];
    const data = await response.json();
    const items = Array.isArray(data?.blogs) ? data.blogs : [];
    return items.map(normalizeBlogItem);
  } catch (error) {
    console.warn("Tag blogs fetch failed:", error);
    return [];
  }
}

export async function getCaseStudyList() {
  try {
    const response = await fetch(`${API_BASE}/api/category/case-study`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const items = await response.json();
    if (!Array.isArray(items)) return [];
    return items.map(normalizeBlogItem);
  } catch (error) {
    console.warn("Case study list fetch failed:", error);
    return [];
  }
}

export async function getCaseStudySidebarData(currentSlug, blog) {
  const caseStudyList = await getCaseStudyList();
  const categories = await fetchSidebarCategories();

  const keywords = String(blog?.meta_keywords || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const relatedBlogs = caseStudyList
    .filter((item) => item.slug && item.slug !== currentSlug)
    .slice(0, 4);

  return {
    allBlogs: caseStudyList,
    categories,
    keywords,
    relatedBlogs,
  };
}

async function fetchSidebarCategories() {
  const categoriesResponse = await fetch(`${API_BASE}/api/blog/categories`, {
    next: { revalidate: 3600 },
  }).catch(() => null);

  let categories = [];
  if (categoriesResponse?.ok) {
    const rawCategories = await categoriesResponse.json();
    if (Array.isArray(rawCategories)) {
      categories = await Promise.all(
        rawCategories.map(async (category) => {
          const link = slugifyCategoryLink(category.name);
          let total_blogs = 0;

          try {
            const response = await fetch(`${API_BASE}/api/category/${link}`, {
              next: { revalidate: 3600 },
            });
            if (response.ok) {
              const items = await response.json();
              total_blogs = Array.isArray(items) ? items.length : 0;
            }
          } catch {
            total_blogs = 0;
          }

          return {
            id: category.id,
            name: category.name,
            link,
            total_blogs,
          };
        }),
      );
      categories = categories.sort((a, b) => {
        if (b.total_blogs !== a.total_blogs) return b.total_blogs - a.total_blogs;
        return a.name.localeCompare(b.name);
      });
    }
  }

  return categories;
}

export async function getBlogSidebarData(currentSlug, blog) {
  const allBlogs = await fetchAllBlogsFromApi();
  const categories = await fetchSidebarCategories();

  const keywords = String(blog?.meta_keywords || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const relatedBlogs = allBlogs
    .filter((item) => item.slug && item.slug !== currentSlug)
    .slice(0, 4);

  return {
    allBlogs,
    categories,
    keywords,
    relatedBlogs,
  };
}

export async function isCaseStudySlug(slug) {
  if (!slug) return false;
  const slugs = await getCaseStudySlugs();
  return slugs.includes(slug);
}

export async function getCaseStudySlugs() {
  try {
    const response = await fetch(`${API_BASE}/api/category/case-study`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const items = await response.json();
    if (!Array.isArray(items)) return [];
    return items.map((item) => item.slug).filter(Boolean);
  } catch (error) {
    console.warn("Case study slugs fetch failed:", error);
    return [];
  }
}

const RESERVED_BLOG_SLUGS = new Set([
  "about",
  "blog",
  "contact",
  "services",
  "case-study",
  "tags",
  "category",
]);

/** Slugs with path-invalid chars break static export on Windows (e.g. ":" in folder names). */
function isStaticExportSafeSlug(slug) {
  if (!slug || typeof slug !== "string") return false;
  if (slug.includes("..")) return false;
  return !/[<>:"|?*\\]/.test(slug);
}

const BLOG_DETAIL_FETCH_OPTIONS = { cache: "no-store" };

export async function getAllBlogSlugs() {
  const slugSet = new Set();

  for (let page = 1; page <= 60; page += 1) {
    try {
      const response = await fetch(`${API_BASE}/api/get_all_blogs?page=${page}`, {
        next: { revalidate: 3600 },
      });
      if (!response.ok) break;
      const data = await response.json();
      const blogs = Array.isArray(data?.blogs) ? data.blogs : [];
      if (!blogs.length) break;
      blogs.forEach((blog) => {
        const slug = blog?.slug || blog?.blogSlug;
        if (slug) slugSet.add(slug);
      });
      if (blogs.length < 10) break;
    } catch {
      break;
    }
  }

  const caseSlugs = await getCaseStudySlugs();
  caseSlugs.forEach((slug) => slugSet.add(slug));

  const categoryLinks = await getCategoryLinks();
  await Promise.all(
    categoryLinks.map(async (link) => {
      const blogs = await getCategoryBlogs(link);
      blogs.forEach((blog) => {
        if (blog.slug) slugSet.add(blog.slug);
      });
    }),
  );

  return [...slugSet].filter(
    (slug) => !RESERVED_BLOG_SLUGS.has(slug) && isStaticExportSafeSlug(slug),
  );
}

function normalizeBlogDetail(blog, slug) {
  if (!blog) return null;

  return {
    ...blog,
    title: blog.title || blog.blogTitle || "",
    slug: blog.slug || blog.blogSlug || slug || "",
    description: blog.description || blog.blogDescription || "",
    blog_image: blog.blog_image || blog.blogBanner || blog.banner || "",
    banner: blog.banner || blog.blogBanner || blog.blog_image || "",
    meta_title: blog.meta_title || blog.metaTitle || "",
    meta_description: blog.meta_description || blog.mtDesc || "",
    meta_keywords: blog.meta_keywords || blog.metaKeywords || "",
    created_at: blog.created_at || blog.createdAt || "",
  };
}

export async function getBlogBySlug(slug) {
  if (!slug) return null;

  try {
    const normalized = decodeURIComponent(slug).replace(/-+/g, "-");

    const mysqlResponse = await fetch(
      `${API_BASE}/api/blog/${encodeURIComponent(normalized)}`,
      BLOG_DETAIL_FETCH_OPTIONS,
    );
    if (mysqlResponse.ok) {
      const data = await mysqlResponse.json();
      const blog = normalizeBlogDetail(data?.blog, normalized);
      if (blog?.title || blog?.slug) return blog;
    }

    const mongoResponse = await fetch(
      `${API_BASE}/api/ritz_blogs/get-single-blog/${encodeURIComponent(normalized)}`,
      BLOG_DETAIL_FETCH_OPTIONS,
    );
    if (mongoResponse.ok) {
      const data = await mongoResponse.json();
      const blog = normalizeBlogDetail(data?.blog, normalized);
      if (blog?.title || blog?.slug) return blog;
    }

    return null;
  } catch (error) {
    console.warn("Blog fetch failed:", error);
    return null;
  }
}

/** Same-origin API path — proxied on Vercel (vercel.json) and in dev (next.config rewrites). */
export function getProxiedApiUrl(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

async function fetchBlogBySlugFromPaths(slug, apiUrl) {
  if (!slug) return null;

  const normalized = decodeURIComponent(slug).replace(/-+/g, "-");

  try {
    const mysqlResponse = await fetch(apiUrl(`/api/blog/${encodeURIComponent(normalized)}`));
    if (mysqlResponse.ok) {
      const data = await mysqlResponse.json();
      const blog = normalizeBlogDetail(data?.blog, normalized);
      if (blog?.title || blog?.slug) return blog;
    }

    const mongoResponse = await fetch(
      apiUrl(`/api/ritz_blogs/get-single-blog/${encodeURIComponent(normalized)}`),
    );
    if (mongoResponse.ok) {
      const data = await mongoResponse.json();
      const blog = normalizeBlogDetail(data?.blog, normalized);
      if (blog?.title || blog?.slug) return blog;
    }
  } catch (error) {
    console.warn("Blog fetch failed:", error);
  }

  return null;
}

export async function fetchBlogBySlugClient(slug) {
  return fetchBlogBySlugFromPaths(slug, getProxiedApiUrl);
}

export async function fetchCategoryBlogsClient(categoryLink) {
  if (!categoryLink) return [];

  try {
    const response = await fetch(getProxiedApiUrl(`/api/category/${categoryLink}`));
    if (!response.ok) return [];
    const items = await response.json();
    if (!Array.isArray(items)) return [];
    return items.map(normalizeBlogItem);
  } catch (error) {
    console.warn("Category blogs fetch failed:", error);
    return [];
  }
}

export async function fetchCaseStudySlugsClient() {
  try {
    const response = await fetch(getProxiedApiUrl("/api/category/case-study"));
    if (!response.ok) return [];
    const items = await response.json();
    if (!Array.isArray(items)) return [];
    return items.map((item) => item.slug).filter(Boolean);
  } catch (error) {
    console.warn("Case study slugs fetch failed:", error);
    return [];
  }
}

export async function checkCaseStudySlugClient(slug) {
  if (!slug) return false;
  const slugs = await fetchCaseStudySlugsClient();
  return slugs.includes(slug);
}

async function fetchAllBlogsClient() {
  const allBlogs = [];

  for (let page = 1; page <= 60; page += 1) {
    try {
      const response = await fetch(getProxiedApiUrl(`/api/get_all_blogs?page=${page}`));
      if (!response.ok) break;
      const data = await response.json();
      const blogs = Array.isArray(data?.blogs) ? data.blogs : [];
      if (!blogs.length) break;
      allBlogs.push(...blogs.map(normalizeBlogItem));
      if (blogs.length < 10) break;
    } catch {
      break;
    }
  }

  return sortBlogsByDateDesc(allBlogs);
}

async function fetchSidebarCategoriesClient() {
  try {
    const categoriesResponse = await fetch(getProxiedApiUrl("/api/blog/categories"));
    if (!categoriesResponse.ok) return [];

    const rawCategories = await categoriesResponse.json();
    if (!Array.isArray(rawCategories)) return [];

    const categories = await Promise.all(
      rawCategories.map(async (category) => {
        const link = slugifyCategoryLink(category.name);
        let total_blogs = 0;

        try {
          const response = await fetch(getProxiedApiUrl(`/api/category/${link}`));
          if (response.ok) {
            const items = await response.json();
            total_blogs = Array.isArray(items) ? items.length : 0;
          }
        } catch {
          total_blogs = 0;
        }

        return {
          id: category.id,
          name: category.name,
          link,
          total_blogs,
        };
      }),
    );

    return categories.sort((a, b) => {
      if (b.total_blogs !== a.total_blogs) return b.total_blogs - a.total_blogs;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.warn("Sidebar categories fetch failed:", error);
    return [];
  }
}

export async function fetchCaseStudySidebarDataClient(currentSlug, blog) {
  let caseStudyList = [];

  try {
    const response = await fetch(getProxiedApiUrl("/api/category/case-study"));
    if (response.ok) {
      const items = await response.json();
      if (Array.isArray(items)) {
        caseStudyList = items.map(normalizeBlogItem);
      }
    }
  } catch {
    caseStudyList = [];
  }

  const categories = await fetchSidebarCategoriesClient();
  const keywords = String(blog?.meta_keywords || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const relatedBlogs = caseStudyList
    .filter((item) => item.slug && item.slug !== currentSlug)
    .slice(0, 4);

  return {
    allBlogs: caseStudyList,
    categories,
    keywords,
    relatedBlogs,
  };
}

export async function fetchBlogSidebarDataClient(currentSlug, blog) {
  const allBlogs = await fetchAllBlogsClient();
  const categories = await fetchSidebarCategoriesClient();
  const keywords = String(blog?.meta_keywords || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const relatedBlogs = allBlogs
    .filter((item) => item.slug && item.slug !== currentSlug)
    .slice(0, 4);

  return {
    allBlogs,
    categories,
    keywords,
    relatedBlogs,
  };
}
