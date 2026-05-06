import { useAnalytics, useStore, CATEGORY_META, type Category } from "@/lib/expense-store";
import { Brain, TrendingUp, AlertTriangle, PartyPopper } from "lucide-react";

export function InsightsPanel() {
  const { predictedMonthly, willExceed, daysToExceed, topCategory, totalToday, usagePct } = useAnalytics();
  const { budget } = useStore();

  const insights: { icon: React.ReactNode; text: string; tone: "info" | "warn" | "good" }[] = [];
  insights.push({
    icon: <TrendingUp className="h-4 w-4" />,
    text: `At this rate, you’ll spend ₹${predictedMonthly.toLocaleString("en-IN")} this month`,
    tone: willExceed ? "warn" : "info",
  });
  if (willExceed) {
    insights.push({
      icon: <AlertTriangle className="h-4 w-4" />,
      text: daysToExceed > 0 ? `You may exceed your budget in ${daysToExceed} days ⚠️` : `You’ve already exceeded your budget ⚠️`,
      tone: "warn",
    });
  } else if (budget > 0) {
    insights.push({
      icon: <PartyPopper className="h-4 w-4" />,
      text: `On track — you’ll save ₹${Math.max(0, budget - predictedMonthly).toLocaleString("en-IN")} 🎉`,
      tone: "good",
    });
  }
  if (topCategory) {
    const meta = CATEGORY_META[topCategory as Category];
    insights.push({
      icon: <Brain className="h-4 w-4" />,
      text: `${meta?.label ?? topCategory} will dominate your expenses ${meta?.icon ?? ""}`,
      tone: "info",
    });
  }
  if (totalToday === 0) {
    insights.push({ icon: <PartyPopper className="h-4 w-4" />, text: "Zero spent today — nice discipline 🧘", tone: "good" });
  }
  if (usagePct >= 80 && usagePct < 100) {
    insights.push({ icon: <AlertTriangle className="h-4 w-4" />, text: `You’re ${Math.round(usagePct)}% near your budget`, tone: "warn" });
  }

  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center text-white">
          <Brain className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-semibold leading-tight">Future You Predictor</h3>
          <p className="text-xs text-muted-foreground">Smart insights based on your habits</p>
        </div>
      </div>
      <ul className="space-y-2">
        {insights.map((i, idx) => {
          const color = i.tone === "warn" ? "var(--color-destructive)"
            : i.tone === "good" ? "var(--color-success)" : "var(--color-brand)";
          return (
            <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/60">
              <span className="mt-0.5 grid place-items-center h-7 w-7 rounded-lg" style={{ background: `color-mix(in oklab, ${color} 18%, transparent)`, color }}>
                {i.icon}
              </span>
              <span className="text-sm font-medium">{i.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
