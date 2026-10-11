import React, { useState } from 'react';
import { Article } from '../types';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { NewsletterCapture } from '../components/NewsletterCapture';
import {
  Clock,
  Calendar,
  User,
  ShieldAlert,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Share2,
  Check,
  Tag,
} from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onNavigate: (path: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onNavigate,
  onSelectArticle,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const categoryInfo = CATEGORIES.find((c) => c.id === article.category);

  // Artigos Relacionados Reais
  const relatedArticles = ARTICLES.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Breadcrumb de Navegação Acessível */}
      <nav aria-label="Navegação estrutural" className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
        >
          Início
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate(`/categoria/${article.category}`)}
          className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
        >
          {categoryInfo?.name || article.category}
        </button>
        <span>/</span>
        <span className="text-stone-500 dark:text-stone-400 truncate max-w-xs">{article.title}</span>
      </nav>

      {/* 2. Cabeçalho do Artigo */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate(`/categoria/${article.category}`)}
            className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
              categoryInfo?.badgeBg || 'bg-stone-100 dark:bg-stone-800'
            } ${categoryInfo?.badgeText || 'text-stone-800 dark:text-stone-200'}`}
          >
            {categoryInfo?.name}
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-md text-xs font-medium transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            {copiedLink ? 'Link Copiado!' : 'Compartilhar'}
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          {article.title}
        </h1>

        {/* Metadados Editoriais Transparentes */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pb-2 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span className="font-semibold text-stone-800 dark:text-stone-200">{article.author}</span>
            <span className="text-stone-500 dark:text-stone-400">({article.authorRole})</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Publicado em: {article.publishDate}</span>
          </div>
          {article.updatedDate && (
            <div className="text-stone-500 dark:text-stone-400">
              • Atualizado em: {article.updatedDate}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* 3. Imagem Principal com Alt Descritivo */}
      <figure className="rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-xs">
        <img
          src={article.heroImage}
          alt={article.imageAlt}
          className="w-full max-h-[460px] object-cover"
        />
        <figcaption className="p-2.5 text-center text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-900/60 border-t border-stone-100 dark:border-stone-800">
          {article.imageAlt} — Fotografia ilustrativa para o guia prático.
        </figcaption>
      </figure>

      {/* 4. Resposta Objetiva Rápida (Destaque para SEO e Usuário) */}
      <section
        aria-label="Resposta rápida"
        className="p-5 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/70 space-y-2 shadow-xs"
      >
        <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          Resposta Rápida & Resumo Prático
        </div>
        <p className="text-sm text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
          {article.quickAnswer}
        </p>
      </section>

      {/* 5. Introdução Editorial */}
      <article className="prose prose-stone dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed space-y-4">
        {article.introduction.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </article>

      {/* 6. Ingredientes ou Materiais (Quando aplicável) */}
      {article.materialsOrIngredients && (
        <section className="bg-stone-50 dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-200 dark:border-stone-800 pb-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              {article.materialsOrIngredients.title}
            </h2>
            {article.materialsOrIngredients.servingsOrYield && (
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded">
                {article.materialsOrIngredients.servingsOrYield}
              </span>
            )}
          </div>
          {article.materialsOrIngredients.prepTime && (
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              ⏱ {article.materialsOrIngredients.prepTime}
            </div>
          )}
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            {article.materialsOrIngredients.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 7. Passo a Passo Estruturado */}
      <section className="space-y-6 pt-2">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight border-b border-stone-200 dark:border-stone-800 pb-3">
          Instruções Detalhadas e Execução
        </h2>

        <div className="space-y-5">
          {article.steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="p-5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 shadow-xs">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pl-8">
                  {step.description}
                </p>
                {step.tip && (
                  <div className="ml-8 mt-2 p-2.5 bg-stone-50 dark:bg-stone-800/80 rounded-lg text-xs text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{step.tip}</span>
                  </div>
                )}
              </div>

              {/* Anúncio em conformidade entre o passo 2 e 3 */}
              {idx === 1 && (
                <div className="my-6">
                  <AdSenseBanner slotType="inArticle" format="auto" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 8. Dicas Práticas Complementares */}
      {article.practicalTips.length > 0 && (
        <section className="p-5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-800/50 space-y-3">
          <h2 className="text-sm font-bold text-emerald-950 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            Dicas Complementares do Especialista
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            {article.practicalTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 9. Limitações e Orientações de Segurança */}
      {article.limitationsAndSafety.length > 0 && (
        <section className="p-5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/50 space-y-3">
          <h2 className="text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            Limitações e Cuidados de Segurança
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
            {article.limitationsAndSafety.map((sec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-700 dark:text-amber-400 font-bold">•</span>
                <span>{sec}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 10. Perguntas Frequentes (FAQ Estruturado) */}
      {article.faq.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <HelpCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            Perguntas Frequentes sobre o Assunto
          </h2>
          <div className="space-y-3">
            {article.faq.map((item, idx) => (
              <div key={idx} className="p-4 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1.5">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {item.question}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 11. Referências Oficiais e Bibliografia */}
      {article.references.length > 0 && (
        <footer className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-bold text-stone-700 dark:text-stone-300 block uppercase tracking-wider text-[11px]">
            Fontes Consultadas & Referências Técnicas:
          </span>
          <ul className="space-y-1 text-stone-600 dark:text-stone-400">
            {article.references.map((ref, idx) => (
              <li key={idx}>• {ref}</li>
            ))}
          </ul>
        </footer>
      )}

      {/* 12. Tags do Artigo */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" /> Tags:
        </span>
        {article.tags.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-md text-xs font-medium"
          >
            #{t}
          </span>
        ))}
      </div>

      {/* 13. Caixa de Transparência do Autor */}
      <div className="p-5 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-700 dark:bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
          VM
        </div>
        <div className="space-y-0.5 text-xs">
          <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">{article.author}</div>
          <div className="text-stone-500 dark:text-stone-400">{article.authorRole}</div>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed pt-1">
            Nossa equipe de conteúdo reúne pesquisas práticas, testes culinários domésticos e normas sanitárias brasileiras para entregar soluções aplicáveis ao cotidiano da família.
          </p>
        </div>
      </div>

      {/* Captura de Newsletter no Artigo */}
      <NewsletterCapture
        variant="card"
        title="Gostou deste guia? Receba dicas de economia toda semana"
        description="Cadastre seu e-mail para receber métodos práticos de economia doméstica, receitas com ótimo custo-benefício e ferramentas gratuitas diretamente na sua caixa de entrada."
        onNavigate={onNavigate}
      />

      {/* 14. Artigos Relacionados */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Você Também Pode Gostar:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        </section>
      )}

      {/* Espaço Publicitário - Footer Banner */}
      <div className="pt-4">
        <AdSenseBanner slotType="footerBanner" format="horizontal" />
      </div>
    </main>
  );
};
