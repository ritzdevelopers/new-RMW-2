"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import AshokaChakra from "./AshokaChakra";

interface FreedomCelebrationProps {
  active: boolean;
  prefersReducedMotion: boolean;
  onComplete: () => void;
}

interface Particle {
  id: number;
  left: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  drift: number;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: "rect" | "circle" | "triangle";
  delay: number;
  rotation: number;
}

const TRICOLOR = ["#FF9933", "#FFFFFF", "#138808"];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 4 + Math.random() * 5,
    color: TRICOLOR[i % TRICOLOR.length],
    delay: Math.random() * 0.6,
    duration: 1.8 + Math.random() * 1.2,
    drift: (Math.random() - 0.5) * 60,
  }));
}

function createConfetti(count: number): ConfettiPiece[] {
  const shapes: ConfettiPiece["shape"][] = ["rect", "circle", "triangle"];
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i + (Math.random() * 14 - 7);
    const distance = 60 + Math.random() * 90;
    const radians = (angle * Math.PI) / 180;
    return {
      id: i,
      x: Math.cos(radians) * distance,
      y: Math.sin(radians) * distance,
      size: 5 + Math.random() * 5,
      color: TRICOLOR[i % TRICOLOR.length],
      shape: shapes[i % shapes.length],
      delay: Math.random() * 0.15,
      rotation: Math.random() * 360,
    };
  });
}

export default function FreedomCelebration({
  active,
  prefersReducedMotion,
  onComplete,
}: FreedomCelebrationProps) {
  const [showText, setShowText] = useState(false);

  const particles = useMemo(
    () => (active && !prefersReducedMotion ? createParticles(30) : []),
    [active, prefersReducedMotion]
  );
  const confetti = useMemo(
    () => (active && !prefersReducedMotion ? createConfetti(24) : []),
    [active, prefersReducedMotion]
  );

  useEffect(() => {
    if (!active) {
      setShowText(false);
      return;
    }

    const textTimer = setTimeout(() => setShowText(true), prefersReducedMotion ? 100 : 500);
    const endTimer = setTimeout(onComplete, prefersReducedMotion ? 1400 : 2800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(endTimer);
    };
  }, [active, prefersReducedMotion, onComplete]);

  if (!active) return null;

  return (
    <div className="id-celebration" role="status" aria-live="polite">
      <div className="id-celebration__stage">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="id-particle"
            style={
              {
                left: `${particle.left}%`,
                width: particle.size,
                height: particle.size,
                background: particle.color,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                "--id-drift": `${particle.drift}px`,
              } as CSSProperties
            }
          />
        ))}

        {confetti.length > 0 && (
          <div className="id-confetti-burst">
            {confetti.map((piece) => (
              <span
                key={piece.id}
                className={`id-confetti id-confetti--${piece.shape}`}
                style={
                  {
                    width: piece.size,
                    height: piece.shape === "triangle" ? piece.size * 0.9 : piece.size,
                    background: piece.shape === "triangle" ? "transparent" : piece.color,
                    borderBottomColor: piece.shape === "triangle" ? piece.color : undefined,
                    animationDelay: `${piece.delay}s`,
                    "--id-x": `${piece.x}px`,
                    "--id-y": `${piece.y}px`,
                    "--id-rotation": `${piece.rotation}deg`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        )}

        <div className="id-chakra-wrap">
          <AshokaChakra />
        </div>

        <div className={`id-celebration__text ${showText ? "id-celebration__text--visible" : ""}`}>
          <p className="id-celebration__headline">Jai Hind 🇮🇳</p>
          <p className="id-celebration__subline">Freedom • Unity • Progress</p>
        </div>
      </div>
    </div>
  );
}
