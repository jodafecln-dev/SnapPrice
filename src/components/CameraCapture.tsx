import React, { useRef, useState, useEffect } from 'react';
import {
  Camera,
  X,
  RefreshCw,
  AlertCircle,
  Gamepad2,
  Disc,
  Tag,
  Sparkles,
  Check,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { CameraGuideMode } from '../types';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Data: string) => void;
}

/**
 * CameraCapture
 * Flujo Guiado por la Cámara para Videojuegos, Consolas y Coleccionables.
 * Proporciona retículas y encuadres especializados según el elemento a fotografiar:
 * - Consola Completa: Encuadre horizontal para detectar puertos, ventilas y estado físico.
 * - Portada / Caja: Proporción vertical para títulos de juegos y carátulas.
 * - Control / Mandos: Retícula oval para sticks análogos (revisión de drift y botones).
 * - Etiqueta de Serie: Macro-guía para números de modelo (CFI, CUH, HAC, Model 1888).
 */
export const CameraCapture: React.FC<CameraCaptureProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [guideMode, setGuideMode] = useState<CameraGuideMode>('console');
  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  /**
   * startCamera
   * Solicita acceso al hardware de la cámara del usuario vía MediaDevices.getUserMedia,
   * asigna el stream al elemento de video y maneja denegaciones de permisos de forma amigable.
   */
  const startCamera = async () => {
    setError(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      setError(
        'No se pudo acceder a la cámara. Por favor verifica los permisos del navegador o sube una imagen de la galería.'
      );
    }
  };

  /**
   * stopCamera
   * Detiene y libera todas las pistas activas del stream de la cámara.
   */
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  /**
   * switchCamera
   * Alterna entre la cámara trasera ('environment') y la cámara delantera ('user').
   */
  const switchCamera = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  /**
   * handleCapture
   * Extrae el frame actual del video, lo dibuja en un canvas temporal,
   * genera el Data URL JPEG y lo entrega al callback onCapture antes de cerrar el modal.
   */
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 960;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      onCapture(dataUrl);
      stopCamera();
      onClose();
    }
  };

  if (!isOpen) return null;

  // Guidance texts per mode
  const guideInfo = {
    console: {
      title: 'Encuadra la Consola Completa',
      tip: 'Coloca la consola en horizontal con buena luz para capturar carcasas, ventilas y puertos.',
      shape: 'border-2 border-emerald-400/80 rounded-2xl w-[85%] h-[65%]',
    },
    game_box: {
      title: 'Encuadra la Portada o Cartucho',
      tip: 'Centra la portada verticalmente. El algoritmo leerá el título y la región (USA/Latam).',
      shape: 'border-2 border-cyan-400/80 rounded-xl w-[55%] h-[80%]',
    },
    controller: {
      title: 'Encuadra el Control / Joy-Con',
      tip: 'Acerca las palancas análogas y botones frontales para evaluar desgaste y drift.',
      shape: 'border-2 border-purple-400/80 rounded-3xl w-[75%] h-[60%]',
    },
    serial_label: {
      title: 'Encuadra la Etiqueta de Serie / Modelo',
      tip: 'Acerca la cámara a la base o etiqueta trasera (ej. CFI-1215A, HAC-001) para confirmar versión exacta.',
      shape: 'border-2 border-amber-400/80 rounded-lg w-[85%] h-[35%]',
    },
    general: {
      title: 'Encuadre General',
      tip: 'Centra el artículo gamer en pantalla.',
      shape: 'border-2 border-white/60 rounded-xl w-[80%] h-[70%]',
    },
  }[guideMode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm sm:text-base">
                Flujo Guiado por la Cámara Gamer
              </h3>
              <p className="text-[11px] text-slate-400">
                Selecciona qué estás fotografiando para afinar la retícula
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

        {/* Mode Selector Tabs (Flujo Guiado) */}
        <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setGuideMode('console')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              guideMode === 'console'
                ? 'bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Consola</span>
          </button>

          <button
            type="button"
            onClick={() => setGuideMode('game_box')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              guideMode === 'game_box'
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Juego / Caja</span>
          </button>

          <button
            type="button"
            onClick={() => setGuideMode('controller')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              guideMode === 'controller'
                ? 'bg-purple-400 text-slate-950 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Control / Mandos</span>
          </button>

          <button
            type="button"
            onClick={() => setGuideMode('serial_label')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              guideMode === 'serial_label'
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Serie / Modelo</span>
          </button>
        </div>

        {/* Viewport with Dynamic Guided Reticle */}
        <div className="relative aspect-4/3 bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-slate-400 flex flex-col items-center gap-3">
              <AlertCircle className="w-8 h-8 text-amber-400" />
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Dynamic Aiming Reticle Overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
                <div
                  className={`relative ${guideInfo.shape} flex flex-col items-center justify-between p-3 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]`}
                >
                  {/* Corner Crosshairs */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />

                  {/* Top Guide Label */}
                  <span className="text-[11px] font-bold text-white bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-md">
                    {guideInfo.title}
                  </span>

                  {/* Bottom Scan Laser Line Effect */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
                </div>
              </div>

              {/* Real-time Guidance Tip Pill */}
              <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                <div className="bg-slate-950/85 border border-slate-700/80 px-3 py-1.5 rounded-xl text-center backdrop-blur-md">
                  <p className="text-[11px] text-slate-200">
                    💡 <strong className="text-white">Tip:</strong> {guideInfo.tip}
                  </p>
                </div>
              </div>
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={switchCamera}
            disabled={!!error}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-40"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Girar Cámara</span>
          </button>

          <button
            type="button"
            onClick={handleCapture}
            disabled={!!error}
            className="flex items-center gap-2 px-6 py-3 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-95 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all cursor-pointer disabled:opacity-50"
          >
            <Camera className="w-4 h-4 text-slate-950" />
            <span>Tomar Foto & Analizar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
