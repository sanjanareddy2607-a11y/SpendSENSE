import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useAnalytics, CATEGORY_META, type Category } from "@/lib/expense-store";

export function CategoryPie() {
  const { byCategory } = useAnalytics();
  const data = Object.entries(byCategory).map(([k, v]) => ({
    name: CATEGORY_META[k as Category]?.label ?? k, value: v, key: k,
  }));
  return (
    <div className="glass rounded-2xl p-5 h-[340px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Category Breakdown</h3>
        <span className="text-xs text-muted-foreground">This month</span>
      </div>
      {data.length === 0 ? (
        <div className="flex-1 grid place-items-center text-sm text-muted-foreground">No data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
              {data.map(d => (
                <Cell key={d.key} fill={CATEGORY_META[d.key as Category]?.color ?? "#888"} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--popover-foreground)" }}
              formatter={(v: number) => "₹" + v.toLocaleString("en-IN")} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export function DailyBars() {
  const { days } = useAnalytics();
  return (
    <div className="glass rounded-2xl p-5 h-[340px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Daily Spending</h3>
        <span className="text-xs text-muted-foreground">Last 14 days</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={days} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="bar" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} interval={1} />
          <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: "var(--accent)", opacity: 0.4 }}
            contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--popover-foreground)" }}
            formatter={(v: number) => "₹" + v.toLocaleString("en-IN")} />
          <Bar dataKey="amount" fill="url(#bar)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
