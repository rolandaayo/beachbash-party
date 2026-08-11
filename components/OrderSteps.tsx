type Step = "cart" | "checkout" | "confirmation";

const STEPS: { id: Step; label: string }[] = [
  { id: "cart", label: "Cart" },
  { id: "checkout", label: "Details" },
  { id: "confirmation", label: "Confirmed" },
];

export default function OrderSteps({
  current,
  dark = false,
}: {
  current: Step;
  dark?: boolean;
}) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;

        return (
          <div key={step.id} className="flex items-center gap-0">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${
                  done
                    ? "bg-[#7c3aed] text-white"
                    : active
                      ? dark
                        ? "bg-white/15 text-white ring-1 ring-white/30"
                        : "bg-purple-100 text-[#7c3aed] ring-1 ring-[#7c3aed]/40"
                      : dark
                        ? "bg-white/8 text-white/25"
                        : "bg-purple-50 text-purple-300"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`text-[10px] tracking-wide font-medium ${
                  active
                    ? dark
                      ? "text-white"
                      : "text-[#7c3aed]"
                    : done
                      ? dark
                        ? "text-white/50"
                        : "text-purple-400"
                      : dark
                        ? "text-white/25"
                        : "text-purple-200"
                }`}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-12 sm:w-20 mx-1 mb-4 transition-colors ${
                  done
                    ? "bg-[#7c3aed]/60"
                    : dark
                      ? "bg-white/10"
                      : "bg-purple-100"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
