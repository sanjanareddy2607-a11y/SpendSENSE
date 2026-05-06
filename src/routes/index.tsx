import { createFileRoute } from "@tanstack/react-router";
import { Wallet, CalendarDays, PiggyBank, Flame } from "lucide-react";
import { useAnalytics, useStore } from "@/lib/expense-store";
import { StatCard, fmt } from "@/components/app/StatCard";
import { CategoryPie, DailyBars } from "@/components/app/Charts";
import { InsightsPanel } from "@/components/app/Insights";
import { ExpenseList } from "@/components/app/ExpenseList";
import { HeatBar } from "@/components/app/HeatBar";

export const Route = createFileRoute("/")({ component: Dashboard });

function Dashboard() {
  const a = useAnalytics();
  const { budget } = useStore();
  const remaining = Math.max(0, budget - a.totalMonth);

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="This Month" value={fmt(a.totalMonth)} icon={<Wallet className="h-5 w-5" />}
          sub={`Budget ${fmt(budget)}`} />
        <StatCard label="Today" value={fmt(a.totalToday)} icon={<CalendarDays className="h-5 w-5" />}
          sub={`Week ${fmt(a.totalWeek)}`} accent="linear-gradient(135deg,#3b82f6,#22c55e)" />
        <StatCard label="Remaining" value={fmt(remaining)} icon={<PiggyBank className="h-5 w-5" />}
          sub={budget > 0 ? `${Math.round((remaining/budget)*100)}% left` : "Set a budget"}
          accent="linear-gradient(135deg,#22c55e,#3b82f6)" />
        <StatCard label="Predicted" value={fmt(a.predictedMonthly)} icon={<Flame className="h-5 w-5" />}
          sub={a.willExceed ? "⚠️ Over budget pace" : "✅ On track"}
          accent={a.willExceed ? "linear-gradient(135deg,#ef4444,#8b5cf6)" : "linear-gradient(135deg,#8b5cf6,#3b82f6)"} />
      </section>

      <HeatBar />

      <section className="grid lg:grid-cols-2 gap-5">
        <CategoryPie />
        <DailyBars />
      </section>

      <section className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><ExpenseList /></div>
        <InsightsPanel />
      </section>
    </div>
  );
}
