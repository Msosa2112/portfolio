import React, { useState } from 'react';
import { TrendingUp, Users, FileText, DollarSign, Activity, UserPlus } from 'lucide-react';

const INITIAL_LEADS = [
  { id: 1, full_name: 'John Doe', status: 'ganado', source: 'Referral', created_at: '2026-07-10' },
  { id: 2, full_name: 'Jane Smith', status: 'estimado_enviado', source: 'Google', created_at: '2026-07-09' },
  { id: 3, full_name: 'Carlos Ortega', status: 'cita', source: 'Facebook', created_at: '2026-07-08' },
  { id: 4, full_name: 'Sarah Connor', status: 'contactado', source: 'Instagram', created_at: '2026-07-07' },
  { id: 5, full_name: 'Mike Tyson', status: 'nuevo', source: 'Referral', created_at: '2026-07-06' },
];

const STATUS_MAP = {
  nuevo: { label: 'Nuevo', cls: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  contactado: { label: 'Contactado', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  cita: { label: 'Cita', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  estimado_enviado: { label: 'Estimado', cls: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  ganado: { label: 'Ganado', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  perdido: { label: 'Perdido', cls: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export default function CRMDashboardSandbox() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', source: 'Google', status: 'nuevo' });

  const kpis = [
    { label: 'Mis Leads', value: leads.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Estimados', value: 12, icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Ganados', value: leads.filter(l => l.status === 'ganado').length, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Ingresos', value: `$${(leads.filter(l => l.status === 'ganado').length * 4500).toLocaleString()}`, icon: DollarSign, color: 'text-[var(--accent)]', bg: 'bg-[var(--accent-soft)]' },
  ];

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newLead = {
      id: Date.now(),
      full_name: formData.name,
      status: formData.status,
      source: formData.source,
      created_at: new Date().toISOString().split('T')[0],
    };

    setLeads([newLead, ...leads]);
    setFormData({ name: '', source: 'Google', status: 'nuevo' });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 text-[var(--text-secondary)]">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Mi Dashboard</h3>
          <p className="text-xs text-[var(--text-secondary)]">Resumen de tu actividad de ventas y desempeño</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="crm-btn-accent flex items-center justify-center gap-2 px-4 py-2 bg-[var(--accent)] text-black rounded-xl text-xs font-bold transition-all active:scale-95"
        >
          <UserPlus size={14} />
          <span>Añadir Lead</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-2xl flex items-center gap-4 hover:border-[var(--accent)]/30 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg font-black tracking-tight text-[var(--text-primary)]">{kpi.value}</span>
                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest truncate">{kpi.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Panel */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-2.5">
          <div className="p-1.5 bg-[var(--accent-soft)] rounded-lg text-[var(--accent)]">
            <Activity size={16} />
          </div>
          <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">Leads Recientes</h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-black/10 text-[var(--text-muted)] text-[10px] font-black uppercase tracking-wider">
                <th className="py-3 px-5">Cliente</th>
                <th className="py-3 px-5">Estado</th>
                <th className="py-3 px-5">Fuente</th>
                <th className="py-3 px-5 text-right">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-xs text-[var(--text-secondary)]">
              {leads.map((lead) => {
                const s = STATUS_MAP[lead.status] || { label: lead.status, cls: 'bg-zinc-800 text-zinc-400 border-white/5' };
                return (
                  <tr key={lead.id} className="hover:bg-white/5 transition-all">
                    <td className="py-3 px-5 font-bold text-[var(--text-primary)]">{lead.full_name}</td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border ${s.cls}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-[var(--text-secondary)]">{lead.source}</td>
                    <td className="py-3 px-5 text-right text-[var(--text-secondary)] font-bold">
                      {lead.created_at}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl w-full max-w-sm overflow-hidden p-6 space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-[var(--text-primary)]">Registrar Nuevo Lead</h4>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="ej. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="crm-input bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Fuente</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="crm-select bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Referral">Referral</option>
                    <option value="Google">Google</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Estado Inicial</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="crm-select bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="contactado">Contactado</option>
                    <option value="cita">Cita</option>
                    <option value="estimado_enviado">Estimado</option>
                    <option value="ganado">Ganado</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-[var(--border)] hover:bg-white/5 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="crm-btn-accent px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black rounded-xl text-xs font-bold"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
