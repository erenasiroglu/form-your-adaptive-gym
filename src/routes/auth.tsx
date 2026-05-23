import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientGlow } from "@/components/form/AmbientGlow";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · FORM" },
      { name: "description", content: "Access your FORM intelligence profile." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="relative min-h-screen">
      <AmbientGlow />
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-8">
        <Link to="/" className="text-base font-bold tracking-display">
          FORM
        </Link>
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="mb-2 text-4xl font-bold tracking-display">
            {mode === "signin" ? "Welcome back." : "Create your profile."}
          </h1>
          <p className="mb-10 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Continue your adaptive program."
              : "We'll calibrate FORM to your gym in 60 seconds."}
          </p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: mode === "signup" ? "/onboarding" : "/dashboard" });
            }}
          >
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold tracking-tight text-primary-foreground transition-transform active:scale-95"
            >
              {mode === "signin" ? "Sign in" : "Continue"}
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin"
              ? "New to FORM? Create profile →"
              : "Already have a profile? Sign in →"}
          </button>
        </div>
      </div>
    </div>
  );
}
