import type { ReactNode } from "react";

export function StatCard({
  label, value, icon, accent, sub,
}: { label: string; value: ReactNode; icon: ReactNode; accent?: string; sub?: ReactNode }) {
  return (
    <div className="glass-strong rounded-2xl p-5 lift relative overflow-hidden">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-30 blur-2xl"
           style={{ background: accent ?? "var(--gradient-brand)" }} />
      <div className="flex items-start justify-between gap-3 relative">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
          {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
        </div>
        <div className="h-10 w-10 rounded-xl bg-gradient-brand grid place-items-center text-white">
          {icon}
        </div>
      </div>
    </div>
  );
}

export const fmt = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");
