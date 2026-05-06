import { Moon, Sun } from "lucide-react";
import { useStore } from "@/lib/expense-store";

export function TopBar() {
  const { dark, toggleDark, userName } = useStore();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <header className="flex items-center justify-between gap-4 px-1 py-2 mb-4">
      <div>
        <div className="text-xs text-muted-foreground">{greeting},</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="text-gradient">{userName}</span> 👋
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleDark} aria-label="Toggle theme"
          className="h-10 w-10 rounded-xl glass grid place-items-center lift">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <div className="h-10 w-10 rounded-xl bg-gradient-brand grid place-items-center text-white font-semibold shadow-[var(--shadow-glow)]">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
