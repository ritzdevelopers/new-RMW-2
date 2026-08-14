"use client";

import { Rozha_One } from "next/font/google";
import { independenceDayConfig, TRICOLOR } from "@/lib/independence-day/config";
import "./independence-day-banner-premium.css";

const hindiSloganFont = Rozha_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  display: "swap",
});

function SloganLotusIcon() {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      aria-hidden
      className="id-banner-slogan-icon id-banner-slogan-icon-lotus"
    >
      {petals.map((rotation) => (
        <ellipse
          key={rotation}
          cx="12"
          cy="8.5"
          rx="2.3"
          ry="5.8"
          fill={TRICOLOR.green}
          transform={`rotate(${rotation} 12 12)`}
        />
      ))}
      <circle cx="12" cy="11.5" r="2.2" fill={TRICOLOR.saffron} />
      <path d="M9.5 14.5 Q12 17.5 14.5 14.5" fill={TRICOLOR.green} />
      <path
        d="M12 14.5 V18.5"
        stroke={TRICOLOR.green}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SloganUnityChakraIcon() {
  const spokes = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      aria-hidden
      className="id-banner-slogan-icon id-banner-slogan-icon-unity"
    >
      <path
        d="M12 2.5 A9.5 9.5 0 0 1 21.5 12"
        fill="none"
        stroke={TRICOLOR.saffron}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M21.5 12 A9.5 9.5 0 0 1 12 21.5"
        fill="none"
        stroke={TRICOLOR.white}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M12 21.5 A9.5 9.5 0 0 1 2.5 12 A9.5 9.5 0 0 1 12 2.5"
        fill="none"
        stroke={TRICOLOR.green}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="29.9 59.8"
      />
      <circle
        cx="12"
        cy="12"
        r="5.2"
        fill="none"
        stroke={TRICOLOR.chakra}
        strokeWidth="1.1"
      />
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="12"
          y1="7.2"
          x2="12"
          y2="12"
          stroke={TRICOLOR.chakra}
          strokeWidth="0.85"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="1.1" fill={TRICOLOR.chakra} />
    </svg>
  );
}

function AshokaChakra({ size = 22 }: { size?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => (
    <line
      key={i}
      x1="50"
      y1="18"
      x2="50"
      y2="50"
      stroke={TRICOLOR.chakra}
      strokeWidth="2"
      transform={`rotate(${i * 15} 50 50)`}
    />
  ));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden
      className="id-banner-chakra-icon shrink-0"
    >
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke={TRICOLOR.chakra}
        strokeWidth="4"
      />

      {spokes}

      <circle
        cx="50"
        cy="50"
        r="7"
        fill="none"
        stroke={TRICOLOR.chakra}
        strokeWidth="3"
      />

      <circle
        cx="50"
        cy="50"
        r="2.5"
        fill={TRICOLOR.chakra}
      />
    </svg>
  );
}

function Pigeon({
  flip = false,
  size = 24,
  delay = "0s",
}: {
  flip?: boolean;
  size?: number;
  delay?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 70 55"
      aria-hidden
      className="id-pigeon"
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        animationDelay: delay,
      }}
    >
      {/* Body */}
      <ellipse
        cx="38"
        cy="35"
        rx="17"
        ry="10"
        fill="rgba(255,255,255,0.92)"
      />

      {/* Head */}
      <circle
        cx="52"
        cy="27"
        r="8"
        fill="rgba(255,255,255,0.96)"
      />

      {/* Eye */}
      <circle
        cx="55"
        cy="25"
        r="1.4"
        fill="#263238"
      />

      {/* Beak */}
      <path
        d="M59 28 L67 31 L59 33 Z"
        fill="#f4a340"
      />

      {/* Tail */}
      <path
        d="M22 34 L7 27 L13 37 L6 43 L25 40 Z"
        fill="rgba(255,255,255,0.9)"
      />

      {/* Back wing */}
      <path
        className="id-pigeon-wing-back"
        d="M36 32 C28 20, 17 16, 10 22 C18 25, 26 31, 35 38 Z"
        fill="rgba(255,255,255,0.82)"
      />

      {/* Front wing */}
      <path
        className="id-pigeon-wing-front"
        d="M38 34 C30 24, 21 23, 16 29 C23 29, 29 34, 39 39 Z"
        fill="rgba(255,255,255,0.96)"
      />
    </svg>
  );
}

function CelebrationParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => {
    const left = (i * 41 + 7) % 100;
    const delay = (i * 0.27) % 4;
    const duration = 2.8 + ((i * 17) % 5) * 0.25;

    const colors = [
      TRICOLOR.white,
      TRICOLOR.saffron,
      TRICOLOR.white,
      TRICOLOR.green,
      TRICOLOR.white,
    ];

    return {
      key: i,
      left,
      delay,
      duration,
      size: i % 5 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
      color: colors[i % colors.length],
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.key}
          className="id-banner-float-particle"
          style={{
            left: `${p.left}%`,
            bottom: "-5px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function SparkBurst({
  left,
  top,
  delay,
}: {
  left: string;
  top: string;
  delay: string;
}) {
  return (
    <div
      className="id-spark-burst"
      style={{
        left,
        top,
        animationDelay: delay,
      }}
    >
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function IndependenceDayBanner() {
  return (
    <>
      <div
        role="region"
        aria-label="Independence Day announcement — वन्दे मातरम्, जय हिन्द"
        className="
          id-banner-enter
          fixed inset-x-0 top-0 z-[120]
          h-[var(--independence-banner-height,32px)]
          overflow-hidden
        "
      >
        {/* =====================================================
            PREMIUM BACKGROUND
        ====================================================== */}

        <div className="absolute inset-0 id-banner-bg">

          <div className="id-tricolor-stripes" aria-hidden="true">
            <div className="id-tricolor-layer id-saffron" />
            <div className="id-tricolor-layer id-white" />
            <div className="id-tricolor-layer id-green" />
          </div>

          {/* Flowing fabric highlights */}
          <div className="id-fabric-wave id-fabric-wave-1" />
          <div className="id-fabric-wave id-fabric-wave-2" />

          {/* Moving light */}
          <div className="id-light-sweep" />

          {/* Soft center glow */}
          <div className="id-center-glow" />
        </div>

        {/* =====================================================
            PARTICLES
        ====================================================== */}

        <CelebrationParticles />

        {/* =====================================================
            SMALL CELEBRATION BURSTS
        ====================================================== */}

        <SparkBurst
          left="14%"
          top="3px"
          delay="0s"
        />

        <SparkBurst
          left="82%"
          top="4px"
          delay="1.8s"
        />

        {/* =====================================================
            FLYING PIGEONS
        ====================================================== */}

        <div className="absolute inset-0 pointer-events-none">
          <Pigeon
            size={19}
            delay="0s"
          />

          <Pigeon
            size={15}
            flip
            delay="2.2s"
          />

          <Pigeon
            size={12}
            delay="4.5s"
          />
        </div>

        {/* =====================================================
            CORNER HINDI SLOGANS
        ====================================================== */}

        <div className="id-banner-slogan-group id-banner-slogan-group-left" aria-hidden>
          <SloganLotusIcon />
          <span className={`id-banner-slogan-text ${hindiSloganFont.className}`}>
            वन्दे मातरम्
          </span>
        </div>

        <div className="id-banner-slogan-group id-banner-slogan-group-right" aria-hidden>
          <span className={`id-banner-slogan-text ${hindiSloganFont.className}`}>
            जय हिन्द
          </span>
          <SloganUnityChakraIcon />
        </div>

        {/* =====================================================
            CENTER CONTENT
        ====================================================== */}

        <div
          className="
            relative z-20
            flex h-full
            items-center justify-center
            px-3
          "
        >
          <div className="id-content-pill-wrap">
            <div className="id-content-pill">
              <span className="id-content-pill-shine" aria-hidden />
              <div className="id-content-pill-inner">
                <AshokaChakra size={20} />

                <span className="id-divider" aria-hidden />

                <p
                  className="
                    id-banner-text
                    font-montserrat
                    text-[9px]
                    sm:text-[10px]
                    md:text-[11px]
                    font-bold
                    leading-none
                    tracking-[0.08em]
                  "
                >
                  {independenceDayConfig.bannerText}
                </p>

                <span className="id-divider" aria-hidden />

                <span className="id-mini-star" aria-hidden>
                  ✦
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM PREMIUM EDGE
        ====================================================== */}

        <div className="id-bottom-glow" />
      </div>
    </>
  );
}