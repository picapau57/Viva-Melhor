export type CategoryId = 'culinaria' | 'organizacao' | 'economia' | 'jardinagem' | 'produtividade';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  heroImage: string;
}

export interface ArticleStep {
  title: string;
  description: string;
  tip?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  readTime: string;
  excerpt: string;
  publishDate: string;
  updatedDate?: string;
  author: string;
  authorRole: string;
  heroImage: string;
  imageAlt: string;
  quickAnswer: string;
  introduction: string[];
  materialsOrIngredients?: {
    title: string;
    items: string[];
    servingsOrYield?: string;
    prepTime?: string;
  };
  steps: ArticleStep[];
  practicalTips: string[];
  limitationsAndSafety: string[];
  faq: FAQItem[];
  references: string[];
  tags: string[];
  relatedArticleSlugs: string[];
}

export interface AdSenseSettings {
  publisherId: string;
  isProduction: boolean;
  adsEnabled: boolean;
  testMode: boolean;
  slots: {
    headerBanner: string;
    inArticle: string;
    sidebar: string;
    footerBanner: string;
  };
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  hasConsented: boolean;
}
