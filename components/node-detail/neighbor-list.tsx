import Link from "next/link"
import type { Neighbor } from "@/lib/mock"

interface NeighborListProps {
  neighbors: Neighbor[]
  nodeId: string
}

export function NeighborList({ neighbors, nodeId }: NeighborListProps) {
  const hasGaps = neighbors.some((n) => n.coverageGapScore > 0.6)

  return (
    <section className="mb-16">
      <h3 className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-8">Neighbors & Coverage</h3>

      <div className="space-y-3 mb-6">
        {neighbors.map((neighbor, i) => (
          <Link
            key={i}
            href={`/nodes/${neighbor.id}`}
            className="flex items-center justify-between p-4 border border-border/20 rounded hover:border-primary/30 transition-colors"
          >
            <div>
              <p className="text-sm font-light mb-1">{neighbor.name}</p>
              <p className="text-xs font-light text-muted-foreground">{neighbor.distanceKm.toFixed(1)} km away</p>
            </div>
            {neighbor.coverageGapScore > 0.6 && <span className="text-xs font-light text-accent">Coverage gap</span>}
          </Link>
        ))}
      </div>

      {hasGaps && (
        <div className="p-4 border border-accent/20 bg-accent/5 rounded">
          <p className="text-xs font-light text-muted-foreground mb-2">
            This region is under-covered. Consider deploying sensors.
          </p>
          <Link
            href="/nodes?region=under-covered"
            className="text-xs font-light text-primary hover:opacity-70 transition-opacity tracking-wide"
          >
            View bounties →
          </Link>
        </div>
      )}
    </section>
  )
}
