import React, { useState } from 'react';
import { 
  Zap, 
  Scale, 
  Clock, 
  Copy, 
  Check, 
  Briefcase, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Calculator, 
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Flame,
  MessageCircle
} from 'lucide-react';
import { ValuationResult, UserIntent } from '../types';

interface StrategyPanelProps {
  result: ValuationResult;
  selectedIntent: UserIntent;
  onSelectIntent: (intent: UserIntent) => void;
}

export const StrategyPanel: React.FC<StrategyPanelProps> = ({
  result,
  selectedIntent,
  onSelectIntent,
}) => {
  const { strategies, marketRadiography } = result;
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Flipping interactive calculator state
  const [refurbCost, setRefurbCost] = useState<number>(strategies.flipping.refurbBuffer || 400);
  const [platformFeePct, setPlatformFeePct] = useState<number>(10);
  
  // Buyer test price simulator state
  const [simulatedPrice, setSimulatedPrice] = useState<string>('');

  /**
   * formatMXN
   * Formatea un valor monetario en Pesos Mexicanos ($XX,XXX MXN).
   * @param {number} val - Cantidad numérica a formatear.
   * @returns {string} Texto formateado con separadores de miles y sufijo MXN.
   */
  const formatMXN = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val) + ' MXN';
  };

  /**
   * handleCopy
   * Copia un bloque de texto al portapapeles del dispositivo y actualiza el
   * estado temporal del botón con retroalimentación visual durante 2.5 segundos.
   * @param {string} text - Contenido a copiar (título, descripción o ficha completa).
   * @param {string} sectionKey - Clave única del botón para activar el icono de confirmación.
   */
  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  /**
   * handleShareWhatsAppListing
   * Abre WhatsApp con el título del producto, precio justo y descripción prellenados
   * listos para compartir con compradores interesados o grupos de venta.
   */
  const handleShareWhatsAppListing = () => {
    const text = `🔥 *${strategies.c2c.listingTitle}*
💰 *Precio:* ${formatMXN(strategies.c2c.fairPrice)} (Trato directo)

📝 *Detalles:*
${strategies.c2c.listingDescription}

🤝 Valuado con certeza en SnapPrice MX. ¡Mándame mensaje si te interesa!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  /**
   * handleShareWhatsAppNegotiation
   * Abre WhatsApp con la propuesta de negociación para enviar de inmediato al vendedor del artículo.
   */
  const handleShareWhatsAppNegotiation = () => {
    if (!strategies.flipping.negotiationScript) return;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(strategies.flipping.negotiationScript)}`,
      '_blank'
    );
  };

  // Dynamic calculations for flipping
  const maxBuyPrice = strategies.flipping.maxPurchasePrice;
  const targetSellPrice = strategies.flipping.targetResalePrice || marketRadiography.usedAverage;
  const calculatedPlatformFee = Math.round((targetSellPrice * platformFeePct) / 100);
  const dynamicNetProfit = targetSellPrice - maxBuyPrice - refurbCost - calculatedPlatformFee;
  const dynamicROI = maxBuyPrice > 0 ? Math.round((dynamicNetProfit / maxBuyPrice) * 100) : 0;

  // Dynamic buyer scam calculation
  const parsedSimulatedPrice = parseFloat(simulatedPrice) || 0;
  const scamRiskThreshold = strategies.buyer.scamWarningThreshold || (marketRadiography.usedAverage * 0.6);
  const isSuspiciouslyLow = parsedSimulatedPrice > 0 && parsedSimulatedPrice < scamRiskThreshold;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-[0_0_35px_-10px_rgba(16,185,129,0.12)] backdrop-blur-xl space-y-6 relative overflow-hidden">
      {/* Intent switcher tabs (anti-slop segmented control with neon indicators) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>🎯 Estrategia Recomendada para tu Meta</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Elige tu objetivo y mira los números exactos para cerrar el trato.
          </p>
        </div>

        {/* Intent Tabs with Neon Highlights */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full shadow-inner">
          <button
            onClick={() => onSelectIntent('c2c')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              selectedIntent === 'c2c'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Quiero Vender
          </button>
          <button
            onClick={() => onSelectIntent('flipping')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              selectedIntent === 'flipping'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Revendedor / Flip
          </button>
          <button
            onClick={() => onSelectIntent('buyer')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              selectedIntent === 'buyer'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Quiero Comprar
          </button>
          <button
            onClick={() => onSelectIntent('research')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              selectedIntent === 'research'
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Investigar
          </button>
        </div>
      </div>

      {/* 1. VENDEDOR PARTICULAR */}
      {selectedIntent === 'c2c' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Venta Rápida */}
            <div className="bg-slate-950/80 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-4 space-y-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.08)]">
              <div className="flex items-center justify-between text-amber-400">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Venta Rápida
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full text-amber-300">
                  Liquidación 48 hrs
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-200 tabular-nums">
                {formatMXN(strategies.c2c.fastSalePrice)}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                El precio perfecto para recibir mensajes en Marketplace el mismo día y cerrar en horas.
              </p>
            </div>

            {/* Precio Justo - Hero Neon Focus */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-teal-950/40 border border-emerald-400/60 rounded-2xl p-4 space-y-2 relative overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.25)]">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-4 h-4" /> Precio Justo
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                  Más Recomendado
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-300 tabular-nums drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
                {formatMXN(strategies.c2c.fairPrice)}
              </div>
              <p className="text-xs text-emerald-300/90 leading-relaxed font-medium">
                Punto óptimo: no regalas tu dinero y la venta se concreta en aproximadamente una semana.
              </p>
            </div>

            {/* Venta Paciente */}
            <div className="bg-slate-950/80 border border-cyan-500/30 hover:border-cyan-400/60 rounded-2xl p-4 space-y-2 transition-all shadow-[0_0_15px_rgba(56,189,248,0.08)]">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Venta Paciente
                </span>
                <span className="text-[10px] font-mono font-bold bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-full text-cyan-300">
                  Margen Alto
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-200 tabular-nums">
                {formatMXN(strategies.c2c.patientSalePrice)}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Solo si tu artículo tiene empaque original, accesorios intactos y no tienes ninguna prisa.
              </p>
            </div>
          </div>

          {/* Ficha para Publicar (Copia y Pega) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <Copy className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">📝 Tu Anuncio Listo para Copiar y Pegar</h4>
                  <p className="text-xs text-slate-400">Diseñado con palabras clave para que el algoritmo de Mercado Libre y Marketplace te posicione arriba.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleShareWhatsAppListing}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900/80 active:scale-95 rounded-xl border border-emerald-500/40 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                  title="Compartir anuncio listo por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `${strategies.c2c.listingTitle}\n\n${strategies.c2c.listingDescription}`,
                      'fullListing'
                    )
                  }
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-95 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0"
                >
                  {copiedSection === 'fullListing' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Anuncio</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SEO Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-200">Título Atractivo (Optimizado para búsquedas):</span>
                <button
                  onClick={() => handleCopy(strategies.c2c.listingTitle, 'title')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {copiedSection === 'title' ? 'Copiado' : 'Copiar solo título'}
                </button>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 font-semibold select-all">
                {strategies.c2c.listingTitle}
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-200">Texto del Anuncio (Claro y directo):</span>
                <button
                  onClick={() => handleCopy(strategies.c2c.listingDescription, 'desc')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {copiedSection === 'desc' ? 'Copiado' : 'Copiar descripción'}
                </button>
              </div>
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed select-all whitespace-pre-wrap">
                {strategies.c2c.listingDescription}
              </div>
            </div>

            {/* Recommendations */}
            {strategies.c2c.tips && strategies.c2c.tips.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-xs font-bold text-slate-400 block mb-2">Tips para cerrar el trato sin problemas:</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {strategies.c2c.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. REVENDEDOR / FLIPPING */}
      {selectedIntent === 'flipping' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Suggested Max Purchase */}
            <div className="bg-slate-950/80 border border-purple-500/40 rounded-2xl p-5 space-y-2 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <div className="flex items-center justify-between text-purple-400">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" /> Oferta Máxima de Compra Sugerida
                </span>
                <span className="text-xs font-mono font-bold bg-purple-500/15 border border-purple-500/40 px-2 py-0.5 rounded-full text-purple-300">
                  40% - 50% del valor
                </span>
              </div>
              <div className="text-3xl font-mono font-extrabold text-white tabular-nums">
                {formatMXN(maxBuyPrice)}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tu precio tope para comprar barato, dejar margen de limpieza o comisiones y revender con ~100% de ganancia bruta.
              </p>
            </div>

            {/* Gross Profit Projection */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-purple-950/30 border border-emerald-500/50 rounded-2xl p-5 space-y-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Ganancia Estimada
                </span>
                <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  ROI ~{dynamicROI}%
                </span>
              </div>
              <div className="text-3xl font-mono font-extrabold text-emerald-300 tabular-nums drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                {formatMXN(strategies.flipping.grossProfit)}
              </div>
              <p className="text-xs text-emerald-300/80 leading-relaxed">
                Revendiendo al precio promedio justo de {formatMXN(targetSellPrice)}.
              </p>
            </div>
          </div>

          {/* Interactive Flipping Margin Calculator */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-extrabold text-white">Calculadora Dinámica de Ganancia Neta</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Inversión en limpieza o accesorios:</span>
                  <span className="font-mono font-bold text-white">{formatMXN(refurbCost)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2500"
                  step="50"
                  value={refurbCost}
                  onChange={(e) => setRefurbCost(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Comisión plataforma o envío (%):</span>
                  <span className="font-mono font-bold text-white">{platformFeePct}% ({formatMXN(calculatedPlatformFee)})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={platformFeePct}
                  onChange={(e) => setPlatformFeePct(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono">
                <span>Compra: {formatMXN(maxBuyPrice)}</span>
                <span className="mx-2">·</span>
                <span>Gastos: {formatMXN(refurbCost + calculatedPlatformFee)}</span>
                <span className="mx-2">·</span>
                <span>Venta: {formatMXN(targetSellPrice)}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-sans">Ganancia Neta en tu Bolsillo:</span>
                <span className="text-xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 tabular-nums">
                  {formatMXN(dynamicNetProfit)} ({dynamicROI}% ROI)
                </span>
              </div>
            </div>

            {strategies.flipping.negotiationScript && (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">Mensaje Sugerido para Negociar en WhatsApp o Inbox:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleShareWhatsAppNegotiation}
                      className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
                      title="Enviar oferta directamente a WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <span className="text-slate-600">·</span>
                    <button
                      onClick={() => handleCopy(strategies.flipping.negotiationScript, 'script')}
                      className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                    >
                      {copiedSection === 'script' ? '¡Copiado!' : 'Copiar mensaje'}
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 italic select-all">
                  "{strategies.flipping.negotiationScript}"
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. COMPRADOR */}
      {selectedIntent === 'buyer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Purchase Target */}
            <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-5 space-y-2 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Precio de Compra Ideal
                </span>
                <span className="text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full text-emerald-300">
                  Rango Justo
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tabular-nums">
                {formatMXN(strategies.buyer.targetMin)} – {formatMXN(strategies.buyer.targetMax)}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                La franja donde encuentras productos 100% auténticos y cuidados sin pagar de más.
              </p>
            </div>

            {/* Scam Threshold Warning */}
            <div className="bg-slate-950/80 border border-rose-500/40 rounded-2xl p-5 space-y-2 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
              <div className="flex items-center justify-between text-rose-400">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Alerta de Posible Estafa
                </span>
                <span className="text-xs font-mono font-bold bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-full text-rose-300">
                  Peligro
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-rose-300 tabular-nums">
                Menos de {formatMXN(scamRiskThreshold)}
              </div>
              <p className="text-xs text-rose-300/80 leading-relaxed">
                Si ves este producto por debajo de este precio, 99% seguro es un perfil fantasma pidiendo apartado o con candado.
              </p>
            </div>
          </div>

          {/* Interactive Price Scam Prober */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              ¿Viste una oferta y dudas si es real? Escribe el precio aquí:
            </h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400">$</span>
                <input
                  type="number"
                  placeholder="Ej. 5200"
                  value={simulatedPrice}
                  onChange={(e) => setSimulatedPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-7 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {parsedSimulatedPrice > 0 && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  isSuspiciouslyLow
                    ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                    : parsedSimulatedPrice <= strategies.buyer.targetMax
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                }`}
              >
                {isSuspiciouslyLow ? (
                  <div className="flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">¡CUIDADO! POSIBLE GANCHO FRAUDULENTO</strong>
                      {formatMXN(parsedSimulatedPrice)} está más de 40% por debajo del mercado ({formatMXN(marketRadiography.usedAverage)}). Típica estafa donde te piden transferir para apartarlo o "mandarlo por paquetería". ¡No des anticipos!
                    </div>
                  </div>
                ) : parsedSimulatedPrice <= strategies.buyer.targetMax ? (
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">PRECIO EXCELENTE</strong>
                      Está en el rango sano de compra. Solo recuerda probarlo en persona antes de pagar.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">PRECIO UN POCO CARO</strong>
                      El vendedor pide {formatMXN(parsedSimulatedPrice)}. Tienes margen para negociar hasta los {formatMXN(marketRadiography.usedAverage)}.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Anti-Fraud Advice & Checklist */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                🛡️ Consejo de Seguridad para este Artículo:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                {strategies.buyer.antiFraudAdvice}
              </p>
            </div>

            {strategies.buyer.verificationChecklist && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300 block">
                  Checklist para revisar cuando te veas con el vendedor:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {strategies.buyer.verificationChecklist.map((check, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300">
                      <div className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        ✓
                      </div>
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. INVESTIGACIÓN */}
      {selectedIntent === 'research' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                📈 Demanda en México
              </span>
              <div className="text-lg font-extrabold text-white">
                {strategies.research.trend}
              </div>
              <p className="text-xs text-slate-400">
                Interés de compra registrado en plataformas nacionales.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                📉 Pérdida de Valor Anual
              </span>
              <div className="text-lg font-mono font-extrabold text-amber-300 tabular-nums">
                {strategies.research.annualDepreciationRate}
              </div>
              <p className="text-xs text-slate-400">
                Pérdida promedio frente a su costo de lanzamiento.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                ⚡ Velocidad de Venta
              </span>
              <div className="text-lg font-extrabold text-emerald-300">
                {strategies.research.liquidityIndex}
              </div>
              <p className="text-xs text-slate-400">
                Qué tan fácil es convertirlo a efectivo en México.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-extrabold text-white">Análisis de Mercado & Cuándo te conviene venderlo</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {strategies.research.marketNotes}
            </p>
            {strategies.research.bestTimeToSell && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-xs text-emerald-300">
                <span className="font-bold">Mejor fecha para vender: </span>
                {strategies.research.bestTimeToSell}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
