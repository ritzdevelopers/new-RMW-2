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

export const servicesContactCta = {
  heading: "The Future Won't Build Itself",
  body: "Let's create something remarkable together.",
};

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
          src: "/digital-marketing/digital-banner.jpg",
          mobileSrc: "/digital-marketing/digital-marketing-banner.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "Taking brands where they've never been",
      body:
        "Visibility without strategy is just noise. We create data-driven digital experiences that build awareness, spark engagement, and accelerate growth. Through social media, SEO, performance marketing, and paid media, we help brands stay relevant, competitive, and impossible to ignore.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "Behind every metric is a strategy built with purpose. These results showcase how thoughtful content, targeted campaigns, and consistent optimization translate into stronger engagement, wider reach, and meaningful business growth. For us, performance isn't a promise, it's proof.",
      slides: [
        { src: "/digital-marketing/seo1.jpg", content: "SEO", subSlug: "search-engine-optimization-seo" },
        { src: "/digital-marketing/social-media.jpg", content: "Social Media", subSlug: "social-media-management" },
        { src: "/digital-marketing/orm.jpg", content: "ORM", subSlug: "orm-in-digital-marketing" },
        { src: "/digital-marketing/ppc1.jpg", content: "PPC", subSlug: "ppc-google-ads-agency" },
        { src: "/digital-marketing/lead-generation.jpg", content: "Lead Generation", subSlug: "lead-generation" },
        { src: "/digital-marketing/brand-awarness.jpg", content: "Brand Awareness", subSlug: "brand-awareness" },
      ],
    },
    mediaSection: {
      title: "PROOF, NOT PROMISES",
      video: {
        src: "/digital-marketing/digital-video.mp4",
        width: 561,
        height: 342,
      },
      description:
        "Behind every metric is a strategy built with purpose. These results showcase how thoughtful content, targeted campaigns, and consistent optimization translate into stronger engagement, wider reach, and meaningful business growth. For us, performance isn't a promise, it's proof.",
      image: {
        src: "/digital-marketing/rmw-29.jpg    ",
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
            src: "/digital-marketing/two.jpg",
            className: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
            aspectRatio: "672 / 355",
          },
          {
            src: "/digital-marketing/graph.jpg",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572", 
          },
          {
            src: "/digital-marketing/digital-1.jpg",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 965",
          },
        ],
      },
      imageContent: {
        background: "/digital-marketing/image%201005%20(14).png",
        heading:
          "The Future Won't Build Itself",
        body:
          "Let's create something remarkable together.",
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
      "Branding & identity development",
      "Graphic design",
      "Logo design",
      "Print advertising design",
      "Packaging design",
    ],
    featured: true,
    intro: {
      images: [
        {
          src: "/creative-services/creative-banner.jpg",
          mobileSrc: "/creative-services/creative-mobile.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "Design that defies convention",
      body: [
        "Great brands are not built by chance, they are designed with purpose. From brand identity and visual design to compelling campaigns and creative storytelling, we craft experiences that capture attention and leave a lasting impression.",
        "Every element we create is driven by strategy, shaped by creativity, and designed to make your brand stand apart in a crowded marketplace.",
      ],
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "Every visual we create is built with intent — from brand identity to campaign films. These highlights showcase how strong design, storytelling, and craft come together to elevate brands and leave a lasting impression.",
      slides: [
        {
          src: "/creative-services/branding.jpg",
          content: "Branding & identity development",
          subSlug: "branding-and-identity-development",
        },
        {
          src: "/creative-services/graphic-designer.jpg",
          content: "Graphic design",
          subSlug: "graphic-designing",
        },
        {
          src: "/creative-services/logo-design.jpg",
          content: "Logo design",
          subSlug: "logo-design",
        },
        {
          src: "/creative-services/print-advertising.jpg",
          content: "Print advertising design",
          subSlug: "print-advertisement-design",
        },
        {
          src: "/creative-services/packaging-design.jpg",
          content: "Packaging design",
          subSlug: "packaging-design",
        },
      ],
    },
    mediaSection: {
      title: "CRAFT, NOT COMPROMISE",
      video: {
        src: "/creative-services/creative-service-video.mp4",
        width: 561,
        height: 342,
      },
      description:
        "Every frame, layout, and visual we produce is shaped by strategy and refined by craft. From identity systems to campaign films, our work helps brands stand apart with design that feels distinctive, deliberate, and deeply on-brand.",
      image: {
        src: "/creative-services/creative-services-1.jpg",
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
          src: "/creative-services/image%201008.png",
          width: 509,
          height: 277,
          aspectRatio: "147 / 80",
        },
        rightImage: {
          src: "/creative-services/image%201007.png",
          width: 509,
        },
      },
      grid: {
        items: [
          {
            src: "/creative-services/creative-services-2.jpg",
            className: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
            aspectRatio: "672 / 355",
          },
          {
            src: "/creative-services/creative-services-3.jpg",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572",
          },
          {
            src: "/creative-services/creative-services-4.jpg",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 965",
          },
        ],
      },
      imageContent: {
        background: "/creative-services/image%201005%20(14).png",
        heading: "The Future Won't Build Itself",
        body: "Let's create something remarkable together.",
      },
    },
  },
  {
    slug: "print-advertising",
    number: "03",
    category: "Print Advertising",
    title: "Print Advertising",
    headline: "Ink Meets Impact",
    image: serviceImages[2],
    description:
      "High-impact print campaigns across newspapers, magazines, and outdoor — where craft, placement, and message still win the room.",
    highlights: [
      "Advertisement design",
      "Ad placement",
      "Copywriting",
      "Cost negotiation",
      "Ad size optimization",
      "Ad scheduling",
    ],
    featured: true,
    intro: {
      images: [
        {
          src: "/print-advertising/digital-banner.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "Where ink still wins the room",
      body:
        "Rumors of print's demise have been greatly exaggerated — it's simply moved from crowded to prestigious. We harness the unmatched credibility and focused engagement that print advertising uniquely offers, combining eye-catching visuals, persuasive copy, and strategic placements that capture attention and influence decisions.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "From newspaper spreads to magazine inserts, every print placement we manage is built with intent. These highlights showcase how strong design, sharp copy, and smart media buying come together to deliver visibility, credibility, and results that digital alone cannot replicate.",
      slides: [
        {
          src: "/navbar/print-services/advertizement-design.jpg",
          content: "Advertisement Design",
          subSlug: "advertisement-designing",
        },
        {
          src: "/navbar/print-services/ad-placement.jpg",
          content: "Ad Placement",
          subSlug: "ad-placements",
        },
        {
          src: "/navbar/print-services/copywriting.jpg",
          content: "Copywriting",
          subSlug: "copywriting",
        },
        {
          src: "/navbar/print-services/cost-negotiation.jpg",
          content: "Cost Negotiation",
          subSlug: "negotiating-rates",
        },
        {
          src: "/navbar/print-services/ad-size-optimization.jpg",
          content: "Ad Size Optimization",
          subSlug: "ad-size-optimization",
        },
        {
          src: "/navbar/print-services/ad-size-scheduling.jpg",
          content: "Ad Scheduling",
          subSlug: "advertisement-scheduling",
        },
      ],
    },
    mediaSection: {
      title: "IMPACT, NOT IMPRESSIONS",
      video: {
        src: "/print-advertising/digital-video.mp4",
        width: 561,
        height: 342,
      },
      description:
        "Print advertising demands more than a good layout — it needs the right message, the right placement, and the right timing. From ad design and copywriting to media buying and scheduling, our work helps brands stand out in newspapers and magazines with campaigns that feel credible, deliberate, and impossible to ignore.",
      image: {
        src: "/print-advertising/rmw-29.jpg",
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
          src: "/print-advertising/image%201008.png",
          width: 509,
          height: 277,
          aspectRatio: "147 / 80",
        },
        rightImage: {
          src: "/print-advertising/image%201007.png",
          width: 509,
        },
      },
      grid: {
        items: [
          {
            src: "/print-advertising/two.jpg",
            className: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
            aspectRatio: "672 / 355",
          },
          {
            src: "/print-advertising/graph.jpg",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572",
          },
          {
            src: "/print-advertising/digital-1.jpg",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 965",
          },
        ],
      },
      imageContent: {
        background: "/print-advertising/image%201005%20(14).png",
        heading: "The Future Won't Build Itself",
        body: "Let's create something remarkable together.",
      },
    },
  },
  {
    slug: "radio-advertising",
    number: "04",
    category: "Radio Advertising",
    title: "Radio Advertising",
    headline: "Voices That Travel",
    image: serviceImages[3],
    description:
      "Memorable radio spots and audio campaigns that build recall — scripted, produced, and placed across the right stations.",
    highlights: [
      "Advertising concept development",
      "Scriptwriting",
      "Voiceover casting",
      "Recording & production",
      "Media planning & buying",
      "Cost negotiations",
    ],
    featured: true,
    intro: {
      images: [
        {
          src: "/radio-advertising/radio-banner.jpg",
          mobileSrc: "/radio-advertising/radio-mobile-banner.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "When sound commands attention",
      body:
        "In a visually crowded world, audio remains the only way to command undivided attention. We develop compelling radio campaigns that break through the clutter, stay memorable, and stick in the consumer's head — turning airtime into impactful brand communication.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "Every radio spot we produce is built to be heard, remembered, and acted on. These highlights showcase how strong concepts, sharp scripts, and smart media buying come together to deliver reach, recall, and results on air.",
      slides: [
        {
          src: "/radio-advertising/advertising-concept.jpg",
          content: "Concept Development",
          subSlug: "advertisement-concept-development",
        },
        {
          src: "/radio-advertising/services-scriptwriting.jpg",
          content: "Scriptwriting",
          subSlug: "scriptwriting",
        },
        {
          src: "/radio-advertising/voice-over-casting.jpg",
          content: "Voiceover Casting",
          subSlug: "voiceover-casting",
        },
        {
          src: "/radio-advertising/rcording-production.jpg",
          content: "Recording & Production",
          subSlug: "recording-and-production",
        },
        {
          src: "/radio-advertising/media-planning.jpg",
          content: "Media Planning",
          subSlug: "media-planning-and-buying",
        },
        {
          src: "/radio-advertising/cost-negotion.jpg",
          content: "Cost Negotiations",
          subSlug: "radio-cost-negotiation-india",
        },
      ],
    },
    mediaSection: {
      title: "HEARD, NOT SKIPPED",
      video: {
        src: "/radio-advertising/radio-video-image.jpg",
        width: 561,
        height: 342,
      },
      description:
        "Radio advertising is about more than a voice on air — it demands the right script, the right talent, and the right placement. From concept to production and media buying, our work helps brands sound credible, confident, and unmistakably on-message.",
      image: {
        src: "/radio-advertising/radio-image-1.jpg",
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
          src: "/radio-advertising/image%201008.png",
          width: 509,
          height: 277,
          aspectRatio: "147 / 80",
        },
        rightImage: {
          src: "/radio-advertising/image%201007.png",
          width: 509,
        },
      },
      grid: {
        items: [
          {
            src: "/radio-advertising/radio-image-2.jpg",
            className: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
            aspectRatio: "672 / 355",
          },
          {
            src: "/radio-advertising/radio-image-3.jpg",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572",
          },
          {
            src: "/radio-advertising/radio-image-4.jpg",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 965",
          },
        ],
      },
      imageContent: {
        background: "/radio-advertising/image%201005%20(14).png",
        heading: "The Future Won't Build Itself",
        body: "Let's create something remarkable together.",
      },
    },
  },
  {
    slug: "contents-marketing",
    number: "05",
    category: "Content Marketing",
    title: "Content Marketing",
    headline: "Stories That Sell",
    image: serviceImages[4],
    description:
      "Stories that move people — editorial calendars, branded content, and narrative-led campaigns built to earn attention and trust.",
    highlights: [
      "Customized content strategy",
      "Email & newsletters marketing",
      "Asset creation & infographics",
      "Content promotion & optimization",
    ],
    featured: true,
    intro: {
      images: [
        {
          src: "/content-marketing/content-marketing-banner.jpg",
          mobileSrc: "/content-marketing/content-marketing-mobile-banner.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "Content with purpose",
      body:
        "Content without strategy is mere decoration. We develop content marketing strategies that not only inform but also persuade, inspire, and convert - across SEO content, social media, email, video, infographics, and promotional activity built for engagement and results.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "Every piece of content we create is designed to earn attention and drive action. These highlights showcase how strategy, storytelling, and distribution come together to build credibility, engagement, and measurable business growth.",
      slides: [
        {
          src: "/content-marketing/content-stretagy.jpg",
          content: "Content Strategy",
          subSlug: "content-marketing",
        },
        {
          src: "/content-marketing/email.jpg",
          content: "Email & Newsletters",
          subSlug: "email-and-newsletters-marketing",
        },
        {
          src: "/content-marketing/assest.jpg",
          content: "Assets & Infographics",
          subSlug: "asset-creation-and-infographics",
        },
        {
          src: "/content-marketing/promotion.jpg",
          content: "Promotion & Optimization",
          subSlug: "content-promotion-and-optimization",
        },
      ],
    },
    mediaSection: {
      title: "STORIES THAT CONVERT",
      video: {
        src: "/content-marketing/content-marketiing-video.mp4",
        width: 561,
        height: 342,
      },
      description:
        "Great content marketing is more than publishing - it is strategy, craft, and distribution working together. From editorial planning to asset creation and promotion, our work helps brands build trust, earn attention, and turn ideas into their most profitable asset.",
      image: {
        src: "/content-marketing/content-first.jpg",
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
          src: "/contents-marketing/image%201008.png",
          width: 509,
          height: 277,
          aspectRatio: "147 / 80",
        },
        rightImage: {
          src: "/contents-marketing/image%201007.png",
          width: 509,
        },
      },
      grid: {
        items: [
          {
            src: "/content-marketing/content-marketing-2.jpg",
            className: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
            aspectRatio: "672 / 355",
          },
          {
            src: "/content-marketing/content-marketing-3.jpg",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572",
          },
          {
            src: "/content-marketing/content-marketing-4.jpg",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 965",
          },
        ],
      },
      imageContent: {
        background: "/contents-marketing/image%201005%20(14).png",
        heading: "The Future Won't Build Itself",
        body: "Let's create something remarkable together.",
      },
    },
  },
  {
    slug: "web-designing-and-development",
    number: "06",
    category: "Web Development",
    title: "Web Development",
    headline: "Digital Front Door",
    image: serviceImages[5],
    description:
      "Fast, beautiful websites and digital products engineered for performance, accessibility, and seamless brand experiences.",
    highlights: [
      "UI/UX design",
      "Custom design & development",
      "E-commerce website development",
      "Landing page development",
      "WordPress web design",
    ],
    featured: true,
    intro: {
      images: [
        {
          src: "/web-designing-and-development/web-devlopment-1.jpg",
          mobileSrc: "/web-designing-and-development/web-developer-mobile-banner.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "Built for performance and conversion",
      body:
        "Your website is your brand's digital front door. We design and develop fast, beautiful, and conversion-focused websites and digital products - from UI/UX and custom builds to e-commerce, landing pages, and WordPress sites engineered for performance and growth.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "Every website we build is shaped by strategy and refined by craft. These highlights showcase how user-centric design, clean development, and performance-focused thinking come together to create digital experiences that convert.",
      slides: [
        {
          src: "/web-designing-and-development/ui-ux.jpg",
          content: "UI/UX Design",
          subSlug: "ui-ux-design",
        },
        {
          src: "/web-designing-and-development/custom-development.jpg",
          content: "Custom Development",
          subSlug: "custom-design-development",
        },
        {
          src: "/web-designing-and-development/e-commerce.jpg",
          content: "E-Commerce",
          subSlug: "e-commerce-web-designing",
        },
        {
          src: "/web-designing-and-development/landing-page-development.jpg",
          content: "Landing Pages",
          subSlug: "landing-page-development-services",
        },
        {
          src: "/web-designing-and-development/word-press.jpg",
          content: "WordPress",
          subSlug: "wordpress-web-designing",
        },
      ],
    },
    mediaSection: {
      title: "DESIGN THAT DELIVERS",
      video: {
        src: "https://otherassets.blob.core.windows.net/rmw/561px%20x%20342px.mp4",
        width: 561,
        height: 342,
      },
      description:
        "A great website is more than aesthetics - it is usability, speed, and conversion working in harmony. From UI/UX to custom development and e-commerce builds, our work helps brands launch digital experiences that feel polished, purposeful, and built to perform.",
      image: {
        src: "https://otherassets.blob.core.windows.net/rmw/720px%20x%20762px.mp4",
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
          src: "/web-designing-and-development/image%201008.png",
          width: 509,
          height: 277,
          aspectRatio: "147 / 80",
        },
        rightImage: {
          src: "/web-designing-and-development/image%201007.png",
          width: 509,
        },
      },
      grid: {
        items: [
          {
            src: "https://otherassets.blob.core.windows.net/rmw/699px%20x%20369px.mp4",
            className: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
            aspectRatio: "672 / 355",
          },
          {
            src: "https://otherassets.blob.core.windows.net/rmw/699px%20x%20574px.mp4",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572",
          },
          {
            src: "https://otherassets.blob.core.windows.net/rmw/615px%20x%20968px.mp4",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 965",
          },
        ],
      },
      imageContent: {
        background: "/web-designing-and-development/image%201005%20(14).png",
        heading: "The Future Won't Build Itself",
        body: "Let's create something remarkable together.",
      },
    },
  },
  {
    slug: "celebrity-endorsements",
    number: "07",
    category: "Celebrity Endorsements",
    title: "Celebrity Endorsements",
    headline: "Borrow the Spotlight",
    image: serviceImages[6],
    description:
      "Strategic celebrity partnerships that lend credibility and reach — from talent matchmaking to full campaign integration.",
    highlights: [
      "Celebrity identification",
      "Contract negotiations",
      "Creative collaboration",
      "Campaign integration",
      "Public relations",
      "Legal compliance",
    ],
    featured: true,
    intro: {
      images: [
        {
          src: "/celebrity-endorsements/digital-banner.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "When star power builds trust",
      body:
        "Celebrity endorsement services help brands earn trust, achieve recognition, and shape consumer behavior beyond glitz and glamour. We develop partnerships with the right talent to attract attention, build credibility, and turn admiration into action.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "Every celebrity partnership we build is strategic, authentic, and designed for impact. These highlights showcase how identification, negotiation, and integration come together to amplify brands across every channel.",
      slides: [
        {
          src: "/navbar/celebrity-endorsements/celebirty-identification.jpg",
          content: "Celebrity Identification",
          subSlug: "celebrity-identification-services",
        },
        {
          src: "/navbar/celebrity-endorsements/contract-negotiations.jpg",
          content: "Contract Negotiations",
          subSlug: "negotiating-contracts",
        },
        {
          src: "/navbar/celebrity-endorsements/creative-collaboration.jpg",
          content: "Creative Collaboration",
          subSlug: "creative-collaboration",
        },
        {
          src: "/navbar/celebrity-endorsements/compaign-integration.jpg",
          content: "Campaign Integration",
          subSlug: "campaign-integration",
        },
        {
          src: "/navbar/celebrity-endorsements/public-relations.jpg",
          content: "Public Relations",
          subSlug: "public-relations",
        },
        {
          src: "/navbar/celebrity-endorsements/legal-compliance.jpg",
          content: "Legal Compliance",
          subSlug: "legal-compliance",
        },
      ],
    },
    mediaSection: {
      title: "INFLUENCE, NOT JUST FAME",
      video: {
        src: "/celebrity-endorsements/digital-video.mp4",
        width: 561,
        height: 342,
      },
      description:
        "The right celebrity partnership is more than a face on a poster — it is strategy, storytelling, and seamless integration. From talent identification to legal compliance, our work helps brands borrow the spotlight with partnerships that feel credible and convert.",
      image: {
        src: "/celebrity-endorsements/rmw-29.jpg",
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
          src: "/celebrity-endorsements/image%201008.png",
          width: 509,
          height: 277,
          aspectRatio: "147 / 80",
        },
        rightImage: {
          src: "/celebrity-endorsements/image%201007.png",
          width: 509,
        },
      },
      grid: {
        items: [
          {
            src: "/celebrity-endorsements/two.jpg",
            className: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
            aspectRatio: "672 / 355",
          },
          {
            src: "/celebrity-endorsements/graph.jpg",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572",
          },
          {
            src: "/celebrity-endorsements/digital-1.jpg",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 965",
          },
        ],
      },
      imageContent: {
        background: "/celebrity-endorsements/image%201005%20(14).png",
        heading: "The Future Won't Build Itself",
        body: "Let's create something remarkable together.",
      },
    },
  },
  {
    slug: "influencer-marketing-agency-in-india",
    number: "08",
    category: "Influencer Marketing",
    title: "Influencer Marketing",
    headline: "Make People Listen",
    image: serviceImages[7],
    description:
      "Authentic creator partnerships that amplify your message — from discovery and briefing to campaign measurement.",
    highlights: [
      "Influencer identification",
      "Cost-benefit analysis",
      "Terms negotiations",
      "Creative collaboration",
      "Campaign integration",
      "Messaging optimization",
    ],
    featured: true,
    intro: {
      images: [
        {
          src: "/influencer-marketing-agency-in-india/digital-banner.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "Trust over hype",
      body:
        "Influencer marketing goes beyond hype - it is about trust, reach, and results. We connect brands with the right creators through partnerships that engage audiences, build credibility, and deliver measurable impact across every campaign.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "Every influencer campaign we manage is built for authenticity and performance. These highlights showcase how identification, negotiation, and creative collaboration drive awareness, engagement, and conversions.",
      slides: [
        {
          src: "/navbar/influender-marketing/influencer-identification.jpg",
          content: "Influencer Identification",
          subSlug: "identification-influence-marketing-agency",
        },
        {
          src: "/navbar/influender-marketing/cost-benefit-analysis.jpg",
          content: "Cost-Benefit Analysis",
          subSlug: "cost-benefit-analysis",
        },
        {
          src: "/navbar/influender-marketing/terms-negotiations.jpg",
          content: "Terms Negotiations",
          subSlug: "terms-negotiations",
        },
        {
          src: "/navbar/influender-marketing/creative-collaboration.jpg",
          content: "Creative Collaboration",
          subSlug: "creative-collaboration",
        },
        {
          src: "/navbar/influender-marketing/compaign-integration.jpg",
          content: "Campaign Integration",
          subSlug: "campaign-integration",
        },
        {
          src: "/navbar/influender-marketing/messaging-optimization.jpg",
          content: "Messaging Optimization",
          subSlug: "messaging-optimization",
        },
      ],
    },
    mediaSection: {
      layout: "fourGallery",
      title: "REACH THAT CONVERTS",
      description:
        "Great influencer marketing is more than follower counts - it is the right voice, the right message, and the right integration. From creator identification to campaign rollout, our work helps brands earn attention that turns into real business growth.",
      gallery: [
        {
          src: "/influencer-marketing-agency-in-india/rmw-29.jpg",
          label: "Creator Reach",
        },
        {
          src: "/influencer-marketing-agency-in-india/two.jpg",
          label: "Brand Story",
        },
        {
          src: "/influencer-marketing-agency-in-india/graph.jpg",
          label: "Campaign Data",
        },
        {
          src: "/influencer-marketing-agency-in-india/digital-1.jpg",
          label: "Social Impact",
        },
      ],
      imageContent: {
        background: "/influencer-marketing-agency-in-india/image%201005%20(14).png",
        heading: "The Future Won't Build Itself",
        body: "Let's create something remarkable together.",
      },
    },
  },
  {
    slug: "3d-rendering",
    number: "09",
    category: "3D Rendering Services",
    title: "3D Rendering Services",
    headline: "See It Before It Exists. Sell It Before It's Built.",
    image: serviceImages[8],
    description:
      "Experience photo-realistic 3D exterior renderings that bring your building designs to life.",
    highlights: [
      "3D Exterior Rendering",
      "3D Interior Rendering",
      "Aerial & Township",
      "3D Floor Plan Rendering",
      "Amenity & Landscape Rendering",
    ],
    featured: true,
    intro: {
      images: [
        {
          src: "/3d-rendering/render-3d-banner.jpg",
          mobileSrc: "/3d-rendering/mobile-size-banner.jpg",
          width: 1440,
          height: 630,
        },
      ],
      eyebrow: "Services",
      bannerTitle: "3D Rendering Services",
      body:
        "See It Before It Exists. Sell It Before It's Built. All innovations start as an idea — but they sell when viewed. At Ritz Media World, the vision is crystal clear: to produce imagery which enhances value and influence choice. Our 3D architecture rendering and real estate visualization approach goes above and beyond - seamlessly merging photorealistic 3D renders, walkthroughs and interior and exterior design visuals, coupled with high-quality CGI, to produce visuals that inspire decision-making and deliver tangible results. At Ritz Media World, technology and architecture collide. The outcome is far beyond an image; instead, these high-impact visuals have been developed to improve presentation, attract attention and ensure conversions quicker. Experience cutting-edge 3D + AI walkthroughs at 5X speed and 5X lower cost, now available at Ritz Media World — bringing your projects to life faster and more affordably than ever.",
      sidebarLabel: "Services",
    },
    carousel: {
      background: "/digital-marketing/bg-image.jpg",
      content:
        "We create your ideas into 3D visualizations and make your projects valuable, attract buyers and drive faster sales.",
      slides: [
        {
          src: "/3d-rendering/exterior.jpg",
          content: "3D Exterior Rendering",
          subSlug: "3d-exterior-rendering",
        },
        {
          src: "/3d-rendering/interior.jpg",
          content: "3D Interior Rendering",
          subSlug: "3d-interior-rendering",
        },
        {
          src: "/3d-rendering/aerial-and-townership.jpg",
          content: "Aerial & Township",
          subSlug: "aerial-township",
        },
        {
          src: "/3d-rendering/layout.jpg",
          content: "3D Floor Plan Rendering",
          subSlug: "3d-floor-plan-rendering",
        },
        {
          src: "/3d-rendering/amenites.jpg",
          content: "Amenity & Landscape Rendering",
          subSlug: "amenity-landscape-rendering",
        },
      ],
    },
    mediaSection: {
      title: "OUR 3D RENDERING SERVICES",
      video: {
        src: "/3d-rendering/3d-rendering-video.mp4",
        width: 561,
        height: 342,
      },
      description:
        "We create your ideas into 3D visualizations and make your projects valuable, attract buyers and drive faster sales.",
      image: {
        src: "/3d-rendering/3d-randering-4.jpg",
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
          src: "/services/3drendring/3d2.png",
          width: 509,
          height: 277,
          aspectRatio: "147 / 80",
        },
        rightImage: {
          src: "/services/3drendring/3d3.png",
          width: 509,
        },
      },
      grid: {
        items: [
          {
            src: "/3d-rendering/3d-rendering-1.jpg",
            className: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
            aspectRatio: "672 / 355",
          },
          {
            src: "/3d-rendering/3d-randering-3.jpg",
            className: "lg:col-span-2 lg:row-start-2",
            aspectRatio: "696 / 572",
          },
          {
            src: "/3d-rendering/3d-rendering-2.jpg",
            className: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
            aspectRatio: "613 / 965",
          },
        ],
      },
      imageContent: {
        background: "/services/3drendring/3d7.png",
        heading: "The Future Won't Build Itself",
        body: "Let's create something remarkable together.",
      },
    },
  },
];

export const featuredServices = services.filter((service) => service.featured);

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

export function getServiceHref(slug) {
  return `/services/${slug}`;
}




