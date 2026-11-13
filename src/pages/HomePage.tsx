import { FormEvent, useState } from 'react';
import { ArrowRight, ArrowUpRight, Bookmark, Check } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { ArticleCategory, PageRoute } from '../types/blog';
import { EditorialImage } from '../components/EditorialImage';

interface HomePageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
  onSelectCategory: (category: ArticleCategory | 'All') => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export function HomePage({
  onNavigate,
  onSelectCategory,
  savedIds,
  onToggleSave,
}: HomePageProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const leadArticle = ARTICLES[0];
  const indexArticles = ARTICLES.slice(1, 4);
  const gridArticles = ARTICLES.slice(1, 4);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
  };

  const departments: {
    num: string;
    category: ArticleCategory;
    summary: string;
    count: number;
  }[] = [
    {
      num: '01',
      category: 'Architecture',
      summary: 'Daylight geometry, tactile stone studios, and residential sanctuaries.',
      count: ARTICLES.filter((a) => a.category === 'Architecture').length,
    },
    {
      num: '02',
      category: 'Gastronomy',
      summary: 'Wild fermentation, heritage grain milling, and unhurried table rituals.',
      count: ARTICLES.filter((a) => a.category === 'Gastronomy').length,
    },
    {
      num: '03',
      category: 'Craft',
      summary: 'Independent binderies, hand-set letterpress, and enduring analog tools.',
      count: ARTICLES.filter((a) => a.category === 'Craft').length,
    },
    {
      num: '04',
      category: 'Travel',
      summary: 'Coastal off-season diaries, island bakeries, and quiet regional stays.',
      count: ARTICLES.filter((a) => a.category === 'Travel').length,
    },
  ];

  return (
    <div>
      {/* Section 1: Monumental Editorial Masthead & Asymmetric Hero Spread */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E4E0D8] text-xs text-[#66635E]">
          <div className="flex items-center gap-2.5">
            <span className="font-medium text-[#9A5B32]">Issue No. 14</span>
            <span aria-hidden="true">·</span>
            <span>Autumn / Winter Edition</span>
          </div>
          <span>Architecture · Gastronomy · Craft · Travel</span>
        </div>

        <div className="py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.02] tracking-tight text-[#111110]">
              The Art of Unhurried Living &amp; Considered Spaces.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2 space-y-4">
            <p className="text-sm sm:text-base text-[#66635E] leading-relaxed">
              Long-form essays and documentary photography exploring quiet architecture,
              artisan craft, and the rituals around the table.
            </p>
            <div className="flex items-center gap-5 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  onNavigate('blog');
                }}
                className="inline-flex items-center gap-1.5 text-[#111110] hover:text-[#9A5B32] transition-colors cursor-pointer"
              >
                <span>Browse Blog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 text-[#66635E] hover:text-[#111110] transition-colors cursor-pointer"
              >
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        </div>

        {/* 12-Col Hero Visual + Obsidian Curated Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8">
            <button
              type="button"
              onClick={() => onNavigate('blog', leadArticle.slug)}
              className="group relative block w-full h-full min-h-[360px] lg:min-h-[520px] overflow-hidden rounded-xl bg-[#111110] text-left cursor-pointer"
            >
              <img
                src={leadArticle.coverImage}
                alt={leadArticle.coverAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#111110]/90 via-[#111110]/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-2.5 max-w-xl">
                  <div className="flex items-center gap-2 text-xs text-[#E4D5C7]">
                    <span>Lead Feature</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadArticle.readTime}</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight text-[#FAF9F7]">
                    {leadArticle.title}
                  </h2>
                  <p className="text-xs text-[#E4D5C7]/85">
                    By {leadArticle.author} · {leadArticle.publishedAt}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#111110] bg-[#FAF9F7] rounded-md group-hover:bg-[#E4E0D8] transition-colors whitespace-nowrap shrink-0">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          </div>

          <aside className="lg:col-span-4 bg-[#111110] text-[#FAF9F7] rounded-xl p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#2B2A27]">
                <span className="text-xs font-medium tracking-wide text-[#D49A74]">
                  Curated Index
                </span>
                <span className="text-xs text-[#8A867F]">Vol. XIV</span>
              </div>

              <div className="divide-y divide-[#2B2A27]">
                {indexArticles.map((article, idx) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => onNavigate('blog', article.slug)}
                    className="w-full py-5 text-left group flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-[#8A867F]">
                        <span className="tabular-nums text-[#D49A74]">0{idx + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-serif text-xl font-normal leading-snug text-[#FAF9F7] group-hover:text-[#D49A74] transition-colors">
                        {article.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8A867F] group-hover:text-[#D49A74] transition-colors shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#2B2A27]">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  onNavigate('blog');
                }}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#FAF9F7] hover:text-[#D49A74] transition-colors cursor-pointer"
              >
                <span>Open Blog Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Section 2: Selected Dispatches (3-Column Gallery Grid) */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16 border-t border-[#E4E0D8]">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[#9A5B32]">Recent Essays</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#111110]">
              Selected Dispatches
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectCategory('All');
              onNavigate('blog');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#111110] hover:text-[#9A5B32] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {gridArticles.map((article) => {
            const isSaved = savedIds.includes(article.id);
            return (
              <article key={article.id} className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => onNavigate('blog', article.slug)}
                  className="block w-full text-left cursor-pointer mb-5"
                >
                  <EditorialImage
                    src={article.coverImage}
                    alt={article.coverAlt}
                    className="rounded-lg"
                    aspectClass="aspect-[4/3]"
                  />
                </button>

                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#66635E]">
                    <span className="font-medium text-[#9A5B32]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleSave(article.id)}
                    aria-label={isSaved ? `Remove ${article.title} from saved` : `Save ${article.title}`}
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      isSaved
                        ? 'text-[#9A5B32] bg-[#9A5B32]/10'
                        : 'text-[#66635E] hover:text-[#111110] hover:bg-[#F2EFE9]'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('blog', article.slug)}
                  className="text-left space-y-2 cursor-pointer"
                >
                  <h3 className="font-serif text-2xl font-normal leading-snug text-[#111110] group-hover:text-[#9A5B32] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#66635E] leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </button>

                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[#66635E]">
                  <span>By {article.author}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('blog', article.slug)}
                    className="font-medium text-[#111110] group-hover:text-[#9A5B32] transition-colors cursor-pointer"
                  >
                    Read story →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: Full-Bleed Dark Obsidian Editorial Departments Band */}
      <section className="bg-[#111110] text-[#FAF9F7] my-6">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-medium text-[#D49A74]">Editorial Focus</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-[1.08] text-[#FAF9F7]">
                Four lenses on enduring craft and quiet culture.
              </h2>
              <p className="text-sm sm:text-base text-[#A39F98] leading-relaxed">
                Rather than chasing daily headlines, Vesper commissions seasonal monographs
                across four interconnected disciplines. Select a column to enter the blog.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#2C2B29] border-t border-b border-[#2C2B29]">
              {departments.map((dept) => (
                <button
                  key={dept.category}
                  type="button"
                  onClick={() => {
                    onSelectCategory(dept.category);
                    onNavigate('blog');
                  }}
                  className="w-full py-6 flex items-center justify-between gap-6 text-left group cursor-pointer"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-xs font-medium tabular-nums text-[#D49A74]">
                      {dept.num}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF9F7] group-hover:text-[#D49A74] transition-colors">
                          {dept.category}
                        </h3>
                        <span className="text-xs text-[#8A867F] tabular-nums">
                          {dept.count} {dept.count === 1 ? 'essay' : 'essays'}
                        </span>
                      </div>
                      <p className="text-sm text-[#A39F98]">{dept.summary}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#8A867F] group-hover:text-[#D49A74] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Split Photographic Newsletter Feature */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch overflow-hidden rounded-xl border border-[#E4E0D8] bg-[#F2EFE9]">
          <div className="lg:col-span-6 min-h-[280px]">
            <img
              src="/src/assets/images/article_culinary_ritual_1794571137801.jpg"
              alt="Sourdough loaf, stoneware bowls, and rosemary olive oil on limestone table"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-medium text-[#9A5B32]">Weekly Correspondence</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#111110]">
                The Sunday Letter
              </h2>
              <p className="text-sm sm:text-base text-[#66635E] leading-relaxed max-w-md">
                Receive one thoughtfully edited dispatch each Sunday morning—new essays,
                studio visits, and seasonal table notes.
              </p>
            </div>

            {subscribed ? (
              <div className="inline-flex items-center gap-3 p-4 rounded-lg bg-white border border-[#E4E0D8] text-sm text-[#111110]">
                <Check className="w-4 h-4 text-[#9A5B32] shrink-0" />
                <span>
                  Subscribed. Your first Sunday Letter arrives this weekend.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="space-y-2.5 max-w-md">
                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="vesper-newsletter" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="vesper-newsletter"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="you@domain.com"
                    className="flex-1 px-4 py-3 text-sm bg-white border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-xs font-medium text-[#FAF9F7] bg-[#111110] rounded-md hover:bg-[#2C2A27] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                {emailError && <p className="text-xs text-[#991B1B]">{emailError}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
