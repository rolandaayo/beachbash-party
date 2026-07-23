type Step = "cart" | "checkout" | "confirmation";

const STEPS: { id: Step; label: string }[] = [
  { id: "cart", label: "Cart" },
  { id: "checkout", label: "Details" },
  { id: "confirmation", label: "Confirmed" },
];

export default function OrderSteps({ current }: { current: Step }) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;

        return (
          <div key={step.id} className="flex items-center gap-0">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${
                  done
                    ? "bg-white text-black"
                    : active
                      ? "bg-white/15 text-white ring-1 ring-white/30"
                      : "bg-white/5 text-white/20"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`text-[10px] tracking-wide font-medium ${
                  active
                    ? "text-white/70"
                    : done
                      ? "text-white/40"
                      : "text-white/15"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-12 sm:w-20 mx-1 mb-4 transition-colors ${
                  done ? "bg-white/30" : "bg-white/8"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
