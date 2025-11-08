import type { NodeMeta, NodeStats } from "@/lib/mock"

interface NodeHeaderProps {
  node: NodeMeta
  stats: NodeStats
}

export function NodeHeader({ node, stats }: NodeHeaderProps) {
  return (
    <section className="mb-12 pb-12 border-b border-border/20">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">{node.name}</h1>
          <p className="text-sm font-light text-muted-foreground tracking-wide mb-1">{node.basin}</p>
          <div className="flex items-center gap-3 mt-3">
            <div
              className={`w-1.5 h-1.5 rounded-full ${node.status === "online" ? "bg-secondary" : "bg-muted-foreground/50"}`}
            />
            <span className="text-xs font-light text-muted-foreground tracking-wide">
              Last updated {new Date(stats.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      {/* Mini Metrics Strip */}
      <div className="flex items-center gap-8 text-xs font-light tracking-wide">
        <div>
          <span className="text-muted-foreground">Uptime</span>
          <span className="ml-2 text-foreground">{node.uptimePct.toFixed(1)}%</span>
        </div>
        <div className="w-px h-3 bg-border/30" />
        <div>
          <span className="text-muted-foreground">Readings (24h)</span>
          <span className="ml-2 text-foreground">{stats.readings24h.toLocaleString()}</span>
        </div>
        <div className="w-px h-3 bg-border/30" />
        <div>
          <span className="text-muted-foreground">Earned</span>
          <span className="ml-2 text-primary">${stats.earnedUsd}</span>
        </div>
      </div>

      <p className="text-xs font-light text-muted-foreground/60 tracking-wide mt-6 italic">
        Coverage where life depends on it.
      </p>
    </section>
  )
}
