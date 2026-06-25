export const serviceImages = [
  "/services/Digital.jpg",
  "/services/Creative.jpg",
  "/services/print-service.jpg",
  "/services/radio.jpg",
  "/services/Content-Service.jpg",
  "/services/web-development.jpg",
  "/services/Celebrity.jpg",
  "/services/Content%20Marketing.jpg",
  "/services/3d-rendering-service.jpg",
];

export const services = [
  {
    slug: "digital-marketing",
    number: "01",
    category: "Digital Marketing",
    title: "Digital Marketing",
    headline: "Own the Attention",
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
    intro: {
      images: [
        {
          src: "/digital-marketing/bg-image.png",
          width: 1440,
          height: 630,
          maxHeight: "50vh",
        },
      ],
      eyebrow: "Taking brands where they've never been",
      body:
        "To connect premium brands with a new generation of digital-first consumers, we turn traditional media cues on their head — creating data-led campaigns that fuse performance and storytelling. The result? Funnel strategy that doubles as brand building, bold breaks into culture, and measurable growth across every market we touch. A launch approach that fuses product and lifestyle, sparks record-breaking engagement, and gives your brand a whole new kind of cultural relevance.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/Mask%20group%20(17).png",
      content:
        "Today's drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges. Today's drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges.",
      slides: [
        { src: "/digital-marketing/image%201005%20(7).png" },
        { src: "/digital-marketing/image%201005%20(9).png" },
        { src: "/digital-marketing/image%201005%20(8).png" },
      ],
    },
    mediaSection: {
      title: "CHANGING THE GAME",
      video: {
        src: "/digital-marketing/3205625-hd_1920_1080_25fps.mp4",
        width: 561,
        height: 342,
      },
      description:
        "Today's drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges. Today's drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges.",
      image: {
        src: "/digital-marketing/image%201005%20(6).png",
        width: 720.953,
        height: 762.712,
        aspectRatio: "69 / 73",
      },
      container: {
        width: 1154,
        height: 666,
        borderRadius: 16,
        background: "#FFFFFF",
        leftImage: {
          src: "/digital-marketing/image%201008.png",
          width: 509,
          height: 277,
          aspectRatio: "147 / 80",
        },
        rightImage: {
          src: "/digital-marketing/image%201007.png",
          width: 509,
        },
      },
      grid: {
        items: [
          {
            src: "/digital-marketing/image%201005%20(10).png",
            className: "lg:col-start-1 lg:row-start-1",
            aspectRatio: "336 / 355",
          },
          {
            src: "/digital-marketing/image%201005%20(11).png",
            className: "lg:col-start-2 lg:row-start-1",
            aspectRatio: "336 / 355",
          },
          {
            src: "/digital-marketing/image%201005%20(12).png",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572",
          },
          {
            src: "/digital-marketing/image%201005%20(13).png",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 950",
          },
        ],
      },
      imageContent: {
        background: "/digital-marketing/image%201005%20(14).png",
        heading:
          "To connect Johnnie Walker Blue Label with a new generation of luxury drinkers.",
        body:
          "Today's drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges. Today's drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges.",
      },
    },
  },
  {
    slug: "creative-services",
    number: "02",
    category: "Creative Services",
    title: "Creative Services",
    headline: "Distinct by Design",
    image: serviceImages[1],
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
    number: "03",
    category: "Print Advertising",
    title: "Print Advertising",
    headline: "Ink Meets Impact",
    image: serviceImages[2],
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
    slug: "radio-advertisement",
    number: "04",
    category: "Radio Advertising",
    title: "Radio Advertising",
    headline: "Voices That Travel",
    image: serviceImages[3],
    description:
      "Memorable radio spots and audio campaigns that build recall — scripted, produced, and placed across the right stations.",
    highlights: [
      "Scriptwriting & voice casting",
      "Audio production & mixing",
      "Station planning & buying",
      "Jingle & sonic branding",
    ],
    featured: true,
  },
  {
    slug: "content-marketing",
    number: "05",
    category: "Content Marketing",
    title: "Content Marketing",
    headline: "Stories That Sell",
    image: serviceImages[4],
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
    slug: "web-development",
    number: "06",
    category: "Web Development",
    title: "Web Development",
    headline: "Digital Front Door",
    image: serviceImages[5],
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
    slug: "celebrity-endorsement",
    number: "07",
    category: "Celebrity Endorsements",
    title: "Celebrity Endorsements",
    headline: "Borrow the Spotlight",
    image: serviceImages[6],
    description:
      "Strategic celebrity partnerships that lend credibility and reach — from talent matchmaking to full campaign integration.",
    highlights: [
      "Talent scouting & matchmaking",
      "Contract & negotiation support",
      "Campaign integration planning",
      "PR & launch amplification",
    ],
    featured: true,
  },
  {
    slug: "influencer-marketing",
    number: "08",
    category: "Influencer Marketing",
    title: "Influencer Marketing",
    headline: "Make People Listen",
    image: serviceImages[7],
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
    slug: "3d-rendering",
    number: "09",
    category: "3D Rendering",
    title: "3D Rendering",
    headline: "See The Unbuilt",
    image: serviceImages[8],
    description:
      "Photorealistic 3D visualizations that bring unbuilt spaces and products to life — before a single brick is laid or prototype is made.",
    highlights: [
      "Architectural & interior renders",
      "Product & concept visualization",
      "Animation & walkthrough films",
      "Material, lighting & scene design",
    ],
    featured: true,
  },
];

export const featuredServices = services.filter((service) => service.featured);

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

export function getServiceHref(slug) {
  return `/services/${slug}`;
}
