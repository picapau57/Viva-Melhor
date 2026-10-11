import React, { useState } from 'react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { ArrowLeft, Tag } from 'lucide-react';

interface CategoryPageProps {
  categoryId: CategoryId;
  onNavigate: (path: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  onNavigate,
  onSelectArticle,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('Todas');

  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const categoryArticles = ARTICLES.filter((a) => a.category === category.id);

  // Tags disponíveis nesta categoria
  const allTags = Array.from(new Set(categoryArticles.flatMap((a) => a.tags)));

  const filteredArticles = selectedTag === 'Todas'
    ? categoryArticles
    : categoryArticles.filter((a) => a.tags.includes(selectedTag));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Botão Voltar */}
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar à Página Inicial
      </button>

      {/* Banner da Categoria */}
      <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white min-h-[220px] flex items-center p-6 sm:p-10 shadow-lg">
        <img
          src={category.heroImage}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span
            className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide inline-block ${category.badgeBg} ${category.badgeText}`}
          >
            Seção Editorial
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
            {category.longDesc}
          </p>
        </div>
      </div>

      {/* Espaço Publicitário - Header Banner Categoria */}
      <div className="max-w-4xl mx-auto">
        <AdSenseBanner slotType="headerBanner" format="horizontal" />
      </div>

      {/* Filtro por Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-stone-600 dark:text-stone-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Tópicos:
          </span>
          <button
            onClick={() => setSelectedTag('Todas')}
            className={`px-3 py-1.5 rounded-full font-medium transition ${
              selectedTag === 'Todas'
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300'
            }`}
          >
            Todos ({categoryArticles.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-full font-medium transition ${
                selectedTag === tag
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid de Artigos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onSelect={onSelectArticle}
          />
        ))}
      </div>

      {/* Espaço Publicitário - Rodapé Categoria */}
      <div className="max-w-4xl mx-auto pt-6">
        <AdSenseBanner slotType="footerBanner" format="horizontal" />
      </div>
    </div>
  );
};
