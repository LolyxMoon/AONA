"use client"

import { Card } from "@/components/ui/card"

export function EdgeAgentSnippet() {
  return (
    <Card className="p-6 border border-border/40">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-light tracking-wide text-foreground mb-2">Offline-First Edge Agent</h3>
          <p className="text-sm font-light text-muted-foreground leading-relaxed">
            Deploy an edge agent on your sensor hardware to buffer readings, sign data locally, and sync when
            connectivity returns.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-muted/30 font-mono text-xs">
          <pre className="text-foreground/80 overflow-x-auto">
            {`#!/usr/bin/env node
// Edge Agent CLI (mock)

import { Agent } from '@aona/agent-sdk'

const agent = new Agent({
  sensorId: process.env.SENSOR_ID,
  privateKey: process.env.AGENT_KEY
})

// Buffer readings when offline
agent.onReading((reading) => {
  const signed = agent.sign(reading)
  agent.buffer(signed)
})

// Sync when connectivity detected
agent.onOnline(() => {
  agent.syncBuffer()
})`}
          </pre>
        </div>

        <div className="flex gap-4">
          <button className="px-4 py-2 text-xs font-light rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
            Download Edge Agent
          </button>
          <button className="px-4 py-2 text-xs font-light rounded-md border border-border/40 hover:bg-muted/50 transition-colors">
            View Documentation
          </button>
        </div>

        <p className="text-xs font-light text-muted-foreground italic">
          TODO(Claude): Build edge agent with signing, buffering, and retry logic
        </p>
      </div>
    </Card>
  )
}

export default EdgeAgentSnippet
