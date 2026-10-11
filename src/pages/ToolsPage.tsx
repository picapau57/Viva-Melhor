import React, { useState } from 'react';
import {
  Sparkles,
  PieChart,
  Scale,
  Calendar,
  ShoppingCart,
  Home,
  ChefHat,
  Sprout,
  ShieldCheck,
} from 'lucide-react';
import { BudgetCalculator } from '../components/tools/BudgetCalculator';
import { PriceComparator } from '../components/tools/PriceComparator';
import { MealPlanner } from '../components/tools/MealPlanner';
import { ShoppingListGenerator } from '../components/tools/ShoppingListGenerator';
import { ChorePlanner } from '../components/tools/ChorePlanner';
import { RecipeScaler } from '../components/tools/RecipeScaler';
import { GardenPlanner } from '../components/tools/GardenPlanner';
import { AdSenseBanner } from '../components/AdSenseBanner';

export const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('budget');

  const tools = [
    { id: 'budget', label: 'Orçamento 50-30-20', icon: PieChart, component: BudgetCalculator },
    { id: 'compare', label: 'Comparador de Preços', icon: Scale, component: PriceComparator },
    { id: 'meals', label: 'Planejador de Refeições', icon: Calendar, component: MealPlanner },
    { id: 'shopping', label: 'Lista de Compras', icon: ShoppingCart, component: ShoppingListGenerator },
    { id: 'chores', label: 'Tarefas da Casa', icon: Home, component: ChorePlanner },
    { id: 'recipes', label: 'Calculadora de Receitas', icon: ChefHat, component: RecipeScaler },
    { id: 'garden', label: 'Diário de Horta', icon: Sprout, component: GardenPlanner },
  ];

  const CurrentTool = tools.find((t) => t.id === activeTab)?.component || BudgetCalculator;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cabeçalho das Ferramentas */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5" /> 100% Gratuitas e Sem Cadastro
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Ferramentas Práticas para o seu Dia a Dia
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
          Calcule seu orçamento familiar, descubra o pacote mais econômico no mercado,
          organize o cardápio e monte rotinas domésticas sem complicações.
        </p>

        <div className="inline-flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800">
          <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Execução segura no seu navegador. Nenhum dado financeiro ou pessoal é enviado para a nuvem.</span>
        </div>
      </div>

      {/* Espaço Publicitário - Header Banner Ferramentas */}
      <div className="max-w-4xl mx-auto">
        <AdSenseBanner slotType="headerBanner" format="horizontal" />
      </div>

      {/* Abas de Navegação Entre Ferramentas */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800 scrollbar-thin">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
                isActive
                  ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 border-emerald-600 dark:border-emerald-500 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400'}`} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Componente Ativo */}
      <div className="max-w-5xl mx-auto">
        <CurrentTool />
      </div>

      {/* Espaço Publicitário - Rodapé Ferramentas */}
      <div className="max-w-4xl mx-auto pt-4">
        <AdSenseBanner slotType="footerBanner" format="horizontal" />
      </div>
    </div>
  );
};
