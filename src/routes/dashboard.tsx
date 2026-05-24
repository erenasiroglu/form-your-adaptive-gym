import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/form/AppShell";
import {
  generateWorkout,
  getProfile,
  type PlannedExercise,
  type UserProfile,
} from "@/lib/form-data";
import {
  createTranslator,
  getStoredLocale,
  translateExercise,
  useTranslation,
} from "@/i18n";

export const Route = createFileRoute("/dashboard")({
  head: () => {
    const { t } = createTranslator(getStoredLocale());
    return {
      meta: [
        { title: t("dashboard.meta.title") },
        { name: "description", content: t("dashboard.meta.description") },
      ],
    };
  },
  component: Dashboard,
});

function Dashboard() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  useEffect(() => setProfile(getProfile()), []);

  const plan = useMemo<PlannedExercise[]>(
    () => (profile ? generateWorkout(profile) : []),
    [profile],
  );

  const totalVolume = plan.reduce((s, p) => s + p.sets * p.reps * p.weight, 0);
  const readiness = 88;

  const recoveryItems = [
    {
      label: t("dashboard.recoveryItems.cns.label"),
      val: 0.84,
      status: t("dashboard.recoveryItems.cns.status"),
    },
    {
      label: t("dashboard.recoveryItems.soreness.label"),
      val: 0.42,
      status: t("dashboard.recoveryItems.soreness.status"),
    },
    {
      label: t("dashboard.recoveryItems.sleep.label"),
      val: 0.91,
      status: t("dashboard.recoveryItems.sleep.status"),
    },
  ];

  return (
    <AppShell>
      <section className="mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          {t("dashboard.status")}
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-display">
          {t("dashboard.greeting")}
        </h1>
      </section>

      <div className="surface-card mb-4 overflow-hidden rounded-3xl bg-primary p-1">
        <div className="rounded-[20px] bg-background p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              {t("dashboard.coachLabel")}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              09:14
            </span>
          </div>
          <p className="text-sm leading-relaxed">{t("dashboard.coachInsight")}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="surface-card col-span-7 rounded-3xl p-6 md:col-span-5">
          <div className="mb-8 flex items-start justify-between">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {t("dashboard.readiness")}
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              {t("dashboard.optimal")}
            </span>
          </div>
          <div className="text-6xl font-bold tracking-display">{readiness}</div>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            {t("dashboard.readinessSub")}
          </div>
        </div>

        <div className="surface-card col-span-5 rounded-3xl p-6 md:col-span-3">
          <h3 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t("dashboard.streak")}
          </h3>
          <div className="text-6xl font-bold tracking-display">12</div>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            {t("dashboard.streakSub")}
          </div>
        </div>

        <div className="col-span-12 overflow-hidden rounded-3xl bg-primary p-1 md:col-span-4">
          <div className="flex h-full flex-col justify-between rounded-[20px] bg-background p-6">
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {t("dashboard.today")}
              </h3>
              <p className="mt-2 text-2xl font-bold tracking-display">
                {plan[0]
                  ? translateExercise(plan[0].exercise.id, t)
                  : t("dashboard.restDay")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("common.exercisesCount", {
                  count: plan.length,
                  min: profile?.duration ?? 60,
                })}
              </p>
            </div>
            <Link
              to="/workout"
              className="mt-6 inline-block w-full rounded-full bg-primary py-3 text-center text-sm font-bold text-primary-foreground transition-transform active:scale-95"
            >
              {t("dashboard.startSession")}
            </Link>
          </div>
        </div>

        <div className="surface-card col-span-12 rounded-3xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {t("dashboard.todaysProgram")}
            </h3>
            <span className="font-mono text-[10px] text-muted-foreground">
              {t("common.vol", { value: Math.round(totalVolume).toLocaleString() })}
            </span>
          </div>
          <ol className="divide-y divide-border">
            {plan.map((p, i) => (
              <li key={p.exercise.id} className="flex items-center gap-4 py-3">
                <span className="w-6 font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="flex-1 text-sm font-medium">
                  {translateExercise(p.exercise.id, t)}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {p.sets}×{p.reps} · {p.weight}kg
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="surface-card col-span-12 rounded-3xl p-6 md:col-span-6">
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t("dashboard.recovery")}
          </h3>
          {recoveryItems.map((r) => (
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

        <div className="surface-card col-span-12 rounded-3xl p-6 md:col-span-6">
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t("dashboard.adapt")}
          </h3>
          <div className="space-y-2">
            <Link
              to="/onboarding"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm hover:bg-surface"
            >
              <span>{t("dashboard.actions.equipment")}</span>
              <span className="text-muted-foreground">{t("common.arrow")}</span>
            </Link>
            <Link
              to="/coach"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm hover:bg-surface"
            >
              <span>{t("dashboard.actions.coach")}</span>
              <span className="text-muted-foreground">{t("common.arrow")}</span>
            </Link>
            <Link
              to="/progress"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm hover:bg-surface"
            >
              <span>{t("dashboard.actions.progress")}</span>
              <span className="text-muted-foreground">{t("common.arrow")}</span>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
