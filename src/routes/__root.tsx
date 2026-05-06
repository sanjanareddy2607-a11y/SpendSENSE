import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { ExpenseProvider } from "@/lib/expense-store";
import { Sidebar, MobileNav } from "@/components/app/Sidebar";
import { TopBar } from "@/components/app/TopBar";
import { AddExpenseFAB } from "@/components/app/AddExpense";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-2 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="inline-block mt-5 px-5 py-2.5 rounded-xl bg-gradient-brand text-white font-medium">Go home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "spendSENSE — Student Finance Command Center" },
      { name: "description", content: "A futuristic, data-driven expense tracker for students. Track spending, set budgets, and predict your financial future." },
      { property: "og:title", content: "spendSENSE — Student Finance Command Center" },
      { property: "og:description", content: "A futuristic, data-driven expense tracker for students. Track spending, set budgets, and predict your financial future." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "spendSENSE — Student Finance Command Center" },
      { name: "twitter:description", content: "A futuristic, data-driven expense tracker for students. Track spending, set budgets, and predict your financial future." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/cac34ffb-5e9c-4337-8aa9-638db4dbd41d" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/cac34ffb-5e9c-4337-8aa9-638db4dbd41d" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        <style>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        `}</style>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 md:p-6 pb-28 md:pb-6 max-w-[1500px] mx-auto w-full">
          <TopBar />
          <Outlet />
        </main>
        <MobileNav />
        <AddExpenseFAB />
        <Toaster position="top-center" richColors />
      </div>
    </ExpenseProvider>
  );
}
