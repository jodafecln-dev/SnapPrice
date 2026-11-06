import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Lock, Zap } from 'lucide-react';

export const AntiFraudSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fraudTactics = [
    {
      title: '1. El "Gancho del 40%": Precio ridículamente barato para pedir anticipo',
      desc: 'Ponen un iPhone 15 o una PS5 a $3,500 o $4,000 MXN diciendo que "les urge por mudanza" o "es de aduana". Al escribirles, dicen que hay 15 personas formadas y que si les depositas $500 MXN en OXXO te lo apartan. Una vez depositado, te bloquean al instante.',
      protection: 'REGLA DE ORO DE SNAPPRICE: Si está más de 40% por debajo del precio promedio real, es una trampa. NUNCA des un solo peso de apartado sin tener el equipo prendido y probado en tus manos.',
    },
    {
      title: '2. "Mando un Uber / DiDi por el producto y te transfiero"',
      desc: 'El supuesto comprador dice estar ocupado y manda un chofer a recoger el paquete. Mientras el chofer espera afuera de tu casa, te mandan una captura de pantalla de transferencia falsa o un correo apócrifo de Mercado Pago.',
      protection: 'No le des el producto al chofer hasta que entres a la app de tu propio banco y veas el dinero en "Saldo Disponible" (no en tránsito ni retenido).',
    },
    {
      title: '3. El cheque con trampa "Salvo Buen Cobro"',
      desc: 'Depositan un cheque sin fondos en cajero automático. En tu app bancaria se ve el saldo en la cuenta pero con la leyenda "Salvo buen cobro". A las 24 horas el banco rechaza el cheque y te descuenta el dinero cuando ya entregaste el producto.',
      protection: 'Solo acepta transferencias SPEI interbancarias directas de acreditación inmediata.',
    },
    {
      title: '4. Celulares o Macs con candado de tienda o empresa (MDM / PayJoy)',
      desc: 'Venden equipos que fueron sacados a pagos en tiendas (PayJoy, Macropay) o que pertenecen a corporativos con software empresarial (MDM). Funcionan al momento de la compra, pero a los días se bloquean por completo.',
      protection: 'Exige restablecer de fábrica el equipo en tu cara conectado al Wi-Fi de tu celular. Si pide usuario de empresa o no deja restablecer, cancela el trato.',
    },
    {
      title: '5. Consolas PS5 o Xbox con baneo de red permanente',
      desc: 'Te venden una consola que prende bien, pero al intentar conectarte a internet o a PlayStation Network / Xbox Live aparece un letrero de baneo permanente por trampas o robos.',
      protection: 'Reúnanse en un lugar con conexión o lleva una pantalla portátil para verificar que inicie sesión en la tienda oficial.',
    },
  ];

  return (
    <div id="antifraude-section" className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-[0_0_35px_-10px_rgba(244,63,94,0.1)] backdrop-blur-xl space-y-6 relative overflow-hidden">
      {/* Decorative neon rose glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/10 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
              Compra y Venta 100% Segura
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              🛡️ Tu Radar Anti-Estafas en México
            </h2>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-xl self-start sm:self-auto">
          Protocolo C2C Protegido
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
        En grupos de compraventa y Facebook Marketplace en México, más del 18% de las ofertas con precios anormalmente bajos son trampas de anticipo o clonaciones. Aquí tienes cómo blindar tu dinero en 1 minuto:
      </p>

      {/* Accordion of top fraud tactics in Mexico */}
      <div className="space-y-3">
        {fraudTactics.map((item, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-white pr-4">
                  {item.title}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-800/60 text-xs sm:text-sm text-slate-300">
                  <p className="leading-relaxed text-slate-300">{item.desc}</p>
                  <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs leading-relaxed flex items-start gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-emerald-200 mb-0.5">Cómo blindarte con SnapPrice:</strong>
                      {item.protection}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Protocol Banner */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">¿Dónde cerrar el trato de forma segura en México?</h4>
            <p className="text-xs text-slate-400">Recomendamos plazas comerciales vigiladas, áreas de comida o bancos con cámaras activas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
