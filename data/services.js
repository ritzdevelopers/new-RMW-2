export const serviceImages = [
  "/services/image%201005.png",
  "/services/image%201005%20(1).png",
  "/services/image%201005%20(2).png",
  "/services/image%201005%20(3).png",
  "/services/image%201005%20(4).png",
  "/services/image%201005%20(5).png",
];

export const services = [
  {
    slug: "digital-marketing",
    number: "01",
    category: "BREAKING THE NEWS",
    title: "Digital Marketing",
    headline: "STAND OUT",
    image: serviceImages[0],
    description:
      "Data-driven campaigns that cut through the noise — from performance media and SEO to full-funnel brand growth across every digital touchpoint.",
    highlights: [
      "Performance & paid media strategy",
      "SEO, SEM & analytics",
      "Social and content amplification",
      "Conversion-focused landing experiences",
    ],
    featured: true,
  },
  {
    slug: "content-marketing",
    number: "02",
    category: "STORYTELLING",
    title: "Content Marketing",
    headline: "STAND OUT",
    image: serviceImages[1],
    description:
      "Stories that move people — editorial calendars, branded content, and narrative-led campaigns built to earn attention and trust.",
    highlights: [
      "Editorial strategy & calendars",
      "Blog, video & long-form content",
      "Brand voice development",
      "Content distribution plans",
    ],
    featured: true,
  },
  {
    slug: "creative-services",
    number: "03",
    category: "DESIGN & FILM",
    title: "Creative Services",
    headline: "STAND OUT",
    image: serviceImages[2],
    description:
      "Bold design, brand films, and visual systems that defy convention — crafted to make your brand impossible to ignore.",
    highlights: [
      "Brand identity & visual systems",
      "Campaign creative direction",
      "Film & motion production",
      "Print & OOH design",
    ],
    featured: true,
  },
  {
    slug: "print-advertisement",
    number: "04",
    category: "PRINT MEDIA",
    title: "Print Advertisement",
    headline: "STAND OUT",
    image: serviceImages[3],
    description:
      "High-impact print campaigns across newspapers, magazines, and outdoor — where craft, placement, and message still win the room.",
    highlights: [
      "Newspaper & magazine ads",
      "Large-format & OOH",
      "Media planning & buying",
      "Creative adaptation for print",
    ],
    featured: true,
  },
  {
    slug: "web-development",
    number: "05",
    category: "DIGITAL PRODUCTS",
    title: "Web Development",
    headline: "STAND OUT",
    image: serviceImages[4],
    description:
      "Fast, beautiful websites and digital products engineered for performance, accessibility, and seamless brand experiences.",
    highlights: [
      "Corporate & campaign websites",
      "UI/UX design & prototyping",
      "CMS & e-commerce builds",
      "Performance optimization",
    ],
    featured: true,
  },
  {
    slug: "influencer-marketing",
    number: "06",
    category: "SOCIAL REACH",
    title: "Influencer Marketing",
    headline: "STAND OUT",
    image: serviceImages[5],
    description:
      "Authentic creator partnerships that amplify your message — from discovery and briefing to campaign measurement.",
    highlights: [
      "Creator discovery & vetting",
      "Campaign strategy & briefing",
      "Co-branded content production",
      "Reach & engagement reporting",
    ],
    featured: true,
  },
  {
    slug: "radio-advertisement",
    number: "07",
    category: "AUDIO MEDIA",
    title: "Radio Advertisement",
    headline: "STAND OUT",
    image: serviceImages[4],
    description:
      "Memorable radio spots and audio campaigns that build recall — scripted, produced, and placed across the right stations.",
    highlights: [
      "Scriptwriting & voice casting",
      "Audio production & mixing",
      "Station planning & buying",
      "Jingle & sonic branding",
    ],
    featured: false,
  },
  {
    slug: "celebrity-endorsement",
    number: "08",
    category: "TALENT & PR",
    title: "Celebrity Endorsement",
    headline: "STAND OUT",
    image: serviceImages[5],
    description:
      "Strategic celebrity partnerships that lend credibility and reach — from talent matchmaking to full campaign integration.",
    highlights: [
      "Talent scouting & matchmaking",
      "Contract & negotiation support",
      "Campaign integration planning",
      "PR & launch amplification",
    ],
    featured: false,
  },
];

export const featuredServices = services.filter((service) => service.featured);

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

export function getServiceHref(slug) {
  return `/services/${slug}`;
}
