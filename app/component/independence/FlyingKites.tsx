"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TRICOLOR } from "@/lib/independence-day/config";

interface KiteProps {
  color: string;
  borderColor?: string;
  style: React.CSSProperties;
  tagline?: boolean;
  reducedMotion?: boolean;
}

function Kite({ color, borderColor, style, tagline, reducedMotion }: KiteProps) {
  return (
    <div
      className={`pointer-events-none absolute top-0 ${reducedMotion ? "" : "id-kite-animate"}`}
      style={style}
      aria-hidden
    >
      <div className="id-kite-body relative">
        <svg width="36" height="44" viewBox="0 0 36 44" className="drop-shadow-sm md:h-12 md:w-10">
          <polygon
            points="18,2 34,18 18,34 2,18"
            fill={color}
            stroke={borderColor ?? "rgba(255,255,255,0.35)"}
            strokeWidth="1"
          />
          <line x1="18" y1="34" x2="18" y2="42" stroke={borderColor ?? "rgba(255,255,255,0.4)"} strokeWidth="1" />
          <path
            d="M18 42 Q14 38 10 40 M18 42 Q22 38 26 40"
            fill="none"
            stroke={borderColor ?? "rgba(255,255,255,0.35)"}
            strokeWidth="0.75"
          />
        </svg>
        {tagline ? (
          <span className="absolute -bottom-1 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-montserrat text-[7px] font-light tracking-widest text-white/50 md:block">
            Freedom • Unity • Progress
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Bird({ style, reducedMotion }: { style: React.CSSProperties; reducedMotion?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 ${reducedMotion ? "" : "id-bird-animate"}`}
      style={style}
      aria-hidden
    >
      <svg width="20" height="12" viewBox="0 0 20 12" className="id-bird-wings opacity-60">
        <path
          d="M2 6 Q6 2 10 6 Q14 10 18 6"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

interface FlyingKitesProps {
  reducedMotion?: boolean;
}

export default function FlyingKites({ reducedMotion = false }: FlyingKitesProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (pathname !== "/") {
    return null;
  }

  const topOffset = "calc(var(--independence-banner-height, 0px) + 72px)";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[85] h-[180px] overflow-hidden md:h-[220px]"
      style={{ top: topOffset }}
      aria-hidden
    >
      <Kite
        color={TRICOLOR.saffron}
        reducedMotion={reducedMotion}
        tagline
        style={
          {
            "--id-kite-y": "8px",
            "--id-kite-drift": "-20px",
            "--id-kite-duration": "32s",
            "--id-kite-delay": "0s",
            "--id-kite-opacity": isMobile ? "0.25" : "0.4",
            "--id-kite-rot-start": "-10deg",
            "--id-kite-rot-end": "8deg",
          } as React.CSSProperties
        }
      />
      <Kite
        color={TRICOLOR.white}
        borderColor="rgba(255,255,255,0.2)"
        reducedMotion={reducedMotion}
        style={
          {
            "--id-kite-y": "48px",
            "--id-kite-drift": "-28px",
            "--id-kite-duration": "26s",
            "--id-kite-delay": "6s",
            "--id-kite-opacity": isMobile ? "0.2" : "0.35",
            "--id-kite-rot-start": "-6deg",
            "--id-kite-rot-end": "4deg",
          } as React.CSSProperties
        }
      />
      {!isMobile ? (
        <Kite
          color={TRICOLOR.green}
          reducedMotion={reducedMotion}
          style={
            {
              "--id-kite-y": "24px",
              "--id-kite-drift": "-16px",
              "--id-kite-duration": "30s",
              "--id-kite-delay": "12s",
              "--id-kite-opacity": "0.38",
              "--id-kite-rot-start": "-8deg",
              "--id-kite-rot-end": "6deg",
            } as React.CSSProperties
          }
        />
      ) : null}
      {!isMobile ? (
        <>
          <Bird
            reducedMotion={reducedMotion}
            style={
              {
                "--id-bird-y": "16px",
                "--id-bird-duration": "20s",
                "--id-bird-delay": "4s",
                "--id-bird-opacity": "0.3",
              } as React.CSSProperties
            }
          />
          <Bird
            reducedMotion={reducedMotion}
            style={
              {
                "--id-bird-y": "64px",
                "--id-bird-duration": "24s",
                "--id-bird-delay": "14s",
                "--id-bird-opacity": "0.28",
              } as React.CSSProperties
            }
          />
        </>
      ) : (
        <Bird
          reducedMotion={reducedMotion}
          style={
            {
              "--id-bird-y": "32px",
              "--id-bird-duration": "22s",
              "--id-bird-delay": "8s",
              "--id-bird-opacity": "0.22",
            } as React.CSSProperties
          }
        />
      )}
    </div>
  );
}
