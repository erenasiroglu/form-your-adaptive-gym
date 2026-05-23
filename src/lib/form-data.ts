// FORM rules-based adaptive workout engine + seed data

export type Equipment =
  | "dumbbells"
  | "barbells"
  | "smith"
  | "cables"
  | "hack-squat"
  | "chest-press"
  | "leg-press"
  | "pull-up-bar"
  | "bench"
  | "cardio";

export type Muscle =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "quads"
  | "hamstrings"
  | "glutes"
  | "core";

export type Pattern =
  | "horizontal-press"
  | "vertical-press"
  | "horizontal-pull"
  | "vertical-pull"
  | "squat"
  | "hinge"
  | "lunge"
  | "carry"
  | "core";

export type Goal = "hypertrophy" | "strength" | "fat-loss" | "general";
export type Experience = "beginner" | "intermediate" | "advanced";
export type Injury = "shoulder" | "knee" | "lower-back" | "none";

export interface Exercise {
  id: string;
  name: string;
  equipment: Equipment;
  pattern: Pattern;
  primary: Muscle;
  contraindicated?: Injury[];
}

export const EQUIPMENT_LIST: { id: Equipment; label: string }[] = [
  { id: "dumbbells", label: "Dumbbells" },
  { id: "barbells", label: "Barbells" },
  { id: "smith", label: "Smith Machine" },
  { id: "cables", label: "Cables" },
  { id: "hack-squat", label: "Hack Squat" },
  { id: "chest-press", label: "Chest Press" },
  { id: "leg-press", label: "Leg Press" },
  { id: "pull-up-bar", label: "Pull-up Bar" },
  { id: "bench", label: "Bench" },
  { id: "cardio", label: "Cardio" },
];

export const EXERCISES: Exercise[] = [
  // Horizontal press (chest)
  { id: "bb-bench", name: "Barbell Bench Press", equipment: "barbells", pattern: "horizontal-press", primary: "chest", contraindicated: ["shoulder"] },
  { id: "db-bench", name: "Dumbbell Bench Press", equipment: "dumbbells", pattern: "horizontal-press", primary: "chest" },
  { id: "machine-press", name: "Chest Press Machine", equipment: "chest-press", pattern: "horizontal-press", primary: "chest" },
  { id: "cable-fly", name: "Cable Fly", equipment: "cables", pattern: "horizontal-press", primary: "chest" },
  { id: "smith-bench", name: "Smith Bench Press", equipment: "smith", pattern: "horizontal-press", primary: "chest" },
  // Vertical press (shoulders)
  { id: "db-shoulder", name: "Dumbbell Shoulder Press", equipment: "dumbbells", pattern: "vertical-press", primary: "shoulders", contraindicated: ["shoulder"] },
  { id: "bb-ohp", name: "Barbell Overhead Press", equipment: "barbells", pattern: "vertical-press", primary: "shoulders", contraindicated: ["shoulder"] },
  { id: "smith-ohp", name: "Smith Overhead Press", equipment: "smith", pattern: "vertical-press", primary: "shoulders", contraindicated: ["shoulder"] },
  // Horizontal pull (back)
  { id: "bb-row", name: "Barbell Row", equipment: "barbells", pattern: "horizontal-pull", primary: "back", contraindicated: ["lower-back"] },
  { id: "db-row", name: "Dumbbell Row", equipment: "dumbbells", pattern: "horizontal-pull", primary: "back" },
  { id: "cable-row", name: "Seated Cable Row", equipment: "cables", pattern: "horizontal-pull", primary: "back" },
  // Vertical pull
  { id: "pullup", name: "Pull-up", equipment: "pull-up-bar", pattern: "vertical-pull", primary: "back" },
  { id: "lat-pulldown", name: "Cable Lat Pulldown", equipment: "cables", pattern: "vertical-pull", primary: "back" },
  // Squat
  { id: "bb-squat", name: "Barbell Back Squat", equipment: "barbells", pattern: "squat", primary: "quads", contraindicated: ["knee", "lower-back"] },
  { id: "hack-squat-ex", name: "Hack Squat", equipment: "hack-squat", pattern: "squat", primary: "quads", contraindicated: ["knee"] },
  { id: "leg-press-ex", name: "Leg Press", equipment: "leg-press", pattern: "squat", primary: "quads" },
  { id: "smith-squat", name: "Smith Squat", equipment: "smith", pattern: "squat", primary: "quads", contraindicated: ["knee"] },
  { id: "goblet-squat", name: "Goblet Squat", equipment: "dumbbells", pattern: "squat", primary: "quads" },
  // Hinge
  { id: "bb-rdl", name: "Romanian Deadlift", equipment: "barbells", pattern: "hinge", primary: "hamstrings", contraindicated: ["lower-back"] },
  { id: "db-rdl", name: "Dumbbell RDL", equipment: "dumbbells", pattern: "hinge", primary: "hamstrings" },
  { id: "cable-pullthrough", name: "Cable Pull-through", equipment: "cables", pattern: "hinge", primary: "glutes" },
  // Lunge
  { id: "db-lunge", name: "Walking Lunge", equipment: "dumbbells", pattern: "lunge", primary: "quads", contraindicated: ["knee"] },
  { id: "bb-split", name: "Barbell Split Squat", equipment: "barbells", pattern: "lunge", primary: "quads", contraindicated: ["knee"] },
  // Arms
  { id: "db-curl", name: "Dumbbell Curl", equipment: "dumbbells", pattern: "core", primary: "biceps" },
  { id: "cable-curl", name: "Cable Curl", equipment: "cables", pattern: "core", primary: "biceps" },
  { id: "cable-pushdown", name: "Cable Triceps Pushdown", equipment: "cables", pattern: "core", primary: "triceps" },
  { id: "db-tri-ext", name: "Dumbbell Overhead Extension", equipment: "dumbbells", pattern: "core", primary: "triceps" },
  // Core
  { id: "plank", name: "Plank Hold", equipment: "bench", pattern: "core", primary: "core" },
  { id: "cable-crunch", name: "Cable Crunch", equipment: "cables", pattern: "core", primary: "core" },
];

const REP_TARGETS: Record<Goal, { sets: number; reps: number; rpe: number }> = {
  hypertrophy: { sets: 4, reps: 10, rpe: 8 },
  strength: { sets: 5, reps: 5, rpe: 8.5 },
  "fat-loss": { sets: 3, reps: 12, rpe: 7.5 },
  general: { sets: 3, reps: 10, rpe: 7 },
};

export interface PlannedExercise {
  exercise: Exercise;
  sets: number;
  reps: number;
  weight: number;
  rpe: number;
}

export interface UserProfile {
  goal: Goal;
  experience: Experience;
  frequency: number;
  duration: number;
  injuries: Injury[];
  equipment: Equipment[];
}

export const DEFAULT_PROFILE: UserProfile = {
  goal: "hypertrophy",
  experience: "intermediate",
  frequency: 4,
  duration: 60,
  injuries: ["none"],
  equipment: ["dumbbells", "barbells", "cables", "bench", "pull-up-bar", "hack-squat"],
};

const PATTERN_ORDER: Pattern[] = [
  "horizontal-press",
  "horizontal-pull",
  "squat",
  "vertical-press",
  "vertical-pull",
  "hinge",
  "core",
];

const baseWeight = (ex: Exercise, exp: Experience): number => {
  const expMult = exp === "beginner" ? 0.6 : exp === "advanced" ? 1.4 : 1;
  const base: Record<Pattern, number> = {
    "horizontal-press": 60,
    "vertical-press": 40,
    "horizontal-pull": 60,
    "vertical-pull": 0,
    squat: 100,
    hinge: 90,
    lunge: 40,
    carry: 30,
    core: 25,
  };
  return Math.round((base[ex.pattern] * expMult) / 2.5) * 2.5;
};

export function generateWorkout(profile: UserProfile): PlannedExercise[] {
  const inj = new Set(profile.injuries.filter((i) => i !== "none"));
  const eq = new Set(profile.equipment);
  const targets = REP_TARGETS[profile.goal];

  const targetCount = Math.max(4, Math.min(8, Math.floor(profile.duration / 10)));
  const plan: PlannedExercise[] = [];
  const usedPatterns = new Set<Pattern>();

  for (const pattern of PATTERN_ORDER) {
    if (plan.length >= targetCount) break;
    const candidates = EXERCISES.filter(
      (e) =>
        e.pattern === pattern &&
        eq.has(e.equipment) &&
        !(e.contraindicated ?? []).some((c) => inj.has(c)),
    );
    if (candidates.length === 0) continue;
    const pick = candidates[0];
    usedPatterns.add(pattern);
    plan.push({
      exercise: pick,
      sets: targets.sets,
      reps: targets.reps,
      weight: baseWeight(pick, profile.experience),
      rpe: targets.rpe,
    });
  }

  // Fill remaining slots with isolation work
  for (const ex of EXERCISES) {
    if (plan.length >= targetCount) break;
    if (!eq.has(ex.equipment)) continue;
    if ((ex.contraindicated ?? []).some((c) => inj.has(c))) continue;
    if (plan.find((p) => p.exercise.id === ex.id)) continue;
    if (ex.pattern !== "core") continue;
    plan.push({
      exercise: ex,
      sets: 3,
      reps: 12,
      weight: baseWeight(ex, profile.experience),
      rpe: 8,
    });
  }
  return plan;
}

export function findAlternatives(
  ex: Exercise,
  profile: UserProfile,
  blockedEquipment: Equipment[] = [],
): Exercise[] {
  const blocked = new Set([...blockedEquipment, ex.equipment]);
  const eq = new Set(profile.equipment);
  const inj = new Set(profile.injuries.filter((i) => i !== "none"));
  return EXERCISES.filter(
    (e) =>
      e.id !== ex.id &&
      e.pattern === ex.pattern &&
      eq.has(e.equipment) &&
      !blocked.has(e.equipment) &&
      !(e.contraindicated ?? []).some((c) => inj.has(c)),
  ).slice(0, 3);
}

export function adjustForEnergy(
  plan: PlannedExercise[],
  energy: number, // 1-10
): PlannedExercise[] {
  const factor = 0.85 + (energy - 5) * 0.03; // 0.7 at 1, 1.0 at 10
  return plan.map((p) => ({
    ...p,
    weight: Math.max(2.5, Math.round((p.weight * factor) / 2.5) * 2.5),
    sets: energy <= 4 ? Math.max(2, p.sets - 1) : p.sets,
  }));
}

// localStorage helpers
const KEY = "form.profile.v1";

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: UserProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

export function getProfile(): UserProfile {
  return loadProfile() ?? DEFAULT_PROFILE;
}

// Seed circles
export interface CircleMember {
  name: string;
  volume: number;
  streak: number;
}
export interface Circle {
  id: string;
  name: string;
  description: string;
  members: CircleMember[];
  challenge?: string;
}

export const CIRCLES: Circle[] = [
  {
    id: "morning-hustle",
    name: "Morning Hustle",
    description: "5AM lifters. Coffee first, then chaos.",
    challenge: "30 days of pre-7am sessions",
    members: [
      { name: "Marcus Chen", volume: 14200, streak: 18 },
      { name: "Sarah V.", volume: 12800, streak: 16 },
      { name: "You", volume: 9100, streak: 12 },
      { name: "Dani K.", volume: 8400, streak: 11 },
      { name: "Theo R.", volume: 7600, streak: 9 },
    ],
  },
  {
    id: "steel-silicon",
    name: "Steel & Silicon",
    description: "Engineers who lift. Led by @alex_form.",
    challenge: "Push 405 squat by Q4",
    members: [
      { name: "Alex F.", volume: 22100, streak: 41 },
      { name: "Priya M.", volume: 18900, streak: 33 },
      { name: "You", volume: 9100, streak: 12 },
      { name: "Jordan W.", volume: 8200, streak: 7 },
    ],
  },
  {
    id: "founders",
    name: "Founders Group",
    description: "Private circle. 8 members.",
    members: [
      { name: "Riley T.", volume: 16400, streak: 24 },
      { name: "You", volume: 9100, streak: 12 },
      { name: "Sam Q.", volume: 7800, streak: 6 },
    ],
  },
];
