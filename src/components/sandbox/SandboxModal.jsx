import React, { useState, useEffect } from 'react';
import { X, LayoutGrid, Calculator, Users, MessageSquare, DollarSign } from 'lucide-react';
import KanbanSandbox from './KanbanSandbox';
import EstimatorSandbox from './EstimatorSandbox';
import CRMDashboardSandbox from './CRMDashboardSandbox';
import TwilioSandbox from './TwilioSandbox';
import PayrollSandbox from './PayrollSandbox';

const TABS = [
  { id: 'dashboard', label: 'CRM Dashboard', icon: Users, component: CRMDashboardSandbox },
  { id: 'kanban', label: 'Kanban Obras', icon: LayoutGrid, component: KanbanSandbox },
  { id: 'estimator', label: 'Estimador Pro', icon: Calculator, component: EstimatorSandbox },
  { id: 'twilio', label: 'Twilio SMS', icon: MessageSquare, component: TwilioSandbox },
  { id: 'payroll', label: 'Payroll Team', icon: DollarSign, component: PayrollSandbox },
];

export default function SandboxModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ActiveComponent = TABS.find((tab) => tab.id === activeTab)?.component || CRMDashboardSandbox;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md">
      
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
      </div>
    </div>
  );
}
