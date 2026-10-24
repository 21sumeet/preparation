import { isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";
import { PortfolioPreview } from "@/components/portfolio-preview";

function renderParagraph({ children }: { children?: ReactNode }) {
  const paragraphChildren = Array.isArray(children) ? children : [children];
  const visibleChildren = paragraphChildren.filter(
    (child) => child !== null && child !== undefined && child !== "",
  );
  const onlyChild = visibleChildren[0];

  if (
    visibleChildren.length === 1 &&
    isValidElement<{ children?: ReactNode }>(onlyChild) &&
    onlyChild.type === "strong"
  ) {
    return (
      <h3 className="mb-2 mt-5 text-base font-semibold text-yellow-100 first:mt-0 sm:text-lg">
        {onlyChild.props.children}
      </h3>
    );
  }

  return (
    <p className="my-3 leading-7 first:mt-0 last:mb-0">
      {children}
    </p>
  );
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-3 mt-6 text-xl font-bold tracking-tight text-yellow-300 first:mt-0 sm:text-2xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-6 border-b border-white/10 pb-2 text-lg font-semibold tracking-tight text-yellow-200 first:mt-0 sm:text-xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-5 text-base font-semibold text-yellow-100 first:mt-0 sm:text-lg">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-2 mt-4 text-sm font-semibold text-yellow-100 sm:text-base">
      {children}
    </h4>
  ),
  p: renderParagraph,
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-1.5 pl-6 marker:text-yellow-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-1.5 pl-6 marker:font-semibold marker:text-yellow-400">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-yellow-100">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-yellow-400/70 pl-4 text-slate-300">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-5 border-white/10" />,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-yellow-300 underline decoration-yellow-400/40 underline-offset-4 hover:text-yellow-200"
    >
      {children}
    </a>
  ),
  pre: CodeBlock,
  code: ({ children }) => (
    <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[0.9em] text-yellow-200">
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-white/10 bg-white/[0.06] px-3 py-2 font-semibold text-yellow-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-white/10 px-3 py-2">{children}</td>
  ),
};

export function AssistantResponse({ content }: { content: string }) {
  return (
    <div className="min-w-0 break-words">
      <PortfolioPreview content={content} />
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
