import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/form/AppShell";
import { CIRCLES } from "@/lib/form-data";

export const Route = createFileRoute("/circles")({
  head: () => ({
    meta: [
      { title: "Circles · FORM" },
      { name: "description", content: "Private fitness groups and challenges." },
    ],
  }),
  component: Circles,
});

function Circles() {
  return (
    <AppShell>
      <section className="mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          Collective effort
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-display">Circles</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Accountability without the noise. Private groups, coach-led challenges,
          quiet leaderboards.
        </p>
      </section>

      <div className="space-y-3">
        {CIRCLES.map((c) => (
          <Link
            key={c.id}
            to="/circles/$circleId"
            params={{ circleId: c.id }}
            className="surface-card block rounded-3xl p-6 transition-colors hover:border-primary"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="size-2 rounded-full bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.members.length} members
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-display">{c.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
            {c.challenge && (
              <div className="mt-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                Live · {c.challenge}
              </div>
            )}
          </Link>
        ))}
        <button className="w-full rounded-3xl border border-dashed border-border bg-surface py-6 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-foreground">
          + Create circle
        </button>
      </div>
    </AppShell>
  );
}
