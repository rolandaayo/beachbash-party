export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending_payment: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-600",
    refunded: "bg-gray-100 text-gray-500",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${styles[status] ?? "bg-gray-100 text-gray-500"}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
