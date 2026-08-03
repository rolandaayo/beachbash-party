export function Skeleton({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-lg animate-pulse ${dark ? "bg-white/10" : "bg-purple-100"} ${className}`}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`card rounded-2xl p-5 ${className}`}>
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-4/5 mb-2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
