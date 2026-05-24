import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/form/AppShell";
import { CIRCLES } from "@/lib/form-data";
import { createTranslator, getStoredLocale, useTranslation } from "@/i18n";

export const Route = createFileRoute("/circles")({
  head: () => {
    const { t } = createTranslator(getStoredLocale());
    return {
      meta: [
        { title: t("circles.meta.title") },
        { name: "description", content: t("circles.meta.description") },
      ],
    };
  },
  component: Circles,
});

function Circles() {
  const { t } = useTranslation();

  return (
    <AppShell>
      <section className="mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          {t("circles.badge")}
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-display">{t("circles.title")}</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">{t("circles.subtitle")}</p>
      </section>

      <div className="space-y-3">
        {CIRCLES.map((c) => {
          const localized = t(`circles.items.${c.id}.name`);
          const name = localized.startsWith("circles.items.") ? c.name : localized;
          const descKey = `circles.items.${c.id}.description`;
          const description = t(descKey);
          const challengeKey = `circles.items.${c.id}.challenge`;
          const challenge = c.challenge ? t(challengeKey) : undefined;
          const challengeMissing = challenge?.startsWith("circles.items.");

          return (
            <Link
              key={c.id}
              to="/circles/$circleId"
              params={{ circleId: c.id }}
              className="surface-card block rounded-3xl p-6 transition-colors hover:border-primary"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="size-2 rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t("common.members", { count: c.members.length })}
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-display">{name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {description.startsWith("circles.items.") ? c.description : description}
              </p>
              {c.challenge && !challengeMissing && (
                <div className="mt-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                  {t("common.live")} · {challenge}
                </div>
              )}
            </Link>
          );
        })}
        <button className="w-full rounded-3xl border border-dashed border-border bg-surface py-6 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-foreground">
          {t("circles.create")}
        </button>
      </div>
    </AppShell>
  );
}
