import React from 'react';
import { HelpCircle, CheckCircle2, ChevronRight, Sparkles, Check } from 'lucide-react';
import { MicroQuestion } from '../types';

interface MicroCheckBarProps {
  questions: MicroQuestion[];
  answers: Record<string, string>;
  onSelectAnswer: (questionId: string, answer: string) => void;
  onRecalculate: () => void;
  isRecalculating?: boolean;
}

export const MicroCheckBar: React.FC<MicroCheckBarProps> = ({
  questions,
  answers,
  onSelectAnswer,
  onRecalculate,
  isRecalculating = false,
}) => {
  if (!questions || questions.length === 0) return null;

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="bg-gradient-to-r from-slate-900/90 via-slate-950/90 to-slate-900/90 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_25px_rgba(16,185,129,0.12)] backdrop-blur-xl transition-all relative overflow-hidden">
      {/* Neon Top Edge Accent */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-70" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>🎯 Clava el Precio Exacto</span>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                {answeredCount}/{totalQuestions} Listas
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Confirma estos detalles rápidos para que nadie te regatee de más.
            </p>
          </div>
        </div>

        <button
          onClick={onRecalculate}
          disabled={isRecalculating || answeredCount === 0}
          className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-95 disabled:opacity-40 disabled:pointer-events-none rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          <span>{isRecalculating ? 'Ajustando...' : 'Afinar Precio'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {questions.map((q) => {
          const currentAnswer = answers[q.id] || q.selectedAnswer;

          return (
            <div key={q.id} className="space-y-2">
              <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {q.question}
              </p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const isSelected = currentAnswer === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => onSelectAnswer(q.id, opt)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all text-left flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-500/25 text-emerald-200 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-bold'
                          : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                      )}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
