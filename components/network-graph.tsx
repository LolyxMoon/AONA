"use client"

import { useMemo } from "react"

interface GraphNode {
  id: string
  name: string
  reputation?: { score: number }
  status?: "online" | "offline"
}

interface NetworkGraphProps {
  nodes?: GraphNode[]
}

const fallbackNodes: GraphNode[] = [
  { id: "node-1", name: "Colorado Headwaters", status: "online", reputation: { score: 92 } },
  { id: "node-2", name: "Denver Sensors", status: "online", reputation: { score: 88 } },
  { id: "node-3", name: "Pueblo Basin", status: "offline", reputation: { score: 74 } },
  { id: "node-4", name: "Great Lakes", status: "online", reputation: { score: 81 } },
  { id: "node-5", name: "Mississippi Delta", status: "online", reputation: { score: 85 } },
  { id: "node-6", name: "Sonoran Aquifer", status: "online", reputation: { score: 79 } },
]

export function NetworkGraph({ nodes }: NetworkGraphProps) {
  const graphNodes = useMemo(() => {
    const source = nodes && nodes.length > 0
      ? nodes.slice(0, 8)
      : fallbackNodes

    return source.map((node, index) => {
      const angle = (index / source.length) * Math.PI * 2
      const radius = 38
      const x = 50 + radius * Math.cos(angle)
      const y = 50 + radius * Math.sin(angle)

      return {
        id: node.id,
        name: node.name,
        reputation: node.reputation?.score ?? 80,
        status: node.status ?? "online",
        x,
        y
      }
    })
  }, [nodes])

  const activeNodes = nodes?.length || fallbackNodes.length
  const avgReputation = nodes && nodes.length > 0
    ? nodes.reduce((sum, n) => sum + (n.reputation?.score ?? 0), 0) / nodes.length
    : fallbackNodes.reduce((sum, n) => sum + (n.reputation?.score ?? 0), 0) / fallbackNodes.length

  return (
    <div className="relative w-full rounded-xl border border-border/40 bg-gradient-to-br from-background via-background/70 to-background/50 p-6 overflow-hidden">
      <div className="relative h-[360px]">
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="networkGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#networkGlow)" />
        </svg>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {graphNodes.map((node) => (
            <line
              key={`line-${node.id}`}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke="currentColor"
              strokeWidth="0.15"
              className="text-border/50"
            />
          ))}
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-card/70 px-6 py-4 text-center backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Oracle</p>
          <p className="text-sm font-light text-foreground">Switchboard Core</p>
        </div>

        {graphNodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="relative flex flex-col items-center text-center space-y-1">
              <div className={`w-3 h-3 rounded-full ${node.status === "online" ? "bg-green-400" : "bg-muted-foreground"}`}>
                {node.status === "online" && <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />}
              </div>
              <p className="text-[11px] font-light text-foreground/80 max-w-[90px]">{node.name}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
                {node.reputation.toFixed(0)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm font-light text-muted-foreground">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] mb-1">Nodes</p>
          <p className="text-2xl text-foreground/90">{activeNodes}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] mb-1">Reputation</p>
          <p className="text-2xl text-foreground/90">{avgReputation.toFixed(0)}</p>
        </div>
      </div>
    </div>
  )
}
