import { useAnalytics } from "@/lib/expense-store";

export function HeatBar() {
  const { usagePct, heatLevel, totalMonth } = useAnalytics();
  const color = heatLevel === "safe" ? "var(--color-success)"
    : heatLevel === "moderate" ? "var(--color-warning)" : "var(--color-destructive)";
  const label = heatLevel === "safe" ? "🟢 Safe zone"
    : heatLevel === "moderate" ? "🟡 Watch your spending" : "🔴 Overspending!";
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Spending Heat</div>
        <div className="text-xs text-muted-foreground">{Math.round(usagePct)}% of budget · ₹{Math.round(totalMonth).toLocaleString("en-IN")}</div>
      </div>
      <div className="h-3 rounded-full bg-secondary overflow-hidden relative">
        <div className="h-full rounded-full transition-[width] duration-700 ease-out"
             style={{ width: `${Math.min(100, usagePct)}%`, background: `linear-gradient(90deg, var(--color-success), var(--color-warning), var(--color-destructive))` }} />
      </div>
      <div className="mt-2 text-xs font-medium" style={{ color }}>{label}</div>
    </div>
  );
}
