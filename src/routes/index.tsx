import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientGlow } from "@/components/form/AmbientGlow";
import { LanguageSwitcher } from "@/components/form/LanguageSwitcher";
import { createTranslator, getStoredLocale, useTranslation } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => {
    const { t } = createTranslator(getStoredLocale());
    return {
      meta: [
        { title: t("landing.meta.title") },
        { name: "description", content: t("landing.meta.description") },
        { property: "og:title", content: t("landing.meta.ogTitle") },
        { property: "og:description", content: t("landing.meta.ogDescription") },
      ],
    };
  },
  component: Landing,
});

const ANALYSIS_KEYS = [
  "bodyFat",
  "strong",
  "weak",
  "symmetry",
  "posture",
  "recovery",
  "potential",
  "projection",
] as const;

const FEATURE_KEYS = ["f1", "f2", "f3"] as const;

function Landing() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <AmbientGlow />
      <nav className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-bold tracking-display">{t("common.form")}</span>
          <div className="hidden gap-8 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground md:flex">
            <a href="#analysis" className="hover:text-foreground">
              {t("landing.nav.analysis")}
            </a>
            <a href="#adaptive" className="hover:text-foreground">
              {t("landing.nav.adaptive")}
            </a>
            <a href="#system" className="hover:text-foreground">
              {t("landing.nav.system")}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/auth"
              className="rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground"
            >
              {t("landing.nav.signIn")}
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6">
        <section className="pt-20 pb-24 md:pt-32 md:pb-32">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            {t("landing.hero.badge")}
          </span>
          <h1 className="mb-8 max-w-4xl text-balance text-6xl font-bold leading-[0.88] tracking-display md:text-8xl">
            {t("landing.hero.title1")}
            <br />
            {t("landing.hero.title2")}
            <br />
            <span className="text-primary">{t("landing.hero.title3")}</span>
          </h1>
          <p className="mb-10 max-w-xl text-pretty text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            {t("landing.hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/onboarding"
              className="group relative overflow-hidden rounded-full bg-primary px-7 py-4 text-sm font-bold tracking-tight text-primary-foreground transition-transform active:scale-95"
            >
              <span className="relative z-10">{t("landing.hero.ctaPrimary")}</span>
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full border border-border bg-surface px-6 py-4 text-sm font-bold tracking-tight text-foreground hover:bg-surface-2"
            >
              {t("landing.hero.ctaSecondary")}
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">{t("landing.hero.footnote")}</p>
        </section>

        <section id="analysis" className="pb-24">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            {t("landing.analysis.label")}
          </p>
          <h2 className="mb-12 max-w-3xl text-balance text-4xl font-bold tracking-display md:text-5xl">
            {t("landing.analysis.title")}
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {ANALYSIS_KEYS.map((key) => (
              <div key={key} className="surface-card rounded-2xl p-5">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {t(`landing.analysis.items.${key}.k`)}
                </div>
                <div className="mt-3 text-sm leading-snug text-foreground">
                  {t(`landing.analysis.items.${key}.v`)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24">
          <div className="surface-card overflow-hidden rounded-3xl bg-primary p-1">
            <div className="rounded-[20px] bg-background p-8 md:p-12">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                  {t("landing.projection.badge")}
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {t("common.adaptive")}
                </span>
              </div>
              <p className="max-w-3xl text-balance text-3xl font-bold leading-tight tracking-display md:text-5xl">
                {t("landing.projection.quotePrefix")}
                <span className="text-primary">{t("landing.projection.quoteHighlight")}</span>
                {t("landing.projection.quoteSuffix")}
              </p>
              <p className="mt-6 max-w-xl text-sm text-muted-foreground">
                {t("landing.projection.disclaimer")}
              </p>
            </div>
          </div>
        </section>

        <section id="adaptive" className="grid gap-4 pb-24 md:grid-cols-3 md:gap-6">
          {FEATURE_KEYS.map((key, i) => (
            <div key={key} className="surface-card rounded-2xl p-6">
              <div className="mb-6 font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="mb-2 text-lg font-semibold tracking-display">
                {t(`landing.features.${key}.title`)}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`landing.features.${key}.copy`)}
              </p>
            </div>
          ))}
        </section>

        <section id="system" className="surface-card mb-20 rounded-3xl p-8 md:p-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            {t("landing.voice.label")}
          </p>
          <h3 className="mb-8 max-w-2xl text-balance text-3xl font-bold tracking-display md:text-4xl">
            {t("landing.voice.title")}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface-2 p-6">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-primary">
                {t("landing.voice.formSays")}
              </div>
              <p className="text-base leading-relaxed">{t("landing.voice.formQuote")}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-2 p-6 opacity-60">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {t("landing.voice.othersSay")}
              </div>
              <p className="text-base leading-relaxed line-through decoration-destructive/60">
                {t("landing.voice.othersQuote")}
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              to="/onboarding"
              className="inline-block rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground"
            >
              {t("landing.hero.ctaPrimary")}
            </Link>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-border py-8 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <span>{t("landing.footer.brand")}</span>
          <span>{t("landing.footer.tagline")}</span>
        </footer>
      </main>
    </div>
  );
}
