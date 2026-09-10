/**
 * SEO meta + visually hidden heading hierarchies for `/category/[categorypage]`.
 * Only slugs listed here get custom meta/headings; others keep default behavior.
 */

/** @typedef {{ h2: string, h3?: string[] }} SeoSection */
/** @typedef {{
 *   title: string,
 *   description: string,
 *   keywords?: string[],
 *   h1: string,
 *   sections: SeoSection[],
 * }} CategorySeo */

/** @type {Record<string, CategorySeo>} */
export const categorySeoBySlug = {
  "artist-management-agency": {
    title: "Artist Management Agency in India | Ritz Media World",
    description:
      "Discover the best artist management agency in India for talent bookings, celebrity management, artist promotions, brand endorsements and event management services.",
    keywords: [
      "artist management agency",
      "artist management agency in India",
      "artist management company",
      "talent management agency",
      "celebrity management agency",
      "artist booking agency",
    ],
    h1: "Artist Management Agency",
    sections: [
      {
        h2: "Artist Management Services",
        h3: ["Artist Booking", "Celebrity Management", "Brand Endorsements"],
      },
      { h2: "Why Choose Ritz Media World?" },
      { h2: "Artist Management Agency in Delhi NCR & Noida" },
      { h2: "Frequently Asked Questions" },
    ],
  },

  "best-ad-agency": {
    title: "Best Ad Agency in India | Ritz Media World",
    description:
      "Find the best ad agency in India for creative advertising, media planning, digital campaigns, branding and marketing solutions that help businesses grow.",
    h1: "Best Ad Agency",
    sections: [
      {
        h2: "Advertising Services We Offer",
        h3: [
          "Creative Advertising",
          "Digital Advertising",
          "Media Planning & Buying",
          "Branding & Marketing",
        ],
      },
      { h2: "Why Choose Ritz Media World?" },
      { h2: "Best Ad Agency in Delhi NCR & Noida" },
      { h2: "Latest Advertising Insights" },
      { h2: "Frequently Asked Questions" },
    ],
  },

  "case-study": {
    title: "Marketing & Advertising Case Studies | Ritz Media World",
    description:
      "Explore real marketing and advertising case studies, covering creative campaigns, branding, digital strategy and successful brand stories from Ritz Media World.",
    h1: "Marketing & Advertising Case Studies",
    sections: [
      { h2: "Our Latest Case Studies" },
      { h2: "Marketing & Advertising Success Stories" },
      { h2: "Creative & Digital Campaign Case Studies" },
      { h2: "Frequently Asked Questions" },
    ],
  },

  "celebrity-endorsements-agency": {
    title: "Celebrity Endorsement Agency in India | Ritz Media World",
    description:
      "Find a trusted celebrity endorsement agency in India for celebrity collaborations, brand promotions, influencer campaigns and strategic marketing solutions.",
    keywords: [
      "celebrity endorsement agency",
      "celebrity endorsement agency in India",
      "celebrity marketing agency",
      "celebrity brand endorsement",
      "celebrity promotion agency",
    ],
    h1: "Celebrity Endorsement Agency",
    sections: [
      {
        h2: "Celebrity Endorsement Services",
        h3: [
          "Celebrity Brand Endorsements",
          "Celebrity Collaborations",
          "Celebrity Marketing Campaigns",
          "Celebrity Promotions",
        ],
      },
      { h2: "Why Choose Ritz Media World?" },
      { h2: "Celebrity Endorsement Agency in Delhi NCR" },
      { h2: "Latest Celebrity Endorsement Insights" },
      { h2: "Frequently Asked Questions" },
    ],
  },

  "creative-advertising-agency": {
    title: "Creative Advertising Agency in India | Ritz Media World",
    description:
      "Find a creative advertising agency in India for branding, campaign design, digital creatives, vizdeo production and innovative advertising solutions that grow brands.",
    keywords: [
      "creative advertising agency",
      "creative advertising agency in India",
      "creative agency",
      "advertising creative agency",
      "creative agency Delhi NCR",
      "creative agency Noida",
    ],
    h1: "Creative Advertising Agency",
    sections: [
      {
        h2: "Creative Advertising Services",
        h3: [
          "Branding & Identity Design",
          "Creative Campaigns",
          "Graphic Design",
          "Video & Content Production",
        ],
      },
      { h2: "Why Choose Ritz Media World?" },
      { h2: "Creative Advertising Agency in Delhi NCR & Noida" },
      { h2: "Latest Creative Advertising Insights" },
      { h2: "Frequently Asked Questions" },
    ],
  },

  "digital-marketing-agency": {
    title: "Digital Marketing Agency in India | Ritz Media World",
    description:
      "Grow your business with a digital marketing agency in India offering SEO, social media, content marketing, online advertising and strategies that drive real results.",
    keywords: [
      "digital marketing agency",
      "digital marketing agency in India",
      "digital marketing company",
      "SEO agency",
      "social media marketing agency",
      "digital marketing services",
    ],
    h1: "Digital Marketing Agency",
    sections: [
      {
        h2: "Digital Marketing Services",
        h3: [
          "Search Engine Optimization (SEO)",
          "Social Media Marketing",
          "Content Marketing",
          "Online Advertising",
          "Local SEO",
        ],
      },
      { h2: "Why Choose Ritz Media World?" },
      { h2: "Digital Marketing Agency in Delhi NCR" },
      { h2: "Latest Digital Marketing Insights" },
      { h2: "Frequently Asked Questions" },
    ],
  },
};

export function getCategorySeo(slug) {
  return categorySeoBySlug[slug] || null;
}
