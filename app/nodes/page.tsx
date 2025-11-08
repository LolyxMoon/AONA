"use client"

import { useState } from "react"
import { NodeTable } from "@/components/tables/node-table"
import { BountyCard } from "@/components/coverage/bounty-card"
import { DQScore } from "@/components/benchmarks/dq-score"
import { generateMockNodes, generateMockCoverage, generateMockDataQuality } from "@/lib/mock"

export default function NodesPage() {
  const [nodes] = useState(() => generateMockNodes(20))
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "high" | "medium" | "low">("all")

  const coverageData = generateMockCoverage(20)
  const qualityData = generateMockDataQuality()
  const bounties = coverageData.filter((cell) => cell.bounty).slice(0, 3)

  // Filter nodes
  const filteredNodes = nodes.filter((node) => {
    const matchesSearch =
      node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "high" && node.uptimePct >= 95) ||
      (statusFilter === "medium" && node.uptimePct >= 85 && node.uptimePct < 95) ||
      (statusFilter === "low" && node.uptimePct < 85)

    return matchesSearch && matchesStatus
  })

  return (
    <main className="min-h-screen pt-24 pb-24 px-6 bg-background">
      {/* Minimal header */}
      <div className="container mx-auto max-w-6xl mb-16">
        <h1 className="text-4xl font-extralight tracking-[0.2em] text-foreground/80 mb-4 text-center">Nodes</h1>
        <p className="text-sm font-extralight text-muted-foreground/60 tracking-[0.15em] text-center max-w-xl mx-auto leading-loose mb-4">
          Coverage · Reliability · Health
        </p>
        <p className="text-xs font-extralight text-muted-foreground/40 tracking-[0.12em] text-center max-w-md mx-auto leading-relaxed">
          Coverage where life depends on it.
        </p>
      </div>

      <div className="container mx-auto max-w-6xl space-y-24">
        {/* Stats - minimal cards with invisible structure */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Nodes", value: nodes.length.toString() },
              { label: "Active", value: nodes.filter((n) => n.uptimePct >= 95).length.toString() },
              { label: "Data Points", value: nodes.reduce((sum, n) => sum + n.dataPoints, 0).toLocaleString() },
              { label: "Earned", value: `$${nodes.reduce((sum, n) => sum + n.earned, 0).toLocaleString()}` },
            ].map((stat, i) => (
              <div key={i} className="p-8 border border-border/10 rounded bg-background/50">
                <p className="text-xs font-extralight text-muted-foreground/50 tracking-[0.15em] uppercase mb-3">
                  {stat.label}
                </p>
                <p className="text-2xl font-extralight text-foreground/90">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Search & filters - minimal */}
        <section>
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded border border-border/20 bg-background text-sm font-extralight tracking-wide focus:outline-none focus:border-primary/40 transition-colors"
            />
            <div className="flex gap-2">
              {["all", "high", "medium", "low"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter as any)}
                  className={`px-4 py-3 rounded text-xs font-extralight tracking-wide transition-all duration-500 ${
                    statusFilter === filter
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-background border border-border/20 text-foreground/70 hover:border-primary/30"
                  }`}
                >
                  {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Node list */}
        <section>
          <NodeTable nodes={filteredNodes} />
        </section>

        {/* Data quality scores - show health through color, spacing, and subtle icons */}
        <section className="pt-12 border-t border-border/10">
          <h2 className="text-xs font-extralight tracking-[0.15em] text-foreground/70 mb-8 uppercase text-center">
            Reliability
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {qualityData.slice(0, 3).map((node) => (
              <DQScore key={node.nodeId} data={node} />
            ))}
          </div>
        </section>

        {/* Bounties - small elegant callouts only when relevant */}
        {bounties.length > 0 && (
          <section className="pt-12 border-t border-border/10">
            <h2 className="text-xs font-extralight tracking-[0.15em] text-foreground/70 mb-8 uppercase text-center">
              Coverage Incentives
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {bounties.map((cell) => (
                <BountyCard key={cell.id} cell={cell} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
