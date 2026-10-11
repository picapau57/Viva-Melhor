import React, { useState } from 'react';
import { Calendar, Utensils, Sparkles, Check, ArrowRight } from 'lucide-react';

interface DayPlan {
  day: string;
  lunch: string;
  dinner: string;
  ingredients: string[];
}

const DEFAULT_WEEK: DayPlan[] = [
  {
    day: 'Segunda-feira',
    lunch: 'Arroz, feijão carioca, peito de frango grelhado e cenoura cozida',
    dinner: 'Sopa cremosa de legumes com talos e pão caseiro',
    ingredients: ['Arroz agulhinha', 'Feijão carioca', 'Peito de frango', 'Cenoura', 'Batata', 'Couve'],
  },
  {
    day: 'Terça-feira',
    lunch: 'Arroz, feijão, carne moída refogada com abobrinha em cubos',
    dinner: 'Omelete de forno com tomate, queijo e cheiro-verde',
    ingredients: ['Carne moída (acém)', 'Abobrinha', 'Ovos', 'Tomate', 'Cheiro-verde'],
  },
  {
    day: 'Quarta-feira',
    lunch: 'Macarrão com molho de tomate caseiro e frango desfiado',
    dinner: 'Salada de folhas verdes com grão-de-bico cozido e ovo',
    ingredients: ['Macarrão espaguete', 'Extrato de tomate', 'Grão-de-bico', 'Alface'],
  },
  {
    day: 'Quinta-feira',
    lunch: 'Arroz de forno com sobras limpas, feijão e vagem refogada',
    dinner: 'Sanduíche natural de frango com ricota ou maionese caseira',
    ingredients: ['Vagem', 'Pão de forma ou caseiro', 'Ricota fresca'],
  },
  {
    day: 'Sexta-feira',
    lunch: 'Filé de peixe ou sardinha fresca assada com batatas e arroz',
    dinner: 'Torta salgada de liquidificador com legumes e milho',
    ingredients: ['Sardinha ou filé de tilápia', 'Farinha de trigo', 'Leite', 'Milho em conserva'],
  },
  {
    day: 'Sábado',
    lunch: 'Feijoada simples econômica com couve refogada e laranja',
    dinner: 'Lanche caseiro ou pizza de frigideira leve',
    ingredients: ['Feijão preto', 'Costelinha ou paio', 'Laranja', 'Farinha de mandioca'],
  },
  {
    day: 'Domingo',
    lunch: 'Frango assado com legumes na assadeira e maionese de batata',
    dinner: 'Prato leve com salada e torradas',
    ingredients: ['Frango inteiro ou coxas', 'Cebola', 'Alho', 'Azeite'],
  },
];

interface MealPlannerProps {
  onSyncWithShoppingList?: (items: string[]) => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({ onSyncWithShoppingList }) => {
  const [week, setWeek] = useState<DayPlan[]>(DEFAULT_WEEK);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeDay = week[selectedDayIndex];

  const handleUpdate = (field: 'lunch' | 'dinner', value: string) => {
    setWeek((prev) =>
      prev.map((item, idx) => (idx === selectedDayIndex ? { ...item, [field]: value } : item))
    );
  };

  const allIngredients = Array.from(new Set(week.flatMap((d) => d.ingredients)));

  const handleExportList = () => {
    if (onSyncWithShoppingList) {
      onSyncWithShoppingList(allIngredients);
    }
    const text = `CARDÁPIO SEMANAL VIVA MELHOR:\n\n` +
      week.map((d) => `${d.day}:\n- Almoço: ${d.lunch}\n- Jantar: ${d.dinner}`).join('\n\n') +
      `\n\nINGREDIENTES PREVISTOS:\n` +
      allIngredients.join(', ');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-6 space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Planejador de Refeições Semanal (Meal Prep)
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Planeje almoços e jantares de segunda a domingo para economizar tempo, evitar delivery por cansaço e gerar a lista de compras precisa.
          </p>
        </div>
        <button
          onClick={handleExportList}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shrink-0 shadow-xs transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Sparkles className="w-4 h-4" />}
          {copied ? 'Copiado para Área de Transferência!' : 'Copiar Cardápio e Ingredientes'}
        </button>
      </div>

      {/* Seletor de dias */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {week.map((item, idx) => (
          <button
            key={item.day}
            onClick={() => setSelectedDayIndex(idx)}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedDayIndex === idx
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
            }`}
          >
            {item.day}
          </button>
        ))}
      </div>

      {/* Editor do dia selecionado */}
      <div className="p-5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Cardápio para {activeDay.day}
          </span>
          <span className="text-xs text-stone-600 dark:text-stone-400">Altere o texto livremente</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
              Almoço Principal:
            </label>
            <input
              type="text"
              value={activeDay.lunch}
              onChange={(e) => handleUpdate('lunch', e.target.value)}
              className="w-full text-sm px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md focus:ring-2 focus:ring-emerald-500 font-medium text-stone-800 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
              Jantar ou Refeição Noturna:
            </label>
            <input
              type="text"
              value={activeDay.dinner}
              onChange={(e) => handleUpdate('dinner', e.target.value)}
              className="w-full text-sm px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md focus:ring-2 focus:ring-emerald-500 font-medium text-stone-800 dark:text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* Ingredientes Consolidados da Semana */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60">
        <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2">
          Ingredientes Essenciais Mapeados no Cardápio ({allIngredients.length} itens)
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allIngredients.map((ing) => (
            <span
              key={ing}
              className="px-2.5 py-1 bg-white dark:bg-stone-800 border border-emerald-200 dark:border-emerald-700 text-stone-800 dark:text-stone-200 rounded-md text-xs font-medium"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
