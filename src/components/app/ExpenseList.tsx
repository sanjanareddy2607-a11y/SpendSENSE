import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useStore, CATEGORY_META, type Category, type Expense } from "@/lib/expense-store";
import { fmt } from "./StatCard";

interface Props {
  expenses?: Expense[];
  empty?: string;
  showFilters?: boolean;
}

export function ExpenseList({ expenses: override, empty = "No expenses yet — tap + to add one.", showFilters = false }: Props) {
  const { expenses, deleteExpense } = useStore();
  const [cat, setCat] = useState<"all" | Category>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  let list = (override ?? expenses).slice().sort((a,b) => +new Date(b.date) - +new Date(a.date));
  if (showFilters) {
    if (cat !== "all") list = list.filter(e => e.category === cat);
    if (from) list = list.filter(e => new Date(e.date) >= new Date(from));
    if (to) list = list.filter(e => new Date(e.date) <= new Date(to + "T23:59:59"));
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold">Recent Expenses</h3>
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            <select value={cat} onChange={e => setCat(e.target.value as Category | "all")}
              className="text-xs rounded-lg bg-secondary px-2.5 py-1.5 border border-border">
              <option value="all">All categories</option>
              {Object.entries(CATEGORY_META).map(([k, v]) => (
                <option key={k} value={k}>{v.icon} {v.label}</option>
              ))}
            </select>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)}
              className="text-xs rounded-lg bg-secondary px-2.5 py-1.5 border border-border" />
            <input type="date" value={to} onChange={e => setTo(e.target.value)}
              className="text-xs rounded-lg bg-secondary px-2.5 py-1.5 border border-border" />
          </div>
        )}
      </div>
      {list.length === 0 ? (
        <div className="py-10 text-center text-sm text-muted-foreground">{empty}</div>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-3">
          {list.map(e => {
            const meta = CATEGORY_META[e.category];
            return (
              <li key={e.id}
                className="group flex items-center gap-3 rounded-xl p-3 bg-secondary/60 hover:bg-secondary transition lift"
                style={{ animation: "fadeIn .25s ease" }}>
                <div className="h-11 w-11 rounded-xl grid place-items-center text-xl"
                  style={{ background: `color-mix(in oklab, ${meta.color} 18%, transparent)` }}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="font-medium truncate">{e.note || meta.label}</div>
                    <div className="font-semibold">{fmt(e.amount)}</div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{meta.label}</span>
                    <span>{new Date(e.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
                <button onClick={() => deleteExpense(e.id)}
                  className="opacity-0 group-hover:opacity-100 transition h-9 w-9 grid place-items-center rounded-lg text-destructive hover:bg-destructive/10"
                  aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
