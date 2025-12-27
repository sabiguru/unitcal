import type { FC } from 'react';

interface MDXContentProps {
  slug: string;
}

const MDXContent: FC<MDXContentProps> = async ({ slug }) => {
  const Content = (await import(`@/content/calculators/${slug}.mdx`)).default;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <article className="mdx-content text-gray-800 leading-relaxed">
        <Content />
      </article>
    </div>
  );
};

export default MDXContent;
