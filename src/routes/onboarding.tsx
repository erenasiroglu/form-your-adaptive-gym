import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DEFAULT_PROFILE,
  EQUIPMENT_LIST,
  buildAnalysis,
  saveProfile,
  type Equipment,
  type Frustration,
  type Goal,
  type Injury,
  type Location,
  type Physique,
  type UserProfile,
} from "@/lib/form-data";
import { AmbientGlow } from "@/components/form/AmbientGlow";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Analyze My Body · FORM" },
      {
        name: "description",
        content: "A 90-second conversation. FORM learns your body, your gym, and your recovery.",
      },
    ],
  }),
  component: Onboarding,
});

type Stage =
  | "intro"
  | "frequency"
  | "physique"
  | "frustration"
  | "location"
  | "equipment"
  | "injuries"
  | "goal"
  | "capture"
  | "analyzing"
  | "results"
  | "generating"
  | "plan"
  | "paywall";

const STAGES_WITH_PROGRESS: Stage[] = [
  "frequency",
  "physique",
  "frustration",
  "location",
  "equipment",
  "injuries",
  "goal",
  "capture",
];

function Onboarding() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("intro");
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [photo, setPhoto] = useState<string | null>(null);

  const update = <K extends keyof UserProfile>(k: K, v: UserProfile[K]) =>
    setProfile((p) => ({ ...p, [k]: v }));

  // Drive analyzing → results
  useEffect(() => {
    if (stage !== "analyzing") return;
    const t = setTimeout(() => {
      const analysis = buildAnalysis(profile);
      setProfile((p) => ({ ...p, analysis }));
      setStage("results");
    }, 3600);
    return () => clearTimeout(t);
  }, [stage, profile]);

  // Drive generating → plan
  useEffect(() => {
    if (stage !== "generating") return;
    const t = setTimeout(() => setStage("plan"), 3600);
    return () => clearTimeout(t);
  }, [stage]);

  const stageIndex = STAGES_WITH_PROGRESS.indexOf(stage);

  return (
    <div className="relative min-h-screen">
      <AmbientGlow />
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-6">
        {stageIndex >= 0 && (
          <>
            <div className="mb-8 flex items-center gap-1.5">
              {STAGES_WITH_PROGRESS.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors ${
                    i <= stageIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Calibration · {stageIndex + 1} of {STAGES_WITH_PROGRESS.length}
            </div>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 flex-col"
          >
            {stage === "intro" && <Intro onStart={() => setStage("frequency")} />}

            {stage === "frequency" && (
              <Step
                title="How many days can you realistically train?"
                sub="Be honest. We design for the life you actually have."
              >
                <div className="grid grid-cols-5 gap-2">
                  {[2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        update("frequency", n);
                        setStage("physique");
                      }}
                      className={`rounded-2xl border py-6 text-2xl font-bold transition-all ${
                        profile.frequency === n
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-surface"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </Step>
            )}

            {stage === "physique" && (
              <Step
                title="How would you describe your current physique?"
                sub="Rough self-assessment. The photo step refines this."
              >
                <div className="space-y-2">
                  {(
                    [
                      ["lean", "Lean", "Low body fat, defined"],
                      ["athletic", "Athletic", "Built and functional"],
                      ["average", "Average", "Untrained but healthy"],
                      ["soft", "Soft", "Carrying extra body fat"],
                      ["stocky", "Stocky", "Strong frame, dense build"],
                    ] as [Physique, string, string][]
                  ).map(([id, label, sub]) => (
                    <Row
                      key={id}
                      active={profile.physique === id}
                      onClick={() => {
                        update("physique", id);
                        setStage("frustration");
                      }}
                      title={label}
                      sub={sub}
                    />
                  ))}
                </div>
              </Step>
            )}

            {stage === "frustration" && (
              <Step
                title="What's frustrating you most right now?"
                sub="Your real bottleneck shapes everything that follows."
              >
                <div className="space-y-2">
                  {(
                    [
                      ["no-results", "I'm not seeing results"],
                      ["no-time", "I don't have time to train"],
                      ["no-energy", "I'm always exhausted"],
                      ["plateau", "I've hit a plateau"],
                      ["lost-motivation", "I've lost motivation"],
                      ["injury-prone", "I keep getting hurt"],
                    ] as [Frustration, string][]
                  ).map(([id, label]) => (
                    <Row
                      key={id}
                      active={profile.frustration === id}
                      onClick={() => {
                        update("frustration", id);
                        setStage("location");
                      }}
                      title={label}
                    />
                  ))}
                </div>
              </Step>
            )}

            {stage === "location" && (
              <Step
                title="Where do you train most often?"
                sub="Your environment dictates what's programmable."
              >
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["commercial-gym", "Commercial gym", "Full equipment"],
                      ["home-gym", "Home gym", "Limited setup"],
                      ["hotel-travel", "Hotel / travel", "Variable"],
                      ["hybrid", "Hybrid", "Gym + home mix"],
                    ] as [Location, string, string][]
                  ).map(([id, label, sub]) => (
                    <Choice
                      key={id}
                      active={profile.location === id}
                      onClick={() => {
                        update("location", id);
                        setStage("equipment");
                      }}
                      title={label}
                      sub={sub}
                    />
                  ))}
                </div>
              </Step>
            )}

            {stage === "equipment" && (
              <Step
                title="What equipment is actually available?"
                sub="Toggle what your gym truly has. We won't program the rest."
              >
                <div className="grid grid-cols-2 gap-2">
                  {EQUIPMENT_LIST.map((e) => {
                    const active = profile.equipment.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        onClick={() =>
                          update(
                            "equipment",
                            active
                              ? profile.equipment.filter((x) => x !== e.id)
                              : [...profile.equipment, e.id],
                          )
                        }
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          active
                            ? "border-primary bg-primary/10"
                            : "border-border bg-surface"
                        }`}
                      >
                        <span>{e.label}</span>
                        <span
                          className={`size-1.5 rounded-full ${
                            active ? "bg-primary" : "bg-border"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <FooterButton onClick={() => setStage("injuries")}>
                  Continue
                </FooterButton>
              </Step>
            )}

            {stage === "injuries" && (
              <Step
                title="Anything we need to route around?"
                sub="We'll engineer alternatives, not skip the muscle."
              >
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["none", "None"],
                      ["shoulder", "Shoulder"],
                      ["knee", "Knee"],
                      ["lower-back", "Lower back"],
                    ] as [Injury, string][]
                  ).map(([id, label]) => {
                    const active = profile.injuries.includes(id);
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          if (id === "none") update("injuries", ["none"]);
                          else {
                            const without = profile.injuries.filter(
                              (x) => x !== "none" && x !== id,
                            );
                            update(
                              "injuries",
                              active
                                ? without.length
                                  ? without
                                  : ["none"]
                                : [...without, id],
                            );
                          }
                        }}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-surface text-foreground"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <FooterButton onClick={() => setStage("goal")}>Continue</FooterButton>
              </Step>
            )}

            {stage === "goal" && (
              <Step
                title="What's the outcome you want most?"
                sub="We'll bias the program — and the projection — to this."
              >
                <div className="space-y-2">
                  {(
                    [
                      ["hypertrophy", "Build muscle", "Hypertrophy focus"],
                      ["fat-loss", "Lose body fat", "Higher-density work"],
                      ["strength", "Get stronger", "Heavy compound bias"],
                      ["general", "Stay sharp", "Balanced, sustainable"],
                    ] as [Goal, string, string][]
                  ).map(([id, label, sub]) => (
                    <Row
                      key={id}
                      active={profile.goal === id}
                      onClick={() => {
                        update("goal", id);
                        setStage("capture");
                      }}
                      title={label}
                      sub={sub}
                    />
                  ))}
                </div>
              </Step>
            )}

            {stage === "capture" && (
              <CaptureStep
                photo={photo}
                onPhoto={setPhoto}
                onContinue={() => setStage("analyzing")}
                onSkip={() => setStage("analyzing")}
              />
            )}

            {stage === "analyzing" && <Analyzing photo={photo} />}

            {stage === "results" && profile.analysis && (
              <Results
                analysis={profile.analysis}
                onContinue={() => setStage("generating")}
              />
            )}

            {stage === "generating" && <Generating />}

            {stage === "plan" && (
              <PlanReveal
                profile={profile}
                onUnlock={() => setStage("paywall")}
                onContinue={() => {
                  saveProfile(profile);
                  navigate({ to: "/dashboard" });
                }}
              />
            )}

            {stage === "paywall" && (
              <Paywall
                onUnlock={() => {
                  saveProfile({ ...profile, premium: true });
                  navigate({ to: "/dashboard" });
                }}
                onContinueFree={() => {
                  saveProfile(profile);
                  navigate({ to: "/dashboard" });
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------- Sub-components -------------------- */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="pt-12">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          90 seconds · 8 questions
        </span>
        <h1 className="mt-6 text-balance text-5xl font-bold leading-[0.95] tracking-display">
          Let's learn
          <br />
          your body.
        </h1>
        <p className="mt-6 max-w-sm text-pretty text-base font-light leading-relaxed text-muted-foreground">
          A short, honest conversation. Then a body analysis. Then a program
          built specifically for you — not for the average person.
        </p>
      </div>
      <button
        onClick={onStart}
        className="mt-8 rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
      >
        Begin →
      </button>
    </div>
  );
}

function CaptureStep({
  photo,
  onPhoto,
  onContinue,
  onSkip,
}: {
  photo: string | null;
  onPhoto: (s: string) => void;
  onContinue: () => void;
  onSkip: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };
  return (
    <Step
      title="One photo. That's it."
      sub="A front-facing image lets FORM read your structure. It never leaves your device."
    >
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-surface">
        {photo ? (
          <img src={photo} alt="" className="size-full object-cover" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <div className="size-16 rounded-full border border-dashed border-border" />
            <span className="text-xs uppercase tracking-widest">No photo yet</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={onPick}
      />
      <div className="space-y-2">
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-full border border-border bg-surface-2 py-3 text-sm font-semibold"
        >
          {photo ? "Replace photo" : "Upload or take photo"}
        </button>
        {photo ? (
          <FooterButton onClick={onContinue}>Analyze my body →</FooterButton>
        ) : (
          <button
            onClick={onSkip}
            className="w-full py-3 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Skip — analyze from my answers
          </button>
        )}
      </div>
    </Step>
  );
}

function Analyzing({ photo }: { photo: string | null }) {
  const steps = [
    "Reading structural cues",
    "Estimating composition range",
    "Mapping strong vs weak chains",
    "Projecting realistic outcome",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => Math.min(v + 1, steps.length - 1)), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-8 text-center">
      <div className="relative mb-10 size-48 overflow-hidden rounded-3xl border border-border bg-surface">
        {photo ? (
          <img src={photo} alt="" className="size-full object-cover opacity-80" />
        ) : (
          <div className="size-full bg-gradient-to-b from-surface-2 to-background" />
        )}
        <motion.div
          className="absolute inset-x-0 h-px bg-primary shadow-[0_0_24px_4px_var(--color-primary)]"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
        Analyzing
      </div>
      <h2 className="mb-8 text-3xl font-bold tracking-display">Reading your body</h2>
      <ul className="w-full space-y-2 text-left">
        {steps.map((s, idx) => (
          <li
            key={s}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all ${
              idx <= i
                ? "border-primary/40 bg-primary/5 text-foreground"
                : "border-border bg-surface text-muted-foreground"
            }`}
          >
            <span>{s}</span>
            <span className="font-mono text-[10px]">
              {idx < i ? "DONE" : idx === i ? "···" : "—"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Results({
  analysis,
  onContinue,
}: {
  analysis: NonNullable<UserProfile["analysis"]>;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
        Body intelligence · v1
      </span>
      <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-display">
        Here's what FORM sees.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Observations — not absolutes. These refine every week you train.
      </p>

      <div className="surface-card mt-6 overflow-hidden rounded-3xl bg-primary p-1">
        <div className="rounded-[20px] bg-background p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Projected outcome
          </div>
          <p className="mt-3 text-balance text-xl font-semibold leading-snug">
            {analysis.projection}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <Insight
          label="Estimated body fat"
          value={`${analysis.bodyFatRange[0]}–${analysis.bodyFatRange[1]}%`}
          sub="Range — not a fake decimal."
        />
        <Insight
          label="Strong groups"
          value={analysis.strongMuscleGroups.join(" · ")}
        />
        <Insight label="Weak points" value={analysis.weakPoints.join(" · ")} />
        <Insight label="Symmetry" value={analysis.symmetry} />
        <Insight label="Posture" value={analysis.posture} />
        <Insight label="Athletic potential" value={analysis.potential} />
      </div>

      <FooterButton onClick={onContinue}>Build my program →</FooterButton>
    </div>
  );
}

function Insight({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="surface-card rounded-2xl p-5">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-base font-semibold leading-snug">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Generating() {
  const steps = [
    "Analyzing recovery profile",
    "Adapting to available equipment",
    "Building progression systems",
    "Optimizing training volume",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => Math.min(v + 1, steps.length - 1)), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-8 text-center">
      <motion.div
        className="mb-10 size-32 rounded-full border border-primary/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--color-primary) 30%, transparent 60%)",
          maskImage:
            "radial-gradient(circle at center, transparent 55%, black 56%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 55%, black 56%)",
        }}
      />
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
        Generating program
      </div>
      <h2 className="mb-8 text-3xl font-bold tracking-display">
        Building your system
      </h2>
      <ul className="w-full space-y-2 text-left">
        {steps.map((s, idx) => (
          <li
            key={s}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all ${
              idx <= i
                ? "border-primary/40 bg-primary/5 text-foreground"
                : "border-border bg-surface text-muted-foreground"
            }`}
          >
            <span>{s}</span>
            <span className="font-mono text-[10px]">
              {idx < i ? "DONE" : idx === i ? "···" : "—"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanReveal({
  profile,
  onUnlock,
}: {
  profile: UserProfile;
  onUnlock: () => void;
  onContinue: () => void;
}) {
  const splitMap: Record<number, string[]> = {
    2: ["Full body A", "Full body B"],
    3: ["Push", "Pull", "Legs"],
    4: ["Upper A", "Lower A", "Upper B", "Lower B"],
    5: ["Push", "Pull", "Legs", "Upper", "Lower"],
    6: ["Push", "Pull", "Legs", "Push", "Pull", "Legs"],
  };
  const split = splitMap[profile.frequency] ?? splitMap[4];
  return (
    <div className="flex flex-1 flex-col">
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
        Your program · v1
      </span>
      <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-display">
        Built around you.
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">
        {profile.frequency}-day split, calibrated to your equipment, weak points,
        and recovery capacity. It evolves every session.
      </p>

      <div className="surface-card mt-6 rounded-3xl p-2">
        {split.map((day, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-border px-4 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-muted-foreground">
                D{i + 1}
              </span>
              <span className="text-sm font-semibold">{day}</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Adaptive
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="Equipment" value={`${profile.equipment.length}`} />
        <Stat label="Duration" value={`${profile.duration}m`} />
        <Stat label="Days/wk" value={`${profile.frequency}`} />
      </div>

      <FooterButton onClick={onUnlock}>Unlock my system →</FooterButton>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card rounded-2xl p-4 text-center">
      <div className="text-2xl font-bold tracking-display">{value}</div>
      <div className="mt-1 text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Paywall({
  onUnlock,
  onContinueFree,
}: {
  onUnlock: () => void;
  onContinueFree: () => void;
}) {
  const features = [
    "Adaptive AI program — recalibrates weekly",
    "Body intelligence + transformation tracking",
    "Recovery-aware volume adjustments",
    "Unlimited AI coach conversations",
    "Real-time equipment substitutions",
    "Full progression analytics",
  ];
  return (
    <div className="flex flex-1 flex-col">
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
        Your system is ready
      </span>
      <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-display">
        Unlock your
        <br />
        adaptive system.
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">
        You've seen the analysis. You've seen the plan. Premium turns FORM into
        a system that follows your journey — not just a tracker.
      </p>

      <div className="surface-card mt-6 overflow-hidden rounded-3xl bg-primary p-1">
        <div className="rounded-[20px] bg-background p-6">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                Premium
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-display">$14</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <div className="text-xs text-muted-foreground">
                or $99/year · cancel anytime
              </div>
            </div>
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              7-day trial
            </span>
          </div>

          <ul className="mt-6 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-3 text-sm">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <button
          onClick={onUnlock}
          className="w-full rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
        >
          Start 7-day trial →
        </button>
        <button
          onClick={onContinueFree}
          className="w-full py-3 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          Continue with limited access
        </button>
      </div>
    </div>
  );
}

/* -------------------- Primitives -------------------- */

function Step({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-2 text-balance text-3xl font-bold leading-tight tracking-display">
        {title}
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">{sub}</p>
      {children}
    </div>
  );
}

function Choice({
  active,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition-all ${
        active
          ? "border-primary bg-primary/10"
          : "border-border bg-surface hover:bg-surface-2"
      }`}
    >
      <div className="text-base font-semibold">{title}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </button>
  );
}

function Row({
  active,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
        active
          ? "border-primary bg-primary/10"
          : "border-border bg-surface hover:bg-surface-2"
      }`}
    >
      <div>
        <div className="text-base font-semibold">{title}</div>
        {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
      </div>
      <span className="text-muted-foreground">→</span>
    </button>
  );
}

function FooterButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="mt-8 w-full rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
    >
      {children}
    </button>
  );
}
