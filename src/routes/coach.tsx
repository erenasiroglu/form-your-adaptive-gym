import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/form/AppShell";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "Coach · FORM" },
      { name: "description", content: "Ask FORM. Get programmatic answers." },
    ],
  }),
  component: Coach,
});

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SEED: Msg[] = [
  {
    role: "assistant",
    content:
      "Hey. I've got your full training history and equipment profile. Ask me anything — programming, form cues, recovery, swaps.",
  },
];

const REPLIES = [
  "Based on your last 3 sessions, your push volume is trending up. Hold for one more week, then deload.",
  "Try slowing the eccentric to 3 seconds. You'll feel more chest, less shoulder.",
  "Sleep was below your baseline last night. I'd cap RPE at 7 today.",
  "Swap to a neutral-grip dumbbell press. Same stimulus, kinder on the shoulder.",
];

function Coach() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const next: Msg[] = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
      setMessages([...next, { role: "assistant", content: reply }]);
    }, 600);
  };

  return (
    <AppShell>
      <section className="mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          Always on
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-display">Coach</h1>
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
            placeholder="Ask FORM..."
            className="flex-1 rounded-full border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            Send
          </button>
        </div>
      </form>
    </AppShell>
  );
}
