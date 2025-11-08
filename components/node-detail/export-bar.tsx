"use client"

import { useState } from "react"

interface ExportBarProps {
  nodeId: string
}

export function ExportBar({ nodeId }: ExportBarProps) {
  const [metric, setMetric] = useState("ph")
  const [threshold, setThreshold] = useState("")
  const [email, setEmail] = useState("")

  const handleDownload = () => {
    console.log("[v0] Downloading CSV for node:", nodeId)
    alert("CSV download initiated")
  }

  const handleCreateAlert = () => {
    if (!threshold || !email) {
      alert("Please fill in threshold and email")
      return
    }
    console.log("[v0] Creating alert:", { nodeId, metric, threshold, email })
    alert(`Alert created: ${metric} > ${threshold} → ${email}`)
  }

  return (
    <section className="pt-12 border-t border-border/20">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Download */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownload}
            className="text-sm font-light text-primary hover:opacity-70 transition-opacity tracking-wide"
          >
            Download CSV
          </button>
        </div>

        <div className="w-px bg-border/30 hidden md:block" />

        {/* Quick Alert */}
        <div className="flex-1 flex flex-wrap items-center gap-3 text-sm font-light">
          <span className="text-muted-foreground tracking-wide">Create alert:</span>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="px-2 py-1 bg-card border border-border/30 rounded text-xs font-light focus:outline-none focus:border-primary/50"
          >
            <option value="ph">pH</option>
            <option value="turbidity">Turbidity</option>
            <option value="conductivity">Conductivity</option>
            <option value="temperature">Temperature</option>
            <option value="level">Water Level</option>
          </select>
          <span className="text-muted-foreground">{">"}</span>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="threshold"
            className="w-24 px-2 py-1 bg-card border border-border/30 rounded text-xs font-light focus:outline-none focus:border-primary/50"
          />
          <span className="text-muted-foreground">→</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-48 px-2 py-1 bg-card border border-border/30 rounded text-xs font-light focus:outline-none focus:border-primary/50"
          />
          <button
            onClick={handleCreateAlert}
            className="px-3 py-1 bg-primary/10 text-primary rounded text-xs font-light hover:bg-primary/20 transition-colors tracking-wide"
          >
            Create
          </button>
        </div>
      </div>
    </section>
  )
}
