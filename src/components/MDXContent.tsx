'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

interface MDXContentProps {
  slug: string;
}

export default function MDXContent({ slug }: MDXContentProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const MdxComponent = dynamic(() => import(`@/content/calculators/${slug}.mdx`), { 
    ssr: true,
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-32 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading content...</div>
      </div>
    )
  });

  useEffect(() => {
    const article = containerRef.current;
    if (!article) return;

    const normalizeHeadingText = (text: string) => {
      // Many calculator headings append " - Title" or " — Title"; strip the suffix for stable anchors
      if (text.includes('—')) return text.split('—')[0].trim();
      if (text.includes(' - ')) return text.split(' - ')[0].trim();
      return text;
    };

    const slugify = (text: string) =>
      normalizeHeadingText(text)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    const applyHeadingIds = () => {
      const headings = article.querySelectorAll('h1, h2, h3, h4');
      headings.forEach((heading) => {
        if (!heading.id) {
          const text = heading.textContent || '';
          const id = slugify(text);
          if (id) heading.id = id;
        }
      });
    };

    const scrollToHash = () => {
      if (!window.location.hash) return;
      const target = article.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor || !anchor.hash) return;
      const destination = article.querySelector(anchor.hash);
      if (destination) {
        event.preventDefault();
        history.replaceState(null, '', anchor.hash);
        destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    applyHeadingIds();
    scrollToHash();

    // Watch for async MDX render and re-apply IDs when content changes
    observerRef.current = new MutationObserver(() => {
      applyHeadingIds();
      scrollToHash();
    });
    observerRef.current.observe(article, { childList: true, subtree: true });

    article.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      observerRef.current?.disconnect();
      article.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [slug]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <article ref={containerRef} className="mdx-content text-gray-800 leading-relaxed">
        <MdxComponent />
      </article>
    </div>
  );
}
