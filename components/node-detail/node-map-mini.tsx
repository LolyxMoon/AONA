import Link from "next/link"
import type { NodeMeta } from "@/lib/mock"

interface NodeMapMiniProps {
  node: NodeMeta
}

export function NodeMapMini({ node }: NodeMapMiniProps) {
  return (
    <div>
      <h3 className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-4">Location</h3>

      {/* Mini Map Placeholder */}
      <div className="relative aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded border border-border/30 mb-4 overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.15,
          }}
        />

        {/* Node marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse shadow-lg" />
        </div>

        {/* Contour lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20,80 Q 60,70 100,80 T 180,80" stroke="var(--primary)" strokeWidth="1" fill="none" />
          <path d="M 30,120 Q 80,110 130,120 T 210,120" stroke="var(--primary)" strokeWidth="1" fill="none" />
          <path d="M 40,160 Q 100,150 160,160 T 240,160" stroke="var(--primary)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Coordinates */}
      <div className="space-y-2 text-xs font-light mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground tracking-wide">Basin</span>
          <span>{node.basin}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground tracking-wide">Coordinates</span>
          <span>
            {node.lat.toFixed(4)}, {node.lng.toFixed(4)}
          </span>
        </div>
      </div>

      {/* Link to Atlas */}
      <Link
        href={`/atlas?lat=${node.lat}&lng=${node.lng}`}
        className="text-xs font-light text-primary hover:opacity-70 transition-opacity tracking-wide"
      >
        Open in Atlas →
      </Link>
    </div>
  )
}
