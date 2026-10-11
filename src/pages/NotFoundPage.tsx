import React from 'react';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Página Não Encontrada
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-md mx-auto">
          O conteúdo que você tentou acessar pode ter sido movido, renomeado ou não está mais disponível no endereço solicitado.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
        >
          <Home className="w-4 h-4" /> Ir para a Página Inicial
        </button>
        <button
          onClick={() => onNavigate('/ferramentas')}
          className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Ver Ferramentas Gratuitas
        </button>
      </div>

      <div className="pt-8 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-3">
        <span className="font-bold text-stone-700 dark:text-stone-300 block uppercase tracking-wider">
          Ou explore nossas seções principais:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(`/categoria/${cat.id}`)}
              className="px-3 py-1 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-full text-stone-700 dark:text-stone-300 text-xs transition"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
