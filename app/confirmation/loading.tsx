import { Skeleton } from "@/components/Skeleton";
import OrderSteps from "@/components/OrderSteps";

export default function ConfirmationLoading() {
  return (
    <div className="pt-28 pb-20 px-5 max-w-xl mx-auto">
      <OrderSteps current="confirmation" />

      {/* Icon + header */}
      <div className="flex flex-col items-center text-center mb-8">
        <Skeleton className="h-14 w-14 rounded-full mb-5" />
        <Skeleton className="h-3 w-24 mb-4" />
        <Skeleton className="h-9 w-56 mb-3" />
        <Skeleton className="h-3 w-72 mb-2" />
        <Skeleton className="h-3 w-52" />
      </div>

      {/* Order card */}
      <div className="card rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div>
            <Skeleton className="h-2.5 w-16 mb-1.5" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>
        <div className="border-t border-white/7 pt-4 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-2.5 w-12 mb-1.5" />
              <Skeleton className="h-3.5 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-8">
        <Skeleton className="h-3 w-24 mb-3" />
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-3 w-full" />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Skeleton className="h-9 w-36 rounded-full" />
      </div>
    </div>
  );
}
