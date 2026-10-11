import React, { useState } from 'react';
import { Plus, Trash2, PieChart, Shield, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ExpenseItem {
  id: string;
  description: string;
  category: 'moradia' | 'alimentacao' | 'transporte' | 'saude' | 'educacao' | 'lazer' | 'outros';
  type: 'essencial' | 'estilo' | 'reserva';
  amount: number;
}

const CATEGORY_NAMES: Record<ExpenseItem['category'], string> = {
  moradia: 'Moradia e Contas',
  alimentacao: 'Alimentação e Mercado',
  transporte: 'Transporte e Veículo',
  saude: 'Saúde e Farmácia',
  educacao: 'Educação e Cursos',
  lazer: 'Lazer e Desejos',
  outros: 'Outros e Diversos',
};

export const BudgetCalculator: React.FC = () => {
  const [incomes, setIncomes] = useState<number[]>([3500]);
  const [newIncome, setNewIncome] = useState('');
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', description: 'Aluguel / Condomínio', category: 'moradia', type: 'essencial', amount: 1200 },
    { id: '2', description: 'Supermercado e Feira', category: 'alimentacao', type: 'essencial', amount: 800 },
    { id: '3', description: 'Conta de Energia Elétrica', category: 'moradia', type: 'essencial', amount: 180 },
    { id: '4', description: 'Transporte / Combustível', category: 'transporte', type: 'essencial', amount: 250 },
    { id: '5', description: 'Internet e Celular', category: 'moradia', type: 'essencial', amount: 120 },
    { id: '6', description: 'Lazer / Restaurantes', category: 'lazer', type: 'estilo', amount: 350 },
    { id: '7', description: 'Reserva para Emergências', category: 'outros', type: 'reserva', amount: 300 },
  ]);

  // Form states
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState<ExpenseItem['category']>('alimentacao');
  const [classification, setClassification] = useState<ExpenseItem['type']>('essencial');
  const [amt, setAmt] = useState('');

  const totalIncome = incomes.reduce((acc, curr) => acc + curr, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Totais por regra 50-30-20
  const essentialTotal = expenses.filter((e) => e.type === 'essencial').reduce((acc, e) => acc + e.amount, 0);
  const lifestyleTotal = expenses.filter((e) => e.type === 'estilo').reduce((acc, e) => acc + e.amount, 0);
  const reserveTotal = expenses.filter((e) => e.type === 'reserva').reduce((acc, e) => acc + e.amount, 0);

  const essentialPct = totalIncome > 0 ? (essentialTotal / totalIncome) * 100 : 0;
  const lifestylePct = totalIncome > 0 ? (lifestyleTotal / totalIncome) * 100 : 0;
  const reservePct = totalIncome > 0 ? (reserveTotal / totalIncome) * 100 : 0;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amt.replace(',', '.'));
    if (!desc.trim() || isNaN(val) || val <= 0) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now().toString(),
        description: desc.trim(),
        category: cat,
        type: classification,
        amount: val,
      },
    ]);
    setDesc('');
    setAmt('');
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newIncome.replace(',', '.'));
    if (isNaN(val) || val <= 0) return;
    setIncomes([...incomes, val]);
    setNewIncome('');
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-6 space-y-6 transition-colors">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <PieChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          Calculadora de Orçamento Familiar (Regra 50-30-20)
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Acompanhe suas receitas, despesas e a distribuição percentual mensal.
          Todos os cálculos são executados com segurança diretamente no seu navegador.
        </p>
      </div>

      {/* Renda Mensal */}
      <div className="bg-stone-50 dark:bg-stone-800/70 p-4 rounded-lg border border-stone-200 dark:border-stone-700">
        <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
          1. Receitas Líquidas da Família (Salários, Benefícios, Extras)
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            {totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <form onSubmit={handleAddIncome} className="flex items-center gap-2">
            <input
              type="number"
              step="0.01"
              placeholder="Adicionar R$"
              value={newIncome}
              onChange={(e) => setNewIncome(e.target.value)}
              className="px-3 py-1.5 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md w-36 focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Renda
            </button>
          </form>
        </div>
      </div>

      {/* Formulário de Nova Despesa */}
      <form onSubmit={handleAddExpense} className="p-4 bg-stone-50/70 dark:bg-stone-800/40 rounded-lg border border-stone-200 dark:border-stone-700 space-y-3">
        <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
          2. Adicionar Nova Despesa
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Ex: Conta de Luz, Dentista..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
            required
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as ExpenseItem['category'])}
            className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
          >
            {Object.entries(CATEGORY_NAMES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value as ExpenseItem['type'])}
            className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
          >
            <option value="essencial">Gasto Essencial (Necessidade)</option>
            <option value="estilo">Estilo de Vida (Desejo)</option>
            <option value="reserva">Reserva / Dívidas (Futuro)</option>
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              placeholder="Valor (R$)"
              value={amt}
              onChange={(e) => setAmt(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-md text-xs shrink-0 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Incluir
            </button>
          </div>
        </div>
      </form>

      {/* Balanço e Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60">
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 block">Total de Despesas</span>
          <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1 block">
            {totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : 0}% da renda
          </span>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            balance >= 0
              ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
              : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60'
          }`}
        >
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 block">Saldo do Mês</span>
          <span
            className={`text-2xl font-bold mt-1 block ${
              balance >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
            }`}
          >
            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {balance >= 0 ? 'Superávit disponível para poupança' : 'Atenção: despesas excedem a renda'}
          </span>
        </div>

        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60">
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 block">Distribuição Atual</span>
          <div className="mt-2 space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
            <div className="flex justify-between">
              <span>Essenciais (Meta: ~50%):</span>
              <span className="font-bold">{essentialPct.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Estilo de Vida (Meta: ~30%):</span>
              <span className="font-bold">{lifestylePct.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Reserva / Futuro (Meta: ~20%):</span>
              <span className="font-bold">{reservePct.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Despesas */}
      <div className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
        <div className="bg-stone-100 dark:bg-stone-800 px-4 py-2.5 text-xs font-semibold text-stone-700 dark:text-stone-200 uppercase tracking-wider flex justify-between">
          <span>Despesas Cadastradas ({expenses.length})</span>
          <span>Ações</span>
        </div>
        <div className="divide-y divide-stone-100 dark:divide-stone-800 max-h-72 overflow-y-auto">
          {expenses.map((item) => (
            <div key={item.id} className="px-4 py-3 flex items-center justify-between hover:bg-stone-50/60 dark:hover:bg-stone-800/40 text-sm">
              <div className="space-y-0.5">
                <div className="font-medium text-stone-900 dark:text-stone-100">{item.description}</div>
                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
                  <span>{CATEGORY_NAMES[item.category]}</span>
                  <span>•</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[11px] ${
                      item.type === 'essencial'
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                        : item.type === 'estilo'
                        ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    {item.type === 'essencial' ? 'Essencial' : item.type === 'estilo' ? 'Estilo' : 'Reserva'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <button
                  onClick={() => handleRemoveExpense(item.id)}
                  className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 p-1"
                  aria-label="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-stone-600 dark:text-stone-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50 flex items-start gap-2">
        <Shield className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p>
          <strong>Privacidade Total:</strong> Os valores digitados nesta calculadora permanecem exclusivamente
          na memória do seu navegador e não são transmitidos para nenhum banco de dados ou servidor externo.
        </p>
      </div>
    </div>
  );
};
