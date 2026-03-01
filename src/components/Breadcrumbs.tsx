import Link from 'next/link';
import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  canonicalUrl?: string; // Full canonical URL for the current page (used in JSON-LD)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      // For the current page, use canonicalUrl if provided, otherwise use href
      let itemUrl: string | undefined;
      if (item.canonicalUrl) {
        itemUrl = item.canonicalUrl;
      } else if (item.href) {
        itemUrl = `https://calcfort.com${item.href}`;
      }

      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        ...(itemUrl && { "item": itemUrl })
      };
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`bg-gray-50 border-b border-gray-200 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex text-sm text-gray-600">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center"
              >
                {item.href && !item.current ? (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={item.current ? 'text-gray-900 font-medium' : 'text-gray-600'}
                  >
                    {item.label}
                  </span>
                )}
                {index < items.length - 1 && (
                  <svg
                    className="w-5 h-5 text-gray-400 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}