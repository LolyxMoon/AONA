"use client"

import { use } from "react"
import Link from "next/link"
import {
  getNodeById,
  getNodeStats,
  getNodeSeries,
  getNodeEvents,
  getNeighbors,
  getAnomaly,
  getForecast,
  getNodeHardware,
} from "@/lib/mock"
import { NodeHeader } from "@/components/node-detail/node-header"
import { IntegrityStrip } from "@/components/node-detail/integrity-strip"
import { NodeMapMini } from "@/components/node-detail/node-map-mini"
import { MetricTiles } from "@/components/node-detail/metric-tiles"
import { MetricSeries } from "@/components/node-detail/metric-series"
import { AnomalyCard } from "@/components/node-detail/anomaly-card"
import { ForecastCard } from "@/components/node-detail/forecast-card"
import { EventTimeline } from "@/components/node-detail/event-timeline"
import { CalibrationCard } from "@/components/node-detail/calibration-card"
import { NeighborList } from "@/components/node-detail/neighbor-list"
import { ExportBar } from "@/components/node-detail/export-bar"

export default function NodeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const node = getNodeById(id)

  if (!node) {
    return (
      <main className="min-h-screen pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-light text-muted-foreground tracking-widest mb-8">Node not found</p>
          <Link href="/nodes" className="text-sm font-light text-primary hover:opacity-70 transition-opacity">
            ← Return to Nodes
          </Link>
        </div>
      </main>
    )
  }

  const stats = getNodeStats(id)!
  const series = getNodeSeries(id)
  const events = getNodeEvents(id)
  const neighbors = getNeighbors(id)
  const anomaly = getAnomaly(id)
  const forecast = getForecast(id, "level")
  const hardware = getNodeHardware(id)

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Microline */}
      <div className="px-6 mb-8">
        <p className="text-xs font-light text-muted-foreground/60 tracking-widest text-center">
          Early signals prevent late crises.
        </p>
      </div>

      <div className="px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Back Link */}
          <div className="mb-12">
            <Link
              href="/nodes"
              className="text-sm font-light text-primary/60 hover:text-primary transition-colors tracking-wide"
            >
              ← Nodes
            </Link>
          </div>

          {/* Node Header */}
          <NodeHeader node={node} stats={stats} />

          {/* Integrity Strip */}
          <IntegrityStrip stats={stats} />

          {/* Map + Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <NodeMapMini node={node} />
            </div>
            <div className="lg:col-span-2">
              <MetricTiles series={series} />
            </div>
          </div>

          {/* Metric Series */}
          <MetricSeries series={series} />

          {/* Signal Intelligence */}
          <section className="mb-16">
            <h3 className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-8">
              Signal Intelligence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnomalyCard anomaly={anomaly} />
              <ForecastCard forecast={forecast} />
            </div>
          </section>

          {/* Event Timeline */}
          <EventTimeline events={events} />

          {/* Calibration & Hardware */}
          <CalibrationCard hardware={hardware} />

          {/* Neighbors & Coverage */}
          <NeighborList neighbors={neighbors} nodeId={id} />

          {/* Export Bar */}
          <ExportBar nodeId={id} />
        </div>
      </div>
    </main>
  )
}
