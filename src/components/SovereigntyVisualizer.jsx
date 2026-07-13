import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Server, Cloud, Lock, Key, Users, ArrowRight, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function SovereigntyVisualizer({ scrollYProgress }) {
  const [isSovereign, setIsSovereign] = useState(true);

  // Animations linked to scroll progress (visible from 0.52 to 0.72)
  const scale = useTransform(scrollYProgress, [0.52, 0.56, 0.68, 0.72], [0.92, 1.0, 1.0, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.52, 0.56, 0.68, 0.72], [0.0, 1.0, 1.0, 0.0]);
  const y = useTransform(scrollYProgress, [0.52, 0.56, 0.68, 0.72], [100, 0, 0, -100]);

  // Hook-driven pointer state to avoid overlapping interactions
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    return scrollYProgress.on("change", (val) => {
      setIsActive(val >= 0.53 && val <= 0.71);
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
      <div className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        
        {/* Decorative Glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] transition-all duration-700 pointer-events-none -z-10 ${
          isSovereign ? 'bg-indigo-500/10' : 'bg-red-500/5'
        }`} />

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">
            Ecosistema de Datos
          </span>
          <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider font-sans leading-tight">
            Soberanía de Infraestructura
          </h2>
          <p className="text-xs text-zinc-400 font-medium">
            Compara cómo fluye tu información estratégica entre el modelo rentado tradicional y tu propia infraestructura soberana.
          </p>
        </div>

        {/* Selector Tabs */}
        <div className="flex justify-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl max-w-md mx-auto mb-8">
          <button
            onClick={() => setIsSovereign(false)}
            className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              !isSovereign 
                ? 'bg-zinc-800 text-red-400 border border-zinc-700 shadow-md' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Modelo Alquilado (SaaS)
          </button>
          <button
            onClick={() => setIsSovereign(true)}
            className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              isSovereign 
                ? 'bg-zinc-800 text-indigo-400 border border-zinc-700 shadow-md' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Infraestructura Propia
          </button>
        </div>

        {/* Main Diagram Area */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          
          {/* Visual Diagram */}
          <div className="bg-black/40 border border-zinc-900/80 rounded-2xl p-6 min-h-[190px] flex flex-col justify-center relative overflow-hidden">
            
            {/* Visual nodes connection flow */}
            <div className="flex items-center justify-around relative z-10 w-full">
              
              {/* User Client Node */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shadow-lg">
                  <Users size={20} />
                </div>
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Tus Clientes</span>
              </div>

              {/* Connector Arrow */}
              <div className="flex-1 max-w-[80px] h-0.5 bg-zinc-800 relative">
                <motion.div 
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className={`absolute -top-0.5 h-1.5 w-1.5 rounded-full -translate-y-px ${
                    isSovereign ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' : 'bg-red-400 shadow-[0_0_8px_#f87171]'
                  }`}
                />
                <ArrowRight size={10} className="absolute right-0 -top-[4px] text-zinc-700" />
              </div>

              {/* Target Server Node */}
              <div className="flex flex-col items-center gap-1.5">
                <motion.div 
                  key={isSovereign ? "sovereign-node" : "saas-node"}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-lg border ${
                    isSovereign 
                      ? 'bg-indigo-950/20 border-indigo-500/30 text-indigo-400' 
                      : 'bg-red-950/20 border-red-500/20 text-red-400'
                  }`}
                >
                  {isSovereign ? <Server size={22} /> : <Cloud size={22} />}
                </motion.div>
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest text-center">
                  {isSovereign ? 'Servidor Propio' : 'Nube de Terceros'}
                </span>
              </div>

            </div>

            {/* Bottom Status Box */}
            <motion.div 
              key={isSovereign ? "status-sov" : "status-saas"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/40 border border-zinc-900/80"
            >
              {isSovereign ? (
                <>
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-[9px] font-bold text-zinc-300">Base de datos aislada e independiente en tu cuenta de Supabase.</span>
                </>
              ) : (
                <>
                  <ShieldAlert size={16} className="text-red-400 shrink-0" />
                  <span className="text-[9px] font-bold text-zinc-300">Tus datos residen en repositorios compartidos de Salesforce/Hubspot.</span>
                </>
              )}
            </motion.div>

          </div>

          {/* Explanation Text */}
          <div className="space-y-4">
            <motion.div 
              key={isSovereign ? "text-sov" : "text-saas"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-3"
            >
              <h3 className={`text-base font-extrabold uppercase tracking-wide flex items-center gap-1.5 ${
                isSovereign ? 'text-indigo-400' : 'text-red-400'
              }`}>
                {isSovereign ? <Key size={16} /> : <Lock size={16} />}
                {isSovereign ? 'Llaves Propias y Código Libre' : 'Atadura Comercial y Costo Fijo'}
              </h3>
              
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                {isSovereign 
                  ? "Te entregamos la propiedad intelectual completa y configuramos las bases de datos en tus cuentas. Tienes control absoluto del código, permitiéndote cambiar de programador o plataforma cuando quieras sin restricciones."
                  : "Estás sujeto a cobros por licencia para cada nuevo empleado de tu equipo. Si dejas de pagar, pierdes el acceso a tu software y tus datos históricos de clientes quedan bloqueados en su plataforma."
                }
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Impacto en el Negocio</span>
                <div className="flex items-center gap-1.5">
                  <div className={`h-1.5 w-1.5 rounded-full ${isSovereign ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  <span className="text-[10px] font-bold text-zinc-200">
                    {isSovereign 
                      ? 'Inversión única inicial: Cero costos mensuales recurrentes.' 
                      : 'El software se vuelve un gasto mensual obligatorio para operar.'
                    }
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </motion.section>
  );
}
