import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-amber-200 font-bold text-sm">CF</span>
              </div>
              <h2 className="text-xl font-bold">Calculator Fort</h2>
            </Link>
            <p className="text-slate-300 text-sm mb-4 max-w-md">
              Your trusted source for fast, accurate online calculators and conversion tools. 
              Mathematics, finance, health, engineering, and more.
            </p>
            <div className="flex space-x-4">
              <span className="text-slate-400 text-sm">Free • Instant • Reliable</span>
            </div>
          </div>

          {/* Calculator Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculator/mathematics" className="text-slate-300 hover:text-white transition-colors">
                  Mathematics & Basic Tools
                </Link>
              </li>
              <li>
                <Link href="/calculator/financial" className="text-slate-300 hover:text-white transition-colors">
                  Financial & Business
                </Link>
              </li>
              <li>
                <Link href="/calculator/health" className="text-slate-300 hover:text-white transition-colors">
                  Health & Fitness
                </Link>
              </li>
              <li>
                <Link href="/calculator/engineering" className="text-slate-300 hover:text-white transition-colors">
                  Engineering & Technology
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-slate-300 hover:text-white transition-colors">
                  All Calculators →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-slate-300 hover:text-white transition-colors">
                  All Calculators
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-slate-400 mb-4 md:mb-0">
              © {currentYear} Calculator Fort. All rights reserved.
            </div>
            <div className="text-sm text-slate-400">
              Making math simple and affordable for everyone
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
