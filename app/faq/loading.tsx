import { Skeleton } from "@/components/Skeleton";

export default function FAQLoading() {
  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-5 w-28 rounded-full mx-auto mb-4" />
          <Skeleton className="h-14 w-28 mx-auto mb-3" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-2 mb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="border border-purple-100 rounded-xl px-5 py-4"
            >
              <div className="flex items-center justify-between gap-4">
                <Skeleton
                  className={`h-4 ${i % 3 === 0 ? "w-3/4" : i % 3 === 1 ? "w-5/6" : "w-2/3"}`}
                />
                <Skeleton className="h-5 w-5 rounded-full shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Contact card */}
        <div className="border border-purple-100 rounded-2xl p-7 text-center">
          <Skeleton className="h-8 w-8 rounded-full mx-auto mb-3" />
          <Skeleton className="h-5 w-40 mx-auto mb-2" />
          <Skeleton className="h-3 w-56 mx-auto mb-5" />
          <Skeleton className="h-9 w-24 rounded-full mx-auto" />
        </div>

        <div className="text-center mt-10">
          <Skeleton className="h-4 w-44 mx-auto rounded-full" />
        </div>
      </div>
    </div>
  );
}
