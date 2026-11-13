import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check, Link2, Search, X } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { ArticleCategory, UserSession } from '../types/blog';
import { EditorialImage } from '../components/EditorialImage';

interface ArticleComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface BlogPageProps {
  selectedSlug: string | null;
  onSelectSlug: (slug: string | null) => void;
  activeCategory: ArticleCategory | 'All';
  onSelectCategory: (category: ArticleCategory | 'All') => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  user: UserSession | null;
}

const CATEGORIES: (ArticleCategory | 'All')[] = [
  'All',
  'Architecture',
  'Gastronomy',
  'Craft',
  'Travel',
];

const COMMENTS_STORAGE_KEY = 'vesper_article_comments_v1';

export function BlogPage({
  selectedSlug,
  onSelectSlug,
  activeCategory,
  onSelectCategory,
  savedIds,
  onToggleSave,
  user,
}: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'quickest'>('newest');
  const [readProgress, setReadProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentsMap, setCommentsMap] = useState<Record<string, ArticleComment[]>>(() => {
    try {
      const raw = localStorage.getItem(COMMENTS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, ArticleComment[]>) : {};
    } catch {
      return {};
    }
  });

  const selectedArticle = useMemo(
    () => (selectedSlug ? ARTICLES.find((a) => a.slug === selectedSlug) ?? null : null),
    [selectedSlug]
  );

  // Track scroll depth inside Article Reader view
  useEffect(() => {
    if (!selectedArticle) {
      setReadProgress(0);
      return;
    }

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadProgress(100);
        return;
      }
      const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      setReadProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedArticle]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === 'All' || article.category === activeCategory;
      const matchesSaved = !showSavedOnly || savedIds.includes(article.id);
      const matchesQuery =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);
      return matchesCategory && matchesSaved && matchesQuery;
    });

    if (sortOrder === 'quickest') {
      return [...filtered].sort(
        (a, b) => parseInt(a.readTime, 10) - parseInt(b.readTime, 10)
      );
    }
    return filtered;
  }, [activeCategory, showSavedOnly, savedIds, searchQuery, sortOrder]);

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Clipboard fallback in restricted frames
    }
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedArticle) return;

    const authorName = user?.name || commentAuthor.trim();
    if (!authorName) {
      setCommentError('Please enter your name or login to post a note.');
      return;
    }
    if (commentText.trim().length < 5) {
      setCommentError('Please write a brief note (at least 5 characters).');
      return;
    }

    const newComment: ArticleComment = {
      id: `cmt-${Date.now()}`,
      author: authorName,
      text: commentText.trim(),
      createdAt: 'Just now',
    };

    const existing = commentsMap[selectedArticle.id] ?? [];
    const updated = {
      ...commentsMap,
      [selectedArticle.id]: [newComment, ...existing],
    };
    setCommentsMap(updated);
    try {
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
    setCommentText('');
    setCommentError('');
  };

  // Article Reader View
  if (selectedArticle) {
    const currentIndex = ARTICLES.findIndex((a) => a.id === selectedArticle.id);
    const nextArticle = ARTICLES[(currentIndex + 1) % ARTICLES.length];
    const isSaved = savedIds.includes(selectedArticle.id);
    const articleComments = commentsMap[selectedArticle.id] ?? [];

    return (
      <div>
        {/* Thin sticky reading progress indicator */}
        <div
          aria-hidden="true"
          className="fixed top-16 left-0 right-0 z-30 h-[2px] bg-transparent pointer-events-none"
        >
          <div
            className="h-full bg-[#9A5B32] transition-[width] duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        <article className="max-w-[1060px] mx-auto px-5 sm:px-8 pt-10 pb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E4E0D8]">
            <button
              type="button"
              onClick={() => onSelectSlug(null)}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#66635E] hover:text-[#111110] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border border-[#D4CFC7] bg-white text-[#111110] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#9A5B32]" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(selectedArticle.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#111110] text-[#FAF9F7] border-[#111110]'
                    : 'bg-white text-[#111110] border-[#D4CFC7] hover:bg-[#F2EFE9]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                <span>{isSaved ? 'Saved' : 'Save Essay'}</span>
              </button>
            </div>
          </div>

          <header className="max-w-3xl mx-auto text-center pt-12 pb-10 space-y-5">
            <div className="flex items-center justify-center gap-2 text-xs text-[#66635E]">
              <span className="font-medium text-[#9A5B32]">{selectedArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.06] text-[#111110]">
              {selectedArticle.title}
            </h1>

            <p className="text-base sm:text-lg text-[#66635E] leading-relaxed">
              {selectedArticle.subtitle}
            </p>

            <div className="pt-2 text-xs text-[#66635E]">
              Written by <span className="font-medium text-[#111110]">{selectedArticle.author}</span>{' '}
              <span aria-hidden="true">·</span> {selectedArticle.authorRole}
            </div>
          </header>

          <figure className="mb-14">
            <EditorialImage
              src={selectedArticle.coverImage}
              alt={selectedArticle.coverAlt}
              aspectClass="aspect-[16/9]"
              className="rounded-xl"
            />
            <figcaption className="mt-3 text-xs font-serif italic text-[#66635E]">
              {selectedArticle.figureCaption}
            </figcaption>
          </figure>

          <div className="max-w-[65ch] mx-auto space-y-7 text-[17px] leading-[1.82] text-[#262523]">
            {selectedArticle.body.map((paragraph, idx) => (
              <div key={idx} className="space-y-7">
                <p className={idx === 0 ? 'editorial-dropcap' : ''}>{paragraph}</p>
                {idx === 1 && (
                  <blockquote className="my-10 py-8 border-y border-[#E4E0D8] font-serif text-2xl sm:text-[1.85rem] italic leading-snug text-[#111110] text-center">
                    “{selectedArticle.pullQuote}”
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Reader Notes / Comments */}
          <section className="max-w-[65ch] mx-auto mt-16 pt-10 border-t border-[#E4E0D8] space-y-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl font-normal text-[#111110]">
                Reader Notes
              </h2>
              <span className="text-xs text-[#66635E] tabular-nums">
                {articleComments.length} {articleComments.length === 1 ? 'note' : 'notes'}
              </span>
            </div>

            <form onSubmit={handleAddComment} noValidate className="space-y-3 bg-[#F2EFE9] p-5 rounded-xl border border-[#E4E0D8]">
              {!user && (
                <div>
                  <label htmlFor="comment-author" className="sr-only">
                    Your Name
                  </label>
                  <input
                    id="comment-author"
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
                  />
                </div>
              )}

              <div>
                <label htmlFor="comment-body" className="sr-only">
                  Leave a reader note
                </label>
                <textarea
                  id="comment-body"
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={
                    user
                      ? `Share a reflection as ${user.name}...`
                      : 'Leave a reflection on this essay...'
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110] resize-y"
                />
              </div>

              {commentError && <p className="text-xs text-[#991B1B]">{commentError}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-[#FAF9F7] bg-[#111110] rounded-md hover:bg-[#2C2A27] transition-colors cursor-pointer"
                >
                  Post Note
                </button>
              </div>
            </form>

            {articleComments.length > 0 && (
              <div className="divide-y divide-[#E4E0D8]">
                {articleComments.map((comment) => (
                  <div key={comment.id} className="py-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#111110]">{comment.author}</span>
                      <span className="text-[#8A867F]">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-[#45433E] leading-relaxed">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="max-w-[65ch] mx-auto mt-14 pt-10 border-t border-[#E4E0D8]">
            <p className="text-xs font-medium text-[#9A5B32] mb-4">Continue Reading</p>
            <button
              type="button"
              onClick={() => onSelectSlug(nextArticle.slug)}
              className="w-full p-6 rounded-xl bg-[#F2EFE9] border border-[#E4E0D8] hover:border-[#111110]/30 transition-colors flex items-center justify-between gap-6 text-left group cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="text-xs text-[#66635E]">
                  <span className="font-medium text-[#9A5B32]">{nextArticle.category}</span> ·{' '}
                  {nextArticle.readTime}
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#111110] group-hover:text-[#9A5B32] transition-colors">
                  {nextArticle.title}
                </h3>
              </div>
              <ArrowRight className="w-5 h-5 text-[#111110] group-hover:text-[#9A5B32] group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          </div>
        </article>
      </div>
    );
  }

  const showLeadBanner =
    activeCategory === 'All' &&
    !searchQuery.trim() &&
    !showSavedOnly &&
    sortOrder === 'newest' &&
    filteredArticles.length > 0;
  const leadPost = showLeadBanner ? filteredArticles[0] : null;
  const gridPosts = showLeadBanner ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-12 pb-20">
      <header className="max-w-3xl space-y-3 pb-10 border-b border-[#E4E0D8]">
        <p className="text-xs font-medium text-[#9A5B32]">All Dispatches</p>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#111110]">
          The Blog Archive
        </h1>
        <p className="text-base text-[#66635E] leading-relaxed">
          Seasonal essays, studio monographs, culinary rituals, and quiet travel notes.
        </p>
      </header>

      {/* Filter, Sort & Search Toolbar */}
      <div className="py-7 flex flex-col xl:flex-row xl:items-center justify-between gap-5 border-b border-[#E4E0D8]">
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            role="tablist"
            aria-label="Filter stories by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#111110] text-[#FAF9F7] shadow-xs'
                      : 'text-[#66635E] hover:text-[#111110]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setShowSavedOnly((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
              showSavedOnly
                ? 'bg-[#9A5B32] text-[#FAF9F7] border-[#9A5B32]'
                : 'bg-white text-[#66635E] border-[#E4E0D8] hover:text-[#111110]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" fill={showSavedOnly ? 'currentColor' : 'none'} />
            <span>Saved ({savedIds.length})</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label htmlFor="blog-sort" className="sr-only">
            Sort essays
          </label>
          <select
            id="blog-sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'quickest')}
            className="px-3.5 py-2.5 text-xs font-medium bg-white border border-[#E4E0D8] rounded-md text-[#111110] focus:outline-none focus:border-[#111110] cursor-pointer"
          >
            <option value="newest">Sort: Latest First</option>
            <option value="quickest">Sort: Quickest Read</option>
          </select>

          <div className="relative w-full sm:w-68">
            <Search className="w-4 h-4 text-[#8A867F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays or authors..."
              aria-label="Search blog posts"
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#E4E0D8] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8A867F] hover:text-[#111110] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6 pb-8 text-xs text-[#66635E] tabular-nums">
        Showing {filteredArticles.length} of {ARTICLES.length} essays
      </div>

      {/* Lead Horizontal Feature Banner */}
      {leadPost && (
        <article className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#F2EFE9] border border-[#E4E0D8] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => onSelectSlug(leadPost.slug)}
            className="lg:col-span-7 group block overflow-hidden cursor-pointer"
          >
            <img
              src={leadPost.coverImage}
              alt={leadPost.coverAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full min-h-[280px] max-h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </button>

          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-[#66635E]">
                  <span className="font-medium text-[#9A5B32]">{leadPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadPost.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadPost.readTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleSave(leadPost.id)}
                  aria-label="Save lead story"
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    savedIds.includes(leadPost.id)
                      ? 'text-[#9A5B32] bg-[#9A5B32]/10'
                      : 'text-[#66635E] hover:text-[#111110]'
                  }`}
                >
                  <Bookmark
                    className="w-4 h-4"
                    fill={savedIds.includes(leadPost.id) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onSelectSlug(leadPost.slug)}
                className="text-left space-y-3 cursor-pointer group"
              >
                <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#111110] group-hover:text-[#9A5B32] transition-colors">
                  {leadPost.title}
                </h2>
                <p className="text-sm text-[#66635E] leading-relaxed">{leadPost.excerpt}</p>
              </button>
            </div>

            <div className="pt-4 border-t border-[#DFDBD2] flex items-center justify-between text-xs text-[#66635E]">
              <span>By {leadPost.author}</span>
              <button
                type="button"
                onClick={() => onSelectSlug(leadPost.slug)}
                className="inline-flex items-center gap-1.5 font-medium text-[#111110] hover:text-[#9A5B32] transition-colors cursor-pointer"
              >
                <span>Read Feature</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>
      )}

      {/* Archive Grid or Empty State */}
      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center bg-[#F2EFE9] border border-[#E4E0D8] rounded-xl px-6 space-y-4">
          <p className="font-serif text-3xl text-[#111110]">No essays match your current filter.</p>
          <p className="text-sm text-[#66635E]">
            Try clearing your search term or switching back to all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setShowSavedOnly(false);
              setSortOrder('newest');
              onSelectCategory('All');
            }}
            className="px-5 py-2.5 text-xs font-medium text-[#FAF9F7] bg-[#111110] rounded-md hover:bg-[#2C2A27] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {gridPosts.map((article) => {
            const isSaved = savedIds.includes(article.id);
            return (
              <article key={article.id} className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => onSelectSlug(article.slug)}
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
                  onClick={() => onSelectSlug(article.slug)}
                  className="text-left space-y-2 cursor-pointer"
                >
                  <h2 className="font-serif text-2xl font-normal leading-snug text-[#111110] group-hover:text-[#9A5B32] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#66635E] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </button>

                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[#66635E]">
                  <span>By {article.author}</span>
                  <button
                    type="button"
                    onClick={() => onSelectSlug(article.slug)}
                    className="font-medium text-[#111110] group-hover:text-[#9A5B32] transition-colors cursor-pointer"
                  >
                    Read essay →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
