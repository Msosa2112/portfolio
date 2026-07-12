import React, { useState } from 'react';
import { RefreshCw, Link2, CheckCircle, AlertTriangle, FileSpreadsheet, Eye, Play, Check } from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  { 
    id: 'TX-9042', 
    client: 'John Doe', 
    phone: '+1 (555) 019-2834',
    email: 'john.doe@example.com',
    address: '1234 Street, Louisville, KY',
    service: 'Roofing & Gutters',
    total: 3319.25, 
    status: 'synced', 
    qboId: '#EST-0053',
    items: [
      { desc: 'Techado (Teja Composite)', price: 3040.00 },
      { desc: 'Canal (5" K-Style)', price: 125.00 }
    ]
  },
  { 
    id: 'TX-9043', 
    client: 'John Doe', 
    phone: '+1 (555) 019-2834',
    email: 'john.doe@example.com',
    address: '1234 Street, Louisville, KY',
    service: 'Roofing & Siding',
    total: 8000.00, 
    status: 'synced', 
    qboId: '#EST-0044',
    items: [
      { desc: 'Techado (Teja Composite)', price: 5700.00 },
      { desc: 'Siding (James Hardie Plank)', price: 1440.00 },
      { desc: 'Canal (5" K-Style)', price: 625.00 }
    ]
  },
  { 
    id: 'TX-9044', 
    client: 'John Doe', 
    phone: '+1 (555) 019-2834',
    email: 'john.doe@example.com',
    address: '1234 Street, Louisville, KY',
    service: 'Window Replacement',
    total: 4500.00, 
    status: 'pending', 
    qboId: '—',
    items: [
      { desc: 'Ventana (Double Hung)', price: 2700.00 },
      { desc: 'Canal (6" Half-Round)', price: 1800.00 }
    ]
  },
  { 
    id: 'TX-9045', 
    client: 'John Doe', 
    phone: '+1 (555) 019-2834',
    email: 'john.doe@example.com',
    address: '1234 Street, Louisville, KY',
    service: 'Gutter Repair Only',
    total: 125.00, 
    status: 'pending', 
    qboId: '—',
    items: [
      { desc: 'Canal (5" K-Style)', price: 125.00 }
    ]
  }
];

export default function QuickBooksSandbox() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [selectedTx, setSelectedTx] = useState(INITIAL_TRANSACTIONS[0]);
  const [syncingId, setSyncingId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [activeLogTx, setActiveLogTx] = useState(null);
  const [checkingConnection, setCheckingConnection] = useState(false);
  const [conflictResolved, setConflictResolved] = useState(false);
  const [resolvingMode, setResolvingMode] = useState(null);

  // Sync animation handler
  const handleSyncTx = (tx) => {
    if (syncingId) return;
    setSyncingId(tx.id);
    setActiveLogTx(tx.id);
    setLogs([]);

    const logSteps = [
      `[${new Date().toLocaleTimeString()}] Iniciando transferencia de John Doe a QuickBooks Online...`,
      `[${new Date().toLocaleTimeString()}] Validando tokens de acceso OAuth 2.0... OK`,
      `[${new Date().toLocaleTimeString()}] Buscando cliente 'John Doe' en la base de datos de QuickBooks...`,
      `[${new Date().toLocaleTimeString()}] Cliente 'John Doe' encontrado (QBO-ID: CLI-9082).`,
      `[${new Date().toLocaleTimeString()}] Compilando conceptos cotizados en el CRM...`,
      `[${new Date().toLocaleTimeString()}] Enviando Estimado a QuickBooks Online API...`,
      `[${new Date().toLocaleTimeString()}] ¡Respuesta recibida! Estimado QBO registrado con éxito.`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logSteps.length) {
        setLogs(prev => [...prev, logSteps[i]]);
        i++;
      } else {
        clearInterval(interval);
        
        // Update transaction status
        const updated = transactions.map(t => {
          if (t.id === tx.id) {
            const nextEstNo = `EST-00${Math.floor(Math.random() * 50) + 55}`;
            const updatedTx = { ...t, status: 'synced', qboId: `QBO #${nextEstNo}` };
            if (selectedTx.id === t.id) {
              setSelectedTx(updatedTx);
            }
            return updatedTx;
          }
          return t;
        });

        setTransactions(updated);
        setSyncingId(null);
      }
    }, 450);
  };

  const handleCheckConnection = () => {
    setCheckingConnection(true);
    setTimeout(() => {
      setCheckingConnection(false);
    }, 1500);
  };

  const handleResolveConflict = (mode) => {
    setResolvingMode(mode);
    setTimeout(() => {
      setConflictResolved(true);
      setResolvingMode(null);
    }, 1500);
  };

  const selectedTxSubtotal = selectedTx.items.reduce((sum, item) => sum + item.price, 0);
  const selectedTxTax = selectedTxSubtotal * 0.0825;
  const selectedTxTotal = selectedTxSubtotal + selectedTxTax;

  return (
    <div className="space-y-6 text-[var(--text-secondary)] select-none">
      
      {/* Top connection status banner */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Link2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">QuickBooks Online API</h4>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black px-2 py-0.5 rounded tracking-wider uppercase flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CONECTADO
              </span>
            </div>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 font-medium">
              Vínculo activo con: <span className="font-bold text-[var(--text-primary)]">Barba Construction Sandbox LLC</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleCheckConnection}
          disabled={checkingConnection}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--border)] hover:bg-white/5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={14} className={checkingConnection ? 'animate-spin text-[var(--accent)]' : ''} />
          <span>{checkingConnection ? 'Verificando OAuth...' : 'Verificar Conexión'}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Sync table and logs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Sync table card */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[var(--border)] flex items-center gap-2.5">
              <FileSpreadsheet size={16} className="text-[var(--accent)]" />
              <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">Sincronización de Ventas</h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-black/10 text-[var(--text-muted)] text-[10px] font-black uppercase tracking-wider">
                    <th className="py-3 px-4">Proyecto</th>
                    <th className="py-3 px-4 text-center">Estado</th>
                    <th className="py-3 px-4">QBO ID</th>
                    <th className="py-3 px-4 text-right">Monto</th>
                    <th className="py-3 px-4 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-xs text-[var(--text-secondary)]">
                  {transactions.map((tx) => {
                    const isSynced = tx.status === 'synced';
                    const isSelected = selectedTx.id === tx.id;
                    const isSyncing = syncingId === tx.id;

                    return (
                      <tr 
                        key={tx.id} 
                        onClick={() => setSelectedTx(tx)}
                        className={`hover:bg-white/5 cursor-pointer transition-all ${isSelected ? 'bg-white/5 border-l-2 border-l-[var(--accent)]' : ''}`}
                      >
                        <td className="py-3 px-4">
                          <p className="font-bold text-[var(--text-primary)]">{tx.client}</p>
                          <span className="text-[10px] text-[var(--text-muted)]">{tx.service}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border ${
                            isSynced 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                          }`}>
                            {isSynced ? 'Sincronizado' : 'Pendiente'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[10px] text-[var(--text-secondary)]">{tx.qboId}</td>
                        <td className="py-3 px-4 text-right font-bold text-[var(--text-primary)]">${tx.total.toFixed(2)}</td>
                        <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                          {isSynced ? (
                            <button
                              onClick={() => setSelectedTx(tx)}
                              className="p-2 border border-[var(--border)] hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-all"
                              title="Ver Comprobante"
                            >
                              <Eye size={12} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSyncTx(tx)}
                              disabled={!!syncingId}
                              className="crm-btn-accent px-3 py-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-bold rounded-xl text-[10px] uppercase flex items-center justify-center gap-1 active:scale-95 transition-all shadow"
                            >
                              <RefreshCw size={10} className={isSyncing ? 'animate-spin' : ''} />
                              <span>{isSyncing ? 'Sinc...' : 'Sincronizar'}</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sync logs trace console */}
          {activeLogTx && (
            <div className="bg-black/45 border border-[var(--border)] rounded-2xl p-4 font-mono text-[10px] space-y-2 max-h-40 overflow-y-auto">
              <div className="flex justify-between items-center text-[9px] font-black text-[var(--text-muted)] uppercase border-b border-[var(--border)] pb-2 mb-2">
                <span>Consola de Auditoría OAuth / QBO API ({activeLogTx})</span>
                <span className="text-[var(--accent)]">ACTIVO</span>
              </div>
              <div className="space-y-1 divide-y divide-white/5">
                {logs.map((log, idx) => (
                  <p key={idx} className="py-1 text-[var(--text-secondary)]">{log}</p>
                ))}
                {syncingId === activeLogTx && (
                  <div className="flex items-center gap-2 text-[var(--accent)] font-bold py-1 animate-pulse">
                    <RefreshCw size={10} className="animate-spin" />
                    <span>Transfiriendo metadatos al catálogo de QuickBooks...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Conflict Resolver Demonstration Box */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle size={18} />
              <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">
                Resolución de Conflictos Inteligente
              </h4>
            </div>
            
            <p className="text-xs leading-relaxed">
              El CRM detecta de forma automática duplicados y discrepancias entre los datos de facturación de QuickBooks y la información de campo recogida en obra.
            </p>

            {conflictResolved ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 text-xs flex items-center gap-3">
                <CheckCircle size={18} className="shrink-0" />
                <div>
                  <p className="font-bold">Conflicto resuelto con éxito</p>
                  <p className="text-[11px] opacity-80">
                    Las bases de datos se han conciliado de forma bilateral. Las siguientes sincronizaciones usarán la información unificada de John Doe.
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-[var(--border)] rounded-xl p-4 space-y-4 bg-black/10">
                <div className="text-[11px] space-y-1">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">
                    CONFLICTO DETECTADO
                  </span>
                  <p className="font-bold text-[var(--text-primary)] mt-1">Discrepancia en Cliente: John Doe</p>
                  <p className="text-[var(--text-secondary)]">
                    QuickBooks contiene un registro John Doe con el teléfono <span className="font-bold font-mono text-white">(555) 999-9999</span>, pero el estimado actual del CRM indica <span className="font-bold font-mono text-white">+1 (555) 019-2834</span>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => handleResolveConflict('qbo')}
                    disabled={!!resolvingMode}
                    className="flex-1 py-2 px-3 border border-[var(--border)] hover:bg-white/5 rounded-lg text-[10px] font-bold text-white transition-all text-center flex items-center justify-center"
                  >
                    {resolvingMode === 'qbo' ? 'Aplicando...' : 'Sobrescribir QBO con datos CRM'}
                  </button>
                  <button
                    onClick={() => handleResolveConflict('crm')}
                    disabled={!!resolvingMode}
                    className="flex-1 py-2 px-3 border border-[var(--border)] hover:bg-white/5 rounded-lg text-[10px] font-bold text-white transition-all text-center flex items-center justify-center"
                  >
                    {resolvingMode === 'crm' ? 'Aplicando...' : 'Actualizar CRM con datos QBO'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: QuickBooks Online Estimate preview mock */}
        <div className="space-y-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col space-y-4">
            
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-[var(--text-muted)] tracking-wider border-b border-[var(--border)] pb-2">
              <span>Vista QuickBooks Online</span>
              <span className="text-emerald-400">Sandbox Preview</span>
            </div>

            {/* QBO Receipt Container */}
            <div className="bg-white text-zinc-900 rounded-xl overflow-hidden shadow-md border border-zinc-200">
              
              {/* QuickBooks green accent banner header */}
              <div className="bg-[#2ca01c] p-4 text-white flex justify-between items-start">
                <div>
                  <h3 className="text-base font-black">quickbooks</h3>
                  <p className="text-[8px] tracking-widest font-black uppercase mt-0.5 opacity-90">Estimate # {selectedTx.qboId === '—' ? 'PENDIENTE' : selectedTx.qboId.replace('QBO #', '')}</p>
                </div>
                <div className="text-right text-[10px] font-bold">
                  <p>Barba Construction Sandbox LLC</p>
                  <p className="text-[8px] opacity-85">Sandbox Org</p>
                </div>
              </div>

              {/* Receipt Details */}
              <div className="p-4 space-y-4 text-[10px] text-zinc-600 leading-normal">
                <div className="grid grid-cols-2 gap-2 border-b border-zinc-100 pb-3">
                  <div>
                    <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-400 block">Customer</span>
                    <p className="font-bold text-zinc-950">{selectedTx.client}</p>
                    <p className="text-[9px]">{selectedTx.address}</p>
                    <p className="text-[9px]">{selectedTx.phone}</p>
                    <p className="text-[9px]">{selectedTx.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-400 block">Date</span>
                    <p className="font-bold text-zinc-950">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-400 block mt-2">Expiration Date</span>
                    <p>Net 30</p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-zinc-200 rounded overflow-hidden">
                  <table className="w-full text-left border-collapse text-[9px]">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-[8px] font-black uppercase text-zinc-500">
                        <th className="py-2 px-3">Product/Service</th>
                        <th className="py-2 px-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-150 text-zinc-700">
                      {selectedTx.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50/50">
                          <td className="py-2.5 px-3 font-semibold text-zinc-800">{item.desc}</td>
                          <td className="py-2.5 px-3 text-right text-zinc-900">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end pt-2 text-[10px]">
                  <div className="w-32 space-y-1.5">
                    <div className="flex justify-between text-zinc-500">
                      <span>Subtotal</span>
                      <span className="font-bold text-zinc-800">${selectedTxSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Tax (8.25%)</span>
                      <span className="font-bold text-zinc-800">${selectedTxTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-200 pt-1.5 text-xs text-zinc-950 font-black">
                      <span>Total</span>
                      <span className="text-[#2ca01c]">${selectedTxTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
