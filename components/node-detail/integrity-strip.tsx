"use client"

import { useState } from "react"
import type { NodeStats } from "@/lib/mock"

interface IntegrityStripProps {
  stats: NodeStats
}

export function IntegrityStrip({ stats }: IntegrityStripProps) {
  const [showDqBreakdown, setShowDqBreakdown] = useState(false)

  return (
    <section className="mb-16 pb-8 border-b border-border/20">
      <div className="flex items-center gap-8 text-sm font-light">
        {/* Agent Signed */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="tracking-wide">Agent-Signed</span>
        </div>

        <div className="w-px h-4 bg-border/30" />

        {/* Data Quality Score */}
        <div
          className="relative flex items-center gap-2 cursor-help"
          onMouseEnter={() => setShowDqBreakdown(true)}
          onMouseLeave={() => setShowDqBreakdown(false)}
        >
          <span className="tracking-wide text-muted-foreground">Data Quality</span>
          <span className="text-foreground font-normal">{stats.dq.score.toFixed(1)}</span>

          {showDqBreakdown && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-card border border-border/50 rounded shadow-lg z-10 text-xs space-y-1 min-w-[200px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completeness</span>
                <span>{stats.dq.completeness.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Drift</span>
                <span>{stats.dq.drift.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Calibration age</span>
                <span>{stats.dq.calibrationDays}d</span>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-border/30" />

        {/* Reliability Rank */}
        <div className="flex items-center gap-2">
          <span className="tracking-wide text-muted-foreground">Reliability</span>
          <span className="text-foreground">{stats.reliabilityRank}</span>
        </div>
      </div>
    </section>
  )
}
