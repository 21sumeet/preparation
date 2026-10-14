"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Explain quantum computing simply",
  "Write a haiku about coffee",
  "Debug this regex: /^[a-z]+$/",
  "Plan a 3-day trip to Tokyo",
];

export default function Home() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pendingRequests, setPendingRequests] = useState(0);
  const messagesRef = useRef<Msg[]>([]);
  const chatSessionRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pendingRequests]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;

    const session = chatSessionRef.current;
    const next: Msg[] = [...messagesRef.current, { role: "user", content }];
    messagesRef.current = next;
    setMessages(next);
    setInput("");
    setPendingRequests((count) => count + 1);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      if (session === chatSessionRef.current) {
        const updated = [
          ...messagesRef.current,
          { role: "assistant" as const, content: data.reply ?? "No response received." },
        ];
        messagesRef.current = updated;
        setMessages(updated);
      }
    } catch (error) {
      if (session === chatSessionRef.current) {
        const updated = [
          ...messagesRef.current,
          {
            role: "assistant" as const,
            content: `Error: ${
              error instanceof Error ? error.message : "Could not reach the server."
            }`,
          },
        ];
        messagesRef.current = updated;
        setMessages(updated);
      }
    } finally {
      setPendingRequests((count) => Math.max(0, count - 1));
      textareaRef.current?.focus();
    }
  }

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-black text-slate-100">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-96 rounded-full bg-amber-400/10 blur-[120px]" />

      {/* header */}
      <header className="relative z-10 flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-amber-400 text-sm font-bold text-black shadow-lg shadow-yellow-500/30">
          G
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold tracking-tight sm:text-base">
            Grok Chatbot
          </h1>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Online
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => {
              chatSessionRef.current += 1;
              messagesRef.current = [];
              setMessages([]);
            }}
            className="ml-auto rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            New chat
          </button>
        )}
      </header>

      {/* messages */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
          {messages.length === 0 && (
            <div className="mt-8 flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 text-2xl font-bold text-black shadow-xl shadow-yellow-500/30">
                G
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
                How can I help you today?
              </h2>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                Ask anything — I&apos;ll do my best to give you a clear, useful
                answer.
              </p>
              <div className="mt-7 grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-yellow-400/40 hover:bg-white/[0.07] hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-end gap-3 ${
                m.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                  m.role === "user"
                    ? "bg-slate-700 text-slate-200"
                    : "bg-gradient-to-br from-yellow-300 to-amber-400 text-black"
                }`}
              >
                {m.role === "user" ? "You" : "G"}
              </div>
              <div
                className={`max-w-[80%] whitespace-pre-wrap break-words px-4 py-2.5 text-sm leading-relaxed shadow-lg sm:text-[0.9rem] ${
                  m.role === "user"
                    ? "rounded-2xl rounded-br-md bg-gradient-to-br from-yellow-300 to-amber-400 text-black shadow-yellow-900/30"
                    : "rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] text-slate-100 shadow-black/20 backdrop-blur"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {pendingRequests > 0 && (
            <div className="flex items-end gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-300 to-amber-400 text-xs font-semibold text-black">
                G
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3.5 backdrop-blur">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* composer */}
      <div className="relative z-10 border-t border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-2xl border border-white/10 bg-neutral-950/90 p-2 shadow-2xl shadow-black/40 transition focus-within:border-yellow-400/50">
          <textarea
            ref={textareaRef}
            rows={1}
            className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Message Grok Chatbot..."
          />
          <button
            onClick={() => send()}
            disabled={!input.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-amber-400 text-black shadow-lg shadow-yellow-500/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:shadow-none"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[0.7rem] text-slate-500">
          Press <kbd className="font-sans text-slate-400">Enter</kbd> to send ·{" "}
          <kbd className="font-sans text-slate-400">Shift</kbd> +{" "}
          <kbd className="font-sans text-slate-400">Enter</kbd> for a new line
        </p>
      </div>
    </div>
  );
}