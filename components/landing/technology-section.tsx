import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Network, Droplets, ArrowRight } from "lucide-react"

export function TechnologySection() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-extralight tracking-[0.2em] text-center mb-4">
          The Technology
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Built on Solana for planetary-scale water security
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Solana */}
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-light">
                <Shield className="h-5 w-5 text-purple-500" />
                Solana Blockchain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground mb-4">
                400ms transaction finality. $0.00025 per transaction.
                Enables real-time micropayments at planetary scale.
              </p>
              <div className="flex gap-2">
                <Link href="/idl">
                  <Button variant="link" size="sm" className="gap-1 px-0">
                    View IDL <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* HTTP 402 */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-light">
                <Zap className="h-5 w-5 text-blue-500" />
                HTTP 402 Protocol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground mb-4">
                Payment Required status code. Sensors earn revenue for data quality.
                Creates economic incentive for network expansion.
              </p>
              <div className="flex gap-2">
                <Link href="/integrate">
                  <Button variant="link" size="sm" className="gap-1 px-0">
                    API docs <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* AI Agents */}
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-light">
                <Network className="h-5 w-5 text-green-500" />
                Autonomous AI Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground mb-4">
                Self-executing intelligence with no human oversight.
                Discovers nodes, pays for data, validates integrity, generates predictions.
              </p>
              <div className="flex gap-2">
                <Link href="/actions">
                  <Button variant="link" size="sm" className="gap-1 px-0">
                    View actions <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Open APIs */}
          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-light">
                <Droplets className="h-5 w-5 text-orange-500" />
                Free & Open APIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground mb-4">
                USGS Water Services. Open-Meteo. Switchboard Oracle.
                No vendor lock-in. Community-owned infrastructure.
              </p>
              <div className="flex gap-2">
                <Link href="/atlas">
                  <Button variant="link" size="sm" className="gap-1 px-0">
                    See live data <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
