import React from 'react';
import { Camera, Sparkles, LogIn, LogOut, Zap, ShieldCheck } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  onNewValuation: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  currentUser: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewValuation,
  onNavigateSection,
  activeSection,
  currentUser,
  onLogin,
  onLogout,
  isLoggingIn,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      {/* Top neon hairline indicator */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500 opacity-80" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3">
        {/* Zone 1: Brand wordmark (techno neon aesthetic) */}
        <button
          onClick={() => onNavigateSection('valuador')}
          className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/10 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] group-hover:border-emerald-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] transition-all">
            <Camera className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap">
              Snap<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">Price</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-300 ml-1.5 px-1.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40">MX</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-700/60 px-2 py-0.5 rounded-full ml-2">
              🎮 Videojuegos & Consolas
            </span>
          </div>
        </button>

        {/* Zone 2: Single-line navigation links (friendly, marketing-oriented) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateSection('valuador')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeSection === 'valuador' ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'hover:text-emerald-300'
            }`}
          >
            Valuador Pro
          </button>
          <button
            onClick={() => onNavigateSection('catalogo')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeSection === 'catalogo' ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'hover:text-emerald-300'
            }`}
          >
            Top Ejemplos
          </button>
          <button
            onClick={() => onNavigateSection('flipping')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeSection === 'flipping' ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'hover:text-emerald-300'
            }`}
          >
            Calculadora de Ganancias
          </button>
          <button
            onClick={() => onNavigateSection('antifraude')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeSection === 'antifraude' ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'hover:text-emerald-300'
            }`}
          >
            Radar Anti-Estafas
          </button>
        </nav>

        {/* Zone 3: 1 primary action + User Profile/Login */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1 pl-2 bg-slate-900/90 border border-emerald-500/30 rounded-xl shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Usuario'}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold ring-1 ring-emerald-500/30">
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span className="text-xs font-medium text-slate-200 max-w-[100px] truncate hidden sm:inline">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-900 rounded-xl border border-slate-700/80 hover:border-slate-600 transition-all whitespace-nowrap shrink-0 shadow-sm"
              title="Inicia sesión con Google para guardar tus cotizaciones"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isLoggingIn ? 'Conectando...' : 'Entrar con Google'}</span>
            </button>
          )}

          <button
            onClick={onNewValuation}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-95 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span className="hidden sm:inline">Nueva Cotización</span>
            <span className="sm:hidden">Cotizar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
