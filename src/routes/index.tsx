import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientGlow } from "@/components/form/AmbientGlow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORM — The system that learns your body" },
      {
        name: "description",
        content:
          "FORM analyzes your body, your gym, and your recovery — then builds an adaptive program that evolves with you.",
      },
      { property: "og:title", content: "FORM — Built Around You" },
      {
        property: "og:description",
        content:
          "Upload a photo. Get a real assessment. Receive a program built around your body, your equipment, and your recovery.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <AmbientGlow />
      <nav className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-bold tracking-display">FORM</span>
          <div className="hidden gap-8 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground md:flex">
            <a href="#analysis" className="hover:text-foreground">Analysis</a>
            <a href="#adaptive" className="hover:text-foreground">Adaptive</a>
            <a href="#system" className="hover:text-foreground">System</a>
          </div>
          <Link
            to="/auth"
            className="rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground"
          >
            Sign in
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="pt-20 pb-24 md:pt-32 md:pb-32">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Adaptive intelligence · Live
          </span>
          <h1 className="mb-8 max-w-4xl text-balance text-6xl font-bold leading-[0.88] tracking-display md:text-8xl">
            The first system
            <br />
            that learns
            <br />
            <span className="text-primary">your body.</span>
          </h1>
          <p className="mb-10 max-w-xl text-pretty text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            Upload a photo. FORM reads your physique, strengths, weak points and
            recovery profile — then builds a program that adapts to your real
            gym, your real schedule, and your real body.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/onboarding"
              className="group relative overflow-hidden rounded-full bg-primary px-7 py-4 text-sm font-bold tracking-tight text-primary-foreground transition-transform active:scale-95"
            >
              <span className="relative z-10">Analyze My Body →</span>
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full border border-border bg-surface px-6 py-4 text-sm font-bold tracking-tight text-foreground hover:bg-surface-2"
            >
              See the system
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Takes 90 seconds. No spam. No generic templates.
          </p>
        </section>

        {/* What we read */}
        <section id="analysis" className="pb-24">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            What FORM reads
          </p>
          <h2 className="mb-12 max-w-3xl text-balance text-4xl font-bold tracking-display md:text-5xl">
            Real observations. No fake precision.
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { k: "Body fat range", v: "Estimated band, not a fake decimal." },
              { k: "Strong groups", v: "What's already developed." },
              { k: "Weak points", v: "Where to focus next." },
              { k: "Symmetry", v: "Left/right balance signals." },
              { k: "Posture", v: "APT, kyphosis, shoulder tilt indicators." },
              { k: "Recovery", v: "Sleep, stress, training load weighted." },
              { k: "Potential", v: "Athletic responder profile." },
              { k: "Projection", v: "Realistic 4-month outcome." },
            ].map((f) => (
              <div key={f.k} className="surface-card rounded-2xl p-5">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {f.k}
                </div>
                <div className="mt-3 text-sm leading-snug text-foreground">{f.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projection card */}
        <section className="pb-24">
          <div className="surface-card overflow-hidden rounded-3xl bg-primary p-1">
            <div className="rounded-[20px] bg-background p-8 md:p-12">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                  Projection · Sample
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Adaptive
                </span>
              </div>
              <p className="max-w-3xl text-balance text-3xl font-bold leading-tight tracking-display md:text-5xl">
                "At your current consistency,{" "}
                <span className="text-primary">
                  you could realistically lose 6–8 kg of fat
                </span>{" "}
                within four months."
              </p>
              <p className="mt-6 max-w-xl text-sm text-muted-foreground">
                Not a guarantee. A calibrated estimate from your physique class,
                training frequency, and recovery profile — recomputed as you train.
              </p>
            </div>
          </div>
        </section>

        {/* Adaptive grid */}
        <section id="adaptive" className="grid gap-4 pb-24 md:grid-cols-3 md:gap-6">
          {[
            {
              tag: "01",
              title: "Reads your body",
              copy: "Body fat range, weak points, symmetry, posture, athletic potential. Observed — not invented.",
            },
            {
              tag: "02",
              title: "Adapts to your gym",
              copy: "Programs only movements your gym actually has. Machine occupied? Instant swap, same stimulus.",
            },
            {
              tag: "03",
              title: "Evolves with recovery",
              copy: "Low sleep, high stress, soreness — volume and load adjust automatically to keep progression real.",
            },
          ].map((f) => (
            <div key={f.tag} className="surface-card rounded-2xl p-6">
              <div className="mb-6 font-mono text-xs text-primary">{f.tag}</div>
              <h4 className="mb-2 text-lg font-semibold tracking-display">{f.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
            </div>
          ))}
        </section>

        {/* System voice */}
        <section id="system" className="surface-card mb-20 rounded-3xl p-8 md:p-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            How FORM speaks
          </p>
          <h3 className="mb-8 max-w-2xl text-balance text-3xl font-bold tracking-display md:text-4xl">
            Quiet, intelligent, and never cringe.
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface-2 p-6">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-primary">
                FORM says
              </div>
              <p className="text-base leading-relaxed">
                "Recovery dropped slightly this week. Lower-body volume was reduced
                to maintain progression."
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-2 p-6 opacity-60">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Other apps say
              </div>
              <p className="text-base leading-relaxed line-through decoration-destructive/60">
                "You got this king 👑 keep grinding!! 🔥🔥"
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              to="/onboarding"
              className="inline-block rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground"
            >
              Analyze My Body →
            </Link>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-border py-8 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <span>FORM Systems · 2026</span>
          <span>Built around you.</span>
        </footer>
      </main>
    </div>
  );
}
