import type { NodeReading } from "@/lib/mock"

interface MetricTilesProps {
  series: {
    ph: NodeReading[]
    turbidity: NodeReading[]
    conductivity: NodeReading[]
    temp: NodeReading[]
    level: NodeReading[]
  }
}

export function MetricTiles({ series }: MetricTilesProps) {
  const latest = {
    ph: series.ph[series.ph.length - 1]?.ph ?? 0,
    turbidity: series.turbidity[series.turbidity.length - 1]?.turbidity ?? 0,
    conductivity: series.conductivity[series.conductivity.length - 1]?.conductivity ?? 0,
    temp: series.temp[series.temp.length - 1]?.temp ?? 0,
    level: series.level[series.level.length - 1]?.level ?? 0,
  }

  const day24Ago = {
    ph: series.ph[Math.max(0, series.ph.length - 25)]?.ph ?? latest.ph,
    turbidity: series.turbidity[Math.max(0, series.turbidity.length - 25)]?.turbidity ?? latest.turbidity,
    conductivity:
      series.conductivity[Math.max(0, series.conductivity.length - 25)]?.conductivity ?? latest.conductivity,
    temp: series.temp[Math.max(0, series.temp.length - 25)]?.temp ?? latest.temp,
    level: series.level[Math.max(0, series.level.length - 25)]?.level ?? latest.level,
  }

  const deltas = {
    ph: latest.ph - day24Ago.ph,
    turbidity: latest.turbidity - day24Ago.turbidity,
    conductivity: latest.conductivity - day24Ago.conductivity,
    temp: latest.temp - day24Ago.temp,
    level: latest.level - day24Ago.level,
  }

  const metrics = [
    { label: "pH", value: latest.ph.toFixed(2), unit: "", delta: deltas.ph },
    { label: "Turbidity", value: latest.turbidity.toFixed(1), unit: "NTU", delta: deltas.turbidity },
    { label: "Conductivity", value: latest.conductivity.toFixed(0), unit: "µS/cm", delta: deltas.conductivity },
    { label: "Temperature", value: latest.temp.toFixed(1), unit: "°C", delta: deltas.temp },
    { label: "Water Level", value: latest.level.toFixed(1), unit: "cm", delta: deltas.level },
  ]

  return (
    <div>
      <h3 className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-4">Current Readings</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="pb-4 border-b border-border/20">
            <p className="text-xs font-light text-muted-foreground tracking-wide mb-2">{metric.label}</p>
            <p className="text-2xl font-light mb-1">
              {metric.value} <span className="text-sm text-muted-foreground font-light">{metric.unit}</span>
            </p>
            <div className="flex items-center gap-1 text-xs font-light">
              {metric.delta > 0 ? (
                <span className="text-accent">↑ {Math.abs(metric.delta).toFixed(2)}</span>
              ) : metric.delta < 0 ? (
                <span className="text-secondary">↓ {Math.abs(metric.delta).toFixed(2)}</span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
              <span className="text-muted-foreground/60">vs 24h</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
