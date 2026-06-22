"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const cards = [
  {
    id: 1,
    number: "01",
    title: "NIGHTSOAR",
    subtitle: "Dark Elevation",
    palette: ["#1a1a2e", "#16213e", "#0f3460", "#533483"],
    hex: ["#0F3460", "#533483"],
    bg: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #533483 100%)",
    accent: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.4)",
  },
  {
    id: 2,
    number: "02",
    title: "SOFTBLAZE",
    subtitle: "Warm Contrast",
    palette: ["#1a0a00", "#c0392b", "#e74c3c", "#f0e6d3"],
    hex: ["#FF8800", "#F0E6C9"],
    bg: "linear-gradient(135deg, #1a0800 0%, #c0392b 45%, #e74c3c 75%, #f0e6d3 100%)",
    accent: "#ef4444",
    glow: "rgba(239, 68, 68, 0.5)",
  },
  {
    id: 3,
    number: "03",
    title: "MAINFLUX",
    subtitle: "Electric Flow",
    palette: ["#001a0f", "#00471b", "#00b341", "#a8ff78"],
    hex: ["#00B341", "#A8FF78"],
    bg: "linear-gradient(135deg, #001a0f 0%, #00471b 50%, #00b341 100%)",
    accent: "#22c55e",
    glow: "rgba(34, 197, 94, 0.4)",
  },
  {
    id: 4,
    number: "04",
    title: "CRYOVEX",
    subtitle: "Arctic Depth",
    palette: ["#000d1a", "#003366", "#0066cc", "#66b2ff"],
    hex: ["#0066CC", "#66B2FF"],
    bg: "linear-gradient(135deg, #000d1a 0%, #003366 50%, #0066cc 100%)",
    accent: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: 5,
    number: "05",
    title: "AURATONE",
    subtitle: "Golden Haze",
    palette: ["#1a1000", "#4a3000", "#c8860a", "#ffd700"],
    hex: ["#C8860A", "#FFD700"],
    bg: "linear-gradient(135deg, #1a1000 0%, #4a3000 50%, #c8860a 100%)",
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.4)",
  },
];

const AUTOPLAY_MS = 3000;

export default function Slider() {
  const [active, setActive] = useState(1);
  const [prev, setPrev] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const timerRef = useRef(null);
  const total = cards.length;

  const go = useCallback(
    (dir) => {
      setPrev(active);
      setActive((a) => (a + dir + total) % total);
    },
    [active, total]
  );

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
  }, [go]);

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [go]);

  const handleDragStart = (e) => {
    dragStart.current = e.touches ? e.touches[0].clientX : e.clientX;
    setDragging(true);
  };

  const handleDragEnd = (e) => {
    if (!dragging || dragStart.current === null) return;
    const endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;
    const delta = endX - dragStart.current;
    if (Math.abs(delta) > 50) {
      go(delta < 0 ? 1 : -1);
      resetTimer();
    }
    setDragging(false);
    dragStart.current = null;
  };

  const getCardStyle = (i) => {
    const diff = ((i - active + total) % total + total) % total;
    const normalized = diff > total / 2 ? diff - total : diff;

    if (normalized === 0) {
      return {
        transform: "translateX(0%) rotateY(0deg) scale(1)",
        zIndex: 10,
        opacity: 1,
        filter: "brightness(1)",
        pointerEvents: "auto",
      };
    }
    if (normalized === 1 || normalized === -1) {
      const side = normalized > 0 ? 1 : -1;
      return {
        transform: `translateX(${side * 95}%) rotateY(${side * 35}deg) scale(0.72)`,
        zIndex: 5,
        opacity: 1,
        filter: "brightness(0.6)",
        pointerEvents: "auto",
      };
    }
    return {
      transform: "translateX(0%) scale(0.4)",
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
    };
  };

  const activeCard = cards[active];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at 50% 30%, ${activeCard.glow} 0%, #0a0a0a 55%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Mono', 'Courier New', monospace",
        overflow: "hidden",
        padding: "2rem 1rem",
        transition: "background 0.8s ease",
        position: "relative",
      }}
    >
      {/* Background ambient blobs */}
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: activeCard.glow,
          filter: "blur(120px)",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.35,
          transition: "background 0.8s ease",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <p
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: 11,
          letterSpacing: "0.35em",
          marginBottom: "2.5rem",
          textTransform: "uppercase",
        }}
      >
        SHADES OF MOTTO
      </p>

      {/* 3D Stage */}
      <div
        style={{
          perspective: "1200px",
          width: "100%",
          maxWidth: 700,
          height: 380,
          position: "relative",
          cursor: dragging ? "grabbing" : "grab",
          overflow: "hidden",
        }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => {
          setDragging(false);
          dragStart.current = null;
        }}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {cards.map((card, i) => {
            const style = getCardStyle(i);
            const isActive = i === active;
            return (
              <div
                key={card.id}
                onClick={() => {
                  if (!isActive) {
                    const diff =
                      ((i - active + total) % total + total) % total;
                    const normalized =
                      diff > total / 2 ? diff - total : diff;
                    go(normalized);
                    resetTimer();
                  }
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 240,
                  height: 330,
                  marginLeft: -120,
                  marginTop: -165,
                  borderRadius: 20,
                  overflow: "hidden",
                  transition:
                    "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.65s ease, filter 0.65s ease",
                  ...style,
                  background: card.bg,
                  boxShadow: isActive
                    ? `0 0 60px ${card.glow}, 0 20px 60px rgba(0,0,0,0.6)`
                    : "0 10px 40px rgba(0,0,0,0.5)",
                  cursor: isActive ? "grab" : "pointer",
                }}
              >
                {/* Card inner */}
                <div
                  style={{
                    padding: "1.4rem 1.2rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Top: number + title */}
                  <div>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 13,
                        letterSpacing: "0.1em",
                        margin: "0 0 6px",
                      }}
                    >
                      ⓪{card.number.slice(1)}
                    </p>
                    <h2
                      style={{
                        color: "#fff",
                        fontSize: 26,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        margin: 0,
                        lineHeight: 1.1,
                      }}
                    >
                      {card.title}
                    </h2>
                  </div>

                  {/* Middle: abstract fill */}
                  {isActive && (
                    <div
                      style={{
                        flex: 1,
                        margin: "1rem 0",
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "rgba(0,0,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 36,
                        minHeight: 90,
                      }}
                    >
                      <span style={{ opacity: 0.5, filter: "blur(1px)" }}>
                        ▶
                      </span>
                    </div>
                  )}

                  {/* Bottom: hex palette blocks */}
                  <div>
                    {card.hex.map((h) => (
                      <div
                        key={h}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 18,
                            borderRadius: 4,
                            background: h,
                            border: "1px solid rgba(255,255,255,0.2)",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: 10,
                            letterSpacing: "0.1em",
                          }}
                        >
                          • HEX {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination dots */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: "2rem",
        }}
      >
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPrev(active);
              setActive(i);
              resetTimer();
            }}
            style={{
              width: i === active ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background:
                i === active ? activeCard.accent : "rgba(255,255,255,0.25)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Timer bar */}
      <div
        style={{
          width: 180,
          height: 2,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 1,
          marginTop: "1rem",
          overflow: "hidden",
        }}
      >
        <div
          key={active}
          style={{
            height: "100%",
            background: activeCard.accent,
            borderRadius: 1,
            animation: `timerBar ${AUTOPLAY_MS}ms linear forwards`,
          }}
        />
      </div>

      {/* Nav arrows */}
      <div
        style={{ display: "flex", gap: 16, marginTop: "1.2rem" }}
      >
        {["←", "→"].map((arrow, idx) => (
          <button
            key={arrow}
            onClick={() => {
              go(idx === 0 ? -1 : 1);
              resetTimer();
            }}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: 8,
              width: 40,
              height: 36,
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "rgba(255,255,255,0.18)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "rgba(255,255,255,0.08)")
            }
          >
            {arrow}
          </button>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        @keyframes timerBar {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}
