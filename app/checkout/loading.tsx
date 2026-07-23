import { Skeleton } from "@/components/Skeleton";
import OrderSteps from "@/components/OrderSteps";

export default function CheckoutLoading() {
  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-8 w-32" />
        </div>
        <OrderSteps current="checkout" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form skeleton */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="card rounded-2xl p-6">
              <Skeleton className="h-4 w-28 mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-3 w-20 mb-1.5" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <Skeleton className="h-3 w-24 mb-1.5" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
            </div>

            <div className="card rounded-2xl p-5">
              <Skeleton className="h-4 w-20 mb-4" />
              <div className="flex items-start gap-3 bg-white/3 border border-white/6 rounded-xl p-4">
                <Skeleton className="h-7 w-7 rounded-full shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-32 mb-2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Summary skeleton */}
          <div className="lg:col-span-1">
            <div className="card rounded-2xl p-5">
              <Skeleton className="h-4 w-20 mb-5" />
              <div className="flex flex-col gap-2.5 mb-5">
                {[1, 2].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
              <div className="border-t border-white/7 pt-4 mb-5">
                <div className="flex justify-between items-baseline">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
              <Skeleton className="h-9 w-full rounded-full" />
              <Skeleton className="h-3 w-40 mx-auto mt-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
