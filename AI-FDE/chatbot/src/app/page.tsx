"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AssistantResponse } from "@/components/assistant-response";
import { estimateTokens, type BudgetReport } from "@/lib/input-budget";
import { hasPortfolioPreview } from "@/lib/portfolio-preview";

type Msg = { role: "user" | "assistant"; content: string };
type ModelsResponse = { models: string[]; defaultModel: string };

const SUGGESTIONS = [
  "Explain quantum computing simply",
  "Write a haiku about coffee",
  "Debug this regex: /^[a-z]+$/",
  "Plan a 3-day trip to Tokyo",
];

/** Below this share of the budget the meter stays neutral rather than amber. */
const WARN_THRESHOLD = 0.8;

function trimSummary(report: BudgetReport): string {
  const parts: string[] = [];
  if (report.droppedHistoryMessages > 0) {
    parts.push(`${report.droppedHistoryMessages} older message(s) dropped`);
  }
  if (report.collapsedMessages > 0) {
    parts.push(`${report.collapsedMessages} message(s) de-duplicated`);
  }
  if (report.truncatedMessages > 0) {
    parts.push(`${report.truncatedMessages} message(s) truncated`);
  }
  return parts.join(" · ");
}

export default function Home() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pendingRequests, setPendingRequests] = useState(0);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [modelsLoading, setModelsLoading] = useState(true);
  const [modelsError, setModelsError] = useState("");
    const [maxInputChars, setMaxInputChars] = useState(0);
    const [budgetReport, setBudgetReport] = useState<BudgetReport | null>(null);
  const [portfolioMode, setPortfolioMode] = useState(false);
  const messagesRef = useRef<Msg[]>([]);
  const chatSessionRef = useRef(0);
  const streamingSessionRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);  // used for cancel the response inbetween while backend is streming response for users query
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadModels() {
      try {
        const res = await fetch("/api/models", { signal: controller.signal });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? `Request failed (${res.status})`);
        }

        const result = data as ModelsResponse;
        setModels(result.models);
        setSelectedModel(
          result.models.includes(result.defaultModel)
            ? result.defaultModel
            : (result.models[0] ?? result.defaultModel),
        );
      } catch (error) {
        if (!controller.signal.aborted) {
          setModelsError(
            error instanceof Error ? error.message : "Could not load models.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setModelsLoading(false);
      }
    }

    void loadModels();
    return () => controller.abort();
  }, []);

      useEffect(() => {
        const controller = new AbortController();

        async function loadBudget() {
          try {
            const res = await fetch("/api/budget", { signal: controller.signal });
            if (!res.ok) return;
            const data = await res.json();
            if (!controller.signal.aborted) setMaxInputChars(data.maxInputChars ?? 0);
          } catch {
            // The meter is informational; a failure here must not disrupt chat.
          }
        }

        void loadBudget();
        return () => controller.abort();
      }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: pendingRequests > 0 ? "auto" : "smooth",
    });
  }, [messages, pendingRequests]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  // Mirrors the server's char budget so usage can be shown before a request is sent.
  const usage = useMemo(() => {
    const next = input.trim() ? [...messages, { role: "user" as const, content: input }] : messages;
    const chars = next.reduce((sum, m) => sum + m.content.length, 0);
    return {
      chars,
      tokens: estimateTokens(next.map((m) => m.content).join("\n")),
      ratio: maxInputChars > 0 ? Math.min(1, chars / maxInputChars) : 0,
    };
  }, [messages, input, maxInputChars]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    const session = chatSessionRef.current;

    if (!content || streamingSessionRef.current === session) return;
    
    const controller = new AbortController(); //The AbortController interface represents a controller object that allows you to abort one or more Web requests as and when desired.
    abortRef.current = controller;

    const next: Msg[] = [...messagesRef.current, { role: "user", content }];
    messagesRef.current = next;
    setMessages(next);
    setInput("");
    streamingSessionRef.current = session;
    setPendingRequests((count) => count + 1);

    let assistantIndex = -1;
    let reply = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          model: selectedModel || undefined,
          mode: portfolioMode ? "portfolio" : undefined,
        }),
        signal:controller.signal,
      });

      if (!res.ok) {
        const data = await res.json();
        if (typeof data.maxInputChars === "number") {
          setMaxInputChars(data.maxInputChars);
        }
        // The previous report described an earlier request, so it no longer applies.
        setBudgetReport(null);
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }

      if (session !== chatSessionRef.current) {
        await res.body?.cancel();
        return;
      }

      const budgetHeader = res.headers.get("x-budget-report");
      if (budgetHeader) {
        try {
          setBudgetReport(
            JSON.parse(decodeURIComponent(budgetHeader)) as BudgetReport,
          );
        } catch {
          setBudgetReport(null);
        }
      } else {
        setBudgetReport(null);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("The server returned an empty response.");

      const placeholder: Msg[] = [
        ...messagesRef.current,
        { role: "assistant", content: "" },
      ];
      messagesRef.current = placeholder;
      setMessages(placeholder);
      assistantIndex = placeholder.length - 1;

      const decoder = new TextDecoder();

      const append = (chunk: string) => {
        if (!chunk) return;
        reply += chunk;
        const updated = messagesRef.current.map((message, index) =>
          index === assistantIndex ? { ...message, content: reply } : message,
        );
        messagesRef.current = updated;
        setMessages(updated);
      };

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        if (session !== chatSessionRef.current) {
          await reader.cancel();
          return;
        }

        append(decoder.decode(value, { stream: true }));
      }

      if (session === chatSessionRef.current) {
        append(decoder.decode());
        if (!reply) append("No response received.");
      }
    } catch (error) {
      if(controller.signal.aborted) return ;   // Do not show an error when the user stopped the stream
      if (session !== chatSessionRef.current) return;

      const message = `Error: ${
        error instanceof Error ? error.message : "Could not reach the server."
      }`;

      if (assistantIndex >= 0) {
        const updated = messagesRef.current.map((item, index) =>
          index === assistantIndex
            ? {
                ...item,
                content: item.content ? `${item.content}\n\n${message}` : message,
              }
            : item,
        );
        messagesRef.current = updated;
        setMessages(updated);
      } else {
        const updated = [
          ...messagesRef.current,
          { role: "assistant" as const, content: message },
        ];
        messagesRef.current = updated;
        setMessages(updated);
      }
    } finally {
      if(abortRef.current === controller){  //clear abort ref 
        abortRef.current = null;
      }
      if (streamingSessionRef.current === session) {
        streamingSessionRef.current = null;
      }
      setPendingRequests((count) => Math.max(0, count - 1));
      textareaRef.current?.focus();
    }
  }

  function stop(){
    abortRef.current?.abort();
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
        <div className="ml-auto flex min-w-0 items-center gap-2">
          <label className="flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-xs">
            <span className="hidden text-slate-400 sm:inline">Using</span>
            <select
              aria-label="Select Groq model"
              aria-describedby={modelsError ? "model-error" : undefined}
              className="max-w-40 min-w-0 cursor-pointer truncate bg-transparent font-medium text-yellow-300 outline-none disabled:cursor-wait disabled:text-slate-500"
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
              disabled={modelsLoading || models.length === 0}
              title={
                modelsError
                  ? `Could not load available models: ${modelsError}`
                  : `Using ${selectedModel || "default model"}`
              }
            >
              {modelsLoading && <option value="">Loading models...</option>}
              {!modelsLoading && models.length === 0 && (
                <option value="">Models unavailable</option>
              )}
              {models.map((model) => (
                <option key={model} value={model} className="bg-neutral-950">
                  {model}
                </option>
              ))}
            </select>
          </label>
          {messages.length > 0 && (
            <button
              onClick={() => {
                abortRef.current?.abort();
                chatSessionRef.current += 1;
                messagesRef.current = [];
                setMessages([]);
                              setBudgetReport(null);
                              setPortfolioMode(false);
                            }}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              New chat
            </button>
          )}
        </div>
      </header>
      {modelsError && (
        <p id="model-error" role="status" className="sr-only">
          Could not load available models: {modelsError}
        </p>
      )}

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
                className={`${
                  m.role === "assistant" && hasPortfolioPreview(m.content)
                    ? "max-w-full"
                    : "max-w-[80%]"
                } whitespace-pre-wrap break-words px-4 py-2.5 text-sm leading-relaxed shadow-lg sm:text-[0.9rem] ${
                  m.role === "user"
                    ? "rounded-2xl rounded-br-md bg-gradient-to-br from-yellow-300 to-amber-400 text-black shadow-yellow-900/30"
                    : "rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] text-slate-100 shadow-black/20 backdrop-blur"
                }`}
              >
                {m.role === "assistant" ? (
                  <AssistantResponse content={m.content} />
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}

          {pendingRequests > 0 &&
            messages.length > 0 &&
            messages[messages.length - 1]?.role !== "assistant" && (
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
          <button
            type="button"
            onClick={() => setPortfolioMode((enabled) => !enabled)}
            aria-pressed={portfolioMode}
            aria-label={
              portfolioMode ? "Disable portfolio mode" : "Enable portfolio mode"
            }
            title={
              portfolioMode
                ? "Portfolio mode is on — describe yourself to generate index.html, styles.css and script.js"
                : "Turn on portfolio mode to build a portfolio from your details"
            }
            className={`flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl border px-2.5 text-xs font-medium transition sm:px-3 ${
              portfolioMode
                ? "border-yellow-400/60 bg-yellow-400/15 text-yellow-200 shadow-lg shadow-yellow-500/10"
                : "border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span className="hidden sm:inline">Portfolio</span>
          </button>
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
            placeholder={
              portfolioMode
                ? "Describe yourself: name, role, skills, projects, contact..."
                : "Message Grok Chatbot..."
            }
          />
          {pendingRequests > 0 ? ( 
            <button
              type="button"
              onClick={stop}
              aria-label="Stop generating"
              title="Stop generating"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-slate-100 transition hover:border-white/30 hover:bg-white/15"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <rect x="6" y="6" width="12" height="12" rx="1.5" />
              </svg>
            </button>
          ) : (
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
          )}
          {/* <button
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
          </button> */}
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[0.7rem] text-slate-500">
          Press <kbd className="font-sans text-slate-400">Enter</kbd> to send ·{" "}
          <kbd className="font-sans text-slate-400">Shift</kbd> +{" "}
          <kbd className="font-sans text-slate-400">Enter</kbd> for a new line
        </p>
                {maxInputChars > 0 && (
                          <div className="mx-auto mt-3 w-full max-w-3xl">
                            <div className="flex items-center justify-between gap-3 text-[0.7rem]">
                              <span className="text-slate-500">
                                Input budget
                                {budgetReport && trimSummary(budgetReport) && (
                                  <span className="text-amber-400/90"> · {trimSummary(budgetReport)}</span>
                                )}
                              </span>
                              <span className={usage.ratio >= WARN_THRESHOLD ? "text-amber-400" : "text-slate-400"}>
                                {usage.chars.toLocaleString()} / {maxInputChars.toLocaleString()} chars · ~
                                {usage.tokens.toLocaleString()} tokens
                              </span>
                            </div>
                            <div
                              role="meter"
                              aria-label="Input budget used"
                              aria-valuemin={0}
                              aria-valuemax={maxInputChars}
                              aria-valuenow={usage.chars}
                              className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10"
                            >
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  usage.ratio >= WARN_THRESHOLD
                                    ? "bg-gradient-to-r from-amber-400 to-red-400"
                                    : "bg-gradient-to-r from-yellow-300 to-amber-400"
                                }`}
                                style={{ width: `${Math.max(usage.ratio * 100, usage.chars > 0 ? 1 : 0)}%` }}
                              />
                            </div>
                          </div>
                        )}
      </div>
    </div>
  );
}