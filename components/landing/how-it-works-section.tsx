import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-extralight tracking-[0.2em] text-center mb-4">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Four layers of autonomous intelligence protecting water systems
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Step 1 */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-4xl font-extralight text-primary/60">01</div>
                <div>
                  <CardTitle className="text-2xl font-light mb-2">Sense</CardTitle>
                  <Badge variant="outline" className="text-xs">On-chain State</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                Distributed sensor nodes monitor water quality continuously.
              </p>
              <div className="space-y-1 text-xs font-light text-muted-foreground">
                <p>• pH, Turbidity, Temperature, Conductivity, Flow</p>
                <p>• Readings stored on Solana blockchain</p>
                <p>• Cryptographic signatures ensure integrity</p>
              </div>
              <div className="mt-4">
                <Link href="/nodes">
                  <Button variant="link" size="sm" className="gap-1 px-0">
                    Explore nodes <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-4xl font-extralight text-primary/60">02</div>
                <div>
                  <CardTitle className="text-2xl font-light mb-2">Verify</CardTitle>
                  <Badge variant="outline" className="text-xs">HTTP 402 Protocol</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                AI agents pay for readings using blockchain micropayments.
              </p>
              <div className="space-y-1 text-xs font-light text-muted-foreground">
                <p>• Autonomous agents with Solana wallets</p>
                <p>• Pay 0.001-0.01 SOL per reading</p>
                <p>• Economic incentive for data quality</p>
              </div>
              <div className="mt-4">
                <Link href="/integrate">
                  <Button variant="link" size="sm" className="gap-1 px-0">
                    API documentation <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-4xl font-extralight text-primary/60">03</div>
                <div>
                  <CardTitle className="text-2xl font-light mb-2">Predict</CardTitle>
                  <Badge variant="outline" className="text-xs">Multi-source Analysis</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                Machine learning analyzes patterns across multiple data sources.
              </p>
              <div className="space-y-1 text-xs font-light text-muted-foreground">
                <p>• Sensor readings (on-chain)</p>
                <p>• Weather forecasts (Open-Meteo API)</p>
                <p>• River flow data (USGS Water Services)</p>
              </div>
              <div className="mt-4">
                <Link href="/models">
                  <Button variant="link" size="sm" className="gap-1 px-0">
                    View models <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-4xl font-extralight text-primary/60">04</div>
                <div>
                  <CardTitle className="text-2xl font-light mb-2">Protect</CardTitle>
                  <Badge variant="outline" className="text-xs">Automated Response</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                Autonomous alerts activate response protocols.
              </p>
              <div className="space-y-1 text-xs font-light text-muted-foreground">
                <p>• EPA and regulatory agencies</p>
                <p>• Local water authorities</p>
                <p>• Affected communities</p>
              </div>
              <div className="mt-4">
                <Link href="/alerts">
                  <Button variant="link" size="sm" className="gap-1 px-0">
                    View alerts <ArrowRight className="h-3 w-3" />
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
