import React, { useState, useRef } from 'react';
import { X, Download, MessageCircle, Share2, Smartphone, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { ValuationResult, UserIntent } from '../types';

interface StoryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ValuationResult;
  selectedIntent: UserIntent;
}

/**
 * StoryCardModal
 * Generador interactivo de fichas gráficas en proporción vertical 9:16 optimizadas
 * para Estados de WhatsApp, Historias de Instagram y publicaciones en Marketplace.
 * Permite personalizar el precio anunciado, incluir número de contacto y generar
 * una imagen PNG de alta resolución (1080x1920) renderizada mediante HTML5 Canvas en el cliente.
 */
export const StoryCardModal: React.FC<StoryCardModalProps> = ({
  isOpen,
  onClose,
  result,
  selectedIntent,
}) => {
  const { product, marketRadiography, strategies, imagePreviewUrl } = result;

  // Options for advertised price
  const [priceType, setPriceType] = useState<'fair' | 'fast' | 'custom'>('fair');
  const [customPrice, setCustomPrice] = useState<number>(strategies.c2c.fairPrice);
  const [contactInfo, setContactInfo] = useState<string>('');
  const [cityLocation, setCityLocation] = useState<string>('México (Trato seguro)');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  /**
   * getActivePrice
   * Determina el precio numérico a plasmar en la tarjeta según la opción elegida.
   * @returns {number} Monto en MXN.
   */
  const getActivePrice = (): number => {
    if (priceType === 'fast') return strategies.c2c.fastSalePrice;
    if (priceType === 'custom') return customPrice || strategies.c2c.fairPrice;
    return strategies.c2c.fairPrice;
  };

  /**
   * formatMXN
   * Formatea el valor numérico en estándar de pesos mexicanos ($XX,XXX MXN).
   * @param {number} val - Monto a formatear.
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

  const activePrice = getActivePrice();

  /**
   * generateAndDownloadImage
   * Renderiza en un canvas HTML5 de 1080x1920 px un póster gráfico estilo cyber-neón
   * con la fotografía del producto, sellos de autenticidad, comparativa de precios y
   * datos de contacto, descargándolo automáticamente como un archivo PNG ('snapprice-story.png').
   */
  const generateAndDownloadImage = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No se pudo inicializar el contexto 2D de Canvas');

      // 1. Fondo Degradado Deep Midnight Cyber
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
      bgGrad.addColorStop(0, '#030712'); // slate-950
      bgGrad.addColorStop(0.5, '#0a0f1d');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // 2. Resplandor Neón Superior e Inferior
      const glowTop = ctx.createRadialGradient(540, 200, 50, 540, 200, 500);
      glowTop.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
      glowTop.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = glowTop;
      ctx.fillRect(0, 0, 1080, 700);

      const glowBottom = ctx.createRadialGradient(540, 1700, 50, 540, 1700, 600);
      glowBottom.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
      glowBottom.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = glowBottom;
      ctx.fillRect(0, 1200, 1080, 720);

      // 3. Encabezado / Logo de SnapPrice MX
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 36px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SNAPPRICE MX · RADAR VISUAL', 540, 140);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 24px system-ui, sans-serif';
      ctx.fillText('COTIZACIÓN Y VALUACIÓN CERTIFICADA EN MÉXICO', 540, 180);

      // 4. Contenedor de la Imagen del Producto
      const imgBoxX = 90;
      const imgBoxY = 230;
      const imgBoxW = 900;
      const imgBoxH = 680;

      // Marco contenedor redondeado con borde neón
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.strokeRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH);
      ctx.fillStyle = '#020617';
      ctx.fillRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH);

      // Si hay imagen del producto, dibujarla centrada manteniendo proporción
      if (imagePreviewUrl) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = imagePreviewUrl;
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
          // Cover center
          const scale = Math.max(imgBoxW / img.width, imgBoxH / img.height);
          const x = imgBoxX + (imgBoxW - img.width * scale) / 2;
          const y = imgBoxY + (imgBoxH - img.height * scale) / 2;
          ctx.save();
          ctx.beginPath();
          ctx.rect(imgBoxX, imgBoxY, imgBoxW, imgBoxH);
          ctx.clip();
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          ctx.restore();
        } catch {
          // fallback placeholder
        }
      }

      // Badge de Condición sobre la imagen
      ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
      ctx.fillRect(120, 260, 360, 60);
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2;
      ctx.strokeRect(120, 260, 360, 60);
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 26px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`ESTADO: ${product.apparentCondition.toUpperCase()}`, 145, 302);

      // 5. Nombre del Producto
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 52px system-ui, sans-serif';
      ctx.textAlign = 'center';
      const cleanName = product.exactName.length > 38 ? product.exactName.substring(0, 35) + '...' : product.exactName;
      ctx.fillText(cleanName, 540, 990);

      // Categoría / Marca
      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 28px system-ui, sans-serif';
      ctx.fillText(`${product.brand.toUpperCase()} · ${product.category.toUpperCase()}`, 540, 1040);

      // 6. Tarjeta Principal de Precio Neón
      const priceBoxY = 1090;
      const priceGrad = ctx.createLinearGradient(120, priceBoxY, 960, priceBoxY);
      priceGrad.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      priceGrad.addColorStop(1, 'rgba(56, 189, 248, 0.15)');
      ctx.fillStyle = priceGrad;
      ctx.fillRect(120, priceBoxY, 840, 220);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.strokeRect(120, priceBoxY, 840, 220);

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 28px system-ui, sans-serif';
      ctx.fillText('PRECIO DE OFERTA DIRECTA', 540, priceBoxY + 55);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 86px monospace, sans-serif';
      ctx.fillText(formatMXN(activePrice), 540, priceBoxY + 145);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 24px system-ui, sans-serif';
      ctx.fillText('Trato directo · Sin intermediarios · Listo para entrega', 540, priceBoxY + 195);

      // 7. Comparativa de Plataformas en México
      const compY = 1350;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(120, compY, 840, 220);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(120, compY, 840, 220);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 26px system-ui, sans-serif';
      ctx.fillText('REFERENCIAS DE PRECIO EN MÉXICO', 540, compY + 45);

      // Column 1: ML
      ctx.textAlign = 'center';
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '22px system-ui, sans-serif';
      ctx.fillText('Mercado Libre MX', 260, compY + 105);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 32px monospace, sans-serif';
      ctx.fillText(formatMXN(marketRadiography.platformEstimates.mercadoLibre), 260, compY + 155);

      // Column 2: Marketplace
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '22px system-ui, sans-serif';
      ctx.fillText('Marketplace FB', 540, compY + 105);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 32px monospace, sans-serif';
      ctx.fillText(formatMXN(marketRadiography.platformEstimates.marketplace), 540, compY + 155);

      // Column 3: Nuevo Tienda
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '22px system-ui, sans-serif';
      ctx.fillText('Nuevo en Tienda', 820, compY + 105);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 32px monospace, sans-serif';
      ctx.fillText(formatMXN(marketRadiography.retailNewMin), 820, compY + 155);

      // 8. Barra de Contacto / Call to Action
      const contactY = 1610;
      ctx.fillStyle = '#042f2e';
      ctx.fillRect(120, contactY, 840, 160);
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 3;
      ctx.strokeRect(120, contactY, 840, 160);

      ctx.fillStyle = '#2dd4bf';
      ctx.font = 'bold 28px system-ui, sans-serif';
      ctx.fillText('¿TE INTERESA? ¡MÁNDAME MENSAJE DIRECTO!', 540, contactY + 55);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 36px system-ui, sans-serif';
      const contactDisplay = contactInfo.trim() || 'WhatsApp / Inbox Disponible';
      ctx.fillText(contactDisplay, 540, contactY + 105);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px system-ui, sans-serif';
      ctx.fillText(`Ubicación: ${cityLocation}`, 540, contactY + 140);

      // 9. Pie de página
      ctx.fillStyle = '#64748b';
      ctx.font = '20px system-ui, sans-serif';
      ctx.fillText('Generado con SnapPrice MX · Radar de Valuación Visual', 540, 1850);

      // Convertir a DataURL y descargar
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `snapprice-${product.brand.toLowerCase()}-${product.model.toLowerCase()}-historia.png`.replace(/\s+/g, '-');
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generando póster:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * handleShareWhatsApp
   * Abre directamente la aplicación de WhatsApp con un mensaje estructurado y listo
   * para enviar a contactos, grupos de ventas o publicar en estados.
   */
  const handleShareWhatsApp = () => {
    const text = `🔥 *OFERTA DISPONIBLE: ${product.exactName}*
💰 *Precio: ${formatMXN(activePrice)}*
✨ *Condición:* ${product.apparentCondition}
📍 *Entrega:* ${cityLocation}

📊 *Valuado con SnapPrice MX:*
- Mercado Libre MX promedio: ${formatMXN(marketRadiography.platformEstimates.mercadoLibre)}
- Tienda nuevo: ${formatMXN(marketRadiography.retailNewMin)}

${contactInfo ? `📲 Contacto directo: ${contactInfo}\n` : ''}¿Te interesa? ¡Mándame mensaje para cerrar trato! 🤝`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                Ficha para Historias de WhatsApp e Instagram (9:16)
              </h3>
              <p className="text-xs text-slate-400">
                Crea una imagen llamativa con tu foto y precio para publicar en tus estados en 1 clic.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left Preview, Right Controls */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Preview: 9:16 Smartphone Mockup */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-[260px] sm:w-[280px] aspect-9/16 rounded-3xl bg-slate-950 border-2 border-emerald-500/40 p-3.5 flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.25)] relative overflow-hidden select-none">
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Top Banner */}
              <div className="text-center relative z-10 pt-1">
                <span className="text-[10px] font-extrabold font-mono text-emerald-400 tracking-wider uppercase block">
                  SnapPrice MX · Certificado
                </span>
                <span className="text-[8px] text-slate-400 uppercase tracking-widest block">
                  Cotización Verificada
                </span>
              </div>

              {/* Product Photo Box */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-900 border border-emerald-500/30 my-2">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt={product.exactName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                    Sin foto
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-slate-950/90 border border-emerald-400/50 px-2 py-0.5 rounded-md text-[9px] font-bold text-emerald-300">
                  {product.apparentCondition}
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center space-y-0.5 relative z-10">
                <h4 className="text-xs font-extrabold text-white line-clamp-2 leading-tight">
                  {product.exactName}
                </h4>
                <span className="text-[10px] text-cyan-400 font-semibold block">
                  {product.brand} · {product.category}
                </span>
              </div>

              {/* Neon Price Badge */}
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border border-emerald-400/60 text-center relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Precio de Ocasión
                </span>
                <div className="text-xl font-black font-mono text-white tabular-nums drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                  {formatMXN(activePrice)}
                </div>
              </div>

              {/* Platform benchmarks mini */}
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800 text-[9px] flex justify-between text-slate-400 relative z-10">
                <span>ML: {formatMXN(marketRadiography.platformEstimates.mercadoLibre)}</span>
                <span className="text-emerald-400 font-semibold">Ahorras vs Nuevo</span>
              </div>

              {/* Contact Footer */}
              <div className="bg-emerald-950/50 border border-emerald-500/30 rounded-xl p-2 text-center relative z-10">
                <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Trato Directo
                </span>
                <span className="text-[10px] font-bold text-white block truncate">
                  {contactInfo.trim() || 'WhatsApp / Inbox Disponible'}
                </span>
                <span className="text-[8px] text-slate-400 block truncate">
                  {cityLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls & Customization */}
          <div className="md:col-span-7 space-y-5">
            {/* 1. Price Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Selecciona el precio que mostrará tu historia:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPriceType('fair')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    priceType === 'fair'
                      ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-bold block uppercase">Precio Justo</span>
                  <span className="text-sm font-mono font-bold text-white block">
                    {formatMXN(strategies.c2c.fairPrice)}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Recomendado</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriceType('fast')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    priceType === 'fast'
                      ? 'bg-amber-950/60 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-bold block uppercase">Venta Rápida</span>
                  <span className="text-sm font-mono font-bold text-white block">
                    {formatMXN(strategies.c2c.fastSalePrice)}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Cerrar en 48h</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriceType('custom')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    priceType === 'custom'
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-bold block uppercase">Personalizado</span>
                  <span className="text-sm font-mono font-bold text-white block">
                    {formatMXN(customPrice)}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Tú decides</span>
                </button>
              </div>

              {priceType === 'custom' && (
                <div className="pt-2">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400">$</span>
                    <input
                      type="number"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(Number(e.target.value))}
                      placeholder="Escribe tu precio..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-7 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. Contact Information */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Datos de contacto para la tarjeta (Opcional):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Ej. WhatsApp: 55 1234 5678"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
                <input
                  type="text"
                  value={cityLocation}
                  onChange={(e) => setCityLocation(e.target.value)}
                  placeholder="Ej. CDMX / Metro Zapata"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                type="button"
                onClick={generateAndDownloadImage}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-slate-950" />
                    <span>¡Imagen 9:16 Descargada con Éxito!</span>
                  </>
                ) : isGenerating ? (
                  <span>Generando imagen de alta definición (1080x1920)...</span>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-slate-950" />
                    <span>Descargar Imagen para Historias (PNG)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 border border-emerald-500/50 text-emerald-300 font-bold text-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Compartir texto estructurado en WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
