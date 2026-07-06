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
    created_at: item?.created_at || item?.createdAt || "",
  };
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

export async function getBlogBySlug(slug) {
  if (!slug) return null;

  try {
    const normalized = decodeURIComponent(slug).replace(/-+/g, "-");
    const response = await fetch(
      `${API_BASE}/api/blog/${encodeURIComponent(normalized)}`,
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.blog ?? null;
  } catch (error) {
    console.warn("Blog fetch failed:", error);
    return null;
  }
}
