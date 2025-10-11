'use client';

import dynamic from 'next/dynamic';

interface MDXContentProps {
  slug: string;
}

export default function MDXContent({ slug }: MDXContentProps) {
  const MdxComponent = dynamic(() => import(`@/content/calculators/${slug}.mdx`), { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-32 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading content...</div>
      </div>
    )
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <article className="mdx-content text-gray-800 leading-relaxed">
        <MdxComponent />
      </article>
    </div>
  );
}