import React, { useState } from 'react';
import { DollarSign, Clock, Users, Edit2 } from 'lucide-react';

const WORKERS = [
  { id: 'w1', name: 'Carlos Ortega', group_name: 'REGULAR CREW', payment_type: 'daily', daily_rate: 250, daily_rate_2: null, hourly_rate: 0 },
  { id: 'w2', name: 'Juan Mendez', group_name: 'REGULAR CREW', payment_type: 'daily', daily_rate: 200, daily_rate_2: null, hourly_rate: 0 },
  { id: 'w3', name: 'Mateo Rivas', group_name: 'FENCE', payment_type: 'hourly', daily_rate: 0, daily_rate_2: null, hourly_rate: 22 },
  { id: 'w4', name: 'David Smith', group_name: 'PAINTERS', payment_type: 'hourly', daily_rate: 0, daily_rate_2: null, hourly_rate: 25 },
];

const DAY_LABELS = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];

const INITIAL_ATTENDANCE = {
  'w1-SAT': 8, 'w1-SUN': 0, 'w1-MON': 8, 'w1-TUE': 8, 'w1-WED': 8, 'w1-THU': 8, 'w1-FRI': 8,
  'w2-SAT': 8, 'w2-SUN': 0, 'w2-MON': 8, 'w2-TUE': 8, 'w2-WED': 8, 'w2-THU': 8, 'w2-FRI': 0,
  'w3-SAT': 0, 'w3-SUN': 0, 'w3-MON': 8, 'w3-TUE': 8, 'w3-WED': 8, 'w3-THU': 8, 'w3-FRI': 8,
  'w4-SAT': 0, 'w4-SUN': 0, 'w4-MON': 8, 'w4-TUE': 8, 'w4-WED': 8, 'w4-THU': 8, 'w4-FRI': 6,
};

const INITIAL_ADJUSTMENTS = {
  'w1': { bonus: 100, discount: 0, reimbursement: 50 },
  'w2': { bonus: 0, discount: 0, reimbursement: 0 },
  'w3': { bonus: 50, discount: 0, reimbursement: 0 },
  'w4': { bonus: 0, discount: 0, reimbursement: 0 },
};

function GroupBadge({ name }) {
  const colors = {
    'OFFICE': '#6366f1',
    'REGULAR CREW': '#f59e0b',
    'FENCE': '#3b82f6',
    'FRAMERS': '#8b5cf6',
    'SIDERERS': '#ec4899',
    'PAINTERS': '#14b8a6',
  };
  const bg = colors[name] || '#555';
  return (
    <span 
      style={{
        background: bg + '22',
        borderColor: bg + '66',
        color: bg,
      }}
      className="px-2 py-0.5 rounded text-[9px] font-black tracking-widest border uppercase"
    >
      {name}
    </span>
  );
}

function AttendanceHoursDropdown({ label, value, onChange }) {
  const options = [{ value: '', label }];
  for (let h = 0.5; h <= 12; h += 0.5) {
    options.push({ value: String(h), label: `${h}h` });
  }

  const hasHours = parseFloat(value) > 0;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-10 h-10 rounded-full border text-center text-[10px] font-black outline-none transition-all cursor-pointer appearance-none p-0 flex items-center justify-center"
      style={{
        border: hasHours ? 'none' : '1.5px solid #2a2a2a',
        background: hasHours ? '#10b981' : '#111',
        color: hasHours ? '#fff' : '#888',
        boxShadow: hasHours ? '0 0 10px rgba(16,185,129,0.35)' : 'none',
        textAlignLast: 'center',
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-zinc-950 text-white text-xs">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default function PayrollSandbox() {
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [adjustments, setAdjustments] = useState(INITIAL_ADJUSTMENTS);

  const handleHoursChange = (workerId, day, val) => {
    const key = `${workerId}-${day}`;
    setAttendance({
      ...attendance,
      [key]: val === '' ? 0 : parseFloat(val),
    });
  };

  const handleAdjustmentChange = (workerId, type, val) => {
    setAdjustments({
      ...adjustments,
      [workerId]: {
        ...adjustments[workerId],
        [type]: parseFloat(val) || 0,
      },
    });
  };

  // Group workers by group name
  const groupedWorkers = WORKERS.reduce((acc, worker) => {
    if (!acc[worker.group_name]) acc[worker.group_name] = [];
    acc[worker.group_name].push(worker);
    return acc;
  }, {});

  // Calculate totals
  let grandTotalHours = 0;
  let grandTotalPayroll = 0;

  const rowsData = WORKERS.map((w) => {
    const isHourly = w.payment_type === 'hourly';
    let subtotal = 0;
    let summaryText = '';
    let totalHours = 0;

    if (isHourly) {
      totalHours = DAY_LABELS.reduce((sum, d) => sum + (attendance[`${w.id}-${d}`] || 0), 0);
      subtotal = totalHours * w.hourly_rate;
      summaryText = `${totalHours} hrs`;
    } else {
      const totalDays = DAY_LABELS.reduce((sum, d) => {
        const hours = attendance[`${w.id}-${d}`] || 0;
        if (hours === 0) return sum;
        return sum + (hours / 8);
      }, 0);
      subtotal = totalDays * w.daily_rate;
      summaryText = `${totalDays.toFixed(2).replace(/\.00$/, '')}d`;
      totalHours = totalDays * 8;
    }

    const workerAdj = adjustments[w.id] || { bonus: 0, discount: 0, reimbursement: 0 };
    const total = subtotal + workerAdj.bonus - workerAdj.discount + workerAdj.reimbursement;

    grandTotalHours += totalHours;
    grandTotalPayroll += total;

    return {
      ...w,
      subtotal,
      summaryText,
      total,
      bonus: workerAdj.bonus,
      discount: workerAdj.discount,
      reimbursement: workerAdj.reimbursement,
    };
  });

  return (
    <div className="space-y-6 text-[var(--text-secondary)]">
      
      {/* Top Banner */}
      <div>
        <h3 className="text-lg font-bold text-[var(--text-primary)]">Control de Payroll</h3>
        <p className="text-xs text-[var(--text-secondary)]">Módulo de nómina con asistencia diaria (Sáb→Vie), bonos y descuentos.</p>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-2xl flex flex-col justify-center gap-1 shadow-sm">
          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
            <Clock size={12} className="text-[var(--accent)]" /> Horas Semanales
          </span>
          <span className="text-xl font-black text-[var(--text-primary)] mt-0.5">{grandTotalHours.toFixed(1)} hrs</span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-2xl flex flex-col justify-center gap-1 shadow-sm">
          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
            <DollarSign size={12} className="text-emerald-400" /> Presupuesto Neto
          </span>
          <span className="text-xl font-black text-[var(--text-primary)] mt-0.5">${grandTotalPayroll.toLocaleString()}</span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-2xl flex flex-col justify-center gap-1 shadow-sm">
          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
            <DollarSign size={12} className="text-[var(--accent)]" /> Costo Total Estimado
          </span>
          <span className="text-xl font-black text-[var(--accent)] mt-0.5">${(grandTotalPayroll * 1.15).toLocaleString()}</span>
        </div>
      </div>

      {/* Semana Tab View */}
      <div className="space-y-6">
        {Object.keys(groupedWorkers).map((groupName) => (
          <div key={groupName} className="space-y-3">
            
            {/* Group Title Section */}
            <div className="flex items-center gap-3">
              <GroupBadge name={groupName} />
              <span className="text-[10px] font-bold text-[var(--text-muted)]">{groupedWorkers[groupName].length} trabajador(es)</span>
              <div className="flex-1 h-[1px] bg-[var(--border)]" />
            </div>

            {/* Workers in Group */}
            {groupedWorkers[groupName].map((w) => {
              const workerData = rowsData.find((r) => r.id === w.id);
              const isHourly = w.payment_type === 'hourly';
              
              return (
                <div 
                  key={w.id} 
                  className="bg-[#111] border border-[var(--border)] rounded-2xl p-4 space-y-4 hover:border-zinc-800 transition-all shadow-md"
                >
                  {/* Worker Row Header */}
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-bold text-[var(--text-primary)]">{w.name}</span>
                      <GroupBadge name={w.group_name} />
                      <span className="text-[10px] text-[var(--text-muted)] font-medium">
                        {isHourly ? `$${w.hourly_rate.toFixed(2)}/hora` : `$${w.daily_rate.toFixed(2)}/día`}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-[var(--text-muted)]">{workerData.summaryText}</span>
                      <span className="text-base font-black text-[var(--accent)]">${workerData.total.toFixed(2)}</span>
                      <button className="p-1 rounded bg-white/5 border border-[var(--border)] text-[var(--text-muted)] hover:text-white transition-all active:scale-95">
                        <Edit2 size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Attendance bubbles Sat -> Fri */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {DAY_LABELS.map((day) => {
                      const key = `${w.id}-${day}`;
                      const val = attendance[key] !== undefined ? String(attendance[key]) : '';
                      return (
                        <div key={day} className="flex flex-col items-center gap-1.5">
                          <AttendanceHoursDropdown
                            label={day}
                            value={val}
                            onChange={(newVal) => handleHoursChange(w.id, day, newVal)}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Adjustments row */}
                  <div className="flex flex-wrap gap-4 items-center border-t border-[var(--border)] pt-3.5">
                    {/* Bonus */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-emerald-400 tracking-wider uppercase">+B</span>
                      <input
                        type="number"
                        value={workerData.bonus || ''}
                        onChange={(e) => handleAdjustmentChange(w.id, 'bonus', e.target.value)}
                        placeholder="0"
                        className="w-16 bg-[#111] border border-[var(--border)] rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    {/* Discount */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-red-400 tracking-wider uppercase">-D</span>
                      <input
                        type="number"
                        value={workerData.discount || ''}
                        onChange={(e) => handleAdjustmentChange(w.id, 'discount', e.target.value)}
                        placeholder="0"
                        className="w-16 bg-[#111] border border-[var(--border)] rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    {/* Reimbursement */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-blue-400 tracking-wider uppercase">+R</span>
                      <input
                        type="number"
                        value={workerData.reimbursement || ''}
                        onChange={(e) => handleAdjustmentChange(w.id, 'reimbursement', e.target.value)}
                        placeholder="0"
                        className="w-16 bg-[#111] border border-[var(--border)] rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}
