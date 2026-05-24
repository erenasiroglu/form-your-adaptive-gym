import type { Goal, Physique, UserProfile } from "@/lib/form-data";
import type { BodyAnalysis } from "@/lib/form-data";
import type { Translator } from "./translator";

const LOCALE_KEY = "form.locale";

export function getStoredLocale(): "en" | "tr" {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LOCALE_KEY);
  return stored === "tr" ? "tr" : "en";
}

export function storeLocale(locale: "en" | "tr") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCALE_KEY, locale);
}

export function buildLocalizedAnalysis(
  p: Partial<UserProfile>,
  { t, messages }: Translator,
): BodyAnalysis {
  const physique = p.physique ?? "average";
  const goal = p.goal ?? "hypertrophy";
  const months = 4;

  const bf: Record<Physique, [number, number]> = {
    lean: [10, 14],
    athletic: [13, 17],
    average: [17, 22],
    soft: [22, 28],
    stocky: [20, 26],
  };

  const projectionKey = `analysis.projection.${goal}` as const;
  const projection = t(projectionKey, { months });

  const symmetryKey =
    physique === "athletic" || physique === "lean"
      ? "analysis.symmetry.dominance"
      : "analysis.symmetry.normal";

  const postureKey =
    physique === "soft" || physique === "stocky"
      ? "analysis.posture.apt"
      : "analysis.posture.neutral";

  const potentialKey =
    physique === "athletic"
      ? "analysis.potential.athletic"
      : "analysis.potential.default";

  return {
    bodyFatRange: bf[physique],
    strongMuscleGroups: [...messages.analysis.strong[physique]],
    weakPoints: [...messages.analysis.weak[physique]],
    symmetry: t(symmetryKey),
    posture: t(postureKey),
    potential: t(potentialKey),
    projection,
    generatedAt: Date.now(),
  };
}

export function translateGoal(goal: Goal, t: Translator["t"]): string {
  return t(`data.goals.${goal}.label`);
}

export function translateExperience(
  exp: string,
  t: Translator["t"],
): string {
  const key = `data.experience.${exp}`;
  const val = t(key);
  return val === key ? exp : val;
}

export function translateExercise(id: string, t: Translator["t"]): string {
  const key = `data.exercises.${id}`;
  const val = t(key);
  return val === key ? id : val;
}

export function translateEquipment(id: string, t: Translator["t"]): string {
  const key = `data.equipment.${id}`;
  const val = t(key);
  return val === key ? id.replace("-", " ") : val;
}
