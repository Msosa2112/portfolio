import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, Shield, Server, Disc } from "lucide-react";

const MODULES = ["PROXY_ROTATOR", "CRAWLER_BOT", "DATABASE_SYNC"];
const ACTIONS = [
  "Rotando dirección IP residencial a través de nodo estadounidense...",
  "Extrayendo registros catastrales del Condado Jefferson...",
  "Parseando aviso de ejecución hipotecaria (Pre-Foreclosure notice)...",
  "Calculando valor de mercado estimado de la propiedad...",
  "Calculando ratio deuda/capital neto...",
  "Sincronizando registro en base de datos PostgreSQL soberana...",
  "Despachando alerta SMS/Discord para el equipo de ventas..."
];

export default function TzelSandbox() {
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState([]);
  const [activeProxies, setActiveProxies] = useState(14);
  const [recordsScraped, setRecordsScraped] = useState(482);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    if (logs.length === 0) {
      const initialLogs = Array.from({ length: 12 }).map((_, i) => generateMockLog());
      setLogs(initialLogs);
    }

    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = generateMockLog();
        if (newLog.level === "SUCCESS") {
          setRecordsScraped(r => r + 1);
        }
        if (newLog.module === "PROXY_ROTATOR") {
          setActiveProxies(p => Math.max(8, Math.min(24, p + (Math.random() > 0.5 ? 1 : -1))));
        }
        return [...prev.slice(-40), newLog];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isRunning, logs]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const generateMockLog = () => {
    const time = new Date().toLocaleTimeString();
    const module = MODULES[Math.floor(Math.random() * MODULES.length)];
    let level = "INFO";
    let message = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

    if (Math.random() > 0.82) {
      level = "SUCCESS";
      message = `¡Alerta Pre-Foreclosure! Propiedad con deuda de $${(Math.random() * 200000 + 150000).toLocaleString(undefined, { maximumFractionDigits: 0 })} detectada en Condado Jefferson.`;
    } else if (Math.random() > 0.95) {
      level = "WARN";
      message = "Proxy lento detectado. Rotando nodo residencial...";
    }

    return { timestamp: time, level, module, message };
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-300 font-mono text-[10px] p-3 space-y-4 rounded-xl border border-zinc-800">
      
      {/* Description Banner */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg space-y-1 text-xs font-sans">
        <h4 className="text-white font-bold uppercase tracking-wider text-[11px] text-amber-400">Automatización de Captura Inmobiliaria (Tzel)</h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Esta consola interactiva simula el crawler automatizado. Su objetivo es detectar oportunidades con problemas de deuda inmobiliaria y despachar alertas inmediatas a los asesores de ventas de forma temprana.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-900/60 border border-zinc-800 p-2 rounded-lg flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-zinc-500 text-[8px] uppercase tracking-wider block font-sans">Proxies Activos</span>
            <span className="text-xs font-black text-amber-400 font-sans">{activeProxies} / 24</span>
          </div>
          <Shield size={14} className="text-amber-500/40" />
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-2 rounded-lg flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-zinc-500 text-[8px] uppercase tracking-wider block font-sans">Datos Consolidados</span>
            <span className="text-xs font-black text-emerald-400 font-sans">{recordsScraped}</span>
          </div>
          <Server size={14} className="text-emerald-500/40" />
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-2 rounded-lg flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-zinc-500 text-[8px] uppercase tracking-wider block font-sans">Estado Pipeline</span>
            <span className="text-[10px] font-black text-zinc-200 uppercase tracking-widest font-sans flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? "bg-emerald-500 animate-ping" : "bg-yellow-500"}`} />
              {isRunning ? "Running" : "Paused"}
            </span>
          </div>
          <Disc size={14} className={`text-zinc-500/40 ${isRunning ? "animate-spin" : ""}`} />
        </div>
      </div>

      {/* Console Shell Output */}
      <div 
        ref={scrollRef}
        className="flex-1 h-[200px] md:h-[280px] bg-black/60 border border-zinc-900 rounded-lg p-3 overflow-y-auto space-y-1.5 select-text scrollbar-thin"
      >
        {logs.map((log, idx) => (
          <div key={idx} className="leading-relaxed">
            <span className="text-zinc-600">[{log.timestamp}]</span>{" "}
            <span className={`font-bold ${
              log.level === "SUCCESS" ? "text-emerald-400" :
              log.level === "WARN" ? "text-yellow-400" : "text-amber-500"
            }`}>
              [{log.level}]
            </span>{" "}
            <span className="text-zinc-500">[{log.module}]</span>{" "}
            <span className={log.level === "SUCCESS" ? "text-zinc-200 font-bold" : "text-zinc-400"}>
              {log.message}
            </span>
          </div>
        ))}
      </div>

      {/* Controller Area */}
      <div className="flex items-center justify-between bg-zinc-900/40 border border-zinc-900 px-3 py-2 rounded-lg">
        <span className="text-zinc-500 text-[9px] uppercase tracking-wider font-sans">Consola de Control:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1 rounded text-[9px] uppercase tracking-wider font-sans font-black transition-all ${
              isRunning 
                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30" 
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
            }`}
          >
            {isRunning ? "Pausar Crawler" : "Ejecutar Crawler"}
          </button>
          <button
            onClick={() => setLogs([])}
            className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 hover:text-white transition-all"
          >
            <RefreshCw size={10} />
          </button>
        </div>
      </div>

    </div>
  );
}
