"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface FlyingKitesProps {
  prefersReducedMotion: boolean;
}

interface Kite {
  id: string;
  color: string;
  top: string;
  duration: number;
  delay: number;
}

interface Bird {
  id: string;
  top: string;
  duration: number;
  delay: number;
}

const KITES: Kite[] = [
  { id: "kite-saffron", color: "#FF9933", top: "8%", duration: 28, delay: 0 },
  { id: "kite-white", color: "#F5F5F0", top: "16%", duration: 34, delay: 4 },
  { id: "kite-green", color: "#138808", top: "12%", duration: 31, delay: 8 },
];

const BIRDS: Bird[] = [
  { id: "bird-1", top: "20%", duration: 22, delay: 2 },
  { id: "bird-2", top: "24%", duration: 26, delay: 10 },
];

export default function FlyingKites({ prefersReducedMotion }: FlyingKitesProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!isHome || prefersReducedMotion) return null;

  const visibleKites = isMobile ? KITES.slice(0, 2) : KITES;
  const visibleBirds = isMobile ? BIRDS.slice(0, 1) : BIRDS;

  return (
    <div className="id-kites" aria-hidden="true">
      {visibleKites.map((kite, index) => (
        <div
          key={kite.id}
          className="id-kite"
          style={{
            top: kite.top,
            animationDuration: `${kite.duration}s`,
            animationDelay: `${kite.delay}s`,
          }}
        >
          <svg viewBox="0 0 40 40" className="id-kite__svg">
            <path d="M20 2 L36 20 L20 38 L4 20 Z" fill={kite.color} opacity={0.85} />
            <line x1="20" y1="2" x2="20" y2="38" stroke="rgba(0,0,0,0.15)" strokeWidth={0.5} />
            <line x1="4" y1="20" x2="36" y2="20" stroke="rgba(0,0,0,0.15)" strokeWidth={0.5} />
            <line x1="20" y1="38" x2="20" y2="40" stroke="rgba(0,0,0,0.2)" strokeWidth={0.5} />
          </svg>
          {index === 0 && !isMobile && (
            <span className="id-kite__label">Freedom • Unity • Progress</span>
          )}
        </div>
      ))}

      {visibleBirds.map((bird) => (
        <div
          key={bird.id}
          className="id-bird"
          style={{
            top: bird.top,
            animationDuration: `${bird.duration}s`,
            animationDelay: `${bird.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 12" className="id-bird__svg">
            <path
              d="M0 6 Q6 0 12 6 Q18 0 24 6"
              fill="none"
              stroke="rgba(30,30,30,0.35)"
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
