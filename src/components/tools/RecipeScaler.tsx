import React, { useState } from 'react';
import { ChefHat, Minus, Plus, RefreshCw } from 'lucide-react';

interface RecipeIngredient {
  name: string;
  baseAmount: number;
  unit: string;
}

interface PreloadedRecipe {
  title: string;
  baseServings: number;
  ingredients: RecipeIngredient[];
}

const PRELOADED_RECIPES: PreloadedRecipe[] = [
  {
    title: 'Arroz Branco Soltinho Tradicional',
    baseServings: 4,
    ingredients: [
      { name: 'Arroz agulhinha tipo 1', baseAmount: 1, unit: 'xícara (chá)' },
      { name: 'Água fervente', baseAmount: 2, unit: 'xícaras (chá)' },
      { name: 'Alho picado', baseAmount: 2, unit: 'dentes' },
      { name: 'Óleo vegetal', baseAmount: 1, unit: 'colher (sopa)' },
      { name: 'Sal refinado', baseAmount: 1, unit: 'colher (chá rasa)' },
    ],
  },
  {
    title: 'Feijão Carioca Cremoso com Caldo Encorpado',
    baseServings: 4,
    ingredients: [
      { name: 'Feijão carioca cru', baseAmount: 1, unit: 'xícara (chá)' },
      { name: 'Água para cozimento', baseAmount: 4, unit: 'xícaras (chá)' },
      { name: 'Alho amassado', baseAmount: 3, unit: 'dentes' },
      { name: 'Cebola picada', baseAmount: 0.5, unit: 'unidade' },
      { name: 'Azeite ou óleo', baseAmount: 1, unit: 'colher (sopa)' },
      { name: 'Folha de louro seca', baseAmount: 1, unit: 'unidade' },
      { name: 'Sal a gosto', baseAmount: 1, unit: 'colher (chá)' },
    ],
  },
  {
    title: 'Bolo de Cenoura Fofinho Tradicional',
    baseServings: 12,
    ingredients: [
      { name: 'Cenouras médias descascadas', baseAmount: 250, unit: 'gramas' },
      { name: 'Ovos inteiros', baseAmount: 3, unit: 'unidades' },
      { name: 'Óleo vegetal', baseAmount: 120, unit: 'ml (1/2 xícara)' },
      { name: 'Açúcar refinado', baseAmount: 1.5, unit: 'xícaras (chá)' },
      { name: 'Farinha de trigo', baseAmount: 2, unit: 'xícaras (chá)' },
      { name: 'Fermento em pó químico', baseAmount: 1, unit: 'colher (sopa)' },
      { name: 'Achocolatado (para cobertura)', baseAmount: 1, unit: 'xícara (chá)' },
      { name: 'Açúcar (para cobertura)', baseAmount: 1, unit: 'xícara (chá)' },
      { name: 'Manteiga (para cobertura)', baseAmount: 2, unit: 'colheres (sopa)' },
      { name: 'Leite (para cobertura)', baseAmount: 3, unit: 'colheres (sopa)' },
    ],
  },
  {
    title: 'Pão Caseiro Econômico Sem Sova',
    baseServings: 8,
    ingredients: [
      { name: 'Farinha de trigo', baseAmount: 400, unit: 'gramas (3 xícaras)' },
      { name: 'Fermento biológico seco', baseAmount: 3, unit: 'gramas (1 colher chá)' },
      { name: 'Sal fino', baseAmount: 6, unit: 'gramas (1 colher chá)' },
      { name: 'Água morna', baseAmount: 350, unit: 'ml (1 e 1/2 xícara)' },
    ],
  },
];

export const RecipeScaler: React.FC = () => {
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const currentRecipe = PRELOADED_RECIPES[selectedRecipeIndex];
  const [targetServings, setTargetServings] = useState(currentRecipe.baseServings);

  const handleSelectRecipe = (idx: number) => {
    setSelectedRecipeIndex(idx);
    setTargetServings(PRELOADED_RECIPES[idx].baseServings);
  };

  const ratio = targetServings / currentRecipe.baseServings;

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-6 space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <ChefHat className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          Calculadora de Porções de Receitas
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Ajuste as medidas proporcionais dos ingredientes de acordo com o número exato de convidados ou porções que você deseja preparar.
        </p>
      </div>

      {/* Seleção de Receita */}
      <div>
        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block mb-2">
          Escolha uma receita base:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRELOADED_RECIPES.map((recipe, idx) => (
            <button
              key={recipe.title}
              onClick={() => handleSelectRecipe(idx)}
              className={`p-3 text-left rounded-lg border text-xs font-medium transition ${
                selectedRecipeIndex === idx
                  ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold'
                  : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-300'
              }`}
            >
              {recipe.title}
              <span className="block text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                Padrão: {recipe.baseServings} porções
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Ajustador de Porções */}
      <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 block">Número de Porções Desejadas</span>
          <span className="text-xs text-stone-600 dark:text-stone-400">
            Multiplicador matemático: <strong>{ratio.toFixed(2)}x</strong> da receita original
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTargetServings((prev) => Math.max(1, prev - 1))}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 font-bold shadow-xs transition"
            aria-label="Diminuir"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-2xl font-black text-emerald-800 dark:text-emerald-400 w-12 text-center">
            {targetServings}
          </span>
          <button
            onClick={() => setTargetServings((prev) => prev + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 font-bold shadow-xs transition"
            aria-label="Aumentar"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTargetServings(currentRecipe.baseServings)}
            className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 ml-2 flex items-center gap-1"
            title="Redefinir para padrão"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Redefinir
          </button>
        </div>
      </div>

      {/* Tabela de Ingredientes Recalculados */}
      <div className="border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
        <div className="bg-stone-100 dark:bg-stone-800 px-4 py-2.5 text-xs font-bold text-stone-700 dark:text-stone-200 uppercase tracking-wider flex justify-between">
          <span>Ingrediente</span>
          <span>Quantidade Calculada para {targetServings} porções</span>
        </div>
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {currentRecipe.ingredients.map((ing) => {
            const scaled = ing.baseAmount * ratio;
            const displayAmount = scaled % 1 === 0 ? scaled : scaled.toFixed(2).replace(/\.?0+$/, '');

            return (
              <div key={ing.name} className="px-4 py-3 flex items-center justify-between text-sm">
                <span className="font-medium text-stone-900 dark:text-stone-100">{ing.name}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                  {displayAmount} {ing.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
