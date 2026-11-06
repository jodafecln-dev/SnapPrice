import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Search, 
  Sparkles, 
  X, 
  Image as ImageIcon, 
  Zap, 
  Tag, 
  Briefcase, 
  ShoppingCart, 
  TrendingUp,
  Sliders,
  CheckCircle2,
  Flame
} from 'lucide-react';
import { UserIntent, ProductCondition } from '../types';
import { SAMPLE_PRODUCTS, SampleItem } from '../data/samples';

interface ValuationInputProps {
  onEvaluate: (data: {
    imageBase64?: string;
    mimeType?: string;
    description: string;
    userIntent: UserIntent;
    selectedCondition?: ProductCondition;
  }) => void;
  onSelectSample: (sample: SampleItem) => void;
  onOpenLiveCamera: () => void;
  isLoading: boolean;
  userIntent: UserIntent;
  setUserIntent: (intent: UserIntent) => void;
}

export const ValuationInput: React.FC<ValuationInputProps> = ({
  onEvaluate,
  onSelectSample,
  onOpenLiveCamera,
  isLoading,
  userIntent,
  setUserIntent,
}) => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [condition, setCondition] = useState<ProductCondition | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * handleFileChange
   * Captura el archivo seleccionado a través del diálogo nativo del sistema de archivos.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio de input file.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  /**
   * processFile
   * Lee la imagen y aplica compresión y escalado en cliente mediante un elemento Canvas
   * a una dimensión máxima de 1280px con compresión JPEG al 88%.
   * Previene errores de payload excesivo (HTTP 413) y optimiza la velocidad de red.
   * 
   * @param {File} file - Archivo de imagen seleccionado o arrastrado.
   */
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 1280;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.88);
          setSelectedImage(compressed);
          setMimeType('image/jpeg');
        } else {
          setSelectedImage(event.target?.result as string);
          setMimeType(file.type || 'image/jpeg');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  /**
   * handleDragOver
   * Previene el comportamiento por defecto del navegador y activa el estado visual de arrastre.
   * @param {React.DragEvent} e - Evento de arrastre.
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * handleDragLeave
   * Restablece el estado visual de la zona de arrastre cuando el cursor sale.
   */
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  /**
   * handleDrop
   * Recibe el archivo soltado por el usuario en la zona de dropzone y lo procesa.
   * @param {React.DragEvent} e - Evento de soltar archivo.
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  /**
   * handleSubmit
   * Valida que exista al menos una imagen o descripción y dispara la valuación.
   * @param {React.FormEvent} e - Evento de envío de formulario.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage && !description.trim()) return;

    onEvaluate({
      imageBase64: selectedImage || undefined,
      mimeType,
      description: description.trim(),
      userIntent,
      selectedCondition: condition,
    });
  };

  /**
   * clearImage
   * Limpia la imagen cargada actualmente y resetea el input de tipo file.
   */
  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const conditions: { label: ProductCondition; desc: string }[] = [
    { label: 'Nuevo', desc: 'Sellado en empaque original de fábrica' },
    { label: 'Como nuevo', desc: 'Impecable, sin un solo rayón (10/10)' },
    { label: 'Usado - Bueno', desc: 'Muy bien cuidado, leves señas de uso' },
    { label: 'Desgaste visible', desc: 'Detalles estéticos notables pero funciona al 100%' },
    { label: 'Dañado', desc: 'Para reparar o piezas' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-[0_0_35px_-10px_rgba(16,185,129,0.12)] backdrop-blur-xl space-y-6 relative overflow-hidden">
      {/* Decorative subtle neon glow bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-400/50 to-cyan-500/0" />

      {/* 1. Intention Selector (Friendly marketing / SEO-driven) */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-emerald-400" />
          <span>¿Qué quieres lograr con este producto?</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => setUserIntent('c2c')}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
              userIntent === 'c2c'
                ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-white'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <Tag className={`w-4 h-4 ${userIntent === 'c2c' ? 'text-emerald-300' : 'text-slate-400'}`} />
              {userIntent === 'c2c' && (
                <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  Recomendado
                </span>
              )}
            </div>
            <span className="text-xs font-extrabold block">Quiero Vender</span>
            <span className="text-[11px] text-slate-400 leading-tight">Sácale más lana sin malbaratar</span>
          </button>

          <button
            type="button"
            onClick={() => setUserIntent('flipping')}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
              userIntent === 'flipping'
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] text-white'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <Briefcase className={`w-4 h-4 ${userIntent === 'flipping' ? 'text-purple-300' : 'text-slate-400'}`} />
              {userIntent === 'flipping' && (
                <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/90 border border-purple-500/40 px-2 py-0.5 rounded-full">
                  Flipping Pro
                </span>
              )}
            </div>
            <span className="text-xs font-extrabold block">Comprar y Revender</span>
            <span className="text-[11px] text-slate-400 leading-tight">Calcula margen del 100%</span>
          </button>

          <button
            type="button"
            onClick={() => setUserIntent('buyer')}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
              userIntent === 'buyer'
                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-white'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <ShoppingCart className={`w-4 h-4 ${userIntent === 'buyer' ? 'text-cyan-300' : 'text-slate-400'}`} />
              {userIntent === 'buyer' && (
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                  Compra Segura
                </span>
              )}
            </div>
            <span className="text-xs font-extrabold block">Quiero Comprar</span>
            <span className="text-[11px] text-slate-400 leading-tight">Paga lo justo y evita fraudes</span>
          </button>

          <button
            type="button"
            onClick={() => setUserIntent('research')}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
              userIntent === 'research'
                ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] text-white'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <TrendingUp className={`w-4 h-4 ${userIntent === 'research' ? 'text-amber-300' : 'text-slate-400'}`} />
              {userIntent === 'research' && (
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/90 border border-amber-500/40 px-2 py-0.5 rounded-full">
                  Tendencias
                </span>
              )}
            </div>
            <span className="text-xs font-extrabold block">Investigar Mercado</span>
            <span className="text-[11px] text-slate-400 leading-tight">Depreciación y demanda</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Input + Description Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Captura la foto del producto o escribe sus datos:
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual Dropzone & Live Camera Trigger */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all min-h-[190px] relative overflow-hidden ${
                isDragging
                  ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                  : selectedImage
                  ? 'border-emerald-500/60 bg-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : 'border-slate-700/80 bg-slate-950/50 hover:border-emerald-500/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedImage ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
                  <img
                    src={selectedImage}
                    alt="Producto a valuar"
                    className="max-h-36 rounded-xl object-contain shadow-md"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 p-1 bg-slate-900/90 hover:bg-rose-500 text-white rounded-full transition-colors shadow-lg border border-slate-700"
                    title="Eliminar imagen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Foto lista para valuación
                  </span>
                </div>
              ) : (
                <div className="space-y-3 p-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-slate-100 font-bold">
                      Sube o arrastra una foto aquí
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tomada con tu celular, capturas de pantalla o descargada
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-700"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Elegir Archivo</span>
                    </button>
                    <button
                      type="button"
                      onClick={onOpenLiveCamera}
                      className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Tomar Foto</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description & Model Details Input */}
            <div className="flex flex-col justify-between space-y-3">
              <div className="space-y-1.5 flex-1 flex flex-col">
                <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                  <span>¿Qué producto es? (Marca, modelo o detalles):</span>
                  <span className="text-[11px] text-emerald-400 font-normal">Súper fácil</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: PlayStation 5 Slim 1TB Estándar con 1 control DualSense blanco y caja, o Nintendo Switch OLED..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all resize-none"
                />

                {/* Preguntas de Apoyo Rápidas / Atajos Gamer */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    ⚡ Atajos rápidos (Toca para autocompletar):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'PS5 Slim 1TB',
                      'Switch OLED',
                      'Xbox Series X',
                      'Con Lector',
                      'Digital',
                      'Con Caja Original',
                      'Sin Drift al 100%',
                      '2 Controles',
                      'Juego Físico',
                    ].map((pill) => (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => {
                          setDescription((prev) =>
                            prev.includes(pill) ? prev : prev ? `${prev}, ${pill}` : pill
                          );
                        }}
                        className="px-2 py-0.5 text-[10px] font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
                      >
                        + {pill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Physical Condition Quick Tag */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold flex items-center gap-1 text-slate-200">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    ¿En qué estado físico está?
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    {condition || 'Detectar en foto'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCondition(undefined)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                      condition === undefined
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    Automático
                  </button>
                  {conditions.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setCondition(c.label)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                        condition === c.label
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                      title={c.desc}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Rastreo activo:</span>
            <span className="text-slate-200 font-medium">Mercado Libre MX · Marketplace · Amazon México</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || (!selectedImage && !description.trim())}
            className="w-full sm:w-auto px-7 py-3 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Analizando precios en México...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Calcular Precio Real (MXN)</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* 3. Ejemplos de Prueba Rápida con Activos de Estudio (Catálogo Demo) */}
      <div id="catalogo-demos" className="pt-5 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            O prueba 1 clic con estos productos populares en México:
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold">1 clic para cotizar</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_PRODUCTS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className="group p-2.5 bg-slate-950/70 border border-slate-800 hover:border-emerald-400/60 rounded-2xl text-left transition-all flex flex-col gap-2 hover:bg-slate-950 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-900 relative">
                <img
                  src={sample.imagePath}
                  alt={sample.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 right-1 text-[10px] font-mono text-emerald-300 bg-slate-900/90 border border-emerald-500/40 px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                  {sample.apparentCondition}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                  {sample.name}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold block mt-0.5">
                  Promedio: ${sample.initialResult.marketRadiography.usedAverage.toLocaleString('es-MX')} MXN
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
