/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { EditorialLayout } from './layouts/EditorialLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ArticleCategory, PageRoute, UserSession } from './types/blog';

const STORAGE_USER_KEY = 'vesper_user_session_v1';
const STORAGE_SAVED_KEY = 'vesper_saved_articles_v1';

function parseLocation(): { route: PageRoute; slug: string | null } {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/blog') return { route: 'blog', slug: null };
  if (path.startsWith('/blog/')) {
    return { route: 'blog', slug: path.slice('/blog/'.length) || null };
  }
  if (path === '/contact') return { route: 'contact', slug: null };
  if (path === '/login') return { route: 'login', slug: null };
  if (path === '/signup') return { route: 'signup', slug: null };
  return { route: 'home', slug: null };
}

function buildPath(route: PageRoute, slug?: string | null): string {
  if (route === 'home') return '/';
  if (route === 'blog') return slug ? `/blog/${slug}` : '/blog';
  return `/${route}`;
}

export default function App() {
  const initial = parseLocation();
  const [route, setRoute] = useState<PageRoute>(initial.route);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initial.slug);
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'All'>('All');
  const [welcomeBanner, setWelcomeBanner] = useState<string | null>(null);

  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USER_KEY);
      return raw ? (JSON.parse(raw) as UserSession) : null;
    } catch {
      return null;
    }
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_KEY);
      return raw ? (JSON.parse(raw) as string[]) : ['art-1'];
    } catch {
      return ['art-1'];
    }
  });

  useEffect(() => {
    const onPopState = () => {
      const next = parseLocation();
      setRoute(next.route);
      setSelectedSlug(next.slug);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextRoute: PageRoute, slug?: string | null) => {
    const nextSlug = nextRoute === 'blog' ? slug ?? null : null;
    const nextPath = buildPath(nextRoute, nextSlug);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setRoute(nextRoute);
    setSelectedSlug(nextSlug);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSelectSlug = (slug: string | null) => {
    navigate('blog', slug);
  };

  const handleAuthSuccess = (session: UserSession) => {
    setUser(session);
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(session));
    } catch {
      // Ignore storage quota errors
    }
    setWelcomeBanner(`Welcome, ${session.name}. Your reader session is active.`);
    navigate('home');
  };

  const handleSignOut = () => {
    setUser(null);
    setWelcomeBanner(null);
    try {
      localStorage.removeItem(STORAGE_USER_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  // Layout 2: Shared Auth Split Layout for Login & Sign Up
  if (route === 'login' || route === 'signup') {
    return (
      <AuthLayout mode={route} onNavigate={(r) => navigate(r)}>
        <motion.div
          key={route}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {route === 'login' ? (
            <LoginPage onSignIn={handleAuthSuccess} onNavigate={(r) => navigate(r)} />
          ) : (
            <SignupPage onSignUp={handleAuthSuccess} onNavigate={(r) => navigate(r)} />
          )}
        </motion.div>
      </AuthLayout>
    );
  }

  // Layout 1: Shared Editorial Layout for Home, Blog, and Contact
  return (
    <EditorialLayout
      currentRoute={route}
      onNavigate={navigate}
      user={user}
      onSignOut={handleSignOut}
    >
      {welcomeBanner && (
        <div className="bg-[#111110] text-[#FAF9F7] border-b border-[#2B2A27]">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-2.5 flex items-center justify-between gap-4 text-xs">
            <span>{welcomeBanner}</span>
            <button
              type="button"
              onClick={() => setWelcomeBanner(null)}
              aria-label="Dismiss welcome message"
              className="p-1 text-[#A39F98] hover:text-[#FAF9F7] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <motion.div
        key={`${route}-${selectedSlug ?? 'list'}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {route === 'home' && (
          <HomePage
            onNavigate={navigate}
            onSelectCategory={setActiveCategory}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {route === 'blog' && (
          <BlogPage
            selectedSlug={selectedSlug}
            onSelectSlug={handleSelectSlug}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            user={user}
          />
        )}

        {route === 'contact' && <ContactPage />}
      </motion.div>
    </EditorialLayout>
  );
}
