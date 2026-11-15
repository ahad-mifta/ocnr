import { lazy, Suspense } from "react";

const ParticleField = lazy(() =>
  import("./ParticleShip").then((module) => ({ default: module.ParticleShip })),
);

type ParticleVisualProps = {
  source: string;
  className?: string;
  scale?: number;
};

export function ParticleVisual({ source, className = "", scale = 0.66 }: ParticleVisualProps) {
  return (
    <div className={`inner-particle-art ${className}`} aria-hidden="true">
      <Suspense fallback={null}>
        <ParticleField
          paused={false}
          source={source}
          scale={scale}
          className="particle-inner-stage"
        />
      </Suspense>
    </div>
  );
}
