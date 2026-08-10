"use client";

import { useId } from "react";
import { TRICOLOR } from "@/lib/independence-day/config";

const SPOKE_COUNT = 24;
const SPOKE_COLORS = [TRICOLOR.saffron, TRICOLOR.white, TRICOLOR.green];
const CX = 50;
const CY = 50;
const OUTER_R = 46;
const INNER_R = 14;
const SPOKE_WIDTH = 2.2;

interface AshokaChakraProps {
  className?: string;
  size?: number;
  reducedMotion?: boolean;
}

export default function AshokaChakra({
  className = "",
  size = 120,
  reducedMotion = false,
}: AshokaChakraProps) {
  const gradientId = useId().replace(/:/g, "");

  const spokes = Array.from({ length: SPOKE_COUNT }, (_, i) => {
    const angle = (360 / SPOKE_COUNT) * i;
    return (
      <rect
        key={i}
        x={CX - SPOKE_WIDTH / 2}
        y={CY - OUTER_R}
        width={SPOKE_WIDTH}
        height={OUTER_R - INNER_R}
        fill={SPOKE_COLORS[i % 3]}
        transform={`rotate(${angle} ${CX} ${CY})`}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden
      className={`${reducedMotion ? "" : "id-chakra-spin"} ${className}`}
      style={{ transformOrigin: "center" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={TRICOLOR.saffron} />
          <stop offset="33%" stopColor={TRICOLOR.saffron} />
          <stop offset="33%" stopColor={TRICOLOR.white} />
          <stop offset="66%" stopColor={TRICOLOR.white} />
          <stop offset="66%" stopColor={TRICOLOR.green} />
          <stop offset="100%" stopColor={TRICOLOR.green} />
        </linearGradient>
      </defs>

      <circle
        cx={CX}
        cy={CY}
        r={OUTER_R}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={3}
      />
      <circle
        cx={CX}
        cy={CY}
        r={INNER_R}
        fill={TRICOLOR.white}
        stroke={TRICOLOR.green}
        strokeWidth={1.5}
      />
      {spokes}
      <circle cx={CX} cy={CY} r={4} fill={TRICOLOR.saffron} />
      <circle cx={CX} cy={CY} r={2} fill={TRICOLOR.green} />
    </svg>
  );
}
