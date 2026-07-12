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
      {/* Liquid Glass Shell Container */}
      <div className="relative w-full h-full md:max-w-6xl md:h-[90vh] bg-zinc-950/80 md:rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none" />

        {/* Sidebar */}
        <aside 
          data-lenis-prevent
          className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 backdrop-blur-md p-4 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible shrink-0 items-center md:items-stretch scrollbar-none"
        >
          <div className="hidden md:flex items-center gap-3 px-2 py-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
              BP
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-100 tracking-wide">Barba Pro System</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Interactive Lab</p>
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
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
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
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-zinc-200 bg-white/5 ml-auto"
          >
            <X size={18} />
          </button>
        </aside>

        {/* Viewport Content */}
        <div 
          data-lenis-prevent
          className="flex-1 flex flex-col min-w-0 bg-zinc-950/30 overflow-y-auto relative"
        >
          {/* Header */}
          <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-white/10 shrink-0">
            <div>
              <span className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Interactive Sandbox Demo
              </span>
              <h2 className="text-lg font-bold text-zinc-100 mt-0.5">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all active:scale-95"
            >
              <X size={20} />
            </button>
          </header>

          {/* Sandbox Body */}
          <main className="flex-1 p-4 md:p-8">
            <ActiveComponent />
          </main>
        </div>
      </div>
    </div>
  );
}
