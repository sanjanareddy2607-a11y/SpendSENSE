import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/expense-store";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [
    { title: "Settings — FinCommand" },
    { name: "description", content: "Personalize your FinCommand experience." },
  ]}),
  component: SettingsPage,
});

function SettingsPage() {
  const { userName, setUserName, dark, toggleDark } = useStore();
  const [name, setName] = useState(userName);

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="glass-strong rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <label className="text-xs text-muted-foreground">Display name</label>
        <div className="flex gap-3 mt-1">
          <input value={name} onChange={e => setName(e.target.value)} maxLength={24}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
          <button onClick={() => { setUserName(name.trim() || "Student"); toast.success("Saved"); }}
            className="px-5 rounded-xl bg-gradient-brand text-white font-semibold lift">Save</button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 flex items-center justify-between">
        <div>
          <div className="font-semibold">Dark Mode</div>
          <div className="text-sm text-muted-foreground">Easier on the eyes during late-night study sessions.</div>
        </div>
        <button onClick={toggleDark}
          className={`relative h-7 w-12 rounded-full transition ${dark ? "bg-gradient-brand" : "bg-secondary border border-border"}`}>
          <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${dark ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="font-semibold mb-2">About</div>
        <p className="text-sm text-muted-foreground">
          FinCommand is your futuristic student finance command center. Data is saved locally on this device.
        </p>
      </div>
    </div>
  );
}
