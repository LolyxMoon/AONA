"use client"

import clsx from "clsx"
import { Badge } from "@/components/ui/badge"

type Accent = "default" | "live" | "primary"

interface HeadingBadge {
  label: string
  icon?: string
  accent?: Accent
}

interface PageHeadingProps {
  title: string
  subtitle?: string
  eyebrow?: string
  align?: "left" | "center"
  badges?: HeadingBadge[]
  className?: string
}

const badgeAccent: Record<Accent, string> = {
  default: "border-border/60 text-foreground/70",
  live: "border-green-500/50 text-green-500",
  primary: "border-primary/40 text-primary"
}

export function PageHeading({
  title,
  subtitle,
  eyebrow,
  align = "left",
  badges,
  className
}: PageHeadingProps) {
  const alignment = align === "center" ? "text-center" : ""
  const layout = align === "center" ? "mx-auto" : ""
  const badgeLayout = align === "center" ? "justify-center" : ""

  return (
    <div className={clsx("space-y-4", alignment, className)}>
      {eyebrow && (
        <p className="text-xs font-light tracking-[0.4em] uppercase text-muted-foreground/80">
          {eyebrow}
        </p>
      )}
      <h1 className={clsx("text-4xl font-extralight tracking-[0.2em] text-foreground/80", layout)}>
        {title}
      </h1>
      {subtitle && (
        <p className={clsx("text-sm font-light text-muted-foreground tracking-[0.3em] uppercase leading-relaxed max-w-3xl", layout)}>
          {subtitle}
        </p>
      )}
      {badges && badges.length > 0 && (
        <div className={clsx("flex flex-wrap gap-2", badgeLayout)}>
          {badges.map((badge) => (
            <Badge
              key={`${badge.label}-${badge.icon ?? ""}`}
              variant="outline"
              className={clsx(
                "text-[11px] tracking-[0.2em] uppercase",
                badgeAccent[badge.accent ?? "default"]
              )}
            >
              {badge.icon ? `${badge.icon} ${badge.label}` : badge.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
