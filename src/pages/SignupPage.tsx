import { FormEvent, useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PageRoute, UserSession } from '../types/blog';

interface SignupPageProps {
  onSignUp: (user: UserSession) => void;
  onNavigate: (route: PageRoute) => void;
}

export function SignupPage({ onSignUp, onNavigate }: SignupPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  const strength = useMemo(() => {
    if (!password) return { level: 0, label: '' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10 || /[0-9]/.test(password)) score += 1;
    if (/[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1;
    if (score <= 1) return { level: 1, label: 'Weak' };
    if (score === 2) return { level: 2, label: 'Fair' };
    return { level: 3, label: 'Strong' };
  }, [password]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Please choose a password of at least 6 characters.');
      return;
    }
    if (!agreed) {
      setError('Please accept the reader membership checkbox to continue.');
      return;
    }

    setError('');
    onSignUp({
      name: fullName.trim(),
      email: email.trim(),
      joinedAt: 'Joined November 2026',
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-medium text-[#9A5B32]">Reader Membership</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#111110]">
          Sign Up
        </h1>
        <p className="text-sm text-[#66635E] leading-relaxed">
          Join Vesper to bookmark essays, leave reader notes, and receive Sunday letters.
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
          <label htmlFor="signup-name" className="block text-xs font-medium text-[#111110]">
            Full Name
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Arthur Vance"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="block text-xs font-medium text-[#111110]">
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="arthur@studio.com"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-password" className="block text-xs font-medium text-[#111110]">
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
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

          {password.length > 0 && (
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1 rounded-full transition-colors ${
                      strength.level >= step
                        ? strength.level === 1
                          ? 'bg-[#991B1B]'
                          : strength.level === 2
                          ? 'bg-[#9A5B32]'
                          : 'bg-[#1F4E46]'
                        : 'bg-[#E4E0D8]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium text-[#66635E] tabular-nums">
                {strength.label}
              </span>
            </div>
          )}
        </div>

        <div className="pt-1">
          <label className="inline-flex items-start gap-2.5 text-xs text-[#66635E] cursor-pointer leading-relaxed">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[#D4CFC7] accent-[#111110]"
            />
            <span>
              I agree to receive Sunday editorial dispatches and accept reader terms.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-xs font-medium text-[#FAF9F7] bg-[#111110] rounded-md hover:bg-[#2C2A27] transition-colors cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      <div className="pt-6 border-t border-[#E4E0D8] text-center text-sm text-[#66635E]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="font-medium text-[#111110] underline underline-offset-4 hover:text-[#9A5B32] transition-colors cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
