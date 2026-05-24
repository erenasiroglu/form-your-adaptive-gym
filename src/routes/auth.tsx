import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientGlow } from "@/components/form/AmbientGlow";
import { LanguageSwitcher } from "@/components/form/LanguageSwitcher";
import { createTranslator, getStoredLocale, useTranslation } from "@/i18n";

export const Route = createFileRoute("/auth")({
  head: () => {
    const { t } = createTranslator(getStoredLocale());
    return {
      meta: [
        { title: t("auth.meta.title") },
        { name: "description", content: t("auth.meta.description") },
      ],
    };
  },
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="relative min-h-screen">
      <AmbientGlow />
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-base font-bold tracking-display">
            {t("common.form")}
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="mb-2 text-4xl font-bold tracking-display">
            {mode === "signin" ? t("auth.signInTitle") : t("auth.signUpTitle")}
          </h1>
          <p className="mb-10 text-sm text-muted-foreground">
            {mode === "signin" ? t("auth.signInSub") : t("auth.signUpSub")}
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
              placeholder={t("auth.email")}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <input
              type="password"
              required
              placeholder={t("auth.password")}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold tracking-tight text-primary-foreground transition-transform active:scale-95"
            >
              {mode === "signin" ? t("auth.signIn") : t("auth.signUp")}
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? t("auth.toggleSignUp") : t("auth.toggleSignIn")}
          </button>
        </div>
      </div>
    </div>
  );
}
