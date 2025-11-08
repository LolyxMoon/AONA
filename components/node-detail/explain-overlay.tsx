"use client"

interface ExplainOverlayProps {
  title: string
  content: string
  onClose: () => void
}

export function ExplainOverlay({ title, content, onClose }: ExplainOverlayProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="bg-card border border-border/50 rounded-lg p-8 max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-light tracking-wide mb-4">{title}</h3>
        <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">{content}</p>
        <button
          onClick={onClose}
          className="text-sm font-light text-primary hover:opacity-70 transition-opacity tracking-wide"
        >
          Close
        </button>
      </div>
    </div>
  )
}
