"use client"

import { useState } from "react"
import { ForecastChart } from "@/components/models/forecast-chart"
import { AnomalyTable } from "@/components/models/anomaly-table"
import { generateMockAnomalies } from "@/lib/mock"
import { forecastLinear, calculateConfidenceBands, detectSeasonality } from "@/lib/science"

type InsightTab = "anomaly" | "forecast" | "trends"

export default function InsightPage() {
  const [activeTab, setActiveTab] = useState<InsightTab>("anomaly")
  const [metric, setMetric] = useState<string>("ph")
  const [alertThreshold, setAlertThreshold] = useState<string>("")
  const [alertEmail, setAlertEmail] = useState<string>("")

  // Generate mock data
  const anomalyData = generateMockAnomalies(90)
  const values = anomalyData.map((d) => d.value)
  const forecast = forecastLinear(values, 14)
  const bands = calculateConfidenceBands(values, forecast, 0.95)

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      {/* Minimal header */}
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-extralight tracking-[0.2em] text-foreground/80 mb-4 text-center">Insight</h1>
        <p className="text-sm font-extralight text-muted-foreground/60 tracking-[0.15em] text-center max-w-xl mx-auto leading-loose mb-8">
          The water will tell you
        </p>
        <p className="text-xs font-extralight text-muted-foreground/40 tracking-[0.12em] text-center max-w-md mx-auto leading-relaxed">
          Early signals prevent late crises.
        </p>
      </div>

      {/* Three tabs - zen minimal */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex justify-center gap-16 border-b border-border/10 pb-1">
          {[
            { id: "anomaly", label: "Anomaly" },
            { id: "forecast", label: "Forecast" },
            { id: "trends", label: "Trends" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as InsightTab)}
              className={`px-2 py-3 text-sm font-extralight tracking-[0.15em] transition-all duration-500 ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary -mb-[1px]"
                  : "text-muted-foreground/60 hover:text-foreground/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content - large breathing charts, no clutter */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="space-y-12">
          {activeTab === "anomaly" && (
            <>
              <div className="space-y-8">
                <ForecastChart data={anomalyData} title="pH Anomaly Detection" showBaseline={true} showAnomaly={true} />
                <AnomalyTable data={anomalyData.filter((d) => Math.abs(d.zscore || 0) > 2)} />
              </div>

              {/* Minimal alert creation - one line */}
              <div className="mt-16 pt-12 border-t border-border/10">
                <h3 className="text-xs font-extralight tracking-[0.15em] text-foreground/70 mb-8 uppercase text-center">
                  Create Threshold Alert
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
                  <select
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    className="px-4 py-2.5 text-sm font-extralight tracking-wide bg-background border border-border/20 rounded focus:border-primary/40 focus:outline-none transition-colors"
                  >
                    <option value="ph">pH</option>
                    <option value="turbidity">Turbidity</option>
                    <option value="conductivity">Conductivity</option>
                    <option value="temperature">Temperature</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Threshold"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(e.target.value)}
                    className="px-4 py-2.5 w-32 text-sm font-extralight tracking-wide bg-background border border-border/20 rounded focus:border-primary/40 focus:outline-none transition-colors"
                  />

                  <input
                    type="email"
                    placeholder="notify@email.com"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    className="px-4 py-2.5 flex-1 min-w-[200px] text-sm font-extralight tracking-wide bg-background border border-border/20 rounded focus:border-primary/40 focus:outline-none transition-colors"
                  />

                  <button className="px-6 py-2.5 text-sm font-extralight tracking-wide bg-primary/10 text-primary border border-primary/20 rounded hover:bg-primary/20 transition-colors">
                    Watch
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "forecast" && (
            <div className="space-y-12">
              <ForecastChart
                data={anomalyData}
                forecast={forecast}
                bands={bands}
                title={`${metric.toUpperCase()} · 14 Day Forecast`}
                showBaseline={false}
                showAnomaly={false}
              />

              <div className="text-center space-y-2">
                <p className="text-xs font-extralight text-muted-foreground/50 tracking-[0.15em]">
                  Confidence interval: 95%
                </p>
                <p className="text-xs font-extralight text-muted-foreground/50 tracking-[0.15em]">
                  {detectSeasonality(values, 7) ? "Seasonality detected" : "No seasonality detected"}
                </p>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="space-y-12">
              <ForecastChart
                data={anomalyData}
                title="Long-Term Trend Analysis"
                showBaseline={true}
                showAnomaly={false}
              />

              <div className="text-center space-y-4">
                <p className="text-sm font-extralight text-muted-foreground/60 tracking-wide leading-loose max-w-xl mx-auto">
                  Rivers remember. Patterns emerge slowly. Stillness reveals what haste conceals.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
