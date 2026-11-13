export type PageRoute = 'home' | 'blog' | 'contact' | 'login' | 'signup';

export type ArticleCategory = 'Architecture' | 'Gastronomy' | 'Craft' | 'Travel';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: ArticleCategory;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  coverAlt: string;
  figureCaption: string;
  featured?: boolean;
  pullQuote: string;
  body: string[];
}

export interface UserSession {
  name: string;
  email: string;
  joinedAt: string;
}
