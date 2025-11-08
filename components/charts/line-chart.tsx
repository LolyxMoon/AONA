"use client"

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Reading } from "@/lib/mock"

interface LineChartProps {
  data: Reading[]
  dataKey: keyof Pick<Reading, "ph" | "turbidity" | "conductivity" | "temperature" | "level">
  color: string
}

export function LineChart({ data, dataKey, color }: LineChartProps) {
  const chartData = data.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: reading[dataKey],
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsLineChart data={chartData}>
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
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
