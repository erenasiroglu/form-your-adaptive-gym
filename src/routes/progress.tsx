import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/form/AppShell";
import { createTranslator, getStoredLocale, translateExercise, useTranslation } from "@/i18n";

export const Route = createFileRoute("/progress")({
  head: () => {
    const { t } = createTranslator(getStoredLocale());
    return {
      meta: [
        { title: t("progress.meta.title") },
        { name: "description", content: t("progress.meta.description") },
      ],
    };
  },
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
  const { t } = useTranslation();
  const max = Math.max(...weeks.map((w) => w.vol));

  const prs = [
    { id: "bb-squat", val: "165kg × 3", dateKey: "days2" as const },
    { id: "bb-bench", val: "110kg × 5", dateKey: "week1" as const },
    { id: "bb-rdl", val: "140kg × 8", dateKey: "weeks2" as const },
    { id: "pullup", val: "+30kg × 6", dateKey: "weeks3" as const },
  ];

  return (
    <AppShell>
      <section className="mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          {t("progress.trajectory")}
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-display">{t("progress.title")}</h1>
      </section>

      <div className="grid grid-cols-12 gap-4">
        <div className="surface-card col-span-6 rounded-3xl p-6">
          <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t("progress.weeklyVolume")}
          </h3>
          <div className="text-4xl font-bold tracking-display">
            {t("progress.volumeValue")}
            <span className="text-base text-muted-foreground">{t("progress.volumeUnit")}</span>
          </div>
          <div className="mt-1 text-xs text-primary">{t("progress.volumeChange")}</div>
        </div>
        <div className="surface-card col-span-6 rounded-3xl p-6">
          <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t("progress.consistency")}
          </h3>
          <div className="text-4xl font-bold tracking-display">94%</div>
          <div className="mt-1 text-xs text-muted-foreground">{t("progress.consistencyAvg")}</div>
        </div>

        <div className="surface-card col-span-12 rounded-3xl p-6">
          <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t("progress.volumeTrend")}
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
            {t("progress.personalRecords")}
          </h3>
          <ul className="divide-y divide-border">
            {prs.map((pr) => (
              <li key={pr.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-semibold">
                    {translateExercise(pr.id, t)}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t(`progress.prDates.${pr.dateKey}`)}
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
