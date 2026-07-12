import React, { useState } from 'react';
import { DollarSign, Clock, Users } from 'lucide-react';

const INITIAL_CREW = [
  { id: 1, name: 'Carlos Ortega', role: 'Lead Installer', rate: 35, hours: 40 },
  { id: 2, name: 'Juan Mendez', role: 'Installer', rate: 25, hours: 38 },
  { id: 3, name: 'Mateo Rivas', role: 'Helper', rate: 18, hours: 45 },
  { id: 4, name: 'David Smith', role: 'Helper', rate: 18, hours: 35 },
];

export default function PayrollSandbox() {
  const [crew, setCrew] = useState(INITIAL_CREW);

  const handleHoursChange = (id, hours) => {
    setCrew(
      crew.map((worker) =>
        worker.id === id ? { ...worker, hours: parseFloat(hours) || 0 } : worker
      )
    );
  };

  const totalHours = crew.reduce((acc, worker) => acc + worker.hours, 0);
  const totalWages = crew.reduce((acc, worker) => acc + worker.hours * worker.rate, 0);
  const taxes = totalWages * 0.15; // 15% estimated crew taxes
  const totalBudget = totalWages + taxes;

  return (
    <div className="space-y-6 text-[var(--text-secondary)]">
      
      {/* Top Banner */}
      <div>
        <h3 className="text-lg font-bold text-[var(--text-primary)]">Control de Payroll</h3>
        <p className="text-xs text-[var(--text-secondary)]">Calculadora de horas trabajadas y salarios de cuadrilla semanal.</p>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-2xl flex flex-col justify-center gap-1 shadow-sm">
          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
            <Clock size={12} className="text-[var(--accent)]" /> Horas Totales
          </span>
          <span className="text-xl font-black text-[var(--text-primary)] mt-0.5">{totalHours.toFixed(1)} hrs</span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-2xl flex flex-col justify-center gap-1 shadow-sm">
          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
            <DollarSign size={12} className="text-emerald-400" /> Salario Neto
          </span>
          <span className="text-xl font-black text-[var(--text-primary)] mt-0.5">${totalWages.toLocaleString()}</span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-2xl flex flex-col justify-center gap-1 shadow-sm">
          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
            <DollarSign size={12} className="text-[var(--accent)]" /> Presupuesto Total
          </span>
          <span className="text-xl font-black text-[var(--accent)] mt-0.5">${totalBudget.toLocaleString()}</span>
        </div>
      </div>

      {/* Crew Table List */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden p-4 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[var(--accent-soft)] rounded-lg text-[var(--accent)]">
            <Users size={16} />
          </div>
          <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">Equipo de Trabajo</h4>
        </div>

        <div className="space-y-4">
          {crew.map((worker) => {
            const workerWages = worker.hours * worker.rate;
            return (
              <div key={worker.id} className="bg-[var(--bg-input)] border border-[var(--border)] p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-[var(--accent)]/20 transition-all shadow-inner">
                {/* Left: Worker Info */}
                <div className="min-w-[150px]">
                  <h5 className="text-xs font-bold text-[var(--text-primary)]">{worker.name}</h5>
                  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-0.5 block">{worker.role}</span>
                  <span className="text-[10px] text-[var(--text-secondary)] font-bold mt-1.5 block">${worker.rate}/hr</span>
                </div>

                {/* Center: Slider input for Hours */}
                <div className="flex-1 flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="0.5"
                    value={worker.hours}
                    onChange={(e) => handleHoursChange(worker.id, e.target.value)}
                    className="w-full h-1.5 bg-[var(--bg-sidebar)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)] border border-[var(--border)] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-[var(--text-primary)] shrink-0 w-16 text-right">
                    {worker.hours.toFixed(1)} hrs
                  </span>
                </div>

                {/* Right: Calculated wages */}
                <div className="text-right sm:min-w-[100px] shrink-0 border-t sm:border-t-0 border-[var(--border)] pt-2 sm:pt-0 flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
                  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest sm:hidden">Salario Semanal</span>
                  <span className="text-sm font-black text-[var(--accent)]">${workerWages.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
