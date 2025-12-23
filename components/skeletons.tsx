import { cn } from "@/lib/utils";

const SkeletonBlock = ({ className }: { className: string }) => (
  <div className={cn("animate-pulse rounded-xl bg-white/10", className)} />
);

export function WeatherCardSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-4 w-full">
          <SkeletonBlock className="h-4 w-24" />
          <div className="flex items-center gap-4">
            <SkeletonBlock className="h-12 w-12 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-12 w-44" />
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-3 w-40" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full sm:w-auto">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonBlock key={idx} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DetailsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="glass rounded-2xl px-4 py-4 sm:px-5 sm:py-5">
          <SkeletonBlock className="h-4 w-16 mb-3" />
          <SkeletonBlock className="h-6 w-24" />
        </div>
      ))}
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 7 }).map((_, idx) => (
        <div key={idx} className="glass fade-border rounded-2xl px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-6 w-6 rounded-lg" />
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-3 w-36" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-4 w-10" />
              <SkeletonBlock className="h-4 w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

