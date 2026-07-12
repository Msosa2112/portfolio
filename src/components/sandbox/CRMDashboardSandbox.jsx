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
    { label: 'Ingresos', value: `$${(leads.filter(l => l.status === 'ganado').length * 4500).toLocaleString()}`, icon: DollarSign, color: 'text-violet-400', bg: 'bg-violet-500/10' },
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
    <div className="space-y-6 text-zinc-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-zinc-100">Mi Dashboard</h3>
          <p className="text-xs text-zinc-400">Resumen de tu actividad de ventas y desempeño</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95"
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
            <div key={kpi.label} className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-white/10 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg font-black tracking-tight text-zinc-100">{kpi.value}</span>
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest truncate">{kpi.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Panel */}
      <div className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-2.5">
          <div className="p-1.5 bg-violet-600/10 rounded-lg text-violet-400">
            <Activity size={16} />
          </div>
          <h4 className="text-xs font-black tracking-widest uppercase text-zinc-200">Leads Recientes</h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/20 text-zinc-400 text-[10px] font-black uppercase tracking-wider">
                <th className="py-3 px-5">Cliente</th>
                <th className="py-3 px-5">Estado</th>
                <th className="py-3 px-5">Fuente</th>
                <th className="py-3 px-5 text-right">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-zinc-300">
              {leads.map((lead) => {
                const s = STATUS_MAP[lead.status] || { label: lead.status, cls: 'bg-zinc-800 text-zinc-400 border-white/5' };
                return (
                  <tr key={lead.id} className="hover:bg-white/5 transition-all">
                    <td className="py-3 px-5 font-bold text-zinc-200">{lead.full_name}</td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border ${s.cls}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-zinc-400">{lead.source}</td>
                    <td className="py-3 px-5 text-right text-zinc-400 font-bold">
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
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden p-6 space-y-4">
            <h4 className="text-sm font-bold text-zinc-100">Registrar Nuevo Lead</h4>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="ej. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Fuente</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Google">Google</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Referral">Referral</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Estado Inicial</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
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
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold"
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
