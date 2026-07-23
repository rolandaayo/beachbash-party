import { Skeleton } from "@/components/Skeleton";
import OrderSteps from "@/components/OrderSteps";

export default function CartLoading() {
  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-8 w-24" />
        </div>
        <OrderSteps current="cart" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="card rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-3 w-12" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-28 rounded-xl" />
                  <Skeleton className="h-5 w-20 ml-auto" />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card rounded-2xl p-5">
              <Skeleton className="h-4 w-20 mb-5" />
              <div className="flex flex-col gap-2.5 mb-5">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="border-t border-white/7 pt-4 mb-5">
                <div className="flex justify-between items-baseline">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
              <Skeleton className="h-9 w-full rounded-full" />
              <Skeleton className="h-3 w-32 mx-auto mt-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
