"use client";

import { useMemo } from "react";
import { TRICOLOR } from "@/lib/independence-day/config";

const PARTICLE_COLORS = [TRICOLOR.saffron, TRICOLOR.white, TRICOLOR.green];

interface TricolorParticlesProps {
  count?: number;
  reducedMotion?: boolean;
  seed?: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function TricolorParticles({
  count = 30,
  reducedMotion = false,
  seed = 0,
}: TricolorParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r1 = seededRandom(i + 1 + seed * 13);
        const r2 = seededRandom(i + 17 + seed * 7);
        const r3 = seededRandom(i + 31 + seed * 11);
        return {
          id: i,
          color: PARTICLE_COLORS[i % 3],
          left: `${20 + r1 * 60}%`,
          top: `${35 + r2 * 30}%`,
          size: 3 + Math.floor(r3 * 4),
          x: `${(r1 - 0.5) * 80}px`,
          y: `${-60 - r2 * 100}px`,
          delay: `${r3 * 0.4}s`,
          duration: `${2 + r1 * 0.8}s`,
          opacity: 0.7 + r2 * 0.25,
        };
      }),
    [count, seed]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${reducedMotion ? "opacity-70" : "id-particle"}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: p.color === TRICOLOR.white ? "0 0 2px rgba(0,0,0,0.15)" : undefined,
            ["--id-particle-x" as string]: p.x,
            ["--id-particle-y" as string]: p.y,
            ["--id-particle-delay" as string]: p.delay,
            ["--id-particle-duration" as string]: p.duration,
            ["--id-particle-opacity" as string]: String(p.opacity),
          }}
        />
      ))}
    </div>
  );
}
