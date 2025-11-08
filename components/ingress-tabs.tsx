"use client"

import { useState } from "react"

export function IngressTabs() {
  const [activeTab, setActiveTab] = useState<"http" | "mqtt" | "lorawan" | "ggwave">("http")

  return (
    <div>
      <div className="flex gap-8 mb-12 border-b border-border/10 pb-1 justify-center">
        {[
          { id: "http", label: "REST" },
          { id: "mqtt", label: "MQTT" },
          { id: "lorawan", label: "LoRaWAN" },
          { id: "ggwave", label: "Ultrasonic" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
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

      <div className="space-y-6">
        {activeTab === "http" && (
          <>
            <p className="text-sm font-extralight text-muted-foreground/60 tracking-wide leading-loose text-center">
              Post readings to the API. Best for stable connectivity.
            </p>
            <div className="p-8 rounded border border-border/10 bg-background/50 font-mono text-xs">
              <pre className="text-foreground/70 overflow-x-auto">
                {`POST https://api.aona.network/v1/readings
Content-Type: application/json

{
  "sensor_id": "sensor-0001",
  "timestamp": "2025-01-15T10:30:00Z",
  "readings": { ... }
}`}
              </pre>
            </div>
          </>
        )}

        {activeTab === "mqtt" && (
          <>
            <p className="text-sm font-extralight text-muted-foreground/60 tracking-wide leading-loose text-center">
              Publish to MQTT topics. Ideal for low-power IoT.
            </p>
            <div className="p-8 rounded border border-border/10 bg-background/50 font-mono text-xs">
              <pre className="text-foreground/70 overflow-x-auto">
                {`const client = mqtt.connect('mqtts://broker.aona.network')

client.publish('aona/sensors/0001/readings', 
  JSON.stringify({
    timestamp: Date.now(),
    readings: { ... }
  })
)`}
              </pre>
            </div>
          </>
        )}

        {activeTab === "lorawan" && (
          <>
            <p className="text-sm font-extralight text-muted-foreground/60 tracking-wide leading-loose text-center">
              Ultra-low-power, long-range for remote watersheds.
            </p>
            <div className="p-8 rounded border border-border/10 bg-background/50 font-mono text-xs">
              <pre className="text-foreground/70 overflow-x-auto">
                {`DevEUI: 0x70B3D57ED0000001
AppEUI: 0x41424344454647FF
AppKey: 0x000102030405060708090A0B0C0D0E0F

Uplink payload (8 bytes):
[pH*10][turbidity][conductivity_H][conductivity_L][temp*10][level]`}
              </pre>
            </div>
          </>
        )}

        {activeTab === "ggwave" && (
          <>
            <p className="text-sm font-extralight text-muted-foreground/60 tracking-wide leading-loose text-center max-w-2xl mx-auto">
              Pair sensors via ultrasonic transmission when offline. Audio encodes credentials for field deployment.
            </p>
            <div className="p-8 rounded border border-border/10 bg-background/50 space-y-4">
              <ol className="space-y-3 text-xs font-extralight text-foreground/70 tracking-wide leading-loose">
                <li>1. App generates ultrasonic tone with sensor credentials</li>
                <li>2. Sensor microphone receives and decodes audio</li>
                <li>3. Sensor pairs with network using configuration</li>
                <li>4. Data buffers locally until connectivity restored</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default IngressTabs
