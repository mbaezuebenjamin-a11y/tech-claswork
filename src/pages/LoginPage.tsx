import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PageRoute, UserSession } from '../types/blog';

interface LoginPageProps {
  onSignIn: (user: UserSession) => void;
  onNavigate: (route: PageRoute) => void;
}

export function LoginPage({ onSignIn, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    const derivedName = cleanEmail
      .split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    onSignIn({
      name: derivedName || 'Vesper Reader',
      email: cleanEmail,
      joinedAt: 'Reader since 2026',
    });
  };

  const handleDemoFill = () => {
    setEmail('clara@vesperjournal.com');
    setPassword('editorial2026');
    setError('');
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-medium text-[#9A5B32]">Reader Access</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#111110]">
          Login
        </h1>
        <p className="text-sm text-[#66635E] leading-relaxed">
          Sign in to open your saved reading list, leave notes, and access the Sunday archive.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="px-4 py-3 text-xs font-medium text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-md"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="block text-xs font-medium text-[#111110]">
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="block text-xs font-medium text-[#111110]">
              Password
            </label>
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-xs text-[#9A5B32] hover:underline cursor-pointer"
            >
              Fill sample credentials
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-white border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#66635E] hover:text-[#111110] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="inline-flex items-center gap-2 text-xs text-[#66635E] cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#D4CFC7] accent-[#111110]"
            />
            <span>Keep me signed in</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-xs font-medium text-[#FAF9F7] bg-[#111110] rounded-md hover:bg-[#2C2A27] transition-colors cursor-pointer"
        >
          Login
        </button>
      </form>

      <div className="pt-6 border-t border-[#E4E0D8] text-center text-sm text-[#66635E]">
        New to Vesper?{' '}
        <button
          type="button"
          onClick={() => onNavigate('signup')}
          className="font-medium text-[#111110] underline underline-offset-4 hover:text-[#9A5B32] transition-colors cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
