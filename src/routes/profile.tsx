import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/form/AppShell";
import { getProfile, EQUIPMENT_LIST, type UserProfile } from "@/lib/form-data";
import {
  createTranslator,
  getStoredLocale,
  translateEquipment,
  translateExperience,
  translateGoal,
  useTranslation,
} from "@/i18n";

export const Route = createFileRoute("/profile")({
  head: () => {
    const { t } = createTranslator(getStoredLocale());
    return {
      meta: [
        { title: t("profile.meta.title") },
        { name: "description", content: t("profile.meta.description") },
      ],
    };
  },
  component: Profile,
});

function Profile() {
  const { t } = useTranslation();
  const [p, setP] = useState<UserProfile | null>(null);
  useEffect(() => setP(getProfile()), []);
  if (!p) return null;

  return (
    <AppShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="size-16 rounded-full border border-border bg-surface-2" />
        <div>
          <h1 className="text-2xl font-bold tracking-display">{t("profile.athlete")}</h1>
          <p className="text-xs text-muted-foreground">{t("profile.memberSince")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Row label={t("profile.goal")} value={translateGoal(p.goal, t)} />
        <Row label={t("profile.experience")} value={translateExperience(p.experience, t)} />
        <Row
          label={t("profile.frequency")}
          value={t("common.perWeek", { count: p.frequency })}
        />
        <Row
          label={t("profile.sessionLength")}
          value={t("common.minDuration", { count: p.duration })}
        />
        <Row
          label={t("profile.limitations")}
          value={
            p.injuries.includes("none")
              ? t("common.none")
              : p.injuries.map((i) => t(`onboarding.injuries.${i}`)).join(", ")
          }
        />

        <div className="surface-card rounded-3xl p-6">
          <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t("profile.equipment", { count: p.equipment.length })}
          </h3>
          <div className="flex flex-wrap gap-2">
            {p.equipment.map((e) => (
              <span
                key={e}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {EQUIPMENT_LIST.find((x) => x.id === e)
                  ? translateEquipment(e, t)
                  : e}
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/onboarding"
          className="block rounded-full bg-primary py-3 text-center text-sm font-bold text-primary-foreground"
        >
          {t("profile.recalibrate")}
        </Link>
        <Link
          to="/"
          className="block rounded-full border border-border bg-surface py-3 text-center text-sm font-semibold text-muted-foreground"
        >
          {t("profile.signOut")}
        </Link>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card flex items-center justify-between rounded-2xl px-5 py-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-semibold capitalize">{value}</span>
    </div>
  );
}
