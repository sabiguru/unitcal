import type { ReactNode } from 'react';

export default function MDXRenderer({ children }: { children: ReactNode }) {
  return <article className="prose prose-sm md:prose max-w-none">{children}</article>;
}