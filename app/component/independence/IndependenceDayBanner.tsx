import { independenceDayConfig, TRICOLOR } from "@/lib/independence-day/config";

function MiniAshokaChakra({ size = 11 }: { size?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => (
    <rect
      key={i}
      x={49}
      y={8}
      width={2}
      height={14}
      fill={TRICOLOR.chakra}
      transform={`rotate(${(360 / 24) * i} 50 50)`}
    />
  ));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden
      className="id-banner-chakra-spin shrink-0"
    >
      <circle cx={50} cy={50} r={42} fill="none" stroke={TRICOLOR.chakra} strokeWidth={4} />
      <circle cx={50} cy={50} r={12} fill="none" stroke={TRICOLOR.chakra} strokeWidth={3} />
      {spokes}
      <circle cx={50} cy={50} r={5} fill={TRICOLOR.chakra} />
    </svg>
  );
}

function Pigeon({ flip = false, size = 22 }: { flip?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="8 14 56 40"
      aria-hidden
      className="id-banner-pigeon-fly shrink-0 drop-shadow-[0_1px_2px_rgba(255,255,255,0.25)]"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g fill="#5A6687">
        {/* body */}
        <ellipse cx="34" cy="34" rx="10" ry="6" />
        {/* head */}
        <circle cx="46" cy="28" r="5" />
        {/* beak */}
        <path d="M51 27 L57 28 L51 30 Z" fill={TRICOLOR.saffron} />
        {/* tail */}
        <path d="M24 34 L10 30 L24 38 Z" />
        {/* back wing (flaps) */}
        <path
          className="id-banner-pigeon-wing-back"
          d="M30 30 C20 18, 6 16, 2 22 C10 24, 18 28, 28 34 Z"
        />
        {/* front wing (flaps opposite phase) */}
        <path
          className="id-banner-pigeon-wing-front"
          d="M32 32 C24 22, 12 22, 8 28 C16 28, 24 32, 34 36 Z"
        />
      </g>
    </svg>
  );
}

function FlagParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => {
    const left = ((i * 37 + 5) % 100);
    const delay = (i * 0.37) % 3.2;
    const duration = 2.4 + ((i * 13) % 5) * 0.3;
    const size = i % 3 === 0 ? 3 : 2;
    const hue = i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#ffd580" : "#c9ffd8";
    return { left, delay, duration, size, hue, key: i };
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.key}
          className="id-banner-particle-float absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-4px",
            width: p.size,
            height: p.size,
            backgroundColor: p.hue,
            boxShadow: `0 0 4px ${p.hue}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function IndependenceDayBanner() {
  return (
    <div
      role="region"
      aria-label="Independence Day announcement"
      className="id-banner-enter fixed inset-x-0 top-0 z-[120] h-[var(--independence-banner-height,28px)] overflow-visible shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
    >
      {/* Clipped layer: flag stripes + particles + shimmer stay inside the bar */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {/* Indian flag tricolor — saffron, white, green with wave */}
        <div className="id-banner-flag-sway id-banner-flag-wave absolute -inset-x-[4%] -inset-y-[10%] flex flex-col">
          <div
            className="id-banner-stripe-wave flex-1"
            style={{ backgroundColor: TRICOLOR.saffron, animationDelay: "0s" }}
          />
          <div
            className="id-banner-stripe-wave flex-1 bg-white"
            style={{ animationDelay: "0.12s" }}
          />
          <div
            className="id-banner-stripe-wave flex-1"
            style={{ backgroundColor: TRICOLOR.green, animationDelay: "0.24s" }}
          />
        </div>

        {/* Animated sparkle/light particles drifting up over the flag */}
        <FlagParticles />

        {/* Soft light sweep across the flag */}
        <div className="id-banner-shimmer pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      </div>

      {/* Pigeons — fly continuously across the flag */}
      <div className="id-banner-pigeon-lane pointer-events-none absolute inset-0 z-[3] overflow-visible">
        <div className="id-banner-pigeon-fly-ltr absolute bottom-0 left-0">
          <div className="id-banner-pigeon-bob-inner">
            <Pigeon size={22} />
          </div>
        </div>
        <div className="id-banner-pigeon-fly-rtl absolute bottom-0 left-0">
          <div className="id-banner-pigeon-bob-inner id-banner-pigeon-bob-inner-delayed">
            <Pigeon size={22} flip />
          </div>
        </div>
      </div>

      {/* Message + Chakra centered on the white band */}
      <div className="relative z-10 flex h-full items-center justify-center gap-1.5 px-3">
        <MiniAshokaChakra size={11} />
        <p
          className="id-banner-text-shimmer font-montserrat max-w-[calc(100%-1.5rem)] text-center text-[9px] font-semibold leading-tight tracking-wide sm:max-w-none sm:text-[10px] md:text-[11px]"
          style={{
            color: TRICOLOR.chakra,
            textShadow: "0 0 3px #fff, 0 0 6px #fff, 0 1px 1px rgba(255,255,255,0.9)",
          }}
        >
          {independenceDayConfig.bannerText}
        </p>
      </div>

      <style>{`
        .id-banner-particle-float {
          opacity: 0;
          animation-name: id-banner-particle-rise;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }
        @keyframes id-banner-particle-rise {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          15% { opacity: 0.9; }
          85% { opacity: 0.5; }
          100% { transform: translateY(-32px) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}