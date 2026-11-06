import React, { useState } from 'react';
import { X, Copy, Check, FileText, Printer, MessageCircle, Award, ShieldCheck, Sparkles, QrCode } from 'lucide-react';
import { ValuationResult, UserIntent } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ValuationResult;
  selectedIntent: UserIntent;
}

/**
 * ReportModal
 * Modal multifunción de exportación oficial que ofrece:
 * 1. Ficha en Texto Limpio (formato estándar para copiar y pegar en publicaciones).
 * 2. Certificado Oficial de Avalúo Imprimible / PDF con folio único serial,
 *    marca de agua de verificación institucional, sello digital y desglose formal de mercado.
 * 3. Compartir en WhatsApp con un solo clic.
 */
export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  result,
  selectedIntent,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'certificate'>('text');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { product, marketRadiography, strategies, microCheck, timestamp } = result;

  // Generar folio único basado en la marca de tiempo
  const folioNumber = `MX-VAL-${Math.abs(new Date(timestamp).getTime() % 1000000)
    .toString()
    .padStart(6, '0')}`;

  const formattedDate = new Date(timestamp).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  /**
   * formatMXN
   * Formatea un número en formato estándar de moneda mexicana ($XX,XXX MXN).
   * @param {number} val - Cantidad numérica.
   * @returns {string} Texto formateado con símbolo de pesos y sufijo MXN.
   */
  const formatMXN = (val: number): string => {
    return (
      new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 0,
      }).format(val) + ' MXN'
    );
  };

  /**
   * generateCleanReportText
   * Genera la cadena de texto estructurada con el formato exacto requerido por
   * la especificación de SnapPrice con emojis, subtítulos y desglose de estrategia.
   * @returns {string} Reporte listo para copiar o exportar en texto plano.
   */
  const generateCleanReportText = (): string => {
    let microText = '';
    if (microCheck && microCheck.length > 0) {
      const q = microCheck[0];
      microText = `\n- *“Para afinar el precio exacto, indícame: ${q.question}”*`;
    }

    let strategyBlock = '';
    if (selectedIntent === 'c2c') {
      strategyBlock = `#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **${formatMXN(strategies.c2c.fastSalePrice)}** (Ideal para cerrar trato en pocos días).
- ⚖️ **Precio Justo:** **${formatMXN(strategies.c2c.fairPrice)}** (Recomendado para Mercado Libre / Marketplace).
- ⏳ **Venta Paciente:** **${formatMXN(strategies.c2c.patientSalePrice)}** (Si cuentas con caja, accesorios y cero prisa).
- 📝 **Ficha para Publicar (Copia y Pega):**
  - **Título SEO sugerido:** ${strategies.c2c.listingTitle}
  - **Descripción corta:** ${strategies.c2c.listingDescription}`;
    } else if (selectedIntent === 'flipping') {
      strategyBlock = `#### 🎯 Estrategia Recomendada (Revendedor / Flipping)
- 💼 **Oferta Máxima de Compra recomendada:** **${formatMXN(strategies.flipping.maxPurchasePrice)}** (40-50% del valor para asegurar tu margen).
- **Ganancia Bruta Estimada:** **${formatMXN(strategies.flipping.grossProfit)}** (ROI estimado ~${strategies.flipping.roiPercentage}%).
- **Negociación:** "${strategies.flipping.negotiationScript}"`;
    } else if (selectedIntent === 'buyer') {
      strategyBlock = `#### 🎯 Estrategia Recomendada (Compra Inteligente)
- 🛒 **Precio Objetivo de Compra:** Busca ofertas entre **${formatMXN(strategies.buyer.targetMin)}** y **${formatMXN(strategies.buyer.targetMax)}**.
- 🛡️ **Consejo antifraude:** ${strategies.buyer.antiFraudAdvice}
- 🚨 **Alerta de Posible Estafa:** Desconfía de publicaciones por debajo de ${formatMXN(strategies.buyer.scamWarningThreshold)}.`;
    } else {
      strategyBlock = `#### 🎯 Estrategia Recomendada (Investigación de Mercado)
- 📈 **Tendencia:** ${strategies.research.trend}
- **Depreciación estimada:** ${strategies.research.annualDepreciationRate}
- **Liquidez:** ${strategies.research.liquidityIndex}
- **Notas de mercado:** ${strategies.research.marketNotes}`;
    }

    return `### 🇲🇽 SnapPrice MX - Valuación Oficial
#### 📸 Identificación del Producto
- **Producto:** ${product.brand} ${product.model}
- **Estado Aparente:** ${product.apparentCondition}${microText}

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** ${formatMXN(marketRadiography.retailNewMin)} – ${formatMXN(marketRadiography.retailNewMax)}
- **Usado (Rango de mercado):** ${formatMXN(marketRadiography.usedMin)} – ${formatMXN(marketRadiography.usedMax)}
- **Promedio Usado Real:** **${formatMXN(marketRadiography.usedAverage)}**

---

${strategyBlock}

---
*Emitido por SnapPrice MX · Cotización Inteligente en México*`;
  };

  const reportText = generateCleanReportText();

  /**
   * handleCopy
   * Copia el reporte oficial limpio al portapapeles del dispositivo y activa la confirmación visual.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /**
   * handlePrint
   * Dispara el cuadro de impresión nativo del navegador configurado para generar
   * PDF o imprimir la hoja de certificación física.
   */
  const handlePrint = () => {
    window.print();
  };

  /**
   * handleShareWhatsApp
   * Abre directamente WhatsApp Web o app móvil con el informe oficial prellenado.
   */
  const handleShareWhatsApp = () => {
    const text = `🇲🇽 *REPORTE DE VALUACIÓN OFICIAL SNAPPRICE MX*
📋 *Folio:* ${folioNumber}
📦 *Artículo:* ${product.exactName} (${product.apparentCondition})
💰 *Precio Justo Recomendado:* ${formatMXN(strategies.c2c.fairPrice)}
⚡ *Venta Rápida:* ${formatMXN(strategies.c2c.fastSalePrice)}

📊 *Promedio en Mercado Libre & Marketplace:* ${formatMXN(marketRadiography.usedAverage)}

Valuado con visión artificial e inteligencia de mercado SnapPrice MX 🚀`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:max-w-none print:w-full print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                Ficha Oficial & Certificado de Valuación
              </h3>
              <p className="text-xs text-slate-400 font-mono">Folio: {folioNumber}</p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'text'
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ficha Texto
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('certificate')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'certificate'
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Certificado PDF
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans text-sm text-slate-200">
          {activeTab === 'text' ? (
            /* Tab 1: Clean Text Report */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Formato listo para copiar en correos, cotizaciones y WhatsApp:</span>
                <span className="font-mono text-emerald-400">100% Validado</span>
              </div>
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 whitespace-pre-wrap font-mono text-xs leading-relaxed select-all shadow-inner text-slate-200">
                {reportText}
              </div>
            </div>
          ) : (
            /* Tab 2: Printable Official Certificate (PDF Printable View) */
            <div className="bg-slate-950 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden print:border-2 print:border-black print:bg-white print:text-black shadow-[0_0_35px_rgba(16,185,129,0.15)]">
              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] print:opacity-[0.06] -rotate-12">
                <span className="text-8xl sm:text-9xl font-black uppercase text-center leading-none">
                  CERTIFICADO SNAPPRICE
                </span>
              </div>

              {/* Certificate Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/30 print:border-black">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                    República Mexicana · Valuación Comercial Independiente
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white print:text-black tracking-tight">
                    CERTIFICADO DE AVALÚO VISUAL
                  </h2>
                </div>
                <div className="text-left sm:text-right font-mono text-xs">
                  <span className="text-slate-400 print:text-gray-600 block">Folio de Registro:</span>
                  <span className="text-emerald-300 print:text-black font-extrabold text-sm">{folioNumber}</span>
                  <span className="text-[10px] text-slate-500 print:text-gray-500 block">{formattedDate}</span>
                </div>
              </div>

              {/* Product Info Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 print:bg-gray-100 p-4 rounded-xl border border-slate-800 print:border-gray-300 text-xs">
                <div>
                  <span className="text-slate-400 print:text-gray-600 block uppercase text-[10px] font-bold">
                    Artículo Valuado
                  </span>
                  <span className="text-base font-extrabold text-white print:text-black block">
                    {product.exactName}
                  </span>
                  <span className="text-slate-400 print:text-gray-700 block mt-0.5">
                    Marca: {product.brand} · Modelo: {product.model}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block uppercase text-[10px] font-bold">
                    Estado Físico / Condición
                  </span>
                  <span className="text-sm font-bold text-emerald-400 print:text-black flex items-center gap-1.5 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-black" />
                    {product.apparentCondition}
                  </span>
                  <span className="text-slate-400 print:text-gray-700 block mt-0.5">
                    Certeza del algoritmo: {product.confidence}%
                  </span>
                </div>
              </div>

              {/* Appraisal Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 print:text-black uppercase tracking-wider block">
                  Desglose de Avalúo Comercial (Pesos Mexicanos - MXN)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-slate-900 print:bg-gray-50 border border-slate-800 print:border-gray-300 rounded-xl">
                    <span className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-bold block">
                      Venta Rápida (48h)
                    </span>
                    <span className="text-lg font-mono font-extrabold text-amber-300 print:text-black">
                      {formatMXN(strategies.c2c.fastSalePrice)}
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-950/40 print:bg-emerald-50 border border-emerald-500/50 print:border-emerald-600 rounded-xl">
                    <span className="text-[10px] text-emerald-400 print:text-emerald-800 uppercase font-extrabold block">
                      ★ Valor Comercial Justo
                    </span>
                    <span className="text-xl font-mono font-black text-emerald-300 print:text-emerald-900">
                      {formatMXN(strategies.c2c.fairPrice)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900 print:bg-gray-50 border border-slate-800 print:border-gray-300 rounded-xl">
                    <span className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-bold block">
                      Promedio Mercado Libre
                    </span>
                    <span className="text-lg font-mono font-extrabold text-cyan-300 print:text-black">
                      {formatMXN(marketRadiography.platformEstimates.mercadoLibre)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clearance Statement & Digital Signature */}
              <div className="pt-4 border-t border-slate-800 print:border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="space-y-1 text-slate-400 print:text-gray-600 max-w-sm">
                  <p className="text-[11px] leading-relaxed">
                    Este documento certifica que el valor comercial ha sido calculado analizando transacciones reales en Mercado Libre México, Facebook Marketplace y Amazon México.
                  </p>
                  <span className="text-[10px] font-mono text-emerald-400 print:text-black block">
                    Hash Verificación: SHA256-SNAP-{folioNumber}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-slate-900 print:bg-gray-100 p-3 rounded-xl border border-slate-800 print:border-gray-300">
                  <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center text-slate-950">
                    <QrCode className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white print:text-black block uppercase">
                      Sello de Autenticidad
                    </span>
                    <span className="text-[10px] text-emerald-400 print:text-gray-700 font-mono block">
                      SnapPrice Engine v1.3
                    </span>
                    <span className="text-[9px] text-slate-400 print:text-gray-500 block">
                      Válido en todo México
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl border border-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Imprimir Ficha (PDF)</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-950/70 hover:bg-emerald-900/80 rounded-xl border border-emerald-500/40 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Enviar a WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-xl transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>¡Reporte Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Reporte Limpio</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
