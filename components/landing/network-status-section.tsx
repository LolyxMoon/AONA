import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function NetworkStatusSection() {
  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="container mx-auto max-w-4xl text-center">
        <Badge className="mb-4 text-xs">🟢 NETWORK STATUS: LIVE</Badge>
        <h2 className="text-4xl font-extralight tracking-[0.2em] mb-6">
          Explore the Network
        </h2>
        <p className="text-lg font-light text-muted-foreground mb-12 max-w-2xl mx-auto">
          Real-time data. Real protection. Open infrastructure.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="font-light text-sm mb-1">Dashboard</p>
                <p className="text-xs text-muted-foreground">Network metrics</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/atlas">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="font-light text-sm mb-1">Atlas</p>
                <p className="text-xs text-muted-foreground">Interactive map</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nodes">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="font-light text-sm mb-1">Nodes</p>
                <p className="text-xs text-muted-foreground">Sensor network</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/alerts">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="font-light text-sm mb-1">Alerts</p>
                <p className="text-xs text-muted-foreground">Active warnings</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
