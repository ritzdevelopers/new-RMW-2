import { getSubServiceBySlug } from "../data/sub-services";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ritzmediaworld.com";

export function resolveMediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  const normalized = path.replace(/^\/+/, "");
  return `${API_BASE}/${normalized}`;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${url}`);
  }

  return response.json();
}

export async function getSubServiceMeta(parentSlug, subSlug) {
  const fallback = getSubServiceBySlug(parentSlug, subSlug);

  try {
    const payload = await fetchJson(
      `${API_BASE}/api/get_meta_info/${subSlug}/${parentSlug}`,
    );

    if (payload?.data) {
      return {
        title: payload.data.meta_title || fallback?.metaTitle,
        description: payload.data.meta_description || fallback?.metaDescription,
        keywords: payload.data.meta_keywords || "",
      };
    }
  } catch (error) {
    console.warn("Sub-service meta fetch failed:", error);
  }

  return {
    title: fallback?.metaTitle || fallback?.title || "Service | Ritz Media World",
    description: fallback?.metaDescription || "",
    keywords: "",
  };
}

export async function getSubServicePageData(parentSlug, subSlug) {
  const fallback = getSubServiceBySlug(parentSlug, subSlug);

  if (fallback?.cards?.length) {
    return {
      heading: fallback.title || "",
      intro: "",
      endTag: "",
      cards: fallback.cards.map((card, index) => ({
        id: card.id || `${subSlug}-${index}`,
        title: card.title,
        description: card.description || "",
        image: resolveMediaUrl(card.image),
      })),
    };
  }

  try {
    const payload = await fetchJson(
      `${API_BASE}/api/services/${parentSlug}/${subSlug}`,
    );

    if (payload?.cards?.length) {
      return {
        heading: payload.s3heading1 || fallback?.title || "",
        intro: payload.s3para || "",
        endTag: payload.s3endtag || "",
        cards: payload.cards.map((card) => ({
          id: card.id,
          title: card.title,
          description: card.description?.trim() || "",
          image: resolveMediaUrl(card.image_url),
        })),
      };
    }
  } catch (error) {
    console.warn("Sub-service page data fetch failed:", error);
  }

  return {
    heading: fallback?.title || "",
    intro: "",
    endTag: "",
    cards:
      fallback?.cards?.map((card, index) => ({
        id: card.id || `${subSlug}-${index}`,
        title: card.title,
        description: card.description || "",
        image: card.image || "",
      })) || [],
  };
}
