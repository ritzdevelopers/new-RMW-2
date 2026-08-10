"use client";

import { useMemo } from "react";
import { TRICOLOR } from "@/lib/independence-day/config";

const TRAIL_COLORS = [TRICOLOR.saffron, TRICOLOR.white, TRICOLOR.green];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface ChakraTrailParticlesProps {
  reducedMotion?: boolean;
}

export default function ChakraTrailParticles({
  reducedMotion = false,
}: ChakraTrailParticlesProps) {
  const particles = useMemo(() => {
    const main = Array.from({ length: 56 }, (_, i) => {
      const r1 = seededRandom(i + 5);
      const r2 = seededRandom(i + 23);
      const r3 = seededRandom(i + 47);
      const baseAngle = -Math.PI * 0.25;
      const spread = Math.PI * 1.25;
      const angle = baseAngle + (r1 - 0.5) * spread;
      const distance = 32 + r2 * 88;
      return {
        id: `m-${i}`,
        color: TRAIL_COLORS[i % 3],
        x: `${Math.cos(angle) * distance}px`,
        y: `${Math.sin(angle) * distance}px`,
        size: 4 + Math.floor(r3 * 7),
        delay: `${(r3 * 0.55).toFixed(3)}s`,
        duration: `${(0.45 + r1 * 0.75).toFixed(3)}s`,
        round: i % 3 !== 0,
        sparkle: false,
      };
    });

    const sparkles = Array.from({ length: 36 }, (_, i) => {
      const r1 = seededRandom(i + 101);
      const r2 = seededRandom(i + 211);
      const r3 = seededRandom(i + 317);
      const baseAngle = -Math.PI * 0.22;
      const spread = Math.PI * 1.35;
      const angle = baseAngle + (r1 - 0.5) * spread;
      const distance = 20 + r2 * 96;
      return {
        id: `s-${i}`,
        color: TRAIL_COLORS[(i + 1) % 3],
        x: `${Math.cos(angle) * distance}px`,
        y: `${Math.sin(angle) * distance}px`,
        size: 2 + Math.floor(r3 * 4),
        delay: `${(r3 * 0.42).toFixed(3)}s`,
        duration: `${(0.35 + r1 * 0.55).toFixed(3)}s`,
        round: true,
        sparkle: true,
      };
    });

    return [...main, ...sparkles];
  }, []);

  if (reducedMotion) {
    return null;
  }

  return (
    <div className="id-chakra-trail pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`id-chakra-trail-particle absolute left-1/2 top-1/2 ${
            p.sparkle ? "id-chakra-trail-sparkle" : ""
          } ${p.round ? "rounded-full" : "rounded-[1px]"}`}
          style={{
            width: p.size,
            height: p.round ? p.size : p.size + 2,
            backgroundColor: p.color,
            boxShadow:
              p.color === TRICOLOR.white
                ? "0 0 5px rgba(13,19,52,0.45)"
                : `0 0 ${p.sparkle ? 6 : 9}px ${p.color}`,
            ["--trail-x" as string]: p.x,
            ["--trail-y" as string]: p.y,
            ["--trail-delay" as string]: p.delay,
            ["--trail-duration" as string]: p.duration,
          }}
        />
      ))}
    </div>
  );
}
