import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/form/AppShell";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress · FORM" },
      { name: "description", content: "Training consistency, volume, and PRs." },
    ],
  }),
  component: Progress,
});

const weeks = [
  { w: "W12", vol: 38 },
  { w: "W13", vol: 52 },
  { w: "W14", vol: 47 },
  { w: "W15", vol: 65 },
  { w: "W16", vol: 71 },
  { w: "W17", vol: 68 },
  { w: "W18", vol: 84 },
  { w: "W19", vol: 92 },
];

function Progress() {
  const max = Math.max(...weeks.map((w) => w.vol));
  return (
    <AppShell>
      <section className="mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          Trajectory
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-display">Progress</h1>
      </section>

      <div className="grid grid-cols-12 gap-4">
        <div className="surface-card col-span-6 rounded-3xl p-6">
          <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Weekly volume
          </h3>
          <div className="text-4xl font-bold tracking-display">
            92<span className="text-base text-muted-foreground">k kg</span>
          </div>
          <div className="mt-1 text-xs text-primary">↑ 12% vs last week</div>
        </div>
        <div className="surface-card col-span-6 rounded-3xl p-6">
          <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Consistency
          </h3>
          <div className="text-4xl font-bold tracking-display">94%</div>
          <div className="mt-1 text-xs text-muted-foreground">8-week avg</div>
        </div>

        <div className="surface-card col-span-12 rounded-3xl p-6">
          <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Volume trend
          </h3>
          <div className="flex h-40 items-end justify-between gap-2">
            {weeks.map((w, i) => (
              <div key={w.w} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <div
                    className={`w-full rounded-t ${
                      i === weeks.length - 1 ? "bg-primary" : "bg-border"
                    }`}
                    style={{ height: `${(w.vol / max) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] uppercase text-muted-foreground">
                  {w.w}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card col-span-12 rounded-3xl p-6">
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Personal records
          </h3>
          <ul className="divide-y divide-border">
            {[
              { ex: "Barbell Back Squat", val: "165kg × 3", date: "2 days ago" },
              { ex: "Barbell Bench Press", val: "110kg × 5", date: "1 week ago" },
              { ex: "Romanian Deadlift", val: "140kg × 8", date: "2 weeks ago" },
              { ex: "Weighted Pull-up", val: "+30kg × 6", date: "3 weeks ago" },
            ].map((pr) => (
              <li key={pr.ex} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-semibold">{pr.ex}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {pr.date}
                  </div>
                </div>
                <div className="font-mono text-sm text-primary">{pr.val}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
