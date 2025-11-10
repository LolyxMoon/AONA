import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function WhySection() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-extralight tracking-[0.2em] text-center mb-12">
          Why AONA
        </h2>

        <div className="prose prose-lg max-w-none text-center">
          <p className="text-lg font-light leading-relaxed text-foreground/80 mb-6">
            Water contamination events often go undetected until after populations are affected.
            Traditional monitoring is centralized, expensive, and reactive.
          </p>
          <p className="text-lg font-light leading-relaxed text-foreground/80 mb-6">
            AONA is decentralized, autonomous, and predictive—
            creating early warning infrastructure for planetary hydrology.
          </p>
          <p className="text-xl font-light leading-relaxed text-foreground mb-8 italic">
            What we cannot measure, we cannot protect.
          </p>
        </div>

        <div className="text-center">
          <Link href="/about">
            <Button variant="link" className="gap-2">
              Read the full story <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
