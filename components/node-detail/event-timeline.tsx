import type { NodeEvent } from "@/lib/mock"

interface EventTimelineProps {
  events: NodeEvent[]
}

export function EventTimeline({ events }: EventTimelineProps) {
  const getIcon = (type: NodeEvent["type"]) => {
    switch (type) {
      case "reading":
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="3" />
          </svg>
        )
      case "signed":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75" />
          </svg>
        )
      case "payment":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        )
      case "alert":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )
      case "calibration":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
          </svg>
        )
    }
  }

  const getColor = (type: NodeEvent["type"]) => {
    switch (type) {
      case "reading":
        return "text-muted-foreground"
      case "signed":
        return "text-secondary"
      case "payment":
        return "text-primary"
      case "alert":
        return "text-accent"
      case "calibration":
        return "text-foreground"
    }
  }

  return (
    <section className="mb-16">
      <h3 className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-8">Event Timeline</h3>

      <div className="space-y-6">
        {events.map((event, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full border border-border/30 flex items-center justify-center ${getColor(event.type)}`}
              >
                {getIcon(event.type)}
              </div>
              {i < events.length - 1 && <div className="w-px flex-1 bg-border/20 mt-2" />}
            </div>

            <div className="flex-1 pb-6">
              <p className="text-sm font-light mb-1">{event.note}</p>
              <p className="text-xs font-light text-muted-foreground">{new Date(event.ts).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
