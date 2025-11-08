"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { NodeReading } from "@/lib/mock"

interface MetricSeriesProps {
  series: {
    ph: NodeReading[]
    turbidity: NodeReading[]
    conductivity: NodeReading[]
    temp: NodeReading[]
    level: NodeReading[]
  }
}

export function MetricSeries({ series }: MetricSeriesProps) {
  const [timeWindow, setTimeWindow] = useState<"24h" | "7d">("24h")

  const getSlicedData = (data: NodeReading[]) => {
    if (timeWindow === "24h") {
      return data.slice(-24)
    }
    return data
  }

  const formatTime = (ts: string) => {
    const date = new Date(ts)
    return timeWindow === "24h"
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString([], { month: "short", day: "numeric" })
  }

  const metrics = [
    { label: "pH", data: getSlicedData(series.ph), dataKey: "ph", color: "#0EA5E9", unit: "" },
    { label: "Turbidity", data: getSlicedData(series.turbidity), dataKey: "turbidity", color: "#10B981", unit: "NTU" },
    {
      label: "Conductivity",
      data: getSlicedData(series.conductivity),
      dataKey: "conductivity",
      color: "#F59E0B",
      unit: "µS/cm",
    },
    { label: "Temperature", data: getSlicedData(series.temp), dataKey: "temp", color: "#EF4444", unit: "°C" },
    { label: "Water Level", data: getSlicedData(series.level), dataKey: "level", color: "#8B5CF6", unit: "cm" },
  ]

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-light text-muted-foreground tracking-widest uppercase">Metric Series</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeWindow("24h")}
            className={`px-3 py-1 text-xs font-light tracking-wide transition-colors ${
              timeWindow === "24h"
                ? "text-foreground border-b border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            24h
          </button>
          <button
            onClick={() => setTimeWindow("7d")}
            className={`px-3 py-1 text-xs font-light tracking-wide transition-colors ${
              timeWindow === "7d"
                ? "text-foreground border-b border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            7d
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {metrics.map((metric, i) => (
          <div key={i}>
            <p className="text-xs font-light text-muted-foreground tracking-wide mb-4">
              {metric.label} <span className="text-muted-foreground/60">({metric.unit || "index"})</span>
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={metric.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                <XAxis
                  dataKey="ts"
                  tickFormatter={formatTime}
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: "10px", fontWeight: 300 }}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: "10px", fontWeight: 300 }}
                  tickLine={false}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 300,
                  }}
                  formatter={(value: number) => [value.toFixed(2), metric.label]}
                  labelFormatter={(label) => formatTime(label as string)}
                />
                <Line type="monotone" dataKey={metric.dataKey} stroke={metric.color} strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </section>
  )
}
