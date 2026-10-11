import React, { useState } from 'react';
import { Sprout, Plus, Trash2, Sun, Droplets, Info, Calendar } from 'lucide-react';

interface PlantLog {
  id: string;
  name: string;
  potType: string;
  plantedDate: string;
  sunNeed: string;
  wateringGuideline: string;
  userNotes: string;
}

const INITIAL_PLANTS: PlantLog[] = [
  {
    id: '1',
    name: 'Manjericão Italiano',
    potType: 'Vaso de cerâmica (18 cm)',
    plantedDate: '10/01/2025',
    sunNeed: 'Sol pleno (4 a 5h diárias)',
    wateringGuideline: 'Regar quando a superfície da terra secar; podar flores para manter folhas tenras.',
    userNotes: 'Fica no peitoril da janela da cozinha.',
  },
  {
    id: '2',
    name: 'Alecrim Comum',
    potType: 'Vaso de barro com boa drenagem (20 cm)',
    plantedDate: '15/01/2025',
    sunNeed: 'Sol intenso direto (5h+)',
    wateringGuideline: 'Pouca água; deixar secar completamente entre as regas. Solo bem arenoso.',
    userNotes: 'Posicionado no ponto mais ensolarado da sacada.',
  },
  {
    id: '3',
    name: 'Hortelã-Comum',
    potType: 'Vaso exclusivo solitário (25 cm fundo)',
    plantedDate: '20/01/2025',
    sunNeed: 'Meia-sombra ou sol filtrado da manhã',
    wateringGuideline: 'Gosta de umidade constante sem empoçar; nunca misturar no vaso de outras ervas.',
    userNotes: 'Raízes vigorosas, podar pontas quinzenalmente para chá.',
  },
];

export const GardenPlanner: React.FC = () => {
  const [plants, setPlants] = useState<PlantLog[]>(INITIAL_PLANTS);
  const [name, setName] = useState('');
  const [potType, setPotType] = useState('Vaso médio (15 a 20 cm)');
  const [sun, setSun] = useState('Sol pleno (4h+)');
  const [guide, setGuide] = useState('Teste do dedo: regar apenas quando a terra estiver seca.');
  const [notes, setNotes] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const today = new Date().toLocaleDateString('pt-BR');
    setPlants([
      ...plants,
      {
        id: Date.now().toString(),
        name: name.trim(),
        potType,
        plantedDate: today,
        sunNeed: sun,
        wateringGuideline: guide,
        userNotes: notes.trim() || 'Sem observações adicionais.',
      },
    ]);
    setName('');
    setNotes('');
  };

  const handleRemove = (id: string) => {
    setPlants(plants.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-6 space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Sprout className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          Planejador e Diário de Horta Caseira
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Acompanhe suas espécies cultivadas em vasos, datas de plantio e registros personalizados de cuidados.
        </p>
      </div>

      {/* Alerta Científico Editorial Obrigatório */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong>Aviso Botânico Fundamental:</strong> Não existem calendários fixos universais de rega
          (como "regar 3 vezes por semana"). A necessidade real de água de cada vaso depende da temperatura da sua cidade,
          estação do ano, incidência de vento, umidade relativa do ar e tipo do vaso.
          Utilize sempre o método físico do <strong>Teste do Dedo</strong> na terra antes de aplicar água.
        </div>
      </div>

      {/* Formulário de Registro de Planta */}
      <form onSubmit={handleAdd} className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 space-y-3">
        <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
          Cadastrar Nova Planta ou Tempero no Seu Diário
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Nome (ex: Cebolinha, Pimenta biquinho...)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
            required
          />
          <select
            value={potType}
            onChange={(e) => setPotType(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Vaso pequeno (10 a 14 cm)">Vaso pequeno (10 a 14 cm)</option>
            <option value="Vaso médio (15 a 20 cm)">Vaso médio (15 a 20 cm)</option>
            <option value="Jardineira retangular">Jardineira retangular</option>
            <option value="Vaso fundo de barro (25 cm+)">Vaso fundo de barro (25 cm+)</option>
            <option value="Canteiro direto na terra">Canteiro direto na terra</option>
          </select>
          <select
            value={sun}
            onChange={(e) => setSun(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Sol pleno (4 a 6h diretas)">Sol pleno (4 a 6h diretas)</option>
            <option value="Meia-sombra / Luz intensa indireta">Meia-sombra / Luz intensa indireta</option>
            <option value="Sol suave da manhã (2 a 3h)">Sol suave da manhã (2 a 3h)</option>
            <option value="Sombra luminosa sem sol direto">Sombra luminosa sem sol direto</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Orientação de rega personalizada..."
            value={guide}
            onChange={(e) => setGuide(e.target.value)}
            className="sm:col-span-2 px-3 py-2 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-600 rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-md text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Registrar no Diário
          </button>
        </div>
      </form>

      {/* Cartões de Plantas Cadastradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map((item) => (
          <div key={item.id} className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all shadow-xs flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">{item.name}</h4>
                  <div className="text-[11px] text-stone-600 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-stone-600 dark:text-stone-400" /> Plantio em: {item.plantedDate}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 p-1"
                  aria-label="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800 text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{item.sunNeed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{item.wateringGuideline}</span>
                </div>
                <div className="text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800 p-2 rounded text-[11px] mt-2 border border-stone-100 dark:border-stone-700">
                  {item.potType} • {item.userNotes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
