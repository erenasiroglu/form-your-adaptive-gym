import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/form/AppShell";
import { CIRCLES } from "@/lib/form-data";

export const Route = createFileRoute("/circles/$circleId")({
  head: ({ params }) => {
    const c = CIRCLES.find((x) => x.id === params.circleId);
    return {
      meta: [
        { title: `${c?.name ?? "Circle"} · FORM` },
        { name: "description", content: c?.description ?? "FORM circle" },
      ],
    };
  },
  loader: ({ params }) => {
    const circle = CIRCLES.find((c) => c.id === params.circleId);
    if (!circle) throw notFound();
    return { circle };
  },
  component: CirclePage,
});

function CirclePage() {
  const { circle } = Route.useLoaderData();
  const sorted = [...circle.members].sort((a, b) => b.volume - a.volume);

  return (
    <AppShell>
      <Link
        to="/circles"
        className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
      >
        ← All circles
      </Link>
      <section className="mb-6">
        <h1 className="text-4xl font-bold tracking-display">{circle.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{circle.description}</p>
      </section>

      {circle.challenge && (
        <div className="surface-card mb-6 rounded-3xl bg-primary/5 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Active challenge
          </span>
          <p className="mt-2 text-xl font-bold tracking-display">{circle.challenge}</p>
        </div>
      )}

      <div className="surface-card rounded-3xl p-6">
        <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Leaderboard · weekly volume
        </h3>
        <ol className="divide-y divide-border">
          {sorted.map((m, i) => {
            const isYou = m.name === "You";
            return (
              <li
                key={m.name}
                className={`flex items-center gap-4 py-4 ${isYou ? "text-primary" : ""}`}
              >
                <span className="w-6 font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${isYou ? "text-primary" : ""}`}>
                    {m.name}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {m.streak} day streak
                  </div>
                </div>
                <span className="font-mono text-sm">
                  {(m.volume / 1000).toFixed(1)}k
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </AppShell>
  );
}
