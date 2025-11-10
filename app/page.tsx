import { WaterRippleBackground } from "@/components/water-ripple-background"
import { HydrologyContours } from "@/components/hydrology-contours"
import WaterParticles from "@/components/ui/WaterParticles"
import { InkBrushDivider } from "@/components/ink-brush-divider"

import { HeroSection } from "@/components/landing/hero-section"
import { WhySection } from "@/components/landing/why-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { TechnologySection } from "@/components/landing/technology-section"
import { NetworkStatusSection } from "@/components/landing/network-status-section"
import { JoinNetworkSection } from "@/components/landing/join-network-section"
import { FinalCTASection } from "@/components/landing/final-cta-section"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <WaterRippleBackground />
      <HydrologyContours />
      <WaterParticles className="pointer-events-none absolute inset-0 -z-10" />

      <HeroSection />

      <InkBrushDivider />

      <WhySection />

      <InkBrushDivider />

      <HowItWorksSection />

      <InkBrushDivider />

      <TechnologySection />

      <InkBrushDivider />

      <NetworkStatusSection />

      <InkBrushDivider />

      <JoinNetworkSection />

      <InkBrushDivider />

      <FinalCTASection />
    </main>
  )
}
