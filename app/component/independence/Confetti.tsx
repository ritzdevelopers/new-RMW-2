"use client";

import { useMemo } from "react";
import { TRICOLOR } from "@/lib/independence-day/config";

type Shape = "rect" | "circle" | "triangle";

const CONFETTI_COLORS = [TRICOLOR.saffron, TRICOLOR.white, TRICOLOR.green];

interface ConfettiProps {
  count?: number;
  reducedMotion?: boolean;
  seed?: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9.123 + seed * 41.77) * 43758.5453;
  return x - Math.floor(x);
}

function ConfettiPiece({
  shape,
  color,
  style,
  reducedMotion,
}: {
  shape: Shape;
  color: string;
  style: React.CSSProperties;
  reducedMotion?: boolean;
}) {
  const base = "absolute left-1/2 top-1/2";

  if (shape === "circle") {
    return (
      <span
        className={`${base} rounded-full ${reducedMotion ? "opacity-80" : "id-confetti-piece"}`}
        style={{ width: 5, height: 5, backgroundColor: color, ...style }}
      />
    );
  }

  if (shape === "triangle") {
    return (
      <span
        className={`${base} ${reducedMotion ? "opacity-80" : "id-confetti-piece"}`}
        style={{
          width: 0,
          height: 0,
          borderLeft: "3px solid transparent",
          borderRight: "3px solid transparent",
          borderBottom: `6px solid ${color}`,
          ...style,
        }}
      />
    );
  }

  return (
    <span
      className={`${base} ${reducedMotion ? "opacity-80" : "id-confetti-piece"}`}
      style={{ width: 4, height: 8, backgroundColor: color, ...style }}
    />
  );
}

export default function Confetti({ count = 24, reducedMotion = false, seed = 0 }: ConfettiProps) {
  const pieces = useMemo(() => {
    const shapes: Shape[] = ["rect", "circle", "triangle"];
    return Array.from({ length: count }, (_, i) => {
      const r1 = seededRandom(i + 5 + seed * 17);
      const r2 = seededRandom(i + 23 + seed * 9);
      const r3 = seededRandom(i + 47 + seed * 13);
      const angle = r1 * Math.PI * 2;
      const distance = 60 + r2 * 120;
      return {
        id: i,
        shape: shapes[i % 3],
        color: CONFETTI_COLORS[i % 3],
        x: `${Math.cos(angle) * distance}px`,
        y: `${Math.sin(angle) * distance + 40}px`,
        rot: `${r3 * 360}deg`,
        delay: `${r2 * 0.15}s`,
        duration: `${2 + r1 * 0.6}s`,
      };
    });
  }, [count, seed]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {pieces.map((p) => (
        <ConfettiPiece
          key={p.id}
          shape={p.shape}
          color={p.color}
          reducedMotion={reducedMotion}
          style={{
            ["--id-confetti-x" as string]: p.x,
            ["--id-confetti-y" as string]: p.y,
            ["--id-confetti-rot" as string]: p.rot,
            ["--id-confetti-delay" as string]: p.delay,
            ["--id-confetti-duration" as string]: p.duration,
          }}
        />
      ))}
    </div>
  );
}
