import React from 'react';
import { History, Trash2, ArrowRight, Tag, Clock } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryDrawerProps {
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onSelectHistory,
  onClearHistory,
}) => {
  if (history.length === 0) return null;

  const formatMXN = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val) + ' MXN';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">
            Historial Reciente de Valuaciones ({history.length})
          </h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Limpiar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectHistory(item)}
            className="p-3 bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-left transition-all group flex items-start gap-3 hover:bg-slate-950"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.productName}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <Tag className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white truncate block group-hover:text-emerald-300 transition-colors">
                {item.productName}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                <span>{item.condition}</span>
                <span>·</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {formatMXN(item.averageUsedPrice)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
