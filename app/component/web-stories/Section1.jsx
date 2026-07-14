"use client";

import React from "react";

const stories = [
  {
    src: "/web-stories/web-story-1.avif",
    title: "Why Newspaper Ads Still Work in 2025",
    body: [
      "📢 In a world of digital clutter, newspaper ads remain one of the most trusted and widely viewed media.",
      "📰 Backed by reader trust, physical visibility, and regional targeting, they still deliver results.",
    ],
    highlight: "coral",
  },
  {
    src: "/web-stories/web-story-2.avif",
    title: "Why FM Radio Ads Still Rock 🎙️",
    body: [
      "In a noisy world, radio reaches where visuals can’t.",
      "✅ Trusted voice",
      "✅ Hyper-local targeting",
      "✅ High repetition = high recall",
      "📻 FM Radio Ads are far from outdated — they’re evolving.",
    ],
    highlight: "#56ffe5",
  },
  {
    src: "/web-stories/web-story-3.avif",
    title: "What to Expect from a Professional Creative Agency in Delhi/NCR",
    body: [
      "Discover what to expect from a professional creative agency in Delhi/NCR. From branding and logo design to packaging and print advertising, Ritz Media World delivers creativity that sells, not just looks good.",
    ],
    highlight: "#c4b5fd",
  },
  {
    src: "/web-stories/web-story-4.avif",
    title: "Why INS Accreditation Matters",
    body: [
      "INS accreditation signals official recognition, direct publisher access, and rigorous standards. With Ritz Media World, your print campaigns gain credibility, reliability, and smoother execution from planning to publication.",
    ],
    highlight: "#fbbf24",
  },
];

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#000000",
  backgroundSize: "200% 200%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
};

const splitChars = (text) =>
  Array.from(text).map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="ws-char"
      style={{ "--char-index": index }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const splitWords = (text) =>
  text.split(/(\s+)/).map((part, index) => {
    if (/^\s+$/.test(part)) {
      return <span key={`space-${index}`}>{part}</span>;
    }

    return (
      <span
        key={`${part}-${index}`}
        className="ws-word"
        style={{ "--word-index": index }}
      >
        {part}
      </span>
    );
  });

const Section1 = () => {
  return (
    <section className="bg-white px-4 py-[35px] sm:px-6 md:px-8 md:py-[70px] lg:px-12">
      <style>{`
        .ws-card {
          --cover-timing: 0.5s;
          --cover-ease: cubic-bezier(0.66, 0.08, 0.19, 0.97);
          --cover-stagger: 0.15s;
          --text-timing: 0.75s;
          --text-stagger: 0.015s;
          --text-ease: cubic-bezier(0.38, 0.26, 0.05, 1.07);
          --title-stagger: 0.05s;
          --highlight: white;
          position: relative;
          overflow: hidden;
          aspect-ratio: 9 / 16;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
          transition: box-shadow 1s var(--cover-ease);
          outline: none;
        }

        .ws-card > * {
          z-index: 2;
        }

        .ws-card > img {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.8s cubic-bezier(0.66, 0.08, 0.19, 0.97);
        }

        .ws-card::before,
        .ws-card::after {
          content: "";
          width: 100%;
          height: 50%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          position: absolute;
          transform-origin: left;
          transform: scaleX(0);
          transition: all var(--cover-timing) var(--cover-ease);
          z-index: 1;
        }

        .ws-card::after {
          transition-delay: var(--cover-stagger);
          top: 50%;
        }

        .ws-card:hover,
        .ws-card:focus {
          box-shadow:
            0 5vw 6vw -9vw white,
            0 5.5vw 5vw -7.5vw var(--highlight),
            0 4vw 8vw -2vw rgba(50, 50, 80, 0.5),
            0 4vw 5vw -3vw rgba(0, 0, 0, 0.8);
        }

        .ws-card:hover::before,
        .ws-card:hover::after,
        .ws-card:focus::before,
        .ws-card:focus::after {
          transform: scaleX(1);
        }

        .ws-card:hover img,
        .ws-card:focus img {
          transform: scale(1.1);
        }

        .ws-card:hover .ws-char,
        .ws-card:hover .ws-word,
        .ws-card:focus .ws-char,
        .ws-card:focus .ws-word {
          opacity: 1;
          transform: translateY(0);
          color: inherit;
        }

        .ws-card:hover .ws-char,
        .ws-card:focus .ws-char {
          transition-delay: calc(0.1s + var(--char-index) * var(--title-stagger));
        }

        .ws-card:hover .ws-word,
        .ws-card:focus .ws-word {
          transition-delay: calc(0.1s + var(--word-index) * var(--text-stagger));
        }

        .ws-card-text {
          position: absolute;
          inset: 16px;
          top: auto;
          z-index: 2;
          color: #ffffff;
          font-family: Montserrat, sans-serif;
        }

        .ws-card-title {
          font-family: "League Spartan", sans-serif;
          font-size: clamp(26px, 2vw, 32px);
          font-weight: 700;
          line-height: normal;
          margin: 0 0 0.35em;
        }

        .ws-card-body {
          font-size: clamp(15px, 1.1vw, 17px);
          font-weight: 500;
          line-height: normal;
          margin: 0 0 0.45em;
        }

        .ws-card-body:last-child {
          margin-bottom: 0;
        }

        @media (min-width: 1024px) {
          .ws-card-title {
            font-size: 18px;
          }

          .ws-card-body {
            font-size: 12px;
          }
        }

        .ws-char,
        .ws-word {
          color: var(--highlight);
          display: inline-block;
          opacity: 0;
          position: relative;
          transform: translateY(20px);
          transition-property: transform, opacity, color;
          transition-timing-function: var(--text-ease);
          transition-duration: var(--text-timing), var(--text-timing), calc(var(--text-timing) * 2);
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 md:gap-12 lg:gap-14">
        <h1
          style={titleStyle}
          className="m-0 w-full text-center text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px]"
        >
          WEB STORIES
        </h1>

        <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {stories.map((story) => (
            <article
              key={story.src}
              tabIndex={0}
              className="ws-card w-full max-w-[320px] justify-self-center md:max-w-none"
              style={{ "--highlight": story.highlight }}
            >
              <img src={story.src} alt={story.title} draggable={false} />
              <div className="ws-card-text">
                <h2 className="ws-card-title">{splitChars(story.title)}</h2>
                {story.body.map((line) => (
                  <p key={line} className="ws-card-body">
                    {splitWords(line)}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section1;
