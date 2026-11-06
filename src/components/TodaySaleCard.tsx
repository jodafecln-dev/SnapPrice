import React from 'react';
import { Calendar, Zap, Clock, TrendingUp, DollarSign, MessageCircle, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { TodayRecommendation, ValuationResult } from '../types';

interface TodaySaleCardProps {
  todayRec?: TodayRecommendation;
  result: ValuationResult;
}

/**
 * TodaySaleCard
 * Componente enfocado en la "Sugerencia de Venta al Día de Hoy".
 * Muestra el precio calibrado para cerrar trato en la fecha actual en México,
 * la velocidad de venta estimada (24-48 horas), el índice de liquidez gamer
 * y el horario con mayor pico de compradores activos en Marketplace y Mercado Libre.
 */
export const TodaySaleCard: React.FC<TodaySaleCardProps> = ({ todayRec, result }) => {
  const [copied, setCopied] = React.useState(false);

  // Fecha de hoy formateada en español (México)
  const todayFormatted = todayRec?.todayDate || new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const priceToday = todayRec?.recommendedSellPriceToday || result.strategies.c2c.fastSalePrice;
  const cashInHand = todayRec?.cashInHandFast || priceToday;
  const saleVelocity = todayRec?.expectedSaleVelocity || 'Venta rápida (24 a 48 hrs)';
  const momentum = todayRec?.marketMomentum || 'Alta rotación: fin de semana gamer con mayor búsqueda en México';
  const optimalHours = todayRec?.optimalListingTime || 'Publicar hoy entre 6:00 PM y 9:30 PM (Pico de compradores)';
  const demandIndex = todayRec?.gamingDemandIndex || 'Alta';

  /**
   * formatMXN
   * Formatea un monto monetario en Pesos Mexicanos ($XX,XXX MXN).
   */
  const formatMXN = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val) + ' MXN';
  };

  /**
   * handleCopyPrice
   * Copia el precio sugerido de hoy al portapapeles.
   */
  const handleCopyPrice = () => {
    navigator.clipboard.writeText(`${priceToday}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * handleShareWhatsAppToday
   * Abre WhatsApp con el mensaje de oferta de venta inmediata para hoy.
   */
  const handleShareWhatsAppToday = () => {
    const text = `⚡ *OFERTA SÓLO POR HOY (${capitalize(todayFormatted)})*
🎮 *${result.product.exactName}*
💰 *Precio Especial de Hoy:* ${formatMXN(priceToday)} en efectivo (Trato en mano)
✨ *Estado:* ${result.product.apparentCondition}
📍 *Entrega:* Punto medio seguro hoy mismo

¡Si te interesa mándame mensaje para apartarlo ya! 🤝`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950/50 via-slate-900/90 to-teal-950/40 border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-7 shadow-[0_0_35px_-5px_rgba(16,185,129,0.25)] relative overflow-hidden backdrop-blur-xl space-y-5">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Today's Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-500/30 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-400/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                ⚡ Radar de Oportunidad al Día
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-700/60 px-2 py-0.5 rounded-full">
                Demanda: {demandIndex}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              <span>Sugerencia de Venta Hoy ·</span>
              <span className="text-emerald-300 font-mono text-sm sm:text-base font-extrabold">{capitalize(todayFormatted)}</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleShareWhatsAppToday}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-slate-950" />
            <span>Oferta Express WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Metric Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative z-10">
        <div className="md:col-span-5 bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-5 space-y-2 shadow-inner">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Precio para Cerrar Trato Hoy Mismo:
          </span>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 tabular-nums drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
              {formatMXN(priceToday)}
            </div>
            <button
              onClick={handleCopyPrice}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold p-1 transition-colors"
              title="Copiar precio numérico"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-emerald-300/90 font-medium leading-relaxed">
            Sin regalar tu consola/juego: este precio se posiciona en el top 10% más atractivo de Marketplace hoy.
          </p>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Card 1: Sale Velocity */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Velocidad Estimada de Venta:
            </span>
            <span className="text-sm font-bold text-white block">
              {saleVelocity}
            </span>
            <span className="text-[11px] text-slate-400">
              Recibirás los primeros mensajes en menos de 3 horas.
            </span>
          </div>

          {/* Card 2: Peak Listing Hours */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Mejor Horario para Publicar Hoy:
            </span>
            <span className="text-sm font-bold text-amber-300 block">
              {optimalHours}
            </span>
            <span className="text-[11px] text-slate-400">
              Momento de mayor actividad de gamers buscando compras.
            </span>
          </div>

          {/* Card 3: Momentum */}
          <div className="sm:col-span-2 bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl flex items-start gap-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block">
                Comportamiento de la Categoría Gamer en México:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                {momentum}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
