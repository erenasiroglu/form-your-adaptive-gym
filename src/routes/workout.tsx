import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  adjustForEnergy,
  findAlternatives,
  generateWorkout,
  getProfile,
  type Exercise,
  type PlannedExercise,
  type UserProfile,
} from "@/lib/form-data";

export const Route = createFileRoute("/workout")({
  head: () => ({
    meta: [
      { title: "Live session · FORM" },
      { name: "description", content: "Distraction-free training mode." },
    ],
  }),
  component: Workout,
});

function Workout() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<PlannedExercise[]>([]);
  const [idx, setIdx] = useState(0);
  const [setNum, setSetNum] = useState(1);
  const [energy, setEnergy] = useState<number | null>(null);
  const [rest, setRest] = useState<number | null>(null);
  const [swapOpen, setSwapOpen] = useState(false);
  const intRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const p = getProfile();
    setProfile(p);
    setPlan(generateWorkout(p));
  }, []);

  useEffect(() => {
    if (rest === null) return;
    if (rest <= 0) {
      setRest(null);
      return;
    }
    intRef.current = setInterval(() => setRest((r) => (r === null ? null : r - 1)), 1000);
    return () => {
      if (intRef.current) clearInterval(intRef.current);
    };
  }, [rest]);

  const current = plan[idx];
  const total = plan.length;
  const progress = useMemo(
    () => (total === 0 ? 0 : (idx + (setNum - 1) / (current?.sets ?? 1)) / total),
    [idx, setNum, current, total],
  );

  const logSet = () => {
    if (!current) return;
    if (setNum < current.sets) {
      setSetNum(setNum + 1);
      setRest(60);
    } else if (idx < plan.length - 1) {
      setIdx(idx + 1);
      setSetNum(1);
      setRest(90);
    } else {
      setIdx(plan.length); // finished
    }
  };

  const swapTo = (ex: Exercise) => {
    setPlan((cur) =>
      cur.map((p, i) =>
        i === idx
          ? { ...p, exercise: ex }
          : p,
      ),
    );
    setSwapOpen(false);
  };

  if (!profile) return null;

  // Energy check (first screen)
  if (energy === null) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background p-6">
        <Link
          to="/dashboard"
          className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
        >
          ← Exit
        </Link>
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="mb-2 text-4xl font-bold tracking-display">
            How's your energy?
          </h1>
          <p className="mb-10 text-sm text-muted-foreground">
            FORM will scale today's volume to match.
          </p>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setEnergy(i + 1);
                  setPlan((p) => adjustForEnergy(p, i + 1));
                }}
                className="aspect-square rounded-2xl border border-border bg-surface text-xl font-bold hover:border-primary hover:bg-primary/10"
              >
                {i + 1}
              </button>
            ))}
          </div>
          <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            1 = empty · 10 = ready to break PRs
          </p>
        </div>
      </div>
    );
  }

  // Finished
  if (idx >= plan.length) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-8 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          Session complete
        </span>
        <h1 className="mt-4 text-5xl font-bold tracking-display">Locked in.</h1>
        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
          {plan.length} exercises logged. Volume credited to your weekly total.
        </p>
        <Link
          to="/dashboard"
          className="mt-10 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border p-5">
        <Link
          to="/dashboard"
          className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
        >
          ← Exit
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {idx + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-border">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="pt-8 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Set {setNum} of {current.sets}
          </span>
          <AnimatePresence mode="wait">
            <motion.h1
              key={current.exercise.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-balance text-4xl font-bold tracking-display"
            >
              {current.exercise.name}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Rest timer or numbers */}
        {rest !== null ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Rest
            </span>
            <div className="mt-4 font-mono text-8xl font-bold tracking-display">
              {String(Math.floor(rest / 60)).padStart(2, "0")}:
              {String(rest % 60).padStart(2, "0")}
            </div>
            <button
              onClick={() => setRest(null)}
              className="mt-8 rounded-full border border-border bg-surface px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Skip rest
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 py-6">
            <Stat label="Reps" value={String(current.reps)} />
            <Stat label="Weight" value={`${current.weight}`} unit="kg" />
            <Stat label="RPE" value={current.rpe.toFixed(1)} />
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => setSwapOpen(true)}
            className="w-full rounded-2xl border border-border bg-surface py-4 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            ⇄ Machine occupied — swap
          </button>
          <button
            onClick={logSet}
            className="w-full rounded-2xl bg-primary py-5 text-base font-bold text-primary-foreground transition-transform active:scale-95"
          >
            Log set
          </button>
        </div>
      </div>

      {/* Swap modal */}
      <AnimatePresence>
        {swapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-end justify-center bg-background/80 backdrop-blur-md"
            onClick={() => setSwapOpen(false)}
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-t-3xl border border-border bg-card p-6 pb-10"
            >
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-border" />
              <h2 className="mb-1 text-xl font-bold tracking-display">
                Alternatives
              </h2>
              <p className="mb-6 text-xs text-muted-foreground">
                Same pattern, different tool. All matched to your equipment.
              </p>
              <div className="space-y-2">
                {findAlternatives(current.exercise, profile).map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => swapTo(alt)}
                    className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 py-4 text-left hover:border-primary"
                  >
                    <div>
                      <div className="text-sm font-semibold">{alt.name}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                        {alt.equipment.replace("-", " ")}
                      </div>
                    </div>
                    <span className="text-primary">→</span>
                  </button>
                ))}
                {findAlternatives(current.exercise, profile).length === 0 && (
                  <p className="text-center text-sm text-muted-foreground">
                    No equivalent equipment available. Skip or rest longer.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 text-center">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-3xl font-bold tracking-display">
        {value}
        {unit && <span className="text-base text-muted-foreground"> {unit}</span>}
      </div>
    </div>
  );
}
