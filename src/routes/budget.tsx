import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, useAnalytics } from "@/lib/expense-store";
import { fmt } from "@/components/app/StatCard";
import { HeatBar } from "@/components/app/HeatBar";
import { InsightsPanel } from "@/components/app/Insights";
import { toast } from "sonner";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [
    { title: "Budget — FinCommand" },
    { name: "description", content: "Set and manage your monthly student budget." },
  ]}),
  component: BudgetPage,
});

function BudgetPage() {
  const { budget, setBudget } = useStore();
  const a = useAnalytics();
  const [val, setVal] = useState(String(budget));

  const save = () => {
    const n = parseFloat(val);
    if (!n || n < 0) return toast.error("Enter a valid amount");
    setBudget(n);
    toast.success("Budget updated");
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="glass-strong rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Monthly Budget</h2>
        <p className="text-sm text-muted-foreground mb-5">Set what you want to spend in a month — we’ll keep you on track.</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">₹</span>
            <input type="number" value={val} onChange={e => setVal(e.target.value)}
              className="w-full pl-10 pr-4 py-4 text-2xl font-semibold rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={save} className="px-6 rounded-xl bg-gradient-brand text-white font-semibold lift">Save</button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <Stat label="Spent" value={fmt(a.totalMonth)} />
          <Stat label="Remaining" value={fmt(Math.max(0, budget - a.totalMonth))} />
          <Stat label="Predicted" value={fmt(a.predictedMonthly)} />
        </div>
      </div>

      <HeatBar />
      <InsightsPanel />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3 bg-secondary/60">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
