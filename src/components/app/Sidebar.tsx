import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Wallet, Target, Settings, Sparkles } from "lucide-react";

const items = [
  { to: "/",         label: "Dashboard", icon: LayoutDashboard },
  { to: "/expenses", label: "Expenses",  icon: Wallet },
  { to: "/budget",   label: "Budget",    icon: Target },
  { to: "/settings", label: "Settings",  icon: Settings },
] as const;

export function Sidebar() {
  const path = useRouterState({ select: s => s.location.pathname });
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 p-4 gap-2">
      <div className="glass rounded-2xl p-5 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-[var(--shadow-glow)]">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">FinCommand</div>
            <div className="text-xs text-muted-foreground">Student Finance</div>
          </div>
        </div>
      </div>
      <nav className="glass rounded-2xl p-2 flex flex-col gap-1">
        {items.map(({ to, label, icon: Icon }) => {
          const active = path === to;
          return (
            <Link key={to} to={to}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all
                ${active ? "glow-active" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}>
              <Icon className="h-4 w-4" /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto glass rounded-2xl p-4 text-xs text-muted-foreground">
        <div className="font-semibold text-foreground mb-1">Pro tip ✨</div>
        Track daily — small leaks sink big budgets.
      </div>
    </aside>
  );
}

export function MobileNav() {
  const path = useRouterState({ select: s => s.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 glass-strong rounded-2xl p-1.5 flex justify-around">
      {items.map(({ to, label, icon: Icon }) => {
        const active = path === to;
        return (
          <Link key={to} to={to}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-[10px] font-medium transition
              ${active ? "glow-active" : "text-muted-foreground"}`}>
            <Icon className="h-4 w-4" /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
