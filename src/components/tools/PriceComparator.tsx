import React, { useState } from 'react';
import { Scale, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const PriceComparator: React.FC = () => {
  // Produto A
  const [nameA, setNameA] = useState('Produto A (Embalagem Menor)');
  const [priceA, setPriceA] = useState('12.50');
  const [qtyA, setQtyA] = useState('500');
  const [unitA, setUnitA] = useState<'g' | 'kg' | 'ml' | 'l' | 'un'>('g');

  // Produto B
  const [nameB, setNameB] = useState('Produto B (Embalagem Maior)');
  const [priceB, setPriceB] = useState('22.90');
  const [qtyB, setQtyB] = useState('1');
  const [unitB, setUnitB] = useState<'g' | 'kg' | 'ml' | 'l' | 'un'>('kg');

  // Normalização para unidade padrão (kg, litro ou unidade)
  const normalize = (priceStr: string, qtyStr: string, unit: string) => {
    const p = parseFloat(priceStr.replace(',', '.'));
    const q = parseFloat(qtyStr.replace(',', '.'));
    if (isNaN(p) || isNaN(q) || p <= 0 || q <= 0) return null;

    let standardFactor = 1; // em kg, L ou un
    let standardLabel = 'unidade';

    if (unit === 'g') {
      standardFactor = q / 1000;
      standardLabel = 'kg';
    } else if (unit === 'kg') {
      standardFactor = q;
      standardLabel = 'kg';
    } else if (unit === 'ml') {
      standardFactor = q / 1000;
      standardLabel = 'litro';
    } else if (unit === 'l') {
      standardFactor = q;
      standardLabel = 'litro';
    } else {
      standardFactor = q;
      standardLabel = 'unidade';
    }

    const pricePerStandard = p / standardFactor;
    return { pricePerStandard, standardLabel, totalCost: p };
  };

  const resA = normalize(priceA, qtyA, unitA);
  const resB = normalize(priceB, qtyB, unitB);

  const isComparable =
    resA &&
    resB &&
    ((unitA === 'g' || unitA === 'kg') && (unitB === 'g' || unitB === 'kg') ||
      (unitA === 'ml' || unitA === 'l') && (unitB === 'ml' || unitB === 'l') ||
      (unitA === 'un' && unitB === 'un'));

  let winner: 'A' | 'B' | 'EQUAL' | null = null;
  let savingsPct = 0;
  let diffPerUnit = 0;

  if (isComparable && resA && resB) {
    if (Math.abs(resA.pricePerStandard - resB.pricePerStandard) < 0.001) {
      winner = 'EQUAL';
    } else if (resA.pricePerStandard < resB.pricePerStandard) {
      winner = 'A';
      diffPerUnit = resB.pricePerStandard - resA.pricePerStandard;
      savingsPct = ((resB.pricePerStandard - resA.pricePerStandard) / resB.pricePerStandard) * 100;
    } else {
      winner = 'B';
      diffPerUnit = resA.pricePerStandard - resB.pricePerStandard;
      savingsPct = ((resA.pricePerStandard - resB.pricePerStandard) / resA.pricePerStandard) * 100;
    }
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-6 space-y-6 transition-colors">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Scale className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          Comparador de Preços por Unidade de Medida
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Descubra na hora qual embalagem é realmente mais vantajosa no supermercado,
          evitando a armadilha de embalagens menores que parecem baratas mas custam mais por quilo ou litro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opção A */}
        <div className={`p-4 rounded-xl border transition-all ${
          winner === 'A'
            ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-300 dark:ring-emerald-800'
            : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">Opção 1 (Produto A)</span>
            {winner === 'A' && (
              <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Melhor Custo-Benefício
              </span>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-stone-600 dark:text-stone-300 font-medium block mb-1">Nome ou Marca</label>
              <input
                type="text"
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-stone-600 dark:text-stone-300 font-medium block mb-1">Preço Total (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={priceA}
                  onChange={(e) => setPriceA(e.target.value)}
                  className="w-full text-sm font-semibold px-3 py-1.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-stone-600 dark:text-stone-300 font-medium block mb-1">Quantidade</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    step="0.01"
                    value={qtyA}
                    onChange={(e) => setQtyA(e.target.value)}
                    className="w-full text-sm px-2 py-1.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded"
                  />
                  <select
                    value={unitA}
                    onChange={(e) => setUnitA(e.target.value as any)}
                    className="text-xs px-2 py-1.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded"
                  >
                    <option value="g">gramas (g)</option>
                    <option value="kg">quilos (kg)</option>
                    <option value="ml">mililitros (ml)</option>
                    <option value="l">litros (L)</option>
                    <option value="un">unidades</option>
                  </select>
                </div>
              </div>
            </div>

            {resA && (
              <div className="pt-3 border-t border-stone-200/60 dark:border-stone-700 flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">Preço Calculado:</span>
                <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {resA.pricePerStandard.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / {resA.standardLabel}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Opção B */}
        <div className={`p-4 rounded-xl border transition-all ${
          winner === 'B'
            ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-300 dark:ring-emerald-800'
            : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">Opção 2 (Produto B)</span>
            {winner === 'B' && (
              <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Melhor Custo-Benefício
              </span>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-stone-600 dark:text-stone-300 font-medium block mb-1">Nome ou Marca</label>
              <input
                type="text"
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-stone-600 dark:text-stone-300 font-medium block mb-1">Preço Total (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={priceB}
                  onChange={(e) => setPriceB(e.target.value)}
                  className="w-full text-sm font-semibold px-3 py-1.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-stone-600 dark:text-stone-300 font-medium block mb-1">Quantidade</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    step="0.01"
                    value={qtyB}
                    onChange={(e) => setQtyB(e.target.value)}
                    className="w-full text-sm px-2 py-1.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded"
                  />
                  <select
                    value={unitB}
                    onChange={(e) => setUnitB(e.target.value as any)}
                    className="text-xs px-2 py-1.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded"
                  >
                    <option value="g">gramas (g)</option>
                    <option value="kg">quilos (kg)</option>
                    <option value="ml">mililitros (ml)</option>
                    <option value="l">litros (L)</option>
                    <option value="un">unidades</option>
                  </select>
                </div>
              </div>
            </div>

            {resB && (
              <div className="pt-3 border-t border-stone-200/60 dark:border-stone-700 flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">Preço Calculado:</span>
                <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {resB.pricePerStandard.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / {resB.standardLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Veredito */}
      {isComparable && winner && (
        <div className="p-4 rounded-xl bg-stone-900 dark:bg-stone-950 text-white border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Conclusão da Comparação
            </div>
            <div className="text-base font-bold">
              {winner === 'EQUAL' ? (
                'Ambos possuem exatamente o mesmo preço por unidade de medida.'
              ) : (
                <>
                  <span className="text-emerald-300">
                    {winner === 'A' ? nameA : nameB}
                  </span>{' '}
                  é {savingsPct.toFixed(1)}% mais econômico!
                </>
              )}
            </div>
            {winner !== 'EQUAL' && (
              <div className="text-xs text-stone-300">
                Você economiza{' '}
                <strong>
                  {diffPerUnit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </strong>{' '}
                por cada {resA?.standardLabel} consumido.
              </div>
            )}
          </div>
        </div>
      )}

      {!isComparable && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-lg text-xs border border-amber-200 dark:border-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Certifique-se de comparar grandezas compatíveis (massa com massa, ou volume com volume).</span>
        </div>
      )}
    </div>
  );
};
