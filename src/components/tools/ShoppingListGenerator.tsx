import React, { useState } from 'react';
import { ShoppingCart, Plus, Trash2, CheckSquare, Square, Share2, Copy, Check } from 'lucide-react';

export interface ShoppingItem {
  id: string;
  name: string;
  category: 'hortifruti' | 'mercearia' | 'carnes' | 'laticinios' | 'limpeza' | 'higiene';
  qty: string;
  checked: boolean;
  estPrice?: number;
}

const CATEGORY_LABELS = {
  hortifruti: 'Hortifrúti e Feira',
  mercearia: 'Mercearia e Não Perecíveis',
  carnes: 'Carnes, Peixes e Ovos',
  laticinios: 'Frios e Laticínios',
  limpeza: 'Limpeza e Lavanderia',
  higiene: 'Higiene Pessoal',
};

export const ShoppingListGenerator: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: '1', name: 'Arroz agulhinha tipo 1', category: 'mercearia', qty: '1 pct (5kg)', checked: false, estPrice: 28 },
    { id: '2', name: 'Feijão carioca', category: 'mercearia', qty: '2 pct (1kg)', checked: false, estPrice: 15 },
    { id: '3', name: 'Peito de frango', category: 'carnes', qty: '1.5 kg', checked: false, estPrice: 32 },
    { id: '4', name: 'Ovos brancos', category: 'carnes', qty: '1 cartela (30 un)', checked: false, estPrice: 19 },
    { id: '5', name: 'Cenoura e batata', category: 'hortifruti', qty: '1 kg cada', checked: false, estPrice: 12 },
    { id: '6', name: 'Detergente neutro', category: 'limpeza', qty: '2 frascos', checked: false, estPrice: 6 },
  ]);

  const [name, setName] = useState('');
  const [qty, setQty] = useState('1 un');
  const [cat, setCat] = useState<ShoppingItem['category']>('hortifruti');
  const [price, setPrice] = useState('');
  const [copied, setCopied] = useState(false);

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const est = price ? parseFloat(price.replace(',', '.')) : undefined;

    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: name.trim(),
        category: cat,
        qty: qty.trim() || '1 un',
        checked: false,
        estPrice: est && !isNaN(est) ? est : undefined,
      },
    ]);
    setName('');
    setPrice('');
  };

  const handleRemove = (id: string) => {
    setItems(items.filter((it) => it.id !== id));
  };

  const handleClearChecked = () => {
    setItems(items.filter((it) => !it.checked));
  };

  const totalEstimated = items.reduce((acc, it) => acc + (it.estPrice || 0), 0);
  const checkedCount = items.filter((it) => it.checked).length;

  const handleCopyText = () => {
    const text = `LISTA DE COMPRAS - VIVA MELHOR:\n\n` +
      Object.entries(CATEGORY_LABELS).map(([key, label]) => {
        const catItems = items.filter((it) => it.category === key);
        if (catItems.length === 0) return null;
        return `${label.toUpperCase()}:\n` +
          catItems.map((it) => `${it.checked ? '[X]' : '[ ]'} ${it.name} (${it.qty})${it.estPrice ? ` - R$ ${it.estPrice.toFixed(2)}` : ''}`).join('\n');
      }).filter(Boolean).join('\n\n') +
      `\n\nTotal Previsto: R$ ${totalEstimated.toFixed(2)}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-6 space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Gerador de Lista de Compras Inteligente
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Organizada por corredores do supermercado para poupar seu tempo e evitar compras por impulso.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Lista Copiada!' : 'Copiar para WhatsApp'}
          </button>
        </div>
      </div>

      {/* Formulário de Inclusão */}
      <form onSubmit={handleAddItem} className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Nome do produto (ex: Feijão, Maçã...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          type="text"
          placeholder="Quantidade (ex: 2 kg, 1 pct)"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as any)}
          className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
        >
          {Object.entries(CATEGORY_LABELS).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Preço Est. (R$)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-md text-xs shrink-0 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>
      </form>

      {/* Barra de Progresso no Mercado */}
      <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/60 p-3 rounded-lg border border-stone-200 dark:border-stone-700">
        <div>
          Progresso no carrinho:{' '}
          <strong className="text-emerald-700 dark:text-emerald-400">
            {checkedCount} de {items.length} itens pegos
          </strong>
        </div>
        <div className="flex items-center gap-3">
          {totalEstimated > 0 && (
            <span>
              Previsão de Gasto:{' '}
              <strong className="text-stone-900 dark:text-stone-100">
                {totalEstimated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>
            </span>
          )}
          {checkedCount > 0 && (
            <button
              onClick={handleClearChecked}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
            >
              Remover Concluídos
            </button>
          )}
        </div>
      </div>

      {/* Lista Agrupada por Corredores */}
      <div className="space-y-4">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const categoryItems = items.filter((it) => it.category === key);
          if (categoryItems.length === 0) return null;

          return (
            <div key={key} className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
              <div className="bg-stone-100/80 dark:bg-stone-800 px-4 py-2 text-xs font-bold text-stone-700 dark:text-stone-200 uppercase tracking-wider">
                {label} ({categoryItems.length})
              </div>
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {categoryItems.map((it) => (
                  <div
                    key={it.id}
                    onClick={() => handleToggle(it.id)}
                    className={`px-4 py-3 flex items-center justify-between cursor-pointer select-none transition ${
                      it.checked ? 'bg-stone-50/80 dark:bg-stone-850/60 text-stone-500 dark:text-stone-400' : 'hover:bg-emerald-50/30 dark:hover:bg-stone-800/40 text-stone-900 dark:text-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {it.checked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-400 dark:text-stone-500 shrink-0" />
                      )}
                      <div>
                        <span className={`text-sm font-medium ${it.checked ? 'line-through text-stone-500 dark:text-stone-400' : ''}`}>
                          {it.name}
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400 ml-2">({it.qty})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      {it.estPrice && (
                        <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                          {it.estPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      )}
                      <button
                        onClick={() => handleRemove(it.id)}
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
          );
        })}
      </div>
    </div>
  );
};
