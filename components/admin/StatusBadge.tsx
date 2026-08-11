export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-green-500/15 text-green-400 border-green-500/20",
    pending_payment: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    failed: "bg-red-500/15 text-red-400 border-red-500/20",
    refunded: "bg-white/10 text-white/40 border-white/10",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] ?? "bg-white/10 text-white/40 border-white/10"}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
