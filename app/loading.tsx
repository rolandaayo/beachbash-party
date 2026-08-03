import { Skeleton } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <div className="ticket-hero px-5 pt-20 pb-14">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-7 w-44 rounded-full mb-8" dark />
          <Skeleton className="h-20 w-72 mb-2" dark />
          <Skeleton className="h-20 w-52 mb-6" dark />
          <Skeleton className="h-4 w-80 mb-2" dark />
          <Skeleton className="h-4 w-64 mb-8" dark />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-36 rounded-full" dark />
            <Skeleton className="h-10 w-32 rounded-full" dark />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-y border-purple-100 py-4 bg-[#faf5ff] px-5">
        <Skeleton className="h-5 w-full max-w-2xl mx-auto rounded-full" />
      </div>

      {/* Event carousel */}
      <div
        className="py-20 px-5"
        style={{
          background: "linear-gradient(135deg, #3b0764, #4c1d95, #2e1065)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-72 rounded-3xl p-7 ${i === 1 ? "bg-white" : "bg-white/8"}`}
              >
                <Skeleton
                  className={`h-3 w-6 mb-8 ${i === 1 ? "" : ""}`}
                  dark={i !== 1}
                />
                <Skeleton className="h-5 w-36 mb-2" dark={i !== 1} />
                <Skeleton className="h-4 w-full mb-1" dark={i !== 1} />
                <Skeleton className="h-4 w-4/5" dark={i !== 1} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className={`h-2 rounded-full ${i === 1 ? "w-6" : "w-2"}`}
                  dark
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-9 h-9 rounded-full" dark />
              <Skeleton className="w-9 h-9 rounded-full" dark />
            </div>
          </div>
        </div>
      </div>

      {/* Ticket carousel */}
      <div className="py-20 px-5 bg-white border-t border-purple-100">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-4 w-24 rounded-full mb-3" />
          <Skeleton className="h-9 w-48 mb-10" />
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-72 rounded-3xl border border-purple-100 p-6 ${i > 1 ? "opacity-40" : ""}`}
              >
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-28 mb-3" />
                <Skeleton className="h-8 w-24 mb-1" />
                <Skeleton className="h-3 w-16 mb-6" />
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-3 w-full mb-2" />
                ))}
                <Skeleton className="h-9 w-full rounded-xl mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
