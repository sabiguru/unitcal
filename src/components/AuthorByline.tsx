import Link from 'next/link';

interface AuthorBylineProps {
  className?: string;
  showAvatar?: boolean;
}

export default function AuthorByline({ className = '', showAvatar = true }: AuthorBylineProps) {
  return (
    <div className={`flex items-center text-sm text-gray-600 ${className}`}>
      {showAvatar && (
        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
          <span className="text-amber-200 text-xs font-bold">BK</span>
        </div>
      )}
      <span>
        By{' '}
        <Link
          href="/about/ben-konna"
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Ben Konna
        </Link>
        , PhD
      </span>
    </div>
  );
}
