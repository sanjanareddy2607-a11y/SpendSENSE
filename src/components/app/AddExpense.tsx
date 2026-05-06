import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useStore, CATEGORY_META, type Category } from "@/lib/expense-store";
import { toast } from "sonner";

export function AddExpenseFAB() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-gradient-brand text-white grid place-items-center shadow-[var(--shadow-glow)] hover:scale-105 active:scale-95 transition">
        <Plus className="h-6 w-6" />
      </button>
      {open && <AddExpenseModal onClose={() => setOpen(false)} />}
    </>
  );
}

function AddExpenseModal({ onClose }: { onClose: () => void }) {
  const { addExpense } = useStore();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error("Enter a valid amount");
    addExpense({ amount: amt, category, note: note.trim(), date: new Date(date).toISOString() });
    toast.success(`Added ${CATEGORY_META[category].icon} ₹${amt}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/40 backdrop-blur-sm"
         style={{ animation: "fadeIn .2s ease" }} onClick={onClose}>
      <form onSubmit={submit} onClick={e => e.stopPropagation()}
        className="glass-strong rounded-3xl p-6 w-full max-w-md"
        style={{ animation: "slideUp .25s ease" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Expense</h2>
          <button type="button" onClick={onClose} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="text-xs font-medium text-muted-foreground">Amount</label>
        <div className="relative mt-1 mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">₹</span>
          <input autoFocus type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)}
            placeholder="0" className="w-full pl-10 pr-4 py-4 text-2xl font-semibold rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <label className="text-xs font-medium text-muted-foreground">Category</label>
        <div className="grid grid-cols-4 gap-2 mt-1 mb-4">
          {Object.entries(CATEGORY_META).map(([k, v]) => {
            const active = category === k;
            return (
              <button type="button" key={k} onClick={() => setCategory(k as Category)}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border transition ${active ? "border-primary bg-primary/10" : "border-border bg-secondary hover:bg-accent"}`}>
                <span className="text-xl">{v.icon}</span>
                <span className="text-[10px] font-medium">{v.label}</span>
              </button>
            );
          })}
        </div>

        <label className="text-xs font-medium text-muted-foreground">Note</label>
        <input value={note} onChange={e => setNote(e.target.value)} maxLength={80}
          placeholder="What was it for?" className="w-full mt-1 mb-4 px-3.5 py-2.5 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring" />

        <label className="text-xs font-medium text-muted-foreground">Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="w-full mt-1 mb-5 px-3.5 py-2.5 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring" />

        <button type="submit" className="w-full py-3 rounded-xl bg-gradient-brand text-white font-semibold lift">
          Add Expense
        </button>
      </form>
    </div>
  );
}
