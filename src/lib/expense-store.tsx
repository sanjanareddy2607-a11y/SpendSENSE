import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Category = "food" | "transport" | "coffee" | "shopping" | "books" | "rent" | "fun" | "other";

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  note: string;
  date: string; // ISO
}

export const CATEGORY_META: Record<Category, { label: string; icon: string; color: string }> = {
  food:     { label: "Food",      icon: "🍕", color: "#ef4444" },
  transport:{ label: "Transport", icon: "🚗", color: "#3b82f6" },
  coffee:   { label: "Coffee",    icon: "☕", color: "#a16207" },
  shopping: { label: "Shopping",  icon: "🛍️", color: "#8b5cf6" },
  books:    { label: "Books",     icon: "📚", color: "#0ea5e9" },
  rent:     { label: "Rent",      icon: "🏠", color: "#22c55e" },
  fun:      { label: "Fun",       icon: "🎮", color: "#ec4899" },
  other:    { label: "Other",     icon: "✨", color: "#64748b" },
};

interface StoreCtx {
  expenses: Expense[];
  budget: number;
  addExpense: (e: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  setBudget: (n: number) => void;
  dark: boolean;
  toggleDark: () => void;
  userName: string;
  setUserName: (s: string) => void;
}

const Ctx = createContext<StoreCtx | null>(null);
const KEY = "sfcc:v1";

const seedDate = (offsetDays: number, h = 12) => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
};

const SEED: Expense[] = [
  { id: "s1", amount: 220, category: "food",      note: "Cafeteria lunch",   date: seedDate(0, 13) },
  { id: "s2", amount: 80,  category: "coffee",    note: "Latte",             date: seedDate(0, 9) },
  { id: "s3", amount: 60,  category: "transport", note: "Metro",             date: seedDate(1, 8) },
  { id: "s4", amount: 450, category: "books",     note: "DSA textbook",      date: seedDate(2, 16) },
  { id: "s5", amount: 320, category: "fun",       note: "Movie night",       date: seedDate(3, 20) },
  { id: "s6", amount: 180, category: "food",      note: "Pizza w/ friends",  date: seedDate(4, 21) },
  { id: "s7", amount: 95,  category: "transport", note: "Uber",              date: seedDate(5, 18) },
  { id: "s8", amount: 1200,category: "shopping",  note: "New hoodie",        date: seedDate(7, 14) },
  { id: "s9", amount: 140, category: "coffee",    note: "Study session",     date: seedDate(8, 10) },
  { id: "s10",amount: 260, category: "food",      note: "Dinner",            date: seedDate(10,19) },
];

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudgetState] = useState<number>(8000);
  const [dark, setDark] = useState(false);
  const [userName, setUserName] = useState("Alex");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setExpenses(p.expenses ?? SEED);
        setBudgetState(p.budget ?? 8000);
        setDark(!!p.dark);
        setUserName(p.userName ?? "Alex");
      } else {
        setExpenses(SEED);
      }
    } catch { setExpenses(SEED); }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ expenses, budget, dark, userName }));
    document.documentElement.classList.toggle("dark", dark);
  }, [expenses, budget, dark, userName, hydrated]);

  const value = useMemo<StoreCtx>(() => ({
    expenses,
    budget,
    addExpense: (e) => setExpenses(prev => [{ ...e, id: crypto.randomUUID() }, ...prev]),
    deleteExpense: (id) => setExpenses(prev => prev.filter(x => x.id !== id)),
    setBudget: setBudgetState,
    dark,
    toggleDark: () => setDark(d => !d),
    userName,
    setUserName,
  }), [expenses, budget, dark, userName]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used inside ExpenseProvider");
  return c;
}

// Derived analytics
export function useAnalytics() {
  const { expenses, budget } = useStore();
  return useMemo(() => {
    const now = new Date();
    const startOfDay = new Date(now); startOfDay.setHours(0,0,0,0);
    const startOfWeek = new Date(startOfDay); startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const sum = (arr: Expense[]) => arr.reduce((a, b) => a + b.amount, 0);
    const today = expenses.filter(e => new Date(e.date) >= startOfDay);
    const week = expenses.filter(e => new Date(e.date) >= startOfWeek);
    const month = expenses.filter(e => new Date(e.date) >= startOfMonth);

    const totalToday = sum(today);
    const totalWeek = sum(week);
    const totalMonth = sum(month);
    const remaining = budget - totalMonth;

    const byCategory = month.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount; return acc;
    }, {});

    // Daily series (last 14 days)
    const days: { label: string; date: string; amount: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(startOfDay); d.setDate(d.getDate() - i);
      const next = new Date(d); next.setDate(next.getDate() + 1);
      const total = sum(expenses.filter(e => { const x = new Date(e.date); return x >= d && x < next; }));
      days.push({
        label: d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" }),
        date: d.toISOString(),
        amount: total,
      });
    }

    // Predictor
    const dayOfMonth = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    const dailyAvg = totalMonth / Math.max(1, dayOfMonth);
    const predictedMonthly = Math.round(dailyAvg * daysInMonth);
    const willExceed = predictedMonthly > budget;
    const daysToExceed = dailyAvg > 0 && remaining > 0 ? Math.ceil(remaining / dailyAvg) : 0;
    const topCatEntry = Object.entries(byCategory).sort((a,b) => b[1]-a[1])[0];

    const usagePct = budget > 0 ? Math.min(100, (totalMonth / budget) * 100) : 0;
    const heatLevel: "safe" | "moderate" | "danger" =
      usagePct < 60 ? "safe" : usagePct < 90 ? "moderate" : "danger";

    return {
      totalToday, totalWeek, totalMonth, remaining,
      byCategory, days,
      dailyAvg, predictedMonthly, willExceed, daysToExceed,
      topCategory: topCatEntry?.[0] as string | undefined,
      usagePct, heatLevel,
    };
  }, [expenses, budget]);
}
