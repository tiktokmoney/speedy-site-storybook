import { useMemo } from "react";

// Hardscaping-themed: small stones/pebbles drifting down the hero.
// Pure CSS animation via tailwind `animate-stone-fall`.
interface Stone {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
  shade: string;
  rounded: string;
}

const SHADES = [
  "linear-gradient(135deg, hsl(30 8% 55%), hsl(30 6% 32%))",
  "linear-gradient(135deg, hsl(40 10% 62%), hsl(35 8% 38%))",
  "linear-gradient(135deg, hsl(20 6% 48%), hsl(20 5% 26%))",
  "linear-gradient(135deg, hsl(40 12% 70%), hsl(35 8% 42%))",
  "linear-gradient(135deg, hsl(25 8% 40%), hsl(25 6% 22%))",
];

const ROUNDED = ["48% 52% 60% 40% / 55% 45% 55% 45%", "60% 40% 45% 55% / 50% 60% 40% 50%", "55% 45% 50% 50% / 45% 55% 45% 55%", "50%"];

export const FallingStones = ({ count = 22 }: { count?: number }) => {
  const stones = useMemo<Stone[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 6 + Math.random() * 14,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 120,
        spin: 180 + Math.random() * 540 * (Math.random() < 0.5 ? -1 : 1),
        shade: SHADES[Math.floor(Math.random() * SHADES.length)],
        rounded: ROUNDED[Math.floor(Math.random() * ROUNDED.length)],
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stones.map((s, i) => (
        <span
          key={i}
          className="absolute top-0 animate-stone-fall"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.shade,
            borderRadius: s.rounded,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            animationFillMode: "both",
            boxShadow: "0 1px 2px hsl(0 0% 0% / 0.4), inset -1px -2px 2px hsl(0 0% 0% / 0.3), inset 1px 1px 2px hsl(0 0% 100% / 0.15)",
            opacity: 0,
            ["--drift" as never]: `${s.drift}px`,
            ["--spin" as never]: `${s.spin}deg`,
          }}
        />
      ))}
    </div>
  );
};

export default FallingStones;
