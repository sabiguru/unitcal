'use client';

import dynamic from 'next/dynamic';

interface LearnMDXContentProps {
  slug: string;
}

export default function LearnMDXContent({ slug }: LearnMDXContentProps) {
  const MdxComponent = dynamic(() => import(`@/learn/calculators/${slug}.mdx`), {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-32 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading content...</div>
      </div>
    )
  });

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <article className="learn-mdx-content text-gray-800 leading-relaxed p-8">
        <MdxComponent />
      </article>
    </div>
  );
}