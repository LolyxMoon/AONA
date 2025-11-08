"use client"

import { useState } from "react"
import { ExplainOverlay } from "./explain-overlay"

interface AnomalyCardProps {
  anomaly: { ts: string; metric: string; magnitude: number; zscore: number } | null
}

export function AnomalyCard({ anomaly }: AnomalyCardProps) {
  const [showExplain, setShowExplain] = useState(false)

  if (!anomaly) {
    return (
      <div className="p-6 border border-border/20 rounded">
        <h4 className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-4">Last Anomaly</h4>
        <p className="text-sm font-light text-muted-foreground/60 italic">No recent anomalies detected</p>
      </div>
    )
  }

  return (
    <>
      <div className="p-6 border border-border/20 rounded">
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-xs font-light text-muted-foreground tracking-widest uppercase">Last Anomaly</h4>
          <button
            onClick={() => setShowExplain(true)}
            className="text-xs font-light text-primary hover:opacity-70 transition-opacity tracking-wide"
          >
            Explain
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm font-light">
            <span className="text-muted-foreground">Metric</span>
            <span>{anomaly.metric}</span>
          </div>
          <div className="flex justify-between text-sm font-light">
            <span className="text-muted-foreground">Magnitude</span>
            <span className={anomaly.magnitude < 0 ? "text-secondary" : "text-accent"}>
              {anomaly.magnitude > 0 ? "+" : ""}
              {anomaly.magnitude.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm font-light">
            <span className="text-muted-foreground">Z-score</span>
            <span>{anomaly.zscore.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-light">
            <span className="text-muted-foreground">Time</span>
            <span className="text-xs">{new Date(anomaly.ts).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {showExplain && (
        <ExplainOverlay
          title="Anomaly Detection"
          content="AONA uses z-score analysis to detect anomalies in sensor data. A z-score measures how many standard deviations a reading is from the historical mean. Values beyond ±3 indicate significant deviations from normal patterns, accounting for seasonal variation and measurement drift."
          onClose={() => setShowExplain(false)}
        />
      )}
    </>
  )
}
