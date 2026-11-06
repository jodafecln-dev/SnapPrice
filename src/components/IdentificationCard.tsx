import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  RotateCw,
  FileText,
  Sparkles,
  Tag,
  ShieldCheck,
  Layers,
  Smartphone,
} from 'lucide-react';
import { ValuationResult } from '../types';

interface IdentificationCardProps {
  result: ValuationResult;
  onOpenReportModal: () => void;
  onOpenStoryModal: () => void;
  onRevaluateWithCondition: (condition: any) => void;
}

export const IdentificationCard: React.FC<IdentificationCardProps> = ({
  result,
  onOpenReportModal,
  onOpenStoryModal,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { product, imagePreviewUrl, timestamp, marketRadiography } = result;

  const formattedDate = new Date(timestamp).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  /**
   * formatMXN
   * Formatea el precio promedio usado en el encabezado de la tarjeta ($XX,XXX MXN).
   * @param {number} val - Monto numérico.
   * @returns {string} Cadena monetaria legible para la UI.
   */
  const formatMXN = (val: number) => {
    return (
      new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 0,
      }).format(val) + ' MXN'
    );
  };

  return (
    <div className="perspective-1000 w-full">
      {/* 3D Flip Container */}
      <div
        className={`relative w-full rounded-2xl transition-transform duration-700 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ================= FRONT SIDE ================= */}
        <div className="backface-hidden w-full bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/30 hover:border-emerald-500/50 rounded-2xl p-5 sm:p-7 shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] backdrop-blur-xl relative overflow-hidden transition-all">
          {/* Subtle Cyber Grid Light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80 relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Producto Identificado
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                    95%+ Certeza
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  {product.exactName}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Interactive Flip Card Trigger Button */}
              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 active:scale-95 rounded-xl border border-emerald-500/40 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                title="Girar tarjeta para ver especificaciones y detalles"
              >
                <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Girar Tarjeta (3D)</span>
              </button>

              <button
                type="button"
                onClick={onOpenStoryModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900/90 active:scale-95 rounded-xl border border-emerald-400/50 transition-all shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                title="Crear póster 9:16 para historias de WhatsApp o Instagram"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Póster 9:16</span>
              </button>

              <button
                type="button"
                onClick={onOpenReportModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ver Reporte</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4 relative z-10">
            {/* Visual Preview */}
            {imagePreviewUrl && (
              <div className="md:col-span-5 relative group">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] relative">
                  <img
                    src={imagePreviewUrl}
                    alt={product.exactName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                    <span className="text-[11px] font-mono text-emerald-300 bg-slate-900/90 border border-emerald-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                      {product.brand} · {product.category}
                    </span>
                    <button
                      onClick={() => setIsFlipped(true)}
                      className="text-[10px] font-semibold text-slate-300 hover:text-white bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700 backdrop-blur-xs flex items-center gap-1"
                    >
                      <RotateCw className="w-3 h-3 text-emerald-400" /> Ver dorso
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Price Highlight & Status */}
            <div className={`${imagePreviewUrl ? 'md:col-span-7' : 'md:col-span-12'} space-y-4`}>
              {/* Highlight Neon Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-cyan-950/30 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Precio Promedio Usado en México
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] tabular-nums">
                    {formatMXN(marketRadiography.usedAverage)}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Referenciado en Mercado Libre MX, Marketplace y Amazon
                  </span>
                </div>

                <div className="self-start sm:self-center text-right bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">
                    Estado Visual
                  </span>
                  <span className="text-sm font-bold text-emerald-300 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {product.apparentCondition}
                  </span>
                </div>
              </div>

              {/* Specs Pills */}
              {product.keySpecs && product.keySpecs.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Especificaciones clave detectadas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.keySpecs.map((spec, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-lg shadow-xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Friendly advice */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-2">
                <span>
                  💡 <strong className="text-white">Tip de venta:</strong> Un artículo en estado{' '}
                  <strong className="text-emerald-400">"{product.apparentCondition}"</strong> suele
                  venderse en menos de 7 días si lo anuncias en su precio justo.
                </span>
                <button
                  onClick={() => setIsFlipped(true)}
                  className="text-emerald-400 hover:text-emerald-300 whitespace-nowrap font-bold shrink-0 text-xs"
                >
                  Ver ficha 3D →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE (FLIPPED) ================= */}
        <div className="backface-hidden absolute inset-0 w-full h-full rotate-y-180 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(56,189,248,0.2)] backdrop-blur-xl flex flex-col justify-between overflow-y-auto">
          {/* Back Header */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <RotateCw className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Ficha Técnica Reversible
                </span>
                <h3 className="text-base font-bold text-white">{product.exactName}</h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Voltear al Frente</span>
            </button>
          </div>

          {/* Back Body */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
            <div className="space-y-3 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                🔬 Métricas de Inspección
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between">
                  <span className="text-slate-400">Modelo Oficial:</span>
                  <span className="font-mono font-semibold text-white">{product.model}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Marca Comercial:</span>
                  <span className="font-semibold text-white">{product.brand}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Categoría Mercado:</span>
                  <span className="text-slate-200">{product.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Índice de Certeza:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {product.confidence}%
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Fecha de Valuación:</span>
                  <span className="text-slate-400 font-mono">{formattedDate}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                🇲🇽 Comparativa Rápida en México
              </span>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between">
                  <span className="text-slate-400">Precio Nuevo Tienda:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {formatMXN(marketRadiography.retailNewMin)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Mínimo en Marketplace:</span>
                  <span className="font-mono text-amber-300 font-semibold">
                    {formatMXN(marketRadiography.usedMin)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Promedio Transacciones:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {formatMXN(marketRadiography.usedAverage)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Tope con Caja Original:</span>
                  <span className="font-mono text-cyan-300 font-bold">
                    {formatMXN(marketRadiography.usedMax)}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Notes or inspection warning */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>
              {product.notes || 'Pieza homologada para venta legal en territorio mexicano.'}
            </span>
            <button
              onClick={() => setIsFlipped(false)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline text-xs ml-2"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
