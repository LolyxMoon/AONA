import type { NodeHardware } from "@/lib/mock"

interface CalibrationCardProps {
  hardware: NodeHardware
}

export function CalibrationCard({ hardware }: CalibrationCardProps) {
  return (
    <section className="mb-16 pb-12 border-b border-border/20">
      <h3 className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-8">
        Calibration & Hardware
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-sm font-light">
        <div>
          <p className="text-muted-foreground mb-1 text-xs tracking-wide">Sensor Model</p>
          <p>{hardware.sensorModel}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-xs tracking-wide">Firmware</p>
          <p>{hardware.firmwareVersion}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-xs tracking-wide">Last Calibration</p>
          <p>{new Date(hardware.lastCalibration).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-xs tracking-wide">Method</p>
          <p>{hardware.calibrationMethod}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-xs tracking-wide">Power</p>
          <p className="capitalize">{hardware.power}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-xs tracking-wide">Connectivity</p>
          <p>{hardware.connectivity}</p>
        </div>
      </div>
    </section>
  )
}
