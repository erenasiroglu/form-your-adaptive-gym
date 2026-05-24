import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/form/AppShell";
import {
  generateWorkout,
  getProfile,
  type PlannedExercise,
  type UserProfile,
} from "@/lib/form-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · FORM" },
      { name: "description", content: "Today's adaptive session and readiness." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  useEffect(() => setProfile(getProfile()), []);

  const plan = useMemo<PlannedExercise[]>(
    () => (profile ? generateWorkout(profile) : []),
    [profile],
  );

  const totalVolume = plan.reduce((s, p) => s + p.sets * p.reps * p.weight, 0);
  const readiness = 88;

  return (
    <AppShell>
      <section className="mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          Status · Ready to train
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-display">
          Good morning.
        </h1>
      </section>

      {/* AI coach insight */}
      <div className="surface-card mb-4 overflow-hidden rounded-3xl bg-primary p-1">
        <div className="rounded-[20px] bg-background p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              FORM Coach
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              09:14
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Recovery dropped slightly mid-week. Lower-body volume was reduced
            today to maintain progression — pressing intensity is unchanged.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">

        {/* Readiness */}
        <div className="surface-card col-span-7 rounded-3xl p-6 md:col-span-5">
          <div className="mb-8 flex items-start justify-between">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Readiness
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Optimal
            </span>
          </div>
          <div className="text-6xl font-bold tracking-display">{readiness}</div>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            Recovery · Load balance
          </div>
        </div>

        {/* Streak */}
        <div className="surface-card col-span-5 rounded-3xl p-6 md:col-span-3">
          <h3 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Streak
          </h3>
          <div className="text-6xl font-bold tracking-display">12</div>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            Days consistent
          </div>
        </div>

        {/* Today's workout */}
        <div className="col-span-12 overflow-hidden rounded-3xl bg-primary p-1 md:col-span-4">
          <div className="flex h-full flex-col justify-between rounded-[20px] bg-background p-6">
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Today
              </h3>
              <p className="mt-2 text-2xl font-bold tracking-display">
                {plan[0]?.exercise.name ?? "Rest day"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {plan.length} exercises · ~{profile?.duration ?? 60} min
              </p>
            </div>
            <Link
              to="/workout"
              className="mt-6 inline-block w-full rounded-full bg-primary py-3 text-center text-sm font-bold text-primary-foreground transition-transform active:scale-95"
            >
              Start session
            </Link>
          </div>
        </div>

        {/* Plan preview */}
        <div className="surface-card col-span-12 rounded-3xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Today's program
            </h3>
            <span className="font-mono text-[10px] text-muted-foreground">
              {Math.round(totalVolume).toLocaleString()} VOL
            </span>
          </div>
          <ol className="divide-y divide-border">
            {plan.map((p, i) => (
              <li key={p.exercise.id} className="flex items-center gap-4 py-3">
                <span className="w-6 font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="flex-1 text-sm font-medium">
                  {p.exercise.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {p.sets}×{p.reps} · {p.weight}kg
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Recovery insights */}
        <div className="surface-card col-span-12 rounded-3xl p-6 md:col-span-6">
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Recovery
          </h3>
          {[
            { label: "Central nervous system", val: 0.84, status: "Recovered" },
            { label: "Muscle soreness", val: 0.42, status: "Moderate" },
            { label: "Sleep quality", val: 0.91, status: "Excellent" },
          ].map((r) => (
            <div key={r.label} className="mb-4 last:mb-0">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-mono">{r.status}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${r.val * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="surface-card col-span-12 rounded-3xl p-6 md:col-span-6">
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Adapt
          </h3>
          <div className="space-y-2">
            <Link
              to="/onboarding"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm hover:bg-surface"
            >
              <span>Update equipment profile</span>
              <span className="text-muted-foreground">→</span>
            </Link>
            <Link
              to="/coach"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm hover:bg-surface"
            >
              <span>Ask FORM coach</span>
              <span className="text-muted-foreground">→</span>
            </Link>
            <Link
              to="/progress"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm hover:bg-surface"
            >
              <span>See progress trends</span>
              <span className="text-muted-foreground">→</span>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
