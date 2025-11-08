"use client"

import { useState } from "react"
import { Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
import type { ForecastPoint } from "@/lib/mock"
import { ExplainOverlay } from "./explain-overlay"

interface ForecastCardProps {
  forecast: ForecastPoint[]
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  const [showExplain, setShowExplain] = useState(false)

  const chartData = forecast.map((f) => ({
    ts: new Date(f.ts).toLocaleDateString([], { month: "short", day: "numeric" }),
    value: f.value,
    range: [f.lower, f.upper],
  }))

  return (
    <>
      <div className="p-6 border border-border/20 rounded">
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-xs font-light text-muted-foreground tracking-widest uppercase">7-Day Forecast</h4>
          <button
            onClick={() => setShowExplain(true)}
            className="text-xs font-light text-primary hover:opacity-70 transition-opacity tracking-wide"
          >
            Explain
          </button>
        </div>

        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="confidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="ts"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "9px", fontWeight: 300 }}
              tickLine={false}
            />
            <YAxis hide />
            <Area type="monotone" dataKey="range" stroke="none" fill="url(#confidence)" />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>

        <p className="text-xs font-light text-muted-foreground/60 mt-4 italic">
          Confidence band shows 95% prediction interval
        </p>
      </div>

      {showExplain && (
        <ExplainOverlay
          title="Forecasting Method"
          content="7-day forecasts use linear regression with seasonal adjustment. The model analyzes historical patterns to project future readings. Confidence bands widen over time to reflect increasing uncertainty. Forecasts update every 6 hours with new data."
          onClose={() => setShowExplain(false)}
        />
      )}
    </>
  )
}
