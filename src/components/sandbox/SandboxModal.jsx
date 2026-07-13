import React, { useState, useEffect } from 'react';
import { X, LayoutGrid, Calculator, Users, MessageSquare, DollarSign, Link2, Bot, Send } from 'lucide-react';
import KanbanSandbox from './KanbanSandbox';
import EstimatorSandbox from './EstimatorSandbox';
import CRMDashboardSandbox from './CRMDashboardSandbox';
import TwilioSandbox from './TwilioSandbox';
import PayrollSandbox from './PayrollSandbox';
import QuickBooksSandbox from './QuickBooksSandbox';
import CopilotSandbox from './CopilotSandbox';

const TABS = [
  { id: 'dashboard', label: 'CRM Dashboard', icon: Users, component: CRMDashboardSandbox },
  { id: 'kanban', label: 'Kanban Obras', icon: LayoutGrid, component: KanbanSandbox },
  { id: 'estimator', label: 'Estimador Pro', icon: Calculator, component: EstimatorSandbox },
  { id: 'quickbooks', label: 'QuickBooks Sync', icon: Link2, component: QuickBooksSandbox },
  { id: 'copilot', label: 'IA Copiloto', icon: Bot, component: CopilotSandbox },
  { id: 'twilio', label: 'Twilio SMS', icon: MessageSquare, component: TwilioSandbox },
  { id: 'payroll', label: 'Payroll Team', icon: DollarSign, component: PayrollSandbox },
];

export default function SandboxModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [globalMessages, setGlobalMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy el Copiloto de Barba CRM. Pregúntame sobre el estado de un proyecto (ej. John Doe), las nóminas o cualquier dato del sistema.' }
  ]);
  const [globalInput, setGlobalInput] = useState('');
  const [globalTyping, setGlobalTyping] = useState(false);
  
  const handleGlobalSend = (textToSend) => {
    const text = textToSend || globalInput;
    if (!text.trim()) return;

    setGlobalMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setGlobalInput('');
    setGlobalTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('john') || lower.includes('doe') || lower.includes('5846') || lower.includes('obra') || lower.includes('proyecto')) {
        reply = 'El proyecto PRJ-5846 de John Doe en 1234 Street está Aprobado y Firmado. La Orden de Compra de materiales ha sido despachada con éxito a ABC Supply Co.';
      } else if (lower.includes('payroll') || lower.includes('nómina') || lower.includes('nomina')) {
        reply = 'El payroll semanal activo es de $3,580.00 para la cuadrilla. Se registraron un total de 118.0 horas trabajadas.';
      } else if (lower.includes('material') || lower.includes('envio') || lower.includes('despach')) {
        reply = 'Hoy se despacharon tejas composite y canales de aluminio para el proyecto de John Doe en 1234 Street a través de ABC Supply Co.';
      } else {
        reply = 'Entendido. Estoy procesando tu consulta sobre el sistema de Barba Construction... ¿Deseas que revise el estado de alguna otra obra?';
      }

      setGlobalMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setGlobalTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ActiveComponent = TABS.find((tab) => tab.id === activeTab)?.component || CRMDashboardSandbox;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/85 backdrop-blur-md"
      style={{ pointerEvents: 'auto' }}
      data-lenis-prevent
      onClick={(e) => e.stopPropagation()}
    >
      
      {/* CSS Theme Definition */}
      <style>{`
        .barba-crm-theme {
          /* Colors */
          --bg-primary: #0a0f1a;
          --bg-secondary: #111827;
          --bg-card: #1a2236;
          --bg-card-hover: #1f2a42;
          --bg-input: #0f172a;
          --bg-sidebar: #0d1321;

          --text-primary: #e8edf5;
          --text-secondary: #8896b3;
          --text-muted: #5a6882;

          --accent: #f97316;
          --accent-glow: rgba(249, 115, 22, 0.25);
          --accent-hover: #fb923c;
          --accent-soft: rgba(249, 115, 22, 0.1);

          --success: #34d399;
          --warning: #fbbf24;
          --danger: #f87171;
          --info: #60a5fa;

          --border: #1e293b;

          /* Sizes */
          --radius: 10px;
          --radius-lg: 14px;
          --radius-xl: 20px;
        }

        .barba-crm-theme {
          background-color: var(--bg-primary) !important;
          color: var(--text-primary) !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Generic CRM Card */
        .barba-crm-theme .crm-card {
          background: var(--bg-card) !important;
          border: 1px solid var(--border) !important;
          border-radius: var(--radius-lg) !important;
          transition: all 0.2s ease;
        }

        .barba-crm-theme .crm-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        /* Accent Buttons */
        .barba-crm-theme .crm-btn-accent {
          background: var(--accent) !important;
          color: #000000 !important;
          font-weight: 700 !important;
          border: none !important;
          transition: all 0.2s ease;
        }

        .barba-crm-theme .crm-btn-accent:hover:not(:disabled) {
          background: var(--accent-hover) !important;
          transform: translateY(-1px);
        }

        .barba-crm-theme .crm-btn-accent:active:not(:disabled) {
          transform: translateY(0);
        }

        /* Input Controls */
        .barba-crm-theme .crm-input,
        .barba-crm-theme .crm-select {
          background: var(--bg-input) !important;
          border: 1px solid var(--border) !important;
          color: var(--text-primary) !important;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .barba-crm-theme .crm-input:focus,
        .barba-crm-theme .crm-select:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px var(--accent-glow) !important;
        }
      `}</style>

      {/* Liquid Glass Shell Container wrapped in CRM theme */}
      <div className="barba-crm-theme relative w-full h-full md:max-w-6xl md:h-[90vh] bg-[var(--bg-primary)] md:rounded-3xl border border-[var(--border)] shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-[var(--accent)]/5 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

        {/* Sidebar */}
        <aside 
          data-lenis-prevent
          className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--border)] bg-[var(--bg-sidebar)] p-4 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible shrink-0 items-center md:items-stretch scrollbar-none"
        >
          <div className="hidden md:flex items-center gap-3 px-2 py-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] font-extrabold text-base">
              BP
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[var(--text-primary)] tracking-wider">BARBAPRO</h3>
              <p className="text-[9px] text-[var(--accent)] uppercase tracking-widest font-black">ESTIMACIÓN</p>
            </div>
          </div>

          <div className="flex md:flex-col gap-1.5 w-full">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 md:gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap md:w-full active:scale-98 ${
                    isActive
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-white/5 ml-auto"
          >
            <X size={18} />
          </button>
        </aside>

        {/* Viewport Content */}
        <div 
          data-lenis-prevent
          className="flex-1 flex flex-col min-w-0 bg-[var(--bg-primary)] overflow-y-auto relative"
        >
          {/* Header */}
          <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-[var(--border)] shrink-0 bg-[var(--bg-sidebar)]/35">
            <div>
              <span className="text-[9px] font-black tracking-widest text-[var(--accent)] uppercase">
                Interactive Sandbox Demo
              </span>
              <h2 className="text-base font-bold text-[var(--text-primary)] mt-0.5">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all active:scale-95"
            >
              <X size={16} />
            </button>
          </header>

          {/* Sandbox Body */}
          <main className="flex-1 p-4 md:p-8 bg-[var(--bg-primary)]">
            <ActiveComponent />
          </main>
        </div>

        {/* Floating AI Assistant Widget */}
        <div className="absolute bottom-6 right-6 z-[120] flex flex-col items-end">
          
          {/* Chat Window */}
          {showGlobalChat && (
            <div className="w-72 h-[340px] bg-[#1a2236] border border-[#1e293b] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-in fade-in duration-300">
              
              {/* Header */}
              <div className="p-3 bg-black/20 border-b border-[#1e293b] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black tracking-wider uppercase text-white">Copiloto Global CRM</span>
                </div>
                <button 
                  onClick={() => setShowGlobalChat(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Chat history */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-[10px] leading-relaxed select-text scrollbar-none">
                {globalMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                    {msg.sender === 'bot' && (
                      <div className="h-6 w-6 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                        <Bot size={11} />
                      </div>
                    )}
                    <div className={`p-2 rounded-xl ${
                      msg.sender === 'user' 
                        ? 'bg-orange-500/10 text-white rounded-tr-none' 
                        : 'bg-[#0f172a] text-zinc-300 border border-[#1e293b] rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {globalTyping && (
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="h-6 w-6 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                      <Bot size={11} />
                    </div>
                    <div className="bg-[#0f172a] border border-[#1e293b] p-2 rounded-xl rounded-tl-none text-zinc-500 flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1 w-1 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1 w-1 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Suggestions */}
              <div className="px-3 py-1.5 border-t border-[#1e293b] bg-black/10 flex gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => handleGlobalSend('¿Estado del proyecto de John Doe?')}
                  className="px-2 py-1 bg-[#0f172a] border border-[#1e293b] rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-orange-500/30 whitespace-nowrap"
                >
                  Obra John Doe
                </button>
                <button
                  onClick={() => handleGlobalSend('¿Cuánto va en payroll?')}
                  className="px-2 py-1 bg-[#0f172a] border border-[#1e293b] rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-orange-500/30 whitespace-nowrap"
                >
                  Nómina
                </button>
                <button
                  onClick={() => handleGlobalSend('¿Qué materiales se enviaron hoy?')}
                  className="px-2 py-1 bg-[#0f172a] border border-[#1e293b] rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-orange-500/30 whitespace-nowrap"
                >
                  Envíos
                </button>
              </div>

              {/* Input */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleGlobalSend(); }}
                className="p-2 bg-[#0d1321] border-t border-[#1e293b] flex gap-1.5 items-center"
              >
                <input
                  type="text"
                  placeholder="Pregúntale al Copiloto..."
                  value={globalInput}
                  onChange={(e) => setGlobalInput(e.target.value)}
                  disabled={globalTyping}
                  className="flex-1 bg-[#0f172a] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-[10px] text-white focus:outline-none placeholder-zinc-600"
                />
                <button 
                  type="submit"
                  disabled={globalTyping || !globalInput.trim()}
                  className="p-1.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-black rounded-lg transition-all"
                >
                  <Send size={10} />
                </button>
              </form>

            </div>
          )}

          {/* Chat Launcher Button */}
          <button
            onClick={() => setShowGlobalChat(!showGlobalChat)}
            className="h-12 w-12 rounded-full bg-orange-600 hover:bg-orange-500 text-black flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer relative z-50 group border border-orange-500/20"
          >
            <Bot size={22} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-[#0a0f1a] flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />
            </span>
          </button>
          
        </div>

      </div>
    </div>
  );
}
