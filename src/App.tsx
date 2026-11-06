import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ValuationInput } from './components/ValuationInput';
import { IdentificationCard } from './components/IdentificationCard';
import { MarketGauge } from './components/MarketGauge';
import { MicroCheckBar } from './components/MicroCheckBar';
import { StrategyPanel } from './components/StrategyPanel';
import { ReportModal } from './components/ReportModal';
import { StoryCardModal } from './components/StoryCardModal';
import { TodaySaleCard } from './components/TodaySaleCard';
import { TransparentMarketPanel } from './components/TransparentMarketPanel';
import { CameraCapture } from './components/CameraCapture';
import { HistoryDrawer } from './components/HistoryDrawer';
import { AntiFraudSection } from './components/AntiFraudSection';
import { ValuationResult, UserIntent, ProductCondition, HistoryItem } from './types';
import { SAMPLE_PRODUCTS, SampleItem } from './data/samples';
import { 
  auth, 
  loginWithGoogle, 
  logoutUser, 
  saveValuationToCloud, 
  fetchUserValuationsFromCloud,
  deleteValuationFromCloud,
  testFirestoreConnection
} from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Sparkles, AlertCircle, RefreshCw, ArrowUp, CloudCheck, Camera, ArrowRight } from 'lucide-react';

export default function App() {
  const [userIntent, setUserIntent] = useState<UserIntent>('c2c');
  const [currentResult, setCurrentResult] = useState<ValuationResult>(SAMPLE_PRODUCTS[0].initialResult);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Firebase Auth user state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Micro-check answered states
  const [microAnswers, setMicroAnswers] = useState<Record<string, string>>({
    controllers_count: '1 Control original',
    digital_account: 'Edición Estándar (Con Lector)',
    box_condition: 'Con caja y uniceles originales',
  });

  // Modals state
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);

  // History state loaded from localStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem('snapprice_history');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read history from localStorage', e);
    }
    return [
      {
        id: 'hist-1',
        productName: SAMPLE_PRODUCTS[0].name,
        condition: SAMPLE_PRODUCTS[0].apparentCondition,
        averageUsedPrice: SAMPLE_PRODUCTS[0].initialResult.marketRadiography.usedAverage,
        fastSalePrice: SAMPLE_PRODUCTS[0].initialResult.strategies.c2c.fastSalePrice,
        userIntent: 'c2c',
        timestamp: new Date().toISOString(),
        imageUrl: SAMPLE_PRODUCTS[0].imagePath,
        result: SAMPLE_PRODUCTS[0].initialResult,
      },
    ];
  });

  const [activeSection, setActiveSection] = useState<string>('valuador');

  // Verify connection to Firestore on boot per Firebase skill guidelines
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setCurrentUser(user);
      if (user) {
        // Fetch valuations from Firestore and merge with local history
        try {
          const cloudValuations = await fetchUserValuationsFromCloud(user.uid);
          if (cloudValuations && cloudValuations.length > 0) {
            setHistory((prev) => {
              const combined = [...cloudValuations, ...prev.filter((p: HistoryItem) => !cloudValuations.some((c: HistoryItem) => c.id === p.id))];
              return combined.slice(0, 20);
            });
            showNotification(`¡Bienvenido ${user.displayName || 'a SnapPrice'}! Valuaciones sincronizadas con Firestore.`);
          }
        } catch (e) {
          console.warn('Could not sync cloud history:', e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('snapprice_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }, [history]);

  /**
   * showNotification
   * Despliega un mensaje flotante temporal tipo toast con autocierre en 4 segundos.
   * @param {string} msg - Texto a mostrar al usuario.
   */
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  /**
   * handleLogin
   * Inicia el flujo de autenticación con Google vía Firebase Auth y notifica el resultado.
   * Maneja cancelaciones de popup de forma silenciosa e informa amigablemente si el navegador bloquea ventanas.
   */
  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const user = await loginWithGoogle();
      if (user) {
        showNotification(`¡Bienvenido! Sesión iniciada como ${user.displayName || user.email}`);
      }
    } catch (err: any) {
      const code = err?.code;
      if (
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/cancelled-popup-request' ||
        code === 'auth/user-cancelled'
      ) {
        return;
      }
      if (code === 'auth/popup-blocked') {
        setErrorMessage('El navegador bloqueó la ventana emergente de Google. Por favor autoriza las ventanas emergentes en tu navegador para continuar.');
        return;
      }
      console.warn('Detalle de autenticación:', err?.message || err);
      setErrorMessage('No se pudo iniciar sesión con Google: ' + (err?.message || 'Error de conexión'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  /**
   * handleLogout
   * Cierra la sesión activa del usuario en Firebase Auth y notifica en pantalla.
   */
  const handleLogout = async () => {
    try {
      await logoutUser();
      showNotification('Sesión cerrada correctamente.');
    } catch (err: any) {
      console.warn('Aviso al cerrar sesión:', err?.message || err);
    }
  };

  /**
   * handleEvaluate
   * Orquestador principal de cotización. Envía la imagen o descripción al servidor
   * backend (/api/evaluate), procesa la respuesta de Gemini o fallback matemático,
   * actualiza los componentes de mercado, registra en el historial local y, si el usuario
   * está autenticado, sincroniza de forma transparente con Cloud Firestore.
   * 
   * @param {Object} data - Parámetros de valuación con imagen opcional, descripción, intención y condición.
   */
  const handleEvaluate = async (data: {
    imageBase64?: string;
    mimeType?: string;
    description: string;
    userIntent: UserIntent;
    selectedCondition?: ProductCondition;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          microAnswers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      }

      const result: ValuationResult = await response.json();
      if (data.imageBase64) {
        result.imagePreviewUrl = data.imageBase64;
      }
      setCurrentResult(result);

      // Reset micro-check answers for new product
      const newAnswers: Record<string, string> = {};
      if (result.microCheck) {
        result.microCheck.forEach((q) => {
          if (q.selectedAnswer) {
            newAnswers[q.id] = q.selectedAnswer;
          }
        });
      }
      setMicroAnswers(newAnswers);

      // Build history item
      const newHistoryItem: HistoryItem = {
        id: 'hist-' + Date.now(),
        productName: result.product.exactName,
        condition: result.product.apparentCondition,
        averageUsedPrice: result.marketRadiography.usedAverage,
        fastSalePrice: result.strategies.c2c.fastSalePrice,
        userIntent: data.userIntent,
        timestamp: new Date().toISOString(),
        imageUrl: result.imagePreviewUrl,
        result,
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]);

      // If user is authenticated, persist to Firestore cloud database
      if (currentUser?.uid) {
        saveValuationToCloud(currentUser.uid, newHistoryItem).catch((e) =>
          console.warn('Failed saving to Firestore in background:', e)
        );
      }

      // Scroll smoothly to results
      const resultsElem = document.getElementById('resultados');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err: any) {
      console.warn('Aviso en cotización:', err?.message || err);
      setErrorMessage(
        err.message || 'No se pudo completar la valuación. Por favor intenta con una descripción más detallada o verifica tu conexión.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleRecalculateMicro
   * Afina y recalibra la valuación activa incorporando las respuestas seleccionadas
   * por el usuario en las preguntas de desempate (Micro-Check).
   * Cuenta con recálculo dinámico en cliente si el backend experimenta latencia.
   */
  const handleRecalculateMicro = async () => {
    if (!currentResult) return;
    setIsRecalculating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: currentResult.imagePreviewUrl?.startsWith('data:') ? currentResult.imagePreviewUrl : undefined,
          description: `${currentResult.product.exactName} - Respuestas adicionales: ${JSON.stringify(microAnswers)}`,
          userIntent,
          microAnswers,
          selectedCondition: currentResult.product.apparentCondition,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error afinando valuación: ${response.status}`);
      }

      const result: ValuationResult = await response.json();
      result.imagePreviewUrl = currentResult.imagePreviewUrl;
      setCurrentResult(result);
    } catch (err: any) {
      console.warn('Aviso en recálculo de micro-checks:', err?.message || err);
      // Fallback: apply client-side mathematical adjustment so user gets instant responsive feedback
      const cloned = JSON.parse(JSON.stringify(currentResult)) as ValuationResult;
      let multiplier = 1.0;
      Object.values(microAnswers).forEach((val) => {
        if (val.includes('256 GB')) multiplier += 0.08;
        if (val.includes('512 GB')) multiplier += 0.16;
        if (val.includes('1 TB')) multiplier += 0.22;
        if (val.includes('2 Controles')) multiplier += 0.12;
        if (val.includes('Sin control')) multiplier -= 0.12;
        if (val.includes('Con Lector') || val.includes('Estándar')) multiplier += 0.10;
        if (val.includes('Digital')) multiplier -= 0.08;
        if (val.includes('Sin drift') || val.includes('100% calibrados')) multiplier += 0.05;
        if (val.includes('Drift') || val.includes('drift')) multiplier -= 0.10;
        if (val.includes('Con caja') || val.includes('Caja +')) multiplier += 0.06;
        if (val.includes('Solo consola') || val.includes('Solo equipo') || val.includes('suelto')) multiplier -= 0.08;
      });

      cloned.marketRadiography.usedAverage = Math.round(cloned.marketRadiography.usedAverage * multiplier);
      cloned.marketRadiography.usedMin = Math.round(cloned.marketRadiography.usedMin * multiplier);
      cloned.marketRadiography.usedMax = Math.round(cloned.marketRadiography.usedMax * multiplier);
      cloned.marketRadiography.platformEstimates.mercadoLibre = Math.round(cloned.marketRadiography.usedAverage * 1.05);
      cloned.marketRadiography.platformEstimates.marketplace = Math.round(cloned.marketRadiography.usedAverage * 0.95);
      cloned.marketRadiography.platformEstimates.amazon = Math.round((cloned.marketRadiography.retailNewMin || cloned.marketRadiography.usedAverage * 1.3) * 0.92);

      cloned.strategies.c2c.fastSalePrice = Math.round(cloned.marketRadiography.usedAverage * 0.82);
      cloned.strategies.c2c.fairPrice = cloned.marketRadiography.usedAverage;
      cloned.strategies.c2c.patientSalePrice = cloned.marketRadiography.usedMax;
      cloned.strategies.flipping.maxPurchasePrice = Math.round(cloned.marketRadiography.usedAverage * 0.45);
      cloned.strategies.flipping.grossProfit = cloned.marketRadiography.usedAverage - cloned.strategies.flipping.maxPurchasePrice;
      cloned.strategies.buyer.targetMin = cloned.marketRadiography.usedMin;
      cloned.strategies.buyer.targetMax = cloned.marketRadiography.usedAverage;
      cloned.strategies.buyer.scamWarningThreshold = Math.round(cloned.marketRadiography.usedAverage * 0.6);

      if (cloned.todayRecommendation) {
        cloned.todayRecommendation.recommendedSellPriceToday = cloned.strategies.c2c.fastSalePrice;
        cloned.todayRecommendation.cashInHandFast = cloned.strategies.c2c.fastSalePrice;
      }

      setCurrentResult(cloned);
    } finally {
      setIsRecalculating(false);
    }
  };

  /**
   * handleSelectSample
   * Carga inmediatamente una cotización de muestra prediseñada con fotografía
   * de estudio de alta resolución (ej. iPhone 13 Pro, PS5, MacBook, Sony Alpha).
   * @param {SampleItem} sample - Objeto del producto de demostración seleccionado.
   */
  const handleSelectSample = (sample: SampleItem) => {
    setCurrentResult(sample.initialResult);
    const initialAnswers: Record<string, string> = {};
    sample.initialResult.microCheck.forEach((q) => {
      if (q.selectedAnswer) initialAnswers[q.id] = q.selectedAnswer;
    });
    setMicroAnswers(initialAnswers);
    setErrorMessage(null);

    const resultsElem = document.getElementById('resultados');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * handleSelectHistoryItem
   * Restaura en pantalla una valuación guardada previamente en el historial local o de Firestore.
   * @param {HistoryItem} item - Registro del historial a visualizar.
   */
  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCurrentResult(item.result);
    setUserIntent(item.userIntent);
    const resultsElem = document.getElementById('resultados');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * handleClearHistory
   * Limpia el registro local de valuaciones en memoria y en localStorage.
   */
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('snapprice_history');
    } catch (e) {
      console.warn(e);
    }
  };

  /**
   * handleCameraCapture
   * Callback invocado al disparar la cámara en vivo. Recibe la imagen en base64
   * y lanza la valuación con visión computacional.
   * @param {string} base64Image - Imagen codificada en formato DataURL Base64.
   */
  const handleCameraCapture = (base64Image: string) => {
    handleEvaluate({
      imageBase64: base64Image,
      mimeType: 'image/jpeg',
      description: '',
      userIntent,
    });
  };

  /**
   * scrollToTop
   * Desplaza la ventana suavemente hacia el inicio de la página para iniciar una nueva valuación.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * handleTriggerPhotoUpload
   * Controlador del botón Call to Action principal.
   * Simula un clic en el input de archivo oculto para abrir el selector nativo
   * de imágenes (o cámara en smartphones) de forma inmediata con un solo toque,
   * o despliega la cámara en vivo integrada si no hay input nativo disponible.
   */
  const handleTriggerPhotoUpload = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    } else {
      setIsCameraOpen(true);
    }
  };

  /**
   * handleNavigateSection
   * Gestiona el scroll y navegación suave entre las secciones principales
   * ('valuador', 'catalogo', 'flipping', 'antifraude').
   * @param {string} sectionId - Identificador de la sección destino.
   */
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'valuador') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'catalogo') {
      const el = document.getElementById('catalogo-demos');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'flipping') {
      setUserIntent('flipping');
      const el = document.getElementById('resultados');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'antifraude') {
      const el = document.getElementById('antifraude-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Bar Header with Google Sign-in */}
      <Header
        onNewValuation={scrollToTop}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
      />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-950/90 border border-emerald-500/60 rounded-xl text-emerald-200 text-xs sm:text-sm flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-200">
          <CloudCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="p-4 bg-rose-950/60 border border-rose-500/60 rounded-xl text-rose-200 text-xs sm:text-sm flex items-start justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Aviso del Sistema:</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-400 hover:text-white"
            >
              Entendido
            </button>
          </div>
        )}

        {/* Hero & Input Hub */}
        <section id="valuador-input" className="space-y-4">
          <div className="max-w-3xl space-y-4">
            {currentUser && (
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-slate-400 font-medium px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">
                  ☁️ Sincronizado en tu cuenta
                </span>
              </div>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              ¿Cuánto vale lo que tienes?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.35)]">
                Sube una foto y Cotízalo en segundos.
              </span>
            </h1>

            {/* Botón Call to Action */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleTriggerPhotoUpload}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <Camera className="w-5 h-5 text-slate-950 group-hover:rotate-6 transition-transform" />
                <span>Subir foto y cotizar ahora</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <ValuationInput
            onEvaluate={handleEvaluate}
            onSelectSample={handleSelectSample}
            onOpenLiveCamera={() => setIsCameraOpen(true)}
            isLoading={isLoading}
            userIntent={userIntent}
            setUserIntent={setUserIntent}
          />
        </section>

        {/* Results Section */}
        {currentResult && (
          <section id="resultados" className="space-y-6 pt-4 border-t border-slate-800/80">
            {/* Identification Card (Pillar 1) */}
            <IdentificationCard
              result={currentResult}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onOpenStoryModal={() => setIsStoryModalOpen(true)}
              onRevaluateWithCondition={(cond) => {
                const updated = { ...currentResult };
                updated.product.apparentCondition = cond;
                setCurrentResult(updated);
              }}
            />

            {/* Sugerencia de Venta al Día de Hoy */}
            <TodaySaleCard
              todayRec={currentResult.todayRecommendation}
              result={currentResult}
            />

            {/* Micro-Check Bar (Pillar 2: Preguntas de Desempate) */}
            {currentResult.microCheck && currentResult.microCheck.length > 0 && (
              <MicroCheckBar
                questions={currentResult.microCheck}
                answers={microAnswers}
                onSelectAnswer={(qid, ans) => {
                  setMicroAnswers((prev) => ({ ...prev, [qid]: ans }));
                }}
                onRecalculate={handleRecalculateMicro}
                isRecalculating={isRecalculating}
              />
            )}

            {/* Radiografía de Mercado (México - MXN) */}
            <MarketGauge
              radiography={currentResult.marketRadiography}
              productName={currentResult.product.exactName}
            />

            {/* Muestreo Transparente en Vivo de Comercio Electrónico & Fórmula FMV */}
            <TransparentMarketPanel
              samples={currentResult.realMarketSamples}
              calculation={currentResult.fairMarketCalculation}
              result={currentResult}
            />

            {/* Recommended Strategy (Pillar 3 & Mathematical Engine) */}
            <StrategyPanel
              result={currentResult}
              selectedIntent={userIntent}
              onSelectIntent={setUserIntent}
            />
          </section>
        )}

        {/* History of Valuations */}
        {history.length > 0 && (
          <section id="historial" className="pt-2">
            <HistoryDrawer
              history={history}
              onSelectHistory={handleSelectHistoryItem}
              onClearHistory={handleClearHistory}
            />
          </section>
        )}

        {/* Anti-Fraud Section */}
        <section id="antifraude-section" className="pt-2">
          <AntiFraudSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 mt-16 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">SnapPrice MX</span>
            <span>·</span>
            <span>Motor de Cotización y Valuación Visual de México</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Mercado Libre MX</span>
            <span>·</span>
            <span>Facebook Marketplace</span>
            <span>·</span>
            <span>Amazon México</span>
            <span>·</span>
            <span>Firebase Firestore</span>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Call to Action Bar (Mobile / Quick Access) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
        <button
          type="button"
          onClick={handleTriggerPhotoUpload}
          className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-300/40 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Camera className="w-5 h-5 text-slate-950" />
          <span>Sube una foto y Cotízalo en segundos</span>
        </button>
      </div>

      {/* Camera Capture Modal */}
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Clean Report & Official Certificate Modal */}
      {currentResult && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          result={currentResult}
          selectedIntent={userIntent}
        />
      )}

      {/* 9:16 WhatsApp & Instagram Story Poster Modal */}
      {currentResult && (
        <StoryCardModal
          isOpen={isStoryModalOpen}
          onClose={() => setIsStoryModalOpen(false)}
          result={currentResult}
          selectedIntent={userIntent}
        />
      )}
    </div>
  );
}
