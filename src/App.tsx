import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AdSenseProvider } from './context/AdSenseContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { ToolsPage } from './pages/ToolsPage';
import { InstitutionalPage } from './pages/InstitutionalPage';
import { AdSenseChecklistPage } from './pages/AdSenseChecklistPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ARTICLES } from './data/articles';
import { CATEGORIES } from './data/categories';
import { ArticleCard } from './components/ArticleCard';
import { CategoryId } from './types';
import { Search, X } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Sincronização com histórico do navegador
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchQuery('');
  };

  // Dinamismo do Título da Página e Meta Tags de SEO
  useEffect(() => {
    if (currentPath === '/') {
      document.title = 'Viva Melhor — Guia Prático | Soluções para o seu dia a dia';
    } else if (currentPath.startsWith('/artigo/')) {
      const slug = currentPath.replace('/artigo/', '');
      const art = ARTICLES.find((a) => a.slug === slug);
      if (art) {
        document.title = `${art.title} | Viva Melhor`;
      }
    } else if (currentPath.startsWith('/categoria/')) {
      const catId = currentPath.replace('/categoria/', '') as CategoryId;
      const cat = CATEGORIES.find((c) => c.id === catId);
      if (cat) {
        document.title = `${cat.name} — Dicas e Guias Práticos | Viva Melhor`;
      }
    } else if (currentPath === '/ferramentas') {
      document.title = 'Ferramentas Gratuitas e Calculadoras Práticas | Viva Melhor';
    } else if (currentPath === '/checklist-adsense') {
      document.title = 'Checklist Técnico Google AdSense | Viva Melhor';
    } else if (currentPath === '/admin') {
      document.title = 'Central Técnica e Configuração AdSense | Viva Melhor';
    }
  }, [currentPath]);

  // Busca global de artigos
  const searchResults = searchQuery.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.quickAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // Roteamento de conteúdo
  const renderContent = () => {
    // Se houver busca ativa, exibe resultados
    if (searchQuery.trim()) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Resultados para: "{searchQuery}"
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                {searchResults.length} {searchResults.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white flex items-center gap-1 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 px-3 py-1.5 rounded-lg transition"
            >
              <X className="w-4 h-4" /> Limpar Busca
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={(slug) => navigate(`/artigo/${slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
              <p className="text-base font-semibold text-stone-800 dark:text-stone-200">
                Nenhum artigo encontrado para o termo pesquisado.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Tente palavras mais genéricas como "feijão", "orçamento", "limpeza" ou navegue pelas categorias.
              </p>
            </div>
          )}
        </div>
      );
    }

    // Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectArticle={(slug) => navigate(`/artigo/${slug}`)}
        />
      );
    }

    // Categoria
    if (currentPath.startsWith('/categoria/')) {
      const catId = currentPath.replace('/categoria/', '') as CategoryId;
      return (
        <CategoryPage
          categoryId={catId}
          onNavigate={navigate}
          onSelectArticle={(slug) => navigate(`/artigo/${slug}`)}
        />
      );
    }

    // Artigo individual
    if (currentPath.startsWith('/artigo/')) {
      const slug = currentPath.replace('/artigo/', '');
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) {
        return (
          <ArticlePage
            article={article}
            onNavigate={navigate}
            onSelectArticle={(slug) => navigate(`/artigo/${slug}`)}
          />
        );
      }
      return <NotFoundPage onNavigate={navigate} />;
    }

    // Ferramentas Gratuitas
    if (currentPath === '/ferramentas') {
      return <ToolsPage />;
    }

    // Páginas Institucionais
    const institutionalRoutes = [
      'sobre',
      'contato',
      'privacidade',
      'cookies',
      'termos',
      'aviso-editorial',
      'correcoes',
      'publicidade',
    ] as const;

    const matchedInst = institutionalRoutes.find((r) => currentPath === `/${r}`);
    if (matchedInst) {
      return <InstitutionalPage pageType={matchedInst} onNavigate={navigate} />;
    }

    // Checklist AdSense
    if (currentPath === '/checklist-adsense') {
      return <AdSenseChecklistPage onNavigate={navigate} />;
    }

    // Admin & Painel Técnico
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }

    // 404
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <ThemeProvider>
      <AdSenseProvider>
        <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-200">
          <Header
            currentPath={currentPath}
            onNavigate={navigate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <main className="flex-1">
            {renderContent()}
          </main>

          <Footer onNavigate={navigate} />

          <CookieConsentBanner />
        </div>
      </AdSenseProvider>
    </ThemeProvider>
  );
}
