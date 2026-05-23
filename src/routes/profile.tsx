import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/form/AppShell";
import { getProfile, EQUIPMENT_LIST, type UserProfile } from "@/lib/form-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · FORM" },
      { name: "description", content: "Your FORM profile and settings." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [p, setP] = useState<UserProfile | null>(null);
  useEffect(() => setP(getProfile()), []);
  if (!p) return null;

  return (
    <AppShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="size-16 rounded-full border border-border bg-surface-2" />
        <div>
          <h1 className="text-2xl font-bold tracking-display">Athlete</h1>
          <p className="text-xs text-muted-foreground">FORM member · 2026</p>
        </div>
      </div>

      <div className="space-y-4">
        <Row label="Goal" value={p.goal.replace("-", " ")} />
        <Row label="Experience" value={p.experience} />
        <Row label="Frequency" value={`${p.frequency}× / week`} />
        <Row label="Session length" value={`${p.duration} min`} />
        <Row
          label="Limitations"
          value={p.injuries.includes("none") ? "None" : p.injuries.join(", ")}
        />

        <div className="surface-card rounded-3xl p-6">
          <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Equipment ({p.equipment.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {p.equipment.map((e) => (
              <span
                key={e}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {EQUIPMENT_LIST.find((x) => x.id === e)?.label ?? e}
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/onboarding"
          className="block rounded-full bg-primary py-3 text-center text-sm font-bold text-primary-foreground"
        >
          Recalibrate profile
        </Link>
        <Link
          to="/"
          className="block rounded-full border border-border bg-surface py-3 text-center text-sm font-semibold text-muted-foreground"
        >
          Sign out
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
