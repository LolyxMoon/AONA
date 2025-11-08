import IngressTabs from "@/components/ingress-tabs"

export default function IntegratePage() {
  return (
    <main className="min-h-screen pt-24 pb-24 px-6 bg-background">
      {/* Minimal header */}
      <div className="container mx-auto max-w-4xl mb-20">
        <h1 className="text-4xl font-extralight tracking-[0.2em] text-foreground/80 mb-6 text-center">Integrate</h1>
        <p className="text-sm font-extralight text-muted-foreground/60 tracking-[0.15em] text-center max-w-xl mx-auto leading-loose">
          You bring the sensor. AONA listens.
        </p>
      </div>

      <div className="container mx-auto max-w-4xl space-y-24">
        {/* Ingress methods - one beautiful scroll */}
        <section>
          <IngressTabs />
        </section>

        {/* Integration flow - minimal steps */}
        <section className="pt-12 border-t border-border/10">
          <h2 className="text-xs font-extralight tracking-[0.15em] text-foreground/70 mb-16 uppercase text-center">
            How It Works
          </h2>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-extralight text-primary/80">01</span>
                </div>
                <h3 className="text-lg font-extralight tracking-wide text-foreground/80">Sensor Data</h3>
              </div>
              <div className="ml-12 p-6 rounded border border-border/10 bg-background/50 font-mono text-xs">
                <pre className="text-foreground/70 overflow-x-auto">
                  {`{
  "sensor_id": "sensor-0001",
  "readings": {
    "ph": 7.2,
    "turbidity": 12.5,
    "conductivity": 425,
    "temperature": 14.2
  }
}`}
                </pre>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-extralight text-primary/80">02</span>
                </div>
                <h3 className="text-lg font-extralight tracking-wide text-foreground/80">Agent Verifies</h3>
              </div>
              <div className="ml-12">
                <p className="text-sm font-extralight text-muted-foreground/60 tracking-wide leading-loose">
                  Autonomous agents validate integrity and sign data cryptographically before network entry.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-extralight text-primary/80">03</span>
                </div>
                <h3 className="text-lg font-extralight tracking-wide text-foreground/80">x402 Streams</h3>
              </div>
              <div className="ml-12">
                <p className="text-sm font-extralight text-muted-foreground/60 tracking-wide leading-loose">
                  Micropayments flow continuously based on data quality and network contribution.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-extralight text-primary/80">04</span>
                </div>
                <h3 className="text-lg font-extralight tracking-wide text-foreground/80">Data Liquifies</h3>
              </div>
              <div className="ml-12">
                <p className="text-sm font-extralight text-muted-foreground/60 tracking-wide leading-loose">
                  Verified readings become liquid onchain assets. Water knowledge as tradeable information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources - minimal links */}
        <section className="pt-12 border-t border-border/10">
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a
              href="#"
              className="text-sm font-extralight tracking-wide text-foreground/70 hover:text-primary transition-colors duration-500"
            >
              Documentation →
            </a>
            <a
              href="#"
              className="text-sm font-extralight tracking-wide text-foreground/70 hover:text-primary transition-colors duration-500"
            >
              GitHub →
            </a>
            <a
              href="#"
              className="text-sm font-extralight tracking-wide text-foreground/70 hover:text-primary transition-colors duration-500"
            >
              Examples →
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
