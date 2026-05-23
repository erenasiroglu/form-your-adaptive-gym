## FORM — Build Plan

A mobile-first, premium adaptive fitness platform using the **Deep Carbon Tech** direction (graphite #0A0A0B base, lime accent #CBFB45, Inter typography, generous spacing, soft accent glows).

### Scope (v1 — front-end with local state)

Build a fully navigable product demo. No backend yet — workout data, onboarding choices, and circles use in-memory / localStorage state. Lovable Cloud + AI coach can be wired in a follow-up so this ships as a polished, explorable experience first.

### Design tokens (verbatim from selected direction)

Port these into `src/styles.css` as the new theme:
- `--background` #0A0A0B, `--card` #141416, `--border` #232326
- `--primary` (accent) #CBFB45, `--primary-foreground` #0A0A0B
- `--muted-foreground` #8E8E93
- Inter font (300/400/500/600/700), tight tracking on display text
- Rounded-2xl/3xl cards, soft blurred accent glows as ambient background

### Routes

```
/                          Landing (hero, value prop, CTA)
/auth                      Sign in / sign up (visual only, local state)
/onboarding                Multi-step: goals → experience → frequency →
                           duration → injuries → equipment selection
/dashboard                 Readiness score, today's workout, equipment
                           profile, recovery, quick actions
/workout                   Fullscreen distraction-free live session
                           (current exercise, reps/weight/sets, timer,
                           "Machine Occupied" swap modal)
/progress                  Analytics: consistency, volume, PRs, trends
/circles                   List of circles + leaderboard
/circles/$circleId         Single circle: members, challenge, timeline
/coach                     AI chat surface (stubbed responses for v1)
/profile                   User profile + settings
```

A persistent bottom tab bar (mobile) / side nav (desktop) links the five
authenticated surfaces: Dashboard, Workout, Progress, Circles, Coach.

### Key components

- `ReadinessRing` — large numeric score with subtle ring
- `WorkoutCard` — today's adaptive session preview with start CTA
- `EquipmentGrid` — toggleable equipment chips with status dots
- `ExerciseSwapModal` — triggered by "Machine Occupied", shows 3 biomechanically equivalent alternatives
- `RestTimer` — large circular countdown with haptic-style pulse
- `SetLogger` — minimal +/- weight & rep entry, large tap targets
- `LeaderboardRow` — rank, name, volume metric
- `CoachMessage` — chat bubble with assistant/user variants
- `AmbientGlow` — fixed blurred accent orbs for atmospheric depth

### Onboarding flow

Six steps with progress dots, each a full-screen card:
1. Primary goal (hypertrophy / strength / fat loss / general)
2. Experience (beginner / intermediate / advanced)
3. Frequency (2-6 days/week slider)
4. Session length (30/45/60/90 min)
5. Injuries (multi-select chips: shoulder, knee, lower back, none)
6. Equipment (multi-select grid of all categories from the brief)

Stored in localStorage so dashboard can render personalized copy.

### Live workout experience

- Fullscreen layout, large display type for exercise name & numbers
- Three primary actions: **Log Set**, **Machine Occupied**, **Skip**
- Auto rest timer after logging a set; tap to dismiss
- Swipe (or arrow) to advance exercises
- Progress bar shows session completion
- "Energy check" prompt at start adjusts displayed target weights ±10%

### Adaptive intelligence (v1 — rules-based)

Real AI generation is a follow-up. For v1, ship a deterministic engine:
- A small exercise library (~30 movements) tagged by equipment + muscle group
- `generateWorkout()` filters by user's selected equipment, goal, and injuries
- `findAlternatives(exercise, blockedEquipment)` returns same-pattern subs
- `adjustForEnergy(plan, energyLevel)` scales volume/intensity

This makes "machine occupied → swap" and "low energy → reduce intensity" actually function in the demo.

### Out of scope for v1 (call out to user)

- Real AI coach (needs Lovable Cloud + AI Gateway)
- Auth + persistent user accounts
- Real social features (circles are seeded with mock members)
- Gym equipment database / location detection

These are clean follow-ups once the experience is approved.

### Technical notes

- TanStack Start file-based routes under `src/routes/`
- Tailwind v4 tokens defined in `src/styles.css` `@theme inline` + `:root`
- framer-motion for restrained transitions (number ticks, modal entrance)
- Each route gets its own `head()` with unique title + description
- Mobile-first; preview switched to mobile viewport during build
