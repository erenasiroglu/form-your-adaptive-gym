import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/form/AppShell";
import { createTranslator, getStoredLocale, useTranslation } from "@/i18n";

export const Route = createFileRoute("/coach")({
  head: () => {
    const { t } = createTranslator(getStoredLocale());
    return {
      meta: [
        { title: t("coach.meta.title") },
        { name: "description", content: t("coach.meta.description") },
      ],
    };
  },
  component: Coach,
});

interface Msg {
  role: "user" | "assistant";
  content: string;
}

function Coach() {
  const { t } = useTranslation();
  const seed = useMemo<Msg[]>(
    () => [{ role: "assistant", content: t("coach.seed") }],
    [t],
  );
  const replies = useMemo(
    () => [
      t("coach.replies.r1"),
      t("coach.replies.r2"),
      t("coach.replies.r3"),
      t("coach.replies.r4"),
    ],
    [t],
  );

  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const next: Msg[] = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages([...next, { role: "assistant", content: reply }]);
    }, 600);
  };

  return (
    <AppShell>
      <section className="mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          {t("coach.badge")}
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-display">{t("coach.title")}</h1>
      </section>

      <div className="space-y-3 pb-32">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "surface-card text-foreground"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={send}
        className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-5xl border-t border-border bg-background/90 px-5 py-3 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("coach.placeholder")}
            className="flex-1 rounded-full border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            {t("common.send")}
          </button>
        </div>
      </form>
    </AppShell>
  );
}
