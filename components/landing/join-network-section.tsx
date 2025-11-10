import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function JoinNetworkSection() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-extralight tracking-[0.2em] text-center mb-16">
          Join the Network
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* For Communities */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-light">For Communities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground mb-4">
                Report water quality issues with your smartphone.
                Your phone becomes a sensor.
              </p>
              <Link href="/contribute">
                <Button variant="outline" className="w-full gap-2">
                  Contribute Data <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* For Developers */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-light">For Developers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground mb-4">
                Open source. Public APIs. Solana devnet.
                Build applications on AONA infrastructure.
              </p>
              <Link href="/integrate">
                <Button variant="outline" className="w-full gap-2">
                  Documentation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* For Authorities */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-light">For Water Authorities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-muted-foreground mb-4">
                Integrate AONA alerts into existing emergency response.
                Free API access for government agencies.
              </p>
              <Link href="/pitch">
                <Button variant="outline" className="w-full gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
