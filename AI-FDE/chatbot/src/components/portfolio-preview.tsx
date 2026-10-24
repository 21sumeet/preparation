"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  buildPortfolioSrcDoc,
  parsePortfolioFiles,
} from "@/lib/portfolio-preview";

function RefreshIcon() {
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
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function ExpandIcon() {
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
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
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
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 transition-transform ${open ? "" : "-rotate-90"}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PreviewFrame({
  srcDoc,
  reloadKey,
  title,
  className,
}: {
  srcDoc: string;
  reloadKey: number;
  title: string;
  className: string;
}) {
  return (
    <iframe
      key={reloadKey}
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}

export function PortfolioPreview({ content }: { content: string }) {
  const files = useMemo(() => parsePortfolioFiles(content), [content]);
  const srcDoc = useMemo(
    () => (files ? buildPortfolioSrcDoc(files) : ""),
    [files],
  );
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!expanded) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setExpanded(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  if (!files) return null;

  const buttonClass =
    "flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.7rem] font-medium text-slate-400 transition hover:bg-white/10 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60";

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-black/60">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="portfolio-preview-frame"
          className="flex min-w-0 items-center gap-2 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="truncate text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400">
            Live preview
          </span>
          <ChevronIcon open={open} />
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
            aria-label="Reload preview"
            className={buttonClass}
          >
            <RefreshIcon />
            <span className="hidden sm:inline">Reload</span>
          </button>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Open preview full screen"
            className={buttonClass}
          >
            <ExpandIcon />
            <span className="hidden sm:inline">Expand</span>
          </button>
        </div>
      </div>
      {open && (
        <div id="portfolio-preview-frame">
          <PreviewFrame
            srcDoc={srcDoc}
            reloadKey={reloadKey}
            title="Portfolio preview"
            className="h-[520px] w-full bg-white"
          />
        </div>
      )}
      <p className="border-t border-white/10 px-4 py-1.5 text-[0.65rem] text-slate-500">
        Runs in a sandbox. Copy the files below to edit them locally.
      </p>

      {expanded &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 flex flex-col bg-black/90 p-3 backdrop-blur-sm sm:p-6">
            <div className="flex items-center justify-between gap-3 pb-3">
              <span className="text-sm font-semibold tracking-tight text-slate-200">
                Portfolio preview
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReloadKey((key) => key + 1)}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                >
                  <RefreshIcon />
                  Reload
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  aria-label="Close full screen preview"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-white">
              <PreviewFrame
                srcDoc={srcDoc}
                reloadKey={reloadKey}
                title="Portfolio preview full screen"
                className="h-full w-full bg-white"
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
