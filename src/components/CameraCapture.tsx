import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Data: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

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
        stream.getTracks().forEach((track) => track.stop());
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
      setError('No se pudo acceder a la cámara. Por favor verifica los permisos o utiliza la opción de subir archivo.');
    }
  };

  /**
   * stopCamera
   * Detiene y libera todas las pistas activas del stream de la cámara.
   */
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  /**
   * switchCamera
   * Alterna entre la cámara trasera ('environment') y la cámara delantera ('user').
   */
  const switchCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
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
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white">Capturar Foto del Producto</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport */}
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
              {/* Aiming Reticle */}
              <div className="pointer-events-none absolute inset-8 border border-white/30 rounded-xl flex items-center justify-center">
                <span className="text-xs text-white/70 bg-black/40 px-2 py-1 rounded backdrop-blur-xs">
                  Encuadra el producto centrado
                </span>
              </div>
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={switchCamera}
            disabled={!!error}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-40"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Girar Cámara</span>
          </button>

          <button
            type="button"
            onClick={handleCapture}
            disabled={!!error}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-400 text-slate-950 hover:bg-emerald-300 active:scale-95 transition-all shadow-lg font-bold disabled:opacity-40"
            title="Tomar Foto"
          >
            <Camera className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
