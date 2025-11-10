import { HeroInkBrush } from "@/components/hero-ink-brush"
import { InkBrushDivider } from "@/components/ink-brush-divider"

export function HeroSection() {
  return (
    <section className="relative pt-48 pb-40 px-6 min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-20">
          <HeroInkBrush />

          <div className="space-y-20">
            <h1 className="font-extralight tracking-[0.2em] text-balance">
              <span className="inline-block">AONA</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground/60 font-extralight tracking-[0.15em] max-w-2xl mx-auto leading-loose">
              Autonomous Oracles for Networked Aquatic Systems
            </p>

            <p className="text-xs text-muted-foreground/40 font-extralight tracking-[0.18em] max-w-xl mx-auto leading-relaxed">
              Hydrology for planetary resilience
            </p>
          </div>

          <div className="py-24">
            <InkBrushDivider />
            <div className="py-16 space-y-6">
              <p className="text-base md:text-lg font-extralight tracking-[0.18em] text-foreground/60">
                Water knows.
              </p>
              <p className="text-base md:text-lg font-extralight tracking-[0.18em] text-foreground/60">
                The network translates.
              </p>
              <p className="text-base md:text-lg font-extralight tracking-[0.18em] text-foreground/60">
                AONA.
              </p>
            </div>
            <InkBrushDivider />
          </div>
        </div>
      </div>
    </section>
  )
}
