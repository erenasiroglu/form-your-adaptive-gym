import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientGlow } from "@/components/form/AmbientGlow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORM — Built Around You" },
      {
        name: "description",
        content:
          "FORM is an adaptive fitness intelligence that builds workouts around your real gym, real schedule, and real-world conditions.",
      },
      { property: "og:title", content: "FORM — Built Around You" },
      {
        property: "og:description",
        content:
          "Adaptive workouts that respect your gym, your energy, and your body. The first fitness intelligence built around you.",
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
            <a href="#intelligence" className="hover:text-foreground">Intelligence</a>
            <a href="#equipment" className="hover:text-foreground">Equipment</a>
            <a href="#circles" className="hover:text-foreground">Circles</a>
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
          <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Status · Ready to train
          </span>
          <h1 className="mb-8 max-w-4xl text-balance text-6xl font-bold leading-[0.9] tracking-display md:text-8xl">
            Built Around
            <br />
            You.
          </h1>
          <p className="mb-10 max-w-xl text-pretty text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            Your gym is crowded. Your energy is at 60%. Your shoulder is tight.
            FORM adapts in real time — to your equipment, your recovery, your body.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/onboarding"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold tracking-tight text-primary-foreground transition-transform active:scale-95"
            >
              Begin assessment
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-bold tracking-tight text-foreground hover:bg-surface-2"
            >
              See the system
            </Link>
          </div>
        </section>

        {/* Intelligence grid */}
        <section id="intelligence" className="grid grid-cols-12 gap-4 pb-24 md:gap-8">
          <div className="surface-card col-span-12 rounded-3xl p-8 md:col-span-5">
            <p className="mb-12 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Readiness Score
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-bold tracking-display md:text-8xl">88</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Optimal
              </span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              CNS recovered. Volume adjusted +12% from sleep telemetry.
            </p>
          </div>

          <div className="surface-card col-span-12 overflow-hidden rounded-3xl bg-primary p-1 md:col-span-7">
            <div className="rounded-[20px] bg-background p-8">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
                    Today's Session
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Hypertrophy · Push A
                  </p>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  AI Active
                </span>
              </div>
              <h2 className="mb-2 text-4xl font-bold tracking-display md:text-5xl">
                Incline DB Press
              </h2>
              <p className="mb-8 text-sm text-muted-foreground">
                Next up · adjusted for shoulder sensitivity
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <div className="text-3xl font-bold">12</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Reps
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    40<span className="text-base">kg</span>
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Weight
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">3/4</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Sets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature blocks */}
        <section id="equipment" className="grid gap-4 pb-24 md:grid-cols-3 md:gap-6">
          {[
            {
              tag: "E1",
              title: "Equipment-aware",
              copy: "FORM only programs movements your gym actually has. Machine occupied? Swap in one tap.",
            },
            {
              tag: "I2",
              title: "Adaptive intensity",
              copy: "Low-energy day? Tight schedule? Volume and load adjust automatically to keep progress real.",
            },
            {
              tag: "B3",
              title: "Biomechanical subs",
              copy: "Every alternative matches the original pattern. Same stimulus, different tool.",
            },
          ].map((f) => (
            <div key={f.tag} className="surface-card rounded-2xl p-6">
              <div className="mb-6 grid size-12 place-items-center rounded-xl border border-border bg-surface-2 text-xs font-bold text-primary">
                {f.tag}
              </div>
              <h4 className="mb-2 text-base font-semibold">{f.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
            </div>
          ))}
        </section>

        {/* Circles preview */}
        <section id="circles" className="surface-card mb-20 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Collective effort
              </p>
              <h3 className="mb-4 text-4xl font-bold tracking-display">Circles</h3>
              <p className="text-muted-foreground">
                Private fitness groups. Coach-led challenges. Leaderboards without
                the noise.
              </p>
            </div>
            <Link
              to="/circles"
              className="self-start rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              Explore circles
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
