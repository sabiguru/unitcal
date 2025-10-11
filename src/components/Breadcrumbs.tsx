import Link from 'next/link';
import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`bg-gray-50 border-b border-gray-200 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol 
          className="flex text-sm text-gray-600" 
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => (
            <li 
              key={index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item.href && !item.current ? (
                <Link 
                  href={item.href} 
                  className="hover:text-blue-600 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span 
                  className={item.current ? 'text-gray-900 font-medium' : 'text-gray-600'}
                  itemProp="name"
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={(index + 1).toString()} />
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
  );
}