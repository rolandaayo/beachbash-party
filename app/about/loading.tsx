import { Skeleton } from "@/components/Skeleton";

export default function AboutLoading() {
  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-12 rounded-full mx-auto mb-5" />
          <Skeleton className="h-5 w-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-12 w-64 mx-auto mb-3" />
          <Skeleton className="h-4 w-72 mx-auto" />
        </div>

        {/* Story grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div>
            <Skeleton className="h-7 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-44 rounded-2xl" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <Skeleton className="h-7 w-48 mx-auto mb-8" />
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <Skeleton className="w-2 h-2 rounded-full" />
                  {i < 5 && <div className="w-px h-12 bg-purple-100 my-1" />}
                </div>
                <div className="pb-2 flex-1">
                  <Skeleton className="h-3 w-16 mb-1.5" />
                  <Skeleton className="h-4 w-32 mb-1.5" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-purple-100 pt-12">
          <Skeleton className="h-10 w-52 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}
