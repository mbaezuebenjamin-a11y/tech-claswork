import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute, UserSession } from '../types/blog';

interface EditorialLayoutProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, slug?: string) => void;
  user: UserSession | null;
  onSignOut: () => void;
  children: ReactNode;
}

export function EditorialLayout({
  currentRoute,
  onNavigate,
  user,
  onSignOut,
  children,
}: EditorialLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  const navLinkClass = (active: boolean) =>
    `relative py-1 text-[13px] font-medium tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
      active
        ? 'text-[#111110] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9A5B32]'
        : 'text-[#66635E] hover:text-[#111110]'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#111110]">
      <header className="sticky top-0 z-40 bg-[#FAF9F7]/92 backdrop-blur-md border-b border-[#E4E0D8]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="font-serif text-[1.75rem] font-semibold tracking-tight text-[#111110] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111110]"
          >
            Vesper
          </button>

          {/* Zone 2: Exact concise single-line page links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8"
          >
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={navLinkClass(currentRoute === 'home')}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNav('blog')}
              className={navLinkClass(currentRoute === 'blog')}
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className={navLinkClass(currentRoute === 'contact')}
            >
              Contact
            </button>
            {user ? (
              <span className="text-[13px] font-medium text-[#66635E] whitespace-nowrap shrink-0">
                {user.name}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleNav('login')}
                className={navLinkClass(currentRoute === 'login')}
              >
                Login
              </button>
            )}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <button
                type="button"
                onClick={onSignOut}
                className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-[#111110] border border-[#D4CFC7] rounded-md hover:bg-[#F2EFE9] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110]"
              >
                Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNav('signup')}
                className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-[#FAF9F7] bg-[#111110] rounded-md hover:bg-[#2C2A27] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110]"
              >
                Sign Up
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#111110] rounded-md hover:bg-[#F2EFE9] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E4E0D8] bg-[#FAF9F7] px-5 py-4 space-y-2">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="block w-full text-left py-2.5 text-sm font-medium text-[#111110] border-b border-[#E4E0D8]/70"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNav('blog')}
              className="block w-full text-left py-2.5 text-sm font-medium text-[#111110] border-b border-[#E4E0D8]/70"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="block w-full text-left py-2.5 text-sm font-medium text-[#111110] border-b border-[#E4E0D8]/70"
            >
              Contact
            </button>
            {user ? (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-sm text-[#66635E]">Signed in as {user.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="px-4 py-2 text-xs font-medium text-[#111110] border border-[#D4CFC7] rounded-md"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleNav('login')}
                  className="flex-1 py-2.5 text-xs font-medium text-[#111110] border border-[#D4CFC7] rounded-md text-center"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('signup')}
                  className="flex-1 py-2.5 text-xs font-medium text-[#FAF9F7] bg-[#111110] rounded-md text-center"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[#111110] text-[#FAF9F7] mt-16">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2C2B29]">
            <div className="md:col-span-5 space-y-4">
              <button
                type="button"
                onClick={() => handleNav('home')}
                className="font-serif text-3xl font-medium tracking-tight text-[#FAF9F7] cursor-pointer"
              >
                Vesper
              </button>
              <p className="text-sm text-[#A39F98] leading-relaxed max-w-sm">
                An independent editorial blog examining contemporary architecture, wild
                fermentation, analog craft, and slow regional travel.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-xs font-medium tracking-wider text-[#D49A74]">
                Pages
              </p>
              <ul className="space-y-2.5 text-sm text-[#C7C3BC]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('home')}
                    className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('blog')}
                    className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('contact')}
                    className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-medium tracking-wider text-[#D49A74]">
                Account
              </p>
              <ul className="space-y-2.5 text-sm text-[#C7C3BC]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('login')}
                    className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('signup')}
                    className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-medium tracking-wider text-[#D49A74]">
                Desks
              </p>
              <ul className="space-y-2.5 text-sm text-[#C7C3BC]">
                <li>Copenhagen</li>
                <li>Lisbon</li>
                <li>Kyoto</li>
              </ul>
            </div>
          </div>

          <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8A867F]">
            <span>© 2026 Vesper Journal. All rights reserved.</span>
            <span>Issue No. 14 · Autumn / Winter Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
