"use client"

import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Reading } from "@/lib/mock"

interface AreaChartProps {
  data: Reading[]
  dataKey: keyof Pick<Reading, "ph" | "turbidity" | "conductivity" | "temperature" | "level">
  color: string
}

export function AreaChart({ data, dataKey, color }: AreaChartProps) {
  const chartData = data.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: reading[dataKey],
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsAreaChart data={chartData}>
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          stroke="currentColor"
          className="text-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 10 }}
        />
        <YAxis
          stroke="currentColor"
          className="text-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 10 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "0.375rem",
            fontSize: "12px",
          }}
        />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#gradient-${dataKey})`} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}
