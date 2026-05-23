import { Link } from "@tanstack/react-router";
import { AmbientGlow } from "./AmbientGlow";

const TABS = [
  { to: "/dashboard", label: "Home" },
  { to: "/workout", label: "Train" },
  { to: "/progress", label: "Stats" },
  { to: "/circles", label: "Circles" },
  { to: "/coach", label: "Coach" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-foreground">
      <AmbientGlow />
      <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link to="/dashboard" className="text-base font-bold tracking-display">
            FORM
          </Link>
          <Link
            to="/profile"
            className="size-8 rounded-full border border-border bg-surface-2"
            aria-label="Profile"
          />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 pb-32 pt-6">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-around px-2 py-2">
          {TABS.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="flex-1 rounded-xl px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground transition-colors data-[status=active]:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
