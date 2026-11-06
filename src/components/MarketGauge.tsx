import React from 'react';
import {
  ShoppingCart,
  Store,
  Flame,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import { ValuationResult } from '../types';

interface MarketGaugeProps {
  radiography: ValuationResult['marketRadiography'];
  productName?: string;
}

/**
 * MarketGauge
 * Despliega la radiografía de precios en territorio mexicano (pesos MXN),
 * comparativa entre tienda nueva y mercado de segunda mano, barra visual continua
 * y enlaces interactivos para contrastar publicaciones activas en tiempo real
 * en Mercado Libre México, Facebook Marketplace y Amazon México.
 */
export const MarketGauge: React.FC<MarketGaugeProps> = ({ radiography, productName }) => {
  const { retailNewMin, retailNewMax, usedMin, usedMax, usedAverage, platformEstimates } =
    radiography;

  /**
   * formatMXN
   * Formatea valores de los indicadores de mercado y plataformas en pesos mexicanos ($XX,XXX MXN).
   * @param {number} val - Cifra en moneda nacional.
   * @returns {string} Cadena formateada para la interfaz de radiografía.
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

  // Calculate percentage position of used average within the used range
  const rangeSpan = Math.max(usedMax - usedMin, 1);
  const avgPositionPct = Math.min(Math.max(((usedAverage - usedMin) / rangeSpan) * 100, 10), 90);

  const queryTerm = encodeURIComponent(productName || 'productos');
  const mlSearchUrl = `https://listado.mercadolibre.com.mx/${queryTerm}`;
  const fbSearchUrl = `https://www.facebook.com/marketplace/search/?query=${queryTerm}`;
  const amzSearchUrl = `https://www.amazon.com.mx/s?k=${queryTerm}`;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-[0_0_35px_-10px_rgba(16,185,129,0.1)] backdrop-blur-xl space-y-6 relative overflow-hidden">
      {/* Decorative neon corner glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Currency Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>📊 Radiografía de Precios en México</span>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              MXN
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Precios reales calculados para Mercado Libre México, Marketplace y Amazon.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-xl self-start sm:self-auto">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Alta demanda de búsqueda en México</span>
        </div>
      </div>

      {/* 3 Core KPI Blocks with Modern Cyber Neon Treatment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Retail New */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-1.5 transition-all hover:border-slate-700">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Nuevo en Tienda Departamental
          </span>
          <div className="text-base sm:text-lg font-mono font-extrabold text-slate-200 tabular-nums">
            {formatMXN(retailNewMin)} – {formatMXN(retailNewMax)}
          </div>
          <p className="text-xs text-slate-400">Liverpool, Amazon MX y distribuidores oficiales</p>
        </div>

        {/* Used Market Range */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-1.5 transition-all hover:border-slate-700">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Rango de Usados en Redes
          </span>
          <div className="text-base sm:text-lg font-mono font-extrabold text-slate-200 tabular-nums">
            {formatMXN(usedMin)} – {formatMXN(usedMax)}
          </div>
          <p className="text-xs text-slate-400">
            Desde piezas con uso hasta piezas con empaque original
          </p>
        </div>

        {/* Real Used Average - Neon Focal Anchor */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-cyan-950/30 border border-emerald-500/50 rounded-2xl p-4 space-y-1 relative overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.2)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-emerald-400" /> Promedio Real
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 rounded-full">
              Punto de Oro
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 tabular-nums drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">
            {formatMXN(usedAverage)}
          </div>
          <p className="text-xs text-emerald-300/90 font-medium">
            El precio al que realmente se cierran las ventas
          </p>
        </div>
      </div>

      {/* Visual Continuum Bar */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between text-xs text-slate-300 font-mono tabular-nums">
          <span>Oportunidad: {formatMXN(usedMin)}</span>
          <span className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
            Promedio: {formatMXN(usedAverage)}
          </span>
          <span>Tope con Caja: {formatMXN(usedMax)}</span>
        </div>

        <div className="relative h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-700/60 p-0.5 shadow-inner">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400/60 via-emerald-400/80 to-cyan-400/80 w-full rounded-full" />
          {/* Target marker with neon glow */}
          <div
            className="absolute top-0 bottom-0 w-2.5 bg-white -translate-x-1/2 rounded-full shadow-[0_0_10px_#fff]"
            style={{ left: `${avgPositionPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Para sacar dinero rápido</span>
          <span>Zona de mayor rotación</span>
          <span>Impecable con accesorios</span>
        </div>
      </div>

      {/* Platform Benchmarks Breakdown with Live Direct Compare Links */}
      <div className="pt-2 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ¿En cuánto se vende en cada plataforma?
          </h4>
          <span className="text-[11px] text-emerald-400 font-medium">
            Toca para contrastar en vivo ↗
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Mercado Libre */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2.5 hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">Mercado Libre MX</span>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                Con comisión
              </span>
            </div>
            <div className="text-base font-mono font-bold text-white tabular-nums">
              {formatMXN(platformEstimates.mercadoLibre)}
            </div>
            <a
              href={mlSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-bold rounded-lg border border-amber-500/30 transition-colors"
            >
              <span>Ver en Mercado Libre</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Facebook Marketplace */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2.5 hover:border-sky-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400">Facebook Marketplace</span>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                Trato en mano
              </span>
            </div>
            <div className="text-base font-mono font-bold text-white tabular-nums">
              {formatMXN(platformEstimates.marketplace)}
            </div>
            <a
              href={fbSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-[11px] font-bold rounded-lg border border-sky-500/30 transition-colors"
            >
              <span>Ver en Marketplace</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Amazon MX */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2.5 hover:border-orange-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400">Amazon MX Renewed</span>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                Con garantía
              </span>
            </div>
            <div className="text-base font-mono font-bold text-white tabular-nums">
              {formatMXN(platformEstimates.amazon)}
            </div>
            <a
              href={amzSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-[11px] font-bold rounded-lg border border-orange-500/30 transition-colors"
            >
              <span>Ver en Amazon MX</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
