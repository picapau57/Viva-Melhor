import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle, Home, Filter, Sparkles } from 'lucide-react';

interface Chore {
  id: string;
  room: 'Cozinha' | 'Banheiro' | 'Quartos' | 'Sala' | 'Lavanderia';
  task: string;
  frequency: 'Diária' | 'Semanal' | 'Quinzenal';
  estimatedMinutes: number;
  completed: boolean;
}

const INITIAL_CHORES: Chore[] = [
  { id: '1', room: 'Cozinha', task: 'Lavar a louça e secar a pia', frequency: 'Diária', estimatedMinutes: 15, completed: false },
  { id: '2', room: 'Cozinha', task: 'Limpar fogão e bancadas', frequency: 'Diária', estimatedMinutes: 10, completed: false },
  { id: '3', room: 'Cozinha', task: 'Descartar lixo orgânico', frequency: 'Diária', estimatedMinutes: 3, completed: false },
  { id: '4', room: 'Cozinha', task: 'Limpeza interna da geladeira e auditoria de vencimentos', frequency: 'Semanal', estimatedMinutes: 20, completed: false },
  { id: '5', room: 'Banheiro', task: 'Passar rodinho no vidro do box pós-banho', frequency: 'Diária', estimatedMinutes: 1, completed: false },
  { id: '6', room: 'Banheiro', task: 'Higienizar vaso sanitário e trocar toalhas de rosto', frequency: 'Semanal', estimatedMinutes: 15, completed: false },
  { id: '7', room: 'Banheiro', task: 'Despejar bicarbonato e vinagre no ralo do chuveiro', frequency: 'Quinzenal', estimatedMinutes: 5, completed: false },
  { id: '8', room: 'Quartos', task: 'Arrumar a cama ao levantar', frequency: 'Diária', estimatedMinutes: 2, completed: false },
  { id: '9', room: 'Quartos', task: 'Trocar lençóis e fronhas de cama', frequency: 'Semanal', estimatedMinutes: 10, completed: false },
  { id: '10', room: 'Quartos', task: 'Tirar poeira das superfícies e aspirar sob a cama', frequency: 'Semanal', estimatedMinutes: 15, completed: false },
  { id: '11', room: 'Sala', task: 'Guardar objetos fora do lugar antes de dormir', frequency: 'Diária', estimatedMinutes: 5, completed: false },
  { id: '12', room: 'Sala', task: 'Passar pano úmido no chão e limpar marcas de dedos em vidros', frequency: 'Semanal', estimatedMinutes: 20, completed: false },
  { id: '13', room: 'Lavanderia', task: 'Bater máquina com roupas acumuladas da categoria', frequency: 'Semanal', estimatedMinutes: 10, completed: false },
  { id: '14', room: 'Lavanderia', task: 'Limpar filtro de fiapos da máquina e bandeja de sabão', frequency: 'Quinzenal', estimatedMinutes: 10, completed: false },
];

export const ChorePlanner: React.FC = () => {
  const [chores, setChores] = useState<Chore[]>(INITIAL_CHORES);
  const [selectedRoom, setSelectedRoom] = useState<string>('Todos');
  const [selectedFreq, setSelectedFreq] = useState<string>('Todos');

  const handleToggle = (id: string) => {
    setChores((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const handleReset = () => {
    setChores((prev) => prev.map((c) => ({ ...c, completed: false })));
  };

  const filtered = chores.filter((c) => {
    const matchRoom = selectedRoom === 'Todos' || c.room === selectedRoom;
    const matchFreq = selectedFreq === 'Todos' || c.frequency === selectedFreq;
    return matchRoom && matchFreq;
  });

  const completedCount = chores.filter((c) => c.completed).length;
  const totalMinutes = filtered.reduce((acc, c) => acc + c.estimatedMinutes, 0);

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-6 space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Home className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Planejador de Tarefas Domésticas por Ambiente
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Distribua e acompanhe tarefas sem exaustão, dividindo a manutenção da casa em pequenos blocos de minutos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="text-xs px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-md transition"
          >
            Reiniciar Marcações
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Cômodo:
        </span>
        {['Todos', 'Cozinha', 'Banheiro', 'Quartos', 'Sala', 'Lavanderia'].map((room) => (
          <button
            key={room}
            onClick={() => setSelectedRoom(room)}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              selectedRoom === room
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Resumo de Tempo */}
      <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
        <div>
          Concluídas: <strong className="text-emerald-700 dark:text-emerald-400">{completedCount} de {chores.length} tarefas</strong>
        </div>
        <div>
          Tempo estimado nas tarefas filtradas: <strong className="text-stone-900 dark:text-stone-100">{totalMinutes} minutos</strong>
        </div>
      </div>

      {/* Lista de Tarefas */}
      <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={`p-4 flex items-center justify-between cursor-pointer select-none transition ${
              item.completed ? 'bg-stone-50 dark:bg-stone-850/60 text-stone-500 dark:text-stone-400' : 'hover:bg-emerald-50/30 dark:hover:bg-stone-800/40 text-stone-900 dark:text-stone-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-stone-400 dark:text-stone-500 shrink-0" />
              )}
              <div>
                <div className={`text-sm font-semibold ${item.completed ? 'line-through text-stone-500 dark:text-stone-400' : ''}`}>
                  {item.task}
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 flex items-center gap-2 mt-0.5">
                  <span className="bg-stone-200 dark:bg-stone-750 text-stone-700 dark:text-stone-300 px-1.5 py-0.2 rounded font-medium text-[10px]">
                    {item.room}
                  </span>
                  <span>•</span>
                  <span>{item.frequency}</span>
                </div>
              </div>
            </div>
            <div className="text-xs font-semibold text-stone-600 dark:text-stone-400">
              ~{item.estimatedMinutes} min
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
