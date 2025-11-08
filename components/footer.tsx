import { InkBrushDivider } from "./ink-brush-divider"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/10 backdrop-blur-sm mt-32">
      <InkBrushDivider />
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-extralight tracking-[0.25em] mb-6">AONA</h3>
            <p className="text-sm text-muted-foreground/60 font-extralight leading-loose tracking-wide">
              Rivers remember.
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-sm font-extralight tracking-[0.12em] mb-6 text-muted-foreground/80">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: "Atlas", href: "/atlas" },
                { label: "Insight", href: "/insight" },
                { label: "Nodes", href: "/nodes" },
                { label: "Integrate", href: "/integrate" },
                { label: "Story", href: "/pitch" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-500 font-extralight tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/10 text-center">
          <p className="text-xs text-muted-foreground/50 font-extralight tracking-[0.15em]">静水 · Stillness</p>
        </div>
      </div>
    </footer>
  )
}
