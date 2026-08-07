import Spinner from "@/components/Spinner";

export default function LoginLoading() {
  return (
    <div className="pt-14 min-h-screen flex items-center justify-center">
      <Spinner className="w-8 h-8 text-purple-400" />
    </div>
  );
}
