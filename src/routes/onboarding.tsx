import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DEFAULT_PROFILE,
  EQUIPMENT_LIST,
  saveProfile,
  type Equipment,
  type Experience,
  type Goal,
  type Injury,
  type UserProfile,
} from "@/lib/form-data";
import { AmbientGlow } from "@/components/form/AmbientGlow";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Calibrate FORM" },
      { name: "description", content: "Tell FORM about your goals, gym, and body." },
    ],
  }),
  component: Onboarding,
});

const GOALS: { id: Goal; label: string; desc: string }[] = [
  { id: "hypertrophy", label: "Build muscle", desc: "Hypertrophy focus" },
  { id: "strength", label: "Get stronger", desc: "Heavy compounds" },
  { id: "fat-loss", label: "Lean out", desc: "Higher density work" },
  { id: "general", label: "Stay sharp", desc: "Balanced training" },
];
const EXP: { id: Experience; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];
const INJ: { id: Injury; label: string }[] = [
  { id: "none", label: "None" },
  { id: "shoulder", label: "Shoulder" },
  { id: "knee", label: "Knee" },
  { id: "lower-back", label: "Lower back" },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const next = () => {
    if (step === 5) {
      saveProfile(profile);
      navigate({ to: "/dashboard" });
    } else {
      setStep(step + 1);
    }
  };
  const back = () => setStep(Math.max(0, step - 1));

  const update = <K extends keyof UserProfile>(k: K, v: UserProfile[K]) =>
    setProfile((p) => ({ ...p, [k]: v }));

  const toggleEquip = (e: Equipment) =>
    update(
      "equipment",
      profile.equipment.includes(e)
        ? profile.equipment.filter((x) => x !== e)
        : [...profile.equipment, e],
    );

  const toggleInjury = (i: Injury) => {
    if (i === "none") return update("injuries", ["none"]);
    const without = profile.injuries.filter((x) => x !== "none" && x !== i);
    update("injuries", profile.injuries.includes(i) ? without.length ? without : ["none"] : [...without, i]);
  };

  return (
    <div className="relative min-h-screen">
      <AmbientGlow />
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-6">
        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <div className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Step {step + 1} of 6
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            {step === 0 && (
              <Step title="What's your goal?" sub="We'll shape your program around this.">
                <div className="grid grid-cols-2 gap-3">
                  {GOALS.map((g) => (
                    <Choice
                      key={g.id}
                      active={profile.goal === g.id}
                      onClick={() => update("goal", g.id)}
                      title={g.label}
                      sub={g.desc}
                    />
                  ))}
                </div>
              </Step>
            )}
            {step === 1 && (
              <Step title="Experience level?" sub="Used to calibrate starting loads.">
                <div className="space-y-3">
                  {EXP.map((e) => (
                    <Choice
                      key={e.id}
                      active={profile.experience === e.id}
                      onClick={() => update("experience", e.id)}
                      title={e.label}
                    />
                  ))}
                </div>
              </Step>
            )}
            {step === 2 && (
              <Step title="Days per week?" sub="Be honest. We design for real life.">
                <div className="grid grid-cols-5 gap-2">
                  {[2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => update("frequency", n)}
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
            {step === 3 && (
              <Step title="Session length?" sub="Including warm-up.">
                <div className="grid grid-cols-2 gap-3">
                  {[30, 45, 60, 90].map((n) => (
                    <Choice
                      key={n}
                      active={profile.duration === n}
                      onClick={() => update("duration", n)}
                      title={`${n} min`}
                    />
                  ))}
                </div>
              </Step>
            )}
            {step === 4 && (
              <Step
                title="Any limitations?"
                sub="We'll route around them. Select all that apply."
              >
                <div className="flex flex-wrap gap-2">
                  {INJ.map((i) => {
                    const active = profile.injuries.includes(i.id);
                    return (
                      <button
                        key={i.id}
                        onClick={() => toggleInjury(i.id)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-surface text-foreground"
                        }`}
                      >
                        {i.label}
                      </button>
                    );
                  })}
                </div>
              </Step>
            )}
            {step === 5 && (
              <Step
                title="Your equipment"
                sub="Toggle what your gym has. Workouts will only use these."
              >
                <div className="grid grid-cols-2 gap-2">
                  {EQUIPMENT_LIST.map((e) => {
                    const active = profile.equipment.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        onClick={() => toggleEquip(e.id)}
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
              </Step>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={back}
            disabled={step === 0}
            className="rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold disabled:opacity-30"
          >
            Back
          </button>
          <button
            onClick={next}
            className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
          >
            {step === 5 ? "Build my program" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

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
    <div>
      <h1 className="mb-2 text-3xl font-bold tracking-display">{title}</h1>
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
