"use client"

export function HeroInkBrush() {
  return (
    <div className="flex justify-center mb-20">
      <svg width="300" height="120" viewBox="0 0 300 120" className="opacity-70" xmlns="http://www.w3.org/2000/svg">
        {/* Single still brush stroke - no animation */}
        <path
          d="M 30 60 Q 75 45, 120 55 T 210 50 Q 240 48, 270 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary/50"
        />

        {/* Subtle water droplet accents - static */}
        <circle cx="150" cy="55" r="1.5" fill="currentColor" className="text-primary/30" />
        <circle cx="180" cy="50" r="1" fill="currentColor" className="text-primary/20" />

        {/* Flowing thin lines - static */}
        <path
          d="M 40 68 Q 90 72, 140 66"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/15"
        />
        <path
          d="M 160 64 Q 200 62, 250 68"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/15"
        />
      </svg>
    </div>
  )
}
