import React from 'react';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { Article } from '../types';
import { CATEGORIES } from '../data/categories';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  featured = false,
}) => {
  const categoryInfo = CATEGORIES.find((c) => c.id === article.category);

  return (
    <article
      onClick={() => onSelect(article.slug)}
      className={`group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer ${
        featured ? 'md:grid md:grid-cols-2 md:gap-6' : ''
      }`}
    >
      {/* Imagem do Artigo */}
      <div className={`relative overflow-hidden bg-stone-100 dark:bg-stone-800 ${featured ? 'h-64 md:h-full' : 'h-48'}`}>
        <img
          src={article.heroImage}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase shadow-xs ${
              categoryInfo?.badgeBg || 'bg-stone-100 dark:bg-stone-800'
            } ${categoryInfo?.badgeText || 'text-stone-800 dark:text-stone-200'}`}
          >
            {categoryInfo?.name || article.category}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-2">
          {/* Metadados: Tempo de leitura e data */}
          <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishDate}
            </span>
          </div>

          {/* Título */}
          <h3
            className={`font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 ${
              featured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
            }`}
          >
            {article.title}
          </h3>

          {/* Resumo */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Rodapé do Card: Autor e Link */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1 font-medium text-stone-600 dark:text-stone-300">
            <User className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            {article.author}
          </span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Ler guia <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
