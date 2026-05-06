import { createFileRoute } from "@tanstack/react-router";
import { ExpenseList } from "@/components/app/ExpenseList";
import { useStore } from "@/lib/expense-store";
import { fmt } from "@/components/app/StatCard";

export const Route = createFileRoute("/expenses")({
  head: () => ({ meta: [
    { title: "Expenses — FinCommand" },
    { name: "description", content: "Browse and filter all your tracked expenses." },
  ]}),
  component: ExpensesPage,
});

function ExpensesPage() {
  const { expenses } = useStore();
  const total = expenses.reduce((a, b) => a + b.amount, 0);
  return (
    <div className="space-y-5">
      <div className="glass-strong rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">All Expenses</h2>
          <p className="text-sm text-muted-foreground">{expenses.length} entries · Total {fmt(total)}</p>
        </div>
      </div>
      <ExpenseList showFilters />
    </div>
  );
}
