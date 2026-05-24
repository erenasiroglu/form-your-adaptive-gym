import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/form/AppShell";
import { CIRCLES } from "@/lib/form-data";
import { createTranslator, getStoredLocale, useTranslation } from "@/i18n";

export const Route = createFileRoute("/circles/$circleId")({
  head: ({ params }) => {
    const { t } = createTranslator(getStoredLocale());
    const c = CIRCLES.find((x) => x.id === params.circleId);
    const nameKey = `circles.items.${params.circleId}.name`;
    const name = c ? t(nameKey) : t("circles.title");
    const descKey = `circles.items.${params.circleId}.description`;
    const description = c ? t(descKey) : t("circles.meta.description");
    return {
      meta: [
        {
          title: `${name.startsWith("circles.items.") && c ? c.name : name} · FORM`,
        },
        {
          name: "description",
          content: description.startsWith("circles.items.") && c ? c.description : description,
        },
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
  const { t } = useTranslation();
  const sorted = [...circle.members].sort((a, b) => b.volume - a.volume);

  const nameKey = `circles.items.${circle.id}.name`;
  const name = t(nameKey);
  const descKey = `circles.items.${circle.id}.description`;
  const description = t(descKey);
  const challengeKey = `circles.items.${circle.id}.challenge`;
  const challenge = circle.challenge ? t(challengeKey) : undefined;

  return (
    <AppShell>
      <Link
        to="/circles"
        className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
      >
        {t("circles.allCircles")}
      </Link>
      <section className="mb-6">
        <h1 className="text-4xl font-bold tracking-display">
          {name.startsWith("circles.items.") ? circle.name : name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {description.startsWith("circles.items.") ? circle.description : description}
        </p>
      </section>

      {circle.challenge && challenge && !challenge.startsWith("circles.items.") && (
        <div className="surface-card mb-6 rounded-3xl bg-primary/5 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            {t("circles.activeChallenge")}
          </span>
          <p className="mt-2 text-xl font-bold tracking-display">{challenge}</p>
        </div>
      )}

      <div className="surface-card rounded-3xl p-6">
        <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {t("circles.leaderboard")}
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
                    {isYou ? t("circles.you") : m.name}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("common.dayStreak", { count: m.streak })}
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
