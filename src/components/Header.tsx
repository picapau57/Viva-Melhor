import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, Compass, ShieldCheck, Sun, Moon } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      {/* Barra Superior de Identidade e Transparência Editorial */}
      <div className="bg-stone-900 dark:bg-stone-950 text-stone-300 dark:text-stone-400 text-xs py-1.5 px-4 hidden sm:block border-b border-stone-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-stone-300 dark:text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Viva Melhor — Guia Prático: Soluções inteligentes para facilitar sua vida todos os dias.
          </span>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <button
              onClick={() => handleNav('/aviso-editorial')}
              className="hover:text-stone-200 transition"
            >
              Critérios Editoriais
            </button>
            <span className="text-stone-700 dark:text-stone-600">•</span>
            <button
              onClick={() => handleNav('/checklist-adsense')}
              className="hover:text-emerald-400 text-stone-300 dark:text-stone-400 transition flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Checklist AdSense & Domínio
            </button>
          </div>
        </div>
      </div>

      {/* Cabeçalho Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logotipo Original Viva Melhor */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
            aria-label="Viva Melhor — Página Inicial"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
              {/* Logotipo Vetorial Exclusivo: Folha + Casa geométrica */}
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 stroke-current"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 3L3 13h5v14h16V13h5L16 3z" fill="rgba(255,255,255,0.15)" />
                <path d="M16 14c-3.3 0-6 2.7-6 6 0 4 6 7 6 7s6-3 6-7c0-3.3-2.7-6-6-6z" />
                <path d="M16 14v13" strokeWidth="1.8" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                Viva Melhor
              </div>
              <div className="text-[11px] font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 -mt-1">
                Guia Prático
              </div>
            </div>
          </button>

          {/* Campo de Busca Rápida (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm mx-4">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Pesquisar receitas, economia, plantas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100 hover:bg-stone-50 focus:bg-white dark:bg-stone-800 dark:hover:bg-stone-750 dark:focus:bg-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500"
              />
              <Search className="w-4 h-4 text-stone-500 dark:text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-stone-700 dark:text-stone-200">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 rounded-md transition ${
                currentPath === '/'
                  ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 font-bold'
                  : 'hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Início
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNav(`/categoria/${cat.id}`)}
                className={`px-3 py-2 rounded-md transition whitespace-nowrap ${
                  currentPath === `/categoria/${cat.id}`
                    ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 font-bold'
                    : 'hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {cat.name.split(' ')[0]}
              </button>
            ))}
            <button
              onClick={() => handleNav('/ferramentas')}
              className={`px-3.5 py-2 rounded-md font-bold transition flex items-center gap-1.5 ${
                currentPath === '/ferramentas'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Ferramentas
            </button>

            {/* Botão de Alternância de Tema (Desktop) */}
            <div className="pl-1 border-l border-stone-200 dark:border-stone-700 ml-1">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                aria-label={theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
                title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-600" />
                )}
              </button>
            </div>
          </nav>

          {/* Botões Mobile */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Botão Dark Mode Mobile no topo */}
            <button
              onClick={toggleTheme}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition"
              aria-label={theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-stone-600" />
              )}
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg"
              aria-label="Abrir pesquisa"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Barra de Busca Mobile Expansível */}
        {searchOpen && (
          <div className="pb-3 lg:hidden">
            <div className="relative">
              <input
                type="search"
                placeholder="O que você precisa aprender ou resolver hoje?"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />
              <Search className="w-4 h-4 text-stone-500 dark:text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>
        )}
      </div>

      {/* Menu Gaveta Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-xl px-4 pt-2 pb-6 space-y-2">
          {/* Seletor Rápido de Tema no Drawer Mobile */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-emerald-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Tema: {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}</span>
            </div>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-md text-xs font-bold bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 shadow-xs border border-stone-200 dark:border-stone-600 transition"
            >
              Alternar para {theme === 'dark' ? 'Claro' : 'Escuro'}
            </button>
          </div>

          <button
            onClick={() => handleNav('/')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800"
          >
            Início
          </button>
          <div className="py-1 px-3 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Categorias Editoriais
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleNav(`/categoria/${cat.id}`)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-stone-800 hover:text-emerald-800 dark:hover:text-emerald-400 flex items-center justify-between"
            >
              <span>{cat.name}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1">
            <button
              onClick={() => handleNav('/ferramentas')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Ferramentas Gratuitas (Calculadoras e Guias)
            </button>
            <button
              onClick={() => handleNav('/checklist-adsense')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2 mt-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Checklist AdSense & Central Técnica
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

