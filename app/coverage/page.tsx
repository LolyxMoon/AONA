"use client"

import { useState } from "react"
import { InkBrushDivider } from "@/components/ink-brush-divider"
import { CoverageHeatmap } from "@/components/coverage/coverage-heatmap"
import { BountyCard } from "@/components/coverage/bounty-card"
import { generateMockCoverage } from "@/lib/mock"

export default function CoveragePage() {
  const [selectedBasin, setSelectedBasin] = useState<string | null>(null)
  const coverageData = generateMockCoverage(20)
  const incentivizedAreas = coverageData.filter((cell) => cell.bounty)

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-light tracking-widest text-foreground mb-6">Network Coverage</h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed tracking-wide">
            Identify sensor coverage gaps and contribute to water monitoring in underserved watersheds.
            Deploy nodes, earn x402 micropayments, and help protect critical water systems.
          </p>
        </div>
      </div>

      <InkBrushDivider />

      {/* Coverage heatmap */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-light tracking-widest text-foreground mb-4">Coverage Heatmap</h2>
          <p className="text-sm font-light text-muted-foreground mb-6">
            Darker regions indicate lower sensor density and higher contribution value.
          </p>
        </div>

        <CoverageHeatmap data={coverageData} onBasinSelect={setSelectedBasin} selectedBasin={selectedBasin} />
      </div>

      {/* Incentivized areas */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-light tracking-widest text-foreground mb-4">Priority Monitoring Areas</h2>
          <p className="text-sm font-light text-muted-foreground mb-6">
            Deploy sensors in these high-impact locations to earn x402 rewards while protecting vulnerable watersheds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incentivizedAreas.map((cell) => (
            <BountyCard key={cell.id} cell={cell} />
          ))}
        </div>
      </div>

      {/* Propose sensor CTA */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-12 text-center">
          <h3 className="text-2xl font-light tracking-widest text-foreground mb-4">Propose a Sensor Location</h3>
          <p className="text-sm font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
            Know an underserved watershed that needs monitoring? Submit a proposal to help expand the network
            and contribute to water protection.
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-md font-light text-sm hover:bg-primary/90 transition-colors">
            Submit Proposal
          </button>
        </div>
      </div>

      {/* Integration hooks */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-muted/30 border border-border/40 rounded-lg p-8 max-w-4xl">
          <h3 className="text-sm font-light tracking-widest text-primary mb-4">Technical Implementation</h3>
          <ul className="space-y-2 text-sm font-light text-muted-foreground">
            <li>• Incentive registry (on-chain smart contract)</li>
            <li>• x402 payment streams for deployed sensors</li>
            <li>• Reputation scoring system</li>
            <li>• Coverage calculation algorithm (spatial analysis)</li>
            <li>• Sensor proposal submission & community voting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
