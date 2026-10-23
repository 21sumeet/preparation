"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import type { Element } from "hast";
import type { ExtraProps } from "react-markdown";

type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & ExtraProps;

function findCodeElement(node?: Element): Element | undefined {
  return node?.children.find(
    (child): child is Element =>
      child.type === "element" && child.tagName === "code",
  );
}

function textContent(node: Element): string {
  return node.children
    .map((child) => {
      if (child.type === "text") return child.value;
      if (child.type === "element") return textContent(child);
      return "";
    })
    .join("");
}

function languageLabel(language: string): string {
  switch (language.toLowerCase()) {
    case "html":
      return "HTML";
    case "css":
      return "CSS";
    case "js":
    case "javascript":
      return "JS";
    case "ts":
    case "typescript":
      return "TS";
    case "json":
      return "JSON";
    case "sh":
    case "bash":
    case "shell":
      return "Shell";
    default:
      return language ? language.toUpperCase() : "Code";
  }
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CodeBlock({ children, node }: CodeBlockProps) {
  const codeElement = findCodeElement(node);
  const codeText = codeElement
    ? textContent(codeElement).replace(/\n$/, "")
    : "";
  const language =
    codeElement?.properties.className
      ?.find((name) => name.startsWith("language-"))
      ?.slice("language-".length) ?? "";
  const label = languageLabel(language);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  async function copyCode() {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  if (!codeElement) {
    return (
      <pre className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 text-sm leading-6 text-slate-200">
        {children}
      </pre>
    );
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-black/60">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <button
          type="button"
          onClick={() => void copyCode()}
          aria-label={copied ? "Copied" : `Copy ${label} code`}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.7rem] font-medium text-slate-400 transition hover:bg-white/10 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-200">
        <code className="font-mono text-[0.9em] text-yellow-200">
          {codeText}
        </code>
      </pre>
    </div>
  );
}
