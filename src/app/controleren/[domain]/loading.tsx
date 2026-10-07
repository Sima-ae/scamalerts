import { CheckingStatus } from "@/components/checking-status";

export default function DomainCheckLoading() {
  return (
    <div className="relative min-h-[60vh] w-full overflow-hidden">
      <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="section-shell relative z-10 flex min-h-[60vh] flex-col items-center justify-center py-20">
        <CheckingStatus />
      </div>
    </div>
  );
}
