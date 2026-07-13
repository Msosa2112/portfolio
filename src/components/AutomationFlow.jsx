import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { MessageSquare, Cpu, Database, Bell, Shield, ArrowRight, Zap } from 'lucide-react';

const STEPS = [
  { id: 1, label: "1. Consulta de Cliente", sub: "Recibido vía WhatsApp", icon: MessageSquare, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { id: 2, label: "2. Procesamiento de IA", sub: "Clasificación y Extracción", icon: Cpu, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { id: 3, label: "3. Registro de Datos", sub: "Sincronizado en tu Servidor", icon: Database, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { id: 4, label: "4. Alerta de Venta", sub: "Notificación SMS al Equipo", icon: Bell, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" }
];

export default function AutomationFlow({ scrollYProgress }) {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-rotate the active step in the flow visualization
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Animations linked to scroll progress (visible from 0.68 to 0.88)
  const scale = useTransform(scrollYProgress, [0.68, 0.72, 0.84, 0.88], [0.92, 1.0, 1.0, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.68, 0.72, 0.84, 0.88], [0.0, 1.0, 1.0, 0.0]);
  const y = useTransform(scrollYProgress, [0.68, 0.72, 0.84, 0.88], [100, 0, 0, -100]);

  // Hook-driven pointer state to avoid overlapping interactions
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    return scrollYProgress.on("change", (val) => {
      setIsActive(val >= 0.69 && val <= 0.87);
    });
  }, [scrollYProgress]);

  return (
    <motion.section
      style={{
        scale,
        opacity,
        y,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 20 : 0
      }}
      className="px-4 md:px-8 bg-transparent"
    >
      <div className="w-full max-w-5xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none -translate-y-1/2 -z-10" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-1.5 mb-6">
          <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">
            Flujo de Datos e Infraestructura
          </span>
          <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider font-sans leading-tight">
            Automatizaciones & Garantías
          </h2>
          <p className="text-xs text-zinc-400 font-medium">
            Conectores en tiempo real para acelerar tus ventas y la solidez técnica de nuestra entrega.
          </p>
        </div>

        {/* Grid: Left - Flow diagram, Right - Bento cards */}
        <div className="grid md:grid-cols-12 gap-5 items-stretch">
          
          {/* Left Column: WhatsApp / IA Flow diagram */}
          <div className="md:col-span-6 bg-black/40 border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-1.5">
                <Zap size={14} />
                Flujo en Tiempo Real (WhatsApp / n8n)
              </h3>
              <p className="text-[10px] text-zinc-500 leading-normal mb-4 font-sans font-medium">
                Simulación del viaje de un lead prospectado: captura, análisis con IA, guardado y despacho.
              </p>
            </div>

            {/* Interactive Timeline */}
            <div className="space-y-2">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isSelected = activeStep === idx;
                return (
                  <motion.div
                    key={step.id}
                    animate={{ 
                      borderColor: isSelected ? "rgba(6, 182, 212, 0.4)" : "rgba(39, 39, 42, 0.4)",
                      backgroundColor: isSelected ? "rgba(9, 9, 11, 0.8)" : "rgba(9, 9, 11, 0.2)"
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl border transition-all"
                  >
                    <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 transition-transform ${step.color} ${
                      isSelected ? "scale-110 shadow-lg" : ""
                    }`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-[10px] font-black uppercase tracking-wide transition-colors ${
                        isSelected ? "text-white" : "text-zinc-400"
                      }`}>{step.label}</h4>
                      <p className="text-[9px] text-zinc-500 font-sans truncate">{step.sub}</p>
                    </div>
                    {isSelected && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Bento Box guarantees */}
          <div className="md:col-span-6 flex flex-col gap-4">
            
            {/* Bento Card 1: 100% Código Entregado */}
            <div className="bg-black/40 border border-zinc-900 hover:border-zinc-800/80 p-4 rounded-2xl flex items-start gap-3 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="h-9 w-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Shield size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-white">Código Fuente Transferido</h4>
                <p className="text-[10px] text-zinc-400 leading-normal font-sans font-medium">
                  El 100% de la propiedad intelectual pasa legalmente a tu empresa bajo firma. Código libre y estructurado sin dependencias.
                </p>
              </div>
            </div>

            {/* Bento Card 2: Cero vendor lock-in */}
            <div className="bg-black/40 border border-zinc-900 hover:border-zinc-800/80 p-4 rounded-2xl flex items-start gap-3 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Database size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-white">Servidores Propios</h4>
                <p className="text-[10px] text-zinc-400 leading-normal font-sans font-medium">
                  Configuramos las bases de datos de forma aislada en tus propias cuentas de hosting (Supabase, AWS). Eres dueño de tus registros.
                </p>
              </div>
            </div>

            {/* Bento Card 3: Garantía modular */}
            <div className="bg-black/40 border border-zinc-900 hover:border-zinc-800/80 p-4 rounded-2xl flex items-start gap-3 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Cpu size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-white">Independencia Tecnológica</h4>
                <p className="text-[10px] text-zinc-400 leading-normal font-sans font-medium">
                  Desarrollo modular estándar. Cualquier programador puede continuar el trabajo, eliminando dependencias con agencias o suscripciones.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
