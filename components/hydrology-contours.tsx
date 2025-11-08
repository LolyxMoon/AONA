"use client"

export function HydrologyContours() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none opacity-100 -z-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0 100 Q 200 80, 400 100 T 800 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-primary/10 contour-line"
      />
      <path
        d="M 0 200 Q 250 180, 500 200 T 1000 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-primary/8 contour-line"
        style={{ animationDelay: "5s" }}
      />
      <path
        d="M 0 350 Q 300 320, 600 350 T 1200 350"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-primary/8 contour-line"
        style={{ animationDelay: "10s" }}
      />
      <path
        d="M 0 500 Q 200 470, 400 500 T 800 500"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-primary/6 contour-line"
        style={{ animationDelay: "15s" }}
      />

      {/* Flowing network lines suggesting underground aquifers */}
      <path
        d="M 100 0 Q 120 150, 100 300 T 100 600"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
        className="text-secondary/8 contour-line"
        style={{ animationDelay: "2s" }}
      />
      <path
        d="M 400 0 Q 420 200, 400 400 T 400 800"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
        className="text-secondary/6 contour-line"
        style={{ animationDelay: "7s" }}
      />
      <path
        d="M 700 0 Q 680 180, 700 360 T 700 720"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
        className="text-secondary/6 contour-line"
        style={{ animationDelay: "12s" }}
      />

      {/* Network node pulses */}
      <circle cx="200" cy="150" r="3" fill="currentColor" className="text-primary/20 network-pulse" />
      <circle
        cx="500"
        cy="300"
        r="3"
        fill="currentColor"
        className="text-primary/20 network-pulse"
        style={{ animationDelay: "1s" }}
      />
      <circle
        cx="800"
        cy="200"
        r="3"
        fill="currentColor"
        className="text-primary/20 network-pulse"
        style={{ animationDelay: "2s" }}
      />
    </svg>
  )
}
