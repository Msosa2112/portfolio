import React, { useState } from 'react';
import { Box, Droplets, Hammer, Grid, MapPin, Square, Circle, CornerDownLeft, FileText, Send, X } from 'lucide-react';

const CATEGORIES = [
  { id: 'roofing', title: 'Techos', desc: 'Composite & Metal', icon: Box, status: 'LISTO' },
  { id: 'siding', title: 'Siding', desc: 'Vinyl & Plank', icon: Hammer, status: 'LISTO' },
  { id: 'windows', title: 'Ventanas', desc: 'Double Hung / Casement', icon: Grid, status: 'LISTO' },
  { id: 'gutters', title: 'Canales', desc: 'Seamless Aluminum', icon: Droplets, status: 'ACTIVO' },
];

export default function EstimatorSandbox() {
  const [activeCategory, setActiveCategory] = useState('gutters');
  
  // Gutter config state
  const [gutterConfig, setGutterConfig] = useState({
    profile: 'k-style',
    size: '5',
    linearFeet: '0',
  });

  const [receiptItems, setReceiptItems] = useState([
    {
      id: 1,
      name: 'Mano de Obra (Instalación)',
      details: 'Estimado 6.5 Horas',
      price: 845.00,
      faded: true
    }
  ]);

  const [showProposal, setShowProposal] = useState(false);

  // Append numpad digit
  const appendDigit = (digit) => {
    const current = gutterConfig.linearFeet;
    if (current === '0' && digit !== '.') {
      setGutterConfig({ ...gutterConfig, linearFeet: digit });
      return;
    }
    if (digit === '.' && current.includes('.')) return;
    setGutterConfig({ ...gutterConfig, linearFeet: current + digit });
  };

  const clearDigits = () => {
    setGutterConfig({ ...gutterConfig, linearFeet: '0' });
  };

  const addToReceipt = () => {
    const lf = parseFloat(gutterConfig.linearFeet) || 0;
    if (lf === 0) return;

    // Unit prices based on size/profile
    const unitPrice = gutterConfig.size === '5' ? 12.50 : gutterConfig.size === '6' ? 15.00 : 18.50;
    const newItem = {
      id: Date.now(),
      name: `Tramo de Canal (${gutterConfig.size}" ${gutterConfig.profile === 'k-style' ? 'K-Style' : 'Half-Round'})`,
      details: `${lf} PL @ $${unitPrice.toFixed(2)}/pie`,
      price: lf * unitPrice,
      faded: false
    };

    setReceiptItems([newItem, ...receiptItems]);
    clearDigits();
  };

  const calculateTotal = () => {
    return receiptItems.reduce((acc, item) => acc + item.price, 0);
  };

  const subtotal = calculateTotal();
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start text-[var(--text-secondary)]">
      
      {/* Configurator Side */}
      <div className="flex-1 w-full space-y-6">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Nuevo Estimado</h3>
          <p className="text-xs text-[var(--text-secondary)]">Configura los servicios y materiales para el cliente</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-4 rounded-2xl flex flex-col items-start text-left border transition-all active:scale-[0.97] group ${
                  isActive
                    ? 'bg-[var(--bg-card)] border-[var(--accent)] shadow-md'
                    : 'bg-[var(--bg-input)] border-[var(--border)] hover:border-[var(--text-muted)]'
                }`}
              >
                <div className="flex justify-between items-center w-full mb-3">
                  <span className={`transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`}>
                    <Icon size={22} />
                  </span>
                  <span className={`text-[8px] tracking-widest px-1.5 py-0.5 rounded font-black ${
                    isActive ? 'bg-[var(--accent)] text-black' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'
                  }`}>
                    {isActive ? 'ACTIVO' : cat.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">{cat.title}</h4>
                <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">{cat.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Configuration Panel */}
        {activeCategory === 'gutters' ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] bg-[var(--accent)]/30 flex-1 rounded-full"></div>
              <span className="text-[10px] font-black tracking-widest text-[var(--accent)] uppercase">Configuración de Canales</span>
              <div className="h-[1px] bg-[var(--border)] flex-1 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Profile & Size */}
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-3">Perfil del Canal</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGutterConfig({ ...gutterConfig, profile: 'k-style' })}
                      className={`p-4 rounded-xl flex flex-col items-center gap-2 border transition-all active:scale-95 ${
                        gutterConfig.profile === 'k-style'
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]'
                          : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
                      }`}
                    >
                      <Square size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">K-Style</span>
                    </button>
                    <button
                      onClick={() => setGutterConfig({ ...gutterConfig, profile: 'half-round' })}
                      className={`p-4 rounded-xl flex flex-col items-center gap-2 border transition-all active:scale-95 ${
                        gutterConfig.profile === 'half-round'
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]'
                          : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
                      }`}
                    >
                      <Circle size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Half-Round</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-3">Tamaño (Pulgadas)</label>
                  <div className="flex bg-[var(--bg-input)] rounded-xl p-1 border border-[var(--border)]">
                    {['5', '6', '7'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setGutterConfig({ ...gutterConfig, size })}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all active:scale-95 ${
                          gutterConfig.size === size
                            ? 'bg-[var(--accent)] text-black shadow-md'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {size}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Numpad */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-2">Pies Lineales Totales</label>
                  <div className="bg-[var(--bg-input)] border border-[var(--border)] p-4 rounded-xl flex items-center justify-between shadow-inner">
                    <span className={`text-3xl font-black ${gutterConfig.linearFeet === '0' ? 'text-[var(--text-muted)]' : 'text-[var(--accent)]'}`}>
                      {gutterConfig.linearFeet}
                    </span>
                    <span className="text-[var(--text-secondary)] text-xs font-bold uppercase">PL</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => appendDigit(num.toString())}
                      className="py-3 bg-[var(--bg-sidebar)] rounded-xl text-base font-bold text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-muted)] active:scale-95 transition-all"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={clearDigits}
                    className="py-3 bg-red-950/20 rounded-xl text-sm font-black text-red-400 border border-red-900/30 hover:bg-red-900/40 active:scale-95 transition-all"
                  >
                    C
                  </button>
                  <button
                    onClick={() => appendDigit('0')}
                    className="py-3 bg-[var(--bg-sidebar)] rounded-xl text-base font-bold text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-muted)] active:scale-95 transition-all"
                  >
                    0
                  </button>
                  <button
                    onClick={addToReceipt}
                    className="crm-btn-accent py-3 bg-[var(--accent)] rounded-xl text-black hover:bg-[var(--accent-hover)] active:scale-95 transition-all flex items-center justify-center shadow-lg"
                  >
                    <CornerDownLeft size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] border-dashed rounded-2xl p-12 text-center text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest">
            Categoría disponible en la versión completa. Selecciona "Canales".
          </div>
        )}
      </div>

      {/* Receipt Side */}
      <div className="w-full lg:w-[350px] shrink-0 border border-[var(--border)] bg-[var(--bg-card)] rounded-2xl overflow-hidden flex flex-col shadow-sm">
        <div className="p-4 bg-black/10 border-b border-[var(--border)] flex justify-between items-center">
          <h4 className="text-xs font-black tracking-widest uppercase text-[var(--accent)]">Resumen del Estimado</h4>
          <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-widest uppercase">Borrador</span>
        </div>

        {/* Receipt List */}
        <div className="p-4 flex flex-col gap-3 min-h-[180px] max-h-[220px] overflow-y-auto">
          {receiptItems.map((item) => (
            <div key={item.id} className={`bg-[var(--bg-input)] border border-[var(--border)] p-3 rounded-xl flex justify-between items-center ${item.faded ? 'opacity-40' : ''}`}>
              <div className="min-w-0">
                <p className="font-bold text-xs text-[var(--text-primary)] truncate">{item.name}</p>
                <span className="text-[9px] text-[var(--text-muted)]">{item.details}</span>
              </div>
              <span className="text-sm font-black text-[var(--accent)] shrink-0 ml-3">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="p-4 border-t border-[var(--border)] bg-black/10 space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <span>Impuesto (8.25%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-end border-t border-[var(--border)] pt-3 mb-4">
            <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Total</span>
            <span className="text-2xl font-black text-[var(--accent)] tracking-tight">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => setShowProposal(true)}
            className="crm-btn-accent w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black rounded-xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
          >
            <Send size={14} />
            <span>Generar Propuesta</span>
          </button>
        </div>
      </div>

      {/* PDF Proposal Preview Modal */}
      {showProposal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md text-zinc-900">
          <div className="bg-white rounded-3xl w-full max-w-xl p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowProposal(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-all"
            >
              <X size={16} />
            </button>

            {/* Mock Invoice Layout */}
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-zinc-100 pb-5">
                <div>
                  <h3 className="text-lg font-black tracking-wider uppercase text-zinc-900">Barba Construction</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Siding, Roofing & Gutters Specialist</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black bg-zinc-100 text-zinc-600 px-2 py-1 rounded tracking-widest uppercase">Presupuesto</span>
                  <p className="text-xs font-bold text-zinc-400 mt-2">Nº PROP-2026-004</p>
                </div>
              </div>

              {/* Bill to */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-bold text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Para:</h5>
                  <p className="font-bold">Nuevo Cliente</p>
                  <p className="text-zinc-500">Dirección de Obra</p>
                </div>
                <div className="text-right">
                  <h5 className="font-bold text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Fecha de Emisión:</h5>
                  <p className="font-bold">{new Date().toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-zinc-100 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100 text-[9px] font-black uppercase text-zinc-500">
                      <th className="py-2.5 px-4">Descripción</th>
                      <th className="py-2.5 px-4 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-700">
                    {receiptItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3 px-4">
                          <p className="font-bold text-zinc-800">{item.name}</p>
                          <span className="text-[10px] text-zinc-400">{item.details}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-zinc-900">${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Calculations */}
              <div className="flex justify-end text-xs">
                <div className="w-48 space-y-2 border-t border-zinc-100 pt-4">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal:</span>
                    <span className="font-bold text-zinc-800">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Impuesto (8.25%):</span>
                    <span className="font-bold text-zinc-800">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-100 pt-2 text-sm">
                    <span className="font-black text-zinc-900">Total:</span>
                    <span className="font-black text-orange-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowProposal(false)}
              className="w-full py-3.5 bg-zinc-950 text-white rounded-xl text-xs font-black tracking-widest uppercase hover:bg-zinc-800 transition-all"
            >
              Cerrar Vista Previa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
