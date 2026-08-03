import { Skeleton } from "@/components/Skeleton";

export default function TicketsLoading() {
  return (
    <div className="pt-14">
      {/* Dark hero */}
      <div className="ticket-hero px-5 pt-20 pb-16">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-7 w-44 rounded-full mb-8" dark />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <Skeleton className="h-16 w-64 mb-3" dark />
              <Skeleton className="h-16 w-48 mb-6" dark />
              <Skeleton className="h-4 w-72 mb-2" dark />
              <Skeleton className="h-4 w-56" dark />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 rounded-2xl" dark />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-[#2e1065] py-5 px-5">
        <Skeleton className="h-6 w-full max-w-3xl mx-auto rounded-full" dark />
      </div>

      {/* Cards area */}
      <div className="bg-[#faf5ff] px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <Skeleton className="h-6 w-52" />
            <div className="flex-1 h-px bg-purple-100" />
          </div>
          {/* Regular ticket wide card */}
          <Skeleton className="h-40 w-full rounded-3xl mb-5" />
          {/* Table cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-purple-100 rounded-3xl p-7"
              >
                <Skeleton className="h-3 w-20 mb-3" />
                <Skeleton className="h-6 w-28 mb-4" />
                <Skeleton className="h-9 w-32 mb-1" />
                <Skeleton className="h-3 w-16 mb-6" />
                <div className="border-t border-purple-100 pt-4 flex flex-col gap-2.5">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} className="h-3 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Comparison table */}
          <Skeleton className="h-72 w-full rounded-3xl mb-10" />
          {/* Trust strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
