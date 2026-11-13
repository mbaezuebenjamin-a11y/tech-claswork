import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageRoute } from '../types/blog';

interface AuthLayoutProps {
  mode: 'login' | 'signup';
  onNavigate: (route: PageRoute) => void;
  children: ReactNode;
}

export function AuthLayout({ mode, onNavigate, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#FAF9F7] text-[#111110]">
      {/* Left Column: Architectural Library Photography & Editorial Statement */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#111110] p-12 text-[#FAF9F7]">
        <img
          src="/src/assets/images/auth_editorial_cover_1794571138450.jpg"
          alt="Moody oak library with tall arched windows and warm reading light"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#111110]/92 via-[#111110]/38 to-[#111110]/60"
        />

        <div className="relative z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="font-serif text-3xl font-semibold tracking-tight text-[#FAF9F7] hover:opacity-85 transition-opacity cursor-pointer"
          >
            Vesper
          </button>
          <span className="text-xs tracking-wide text-[#FAF9F7]/80">
            Issue No. 14 · Reader Membership
          </span>
        </div>

        <div className="relative z-10 max-w-md space-y-5">
          <p className="text-xs tracking-wide text-[#D49A74]">
            Culture, Architecture &amp; Table
          </p>
          <blockquote className="font-serif text-3xl sm:text-[2.2rem] leading-snug italic text-[#FAF9F7]">
            “A quiet room, an unhurried table, and prose worth keeping on the shelf.”
          </blockquote>
          <div className="pt-4 border-t border-[#FAF9F7]/20 flex items-center justify-between text-xs text-[#FAF9F7]/75">
            <span>Clara Lindqvist · Editor in Chief</span>
            <span>Copenhagen · Lisbon · Kyoto</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Alabaster Form Canvas */}
      <div className="flex flex-col min-h-screen px-6 sm:px-14 py-8">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#66635E] hover:text-[#111110] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="text-xs text-[#66635E]">
            {mode === 'login' ? (
              <span>
                Need an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="font-medium text-[#111110] underline underline-offset-4 hover:text-[#9A5B32] transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="font-medium text-[#111110] underline underline-offset-4 hover:text-[#9A5B32] transition-colors cursor-pointer"
                >
                  Login
                </button>
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>

        <div className="pt-5 border-t border-[#E4E0D8] flex flex-wrap items-center justify-between gap-3 text-xs text-[#66635E]">
          <span>© 2026 Vesper Journal</span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#111110] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="hover:text-[#111110] transition-colors cursor-pointer"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-[#111110] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
