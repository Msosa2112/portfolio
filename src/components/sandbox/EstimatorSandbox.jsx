import React, { useState, useEffect } from 'react';
import { Box, Droplets, Hammer, Grid, MapPin, Square, Circle, CornerDownLeft, FileText, Send, X, Trash2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'roofing', title: 'Techos', desc: 'Composite & Metal', icon: Box, label: 'Techos' },
  { id: 'siding', title: 'Siding', desc: 'Vinyl & Plank', icon: Hammer, label: 'Siding' },
  { id: 'windows', title: 'Ventanas', desc: 'Double Hung / Casement', icon: Grid, label: 'Ventanas' },
  { id: 'gutters', title: 'Canales', desc: 'Seamless Aluminum', icon: Droplets, label: 'Canales' },
];

const MOCK_ADDRESSES = [
  { address: '600 East Kentucky Street, Louisville, KY', client: 'Bessie Wilson HD' },
  { address: '1141 Parliament Way, Louisville, KY', client: 'Jack Williams' },
  { address: '2219 Peaslee Rd, Louisville, KY', client: 'Arlenis Andino' },
  { address: '5002 E Bahama Ct, Louisville, KY', client: 'Kholoud Baien' },
  { address: '9500 Moorfield Cir, Louisville, KY', client: 'Tomas Aguilera' },
  { address: '1204 Rock Falls Trace, Louisville, KY', client: 'Moe Karimi' },
  { address: '1421 Hobart Dr, Louisville, KY', client: 'Anthony Sumlin' },
  { address: '3551 Blue Park Ln, Louisville, KY', client: 'Elianis Rivero' },
];

export default function EstimatorSandbox() {
  const [activeCategory, setActiveCategory] = useState('gutters');
  
  // Client details autocomplete state
  const [addressSearch, setAddressSearch] = useState('600 East Kentucky Street, Louisville, KY');
  const [clientName, setClientName] = useState('Bessie Wilson HD');
  const [clientAddress, setClientAddress] = useState('600 East Kentucky Street, Louisville, KY');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Configuration States
  const [roofingConfig, setRoofingConfig] = useState({ material: 'composite', slope: 'standard', quantity: '0' });
  const [sidingConfig, setSidingConfig] = useState({ material: 'vinyl', trim: 'standard', quantity: '0' });
  const [windowsConfig, setWindowsConfig] = useState({ type: 'double-hung', frame: 'white', quantity: '0' });
  const [gutterConfig, setGutterConfig] = useState({ profile: 'k-style', size: '5', linearFeet: '0' });

  // Receipt Cart
  const [receiptItems, setReceiptItems] = useState([
    {
      id: 1,
      name: 'Mano de Obra (Instalación)',
      details: 'Estimado 6.5 Horas de Cuadrilla',
      price: 845.00
    }
  ]);

  const [showProposal, setShowProposal] = useState(false);

  // General autocomplete handlers
  const handleAddressChange = (e) => {
    const val = e.target.value;
    setAddressSearch(val);
    if (val.trim().length > 1) {
      const filtered = MOCK_ADDRESSES.filter(
        item => item.address.toLowerCase().includes(val.toLowerCase()) || 
                item.client.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (sug) => {
    setAddressSearch(sug.address);
    setClientAddress(sug.address);
    setClientName(sug.client);
    setShowSuggestions(false);
  };

  // Numpad dynamic selector mapping
  const getActiveQuantity = () => {
    if (activeCategory === 'roofing') return roofingConfig.quantity;
    if (activeCategory === 'siding') return sidingConfig.quantity;
    if (activeCategory === 'windows') return windowsConfig.quantity;
    return gutterConfig.linearFeet;
  };

  const setActiveQuantity = (val) => {
    if (activeCategory === 'roofing') setRoofingConfig({ ...roofingConfig, quantity: val });
    else if (activeCategory === 'siding') setSidingConfig({ ...sidingConfig, quantity: val });
    else if (activeCategory === 'windows') setWindowsConfig({ ...windowsConfig, quantity: val });
    else setGutterConfig({ ...gutterConfig, linearFeet: val });
  };

  // Numpad handlers
  const appendDigit = (digit) => {
    const current = getActiveQuantity();
    if (current === '0' && digit !== '.') {
      setActiveQuantity(digit);
      return;
    }
    if (digit === '.' && current.includes('.')) return;
    setActiveQuantity(current + digit);
  };

  const clearDigits = () => {
    setActiveQuantity('0');
  };

  // Add Item to Estimate Receipt
  const addToReceipt = () => {
    const qty = parseFloat(getActiveQuantity()) || 0;
    if (qty === 0) return;

    let newItem;
    if (activeCategory === 'roofing') {
      const isComposite = roofingConfig.material === 'composite';
      const isStandard = roofingConfig.slope === 'standard';
      const basePrice = isComposite ? 380 : 650;
      const finalPrice = basePrice + (isStandard ? 0 : 50);
      newItem = {
        id: Date.now(),
        name: `Techado (${isComposite ? 'Teja Composite' : 'Metal Standing Seam'})`,
        details: `${qty} SQ @ $${finalPrice.toFixed(2)}/SQ (${isStandard ? 'Pendiente Estándar' : 'Pendiente Inclinada'})`,
        price: qty * finalPrice,
      };
    } else if (activeCategory === 'siding') {
      const isVinyl = sidingConfig.material === 'vinyl';
      const isStandardTrim = sidingConfig.trim === 'standard';
      const basePrice = isVinyl ? 6.50 : 12.00;
      const finalPrice = basePrice + (isStandardTrim ? 0 : 1.50);
      newItem = {
        id: Date.now(),
        name: `Siding (${isVinyl ? 'Vinilo' : 'James Hardie Plank'})`,
        details: `${qty} sq ft @ $${finalPrice.toFixed(2)}/sq ft (${isStandardTrim ? 'Moldura Std' : 'Moldura Premium'})`,
        price: qty * finalPrice,
      };
    } else if (activeCategory === 'windows') {
      const typeLabel = windowsConfig.type === 'double-hung' ? 'Double Hung' : windowsConfig.type === 'casement' ? 'Casement' : 'Slider';
      const basePrice = windowsConfig.type === 'double-hung' ? 450 : windowsConfig.type === 'casement' ? 550 : 400;
      const isWhite = windowsConfig.frame === 'white';
      const finalPrice = basePrice + (isWhite ? 0 : 75);
      newItem = {
        id: Date.now(),
        name: `Ventana (${typeLabel})`,
        details: `${qty} ud. @ $${finalPrice.toFixed(2)}/ud. (${isWhite ? 'Marco Blanco' : 'Marco Negro'})`,
        price: qty * finalPrice,
      };
    } else if (activeCategory === 'gutters') {
      const isKStyle = gutterConfig.profile === 'k-style';
      const sizeLabel = gutterConfig.size === '5' ? '5"' : gutterConfig.size === '6' ? '6"' : '7"';
      const unitPrice = gutterConfig.size === '5' ? 12.50 : gutterConfig.size === '6' ? 15.00 : 18.50;
      newItem = {
        id: Date.now(),
        name: `Canal (${isKStyle ? 'K-Style' : 'Half-Round'})`,
        details: `${qty} PL @ $${unitPrice.toFixed(2)}/pie (${sizeLabel})`,
        price: qty * unitPrice,
      };
    }

    if (newItem) {
      setReceiptItems([newItem, ...receiptItems]);
      clearDigits();
    }
  };

  const deleteItem = (id) => {
    setReceiptItems(receiptItems.filter(item => item.id !== id));
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
        
        {/* Client & Address Autocomplete Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[var(--accent)]" />
            <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">Dirección y Cliente</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            
            {/* Google Places Autocomplete Simulator */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Buscar Dirección (Google Autocomplete)</label>
              <input
                type="text"
                placeholder="Escribe dirección o cliente..."
                value={addressSearch}
                onChange={handleAddressChange}
                className="crm-input bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-[100%] left-0 right-0 bg-[#0d1321] border border-[var(--border)] rounded-xl mt-1.5 shadow-2xl z-[120] overflow-hidden divide-y divide-[var(--border)]">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSuggestion(sug)}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-[var(--bg-card-hover)] text-xs text-[var(--text-primary)] flex flex-col gap-0.5"
                    >
                      <span className="font-bold">{sug.address}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">Cliente: {sug.client}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Client Name Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Nombre del Cliente</label>
              <input
                type="text"
                placeholder="Nombre del Cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="crm-input bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none"
              />
            </div>
          </div>
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
                    ACTIVO
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">{cat.title}</h4>
                <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">{cat.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Configuration Panel */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] bg-[var(--accent)]/30 flex-1 rounded-full"></div>
            <span className="text-[10px] font-black tracking-widest text-[var(--accent)] uppercase">
              Configuración de {CATEGORIES.find(c => c.id === activeCategory)?.title}
            </span>
            <div className="h-[1px] bg-[var(--border)] flex-1 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Options Column based on category selection */}
            <div className="space-y-6">
              
              {/* Techos Configuration options */}
              {activeCategory === 'roofing' && (
                <>
                  <div>
                    <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-3">Material de Techo</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setRoofingConfig({ ...roofingConfig, material: 'composite' })}
                        className={`p-4 rounded-xl flex flex-col items-center gap-2 border transition-all active:scale-95 ${
                          roofingConfig.material === 'composite'
                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]'
                            : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
                        }`}
                      >
                        <Square size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Teja Composite</span>
                      </button>
                      <button
                        onClick={() => setRoofingConfig({ ...roofingConfig, material: 'metal' })}
                        className={`p-4 rounded-xl flex flex-col items-center gap-2 border transition-all active:scale-95 ${
                          roofingConfig.material === 'metal'
                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]'
                            : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
                        }`}
                      >
                        <Square size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Metal Standing Seam</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-3">Pendiente / Dificultad</label>
                    <div className="flex bg-[var(--bg-input)] rounded-xl p-1 border border-[var(--border)]">
                      {['standard', 'steep'].map((slope) => (
                        <button
                          key={slope}
                          onClick={() => setRoofingConfig({ ...roofingConfig, slope })}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all active:scale-95 uppercase tracking-wider ${
                            roofingConfig.slope === slope
                              ? 'bg-[var(--accent)] text-black shadow-md'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {slope === 'standard' ? 'Estándar' : 'Inclinada (+50/SQ)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Siding Configuration options */}
              {activeCategory === 'siding' && (
                <>
                  <div>
                    <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-3">Material de Revestimiento</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSidingConfig({ ...sidingConfig, material: 'vinyl' })}
                        className={`p-4 rounded-xl flex flex-col items-center gap-2 border transition-all active:scale-95 ${
                          sidingConfig.material === 'vinyl'
                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]'
                            : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
                        }`}
                      >
                        <Square size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Vinilo Std</span>
                      </button>
                      <button
                        onClick={() => setSidingConfig({ ...sidingConfig, material: 'hardie' })}
                        className={`p-4 rounded-xl flex flex-col items-center gap-2 border transition-all active:scale-95 ${
                          sidingConfig.material === 'hardie'
                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]'
                            : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
                        }`}
                      >
                        <Square size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">James Hardie</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-3">Paquete de Molduras</label>
                    <div className="flex bg-[var(--bg-input)] rounded-xl p-1 border border-[var(--border)]">
                      {['standard', 'premium'].map((trim) => (
                        <button
                          key={trim}
                          onClick={() => setSidingConfig({ ...sidingConfig, trim })}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all active:scale-95 uppercase tracking-wider ${
                            sidingConfig.trim === trim
                              ? 'bg-[var(--accent)] text-black shadow-md'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {trim === 'standard' ? 'Estándar' : 'Premium (+1.50/sq ft)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Ventanas Configuration options */}
              {activeCategory === 'windows' && (
                <>
                  <div>
                    <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-3">Tipo de Ventana</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['double-hung', 'casement', 'slider'].map((wType) => (
                        <button
                          key={wType}
                          onClick={() => setWindowsConfig({ ...windowsConfig, type: wType })}
                          className={`py-3 px-1 rounded-xl flex flex-col items-center gap-1.5 border text-center transition-all active:scale-95 ${
                            windowsConfig.type === wType
                              ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]'
                              : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
                          }`}
                        >
                          <Square size={16} />
                          <span className="text-[9px] font-bold uppercase tracking-wider truncate max-w-full">
                            {wType === 'double-hung' ? 'Double Hung' : wType === 'casement' ? 'Casement' : 'Slider'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-3">Color del Marco</label>
                    <div className="flex bg-[var(--bg-input)] rounded-xl p-1 border border-[var(--border)]">
                      {['white', 'black'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setWindowsConfig({ ...windowsConfig, frame: color })}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all active:scale-95 uppercase tracking-wider ${
                            windowsConfig.frame === color
                              ? 'bg-[var(--accent)] text-black shadow-md'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {color === 'white' ? 'Blanco' : 'Negro (+75)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Canales (Gutters) Configuration options */}
              {activeCategory === 'gutters' && (
                <>
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
                </>
              )}

            </div>

            {/* Right Numpad Column */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase block mb-2">
                  {activeCategory === 'roofing' ? 'Cantidad (Squares / SQ)' : activeCategory === 'siding' ? 'Área total (sq ft)' : activeCategory === 'windows' ? 'Cantidad de Ventanas' : 'Pies Lineales Totales'}
                </label>
                <div className="bg-[var(--bg-input)] border border-[var(--border)] p-4 rounded-xl flex items-center justify-between shadow-inner">
                  <span className={`text-3xl font-black ${getActiveQuantity() === '0' ? 'text-[var(--text-muted)]' : 'text-[var(--accent)]'}`}>
                    {getActiveQuantity()}
                  </span>
                  <span className="text-[var(--text-secondary)] text-xs font-bold uppercase">
                    {activeCategory === 'roofing' ? 'SQ' : activeCategory === 'siding' ? 'sq ft' : activeCategory === 'windows' ? 'ud.' : 'PL'}
                  </span>
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
                  style={{ gridColumn: activeCategory === 'windows' ? 'span 2' : 'auto' }}
                >
                  0
                </button>
                {activeCategory !== 'windows' && (
                  <button
                    onClick={() => appendDigit('.')}
                    className="py-3 bg-[var(--bg-sidebar)] rounded-xl text-base font-bold text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-muted)] active:scale-95 transition-all"
                  >
                    .
                  </button>
                )}
                <button
                  onClick={addToReceipt}
                  className="crm-btn-accent py-3 bg-[var(--accent)] rounded-xl text-black hover:bg-[var(--accent-hover)] active:scale-95 transition-all flex items-center justify-center shadow-lg"
                  style={{ gridColumn: 'span 3' }}
                >
                  <CornerDownLeft size={18} className="mr-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">Añadir Concepto</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* Receipt Side */}
      <div className="w-full lg:w-[350px] shrink-0 border border-[var(--border)] bg-[var(--bg-card)] rounded-2xl overflow-hidden flex flex-col shadow-sm">
        <div className="p-4 bg-black/10 border-b border-[var(--border)] flex justify-between items-center">
          <h4 className="text-xs font-black tracking-widest uppercase text-[var(--accent)]">Resumen del Estimado</h4>
          <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-widest uppercase">Borrador</span>
        </div>

        {/* Receipt List */}
        <div className="p-4 flex flex-col gap-3 min-h-[220px] max-h-[300px] overflow-y-auto">
          {receiptItems.map((item) => (
            <div key={item.id} className="bg-[var(--bg-input)] border border-[var(--border)] p-3 rounded-xl flex justify-between items-start gap-2">
              <div className="min-w-0">
                <p className="font-bold text-xs text-[var(--text-primary)] truncate">{item.name}</p>
                <span className="text-[9px] text-[var(--text-muted)] block mt-0.5 leading-relaxed">{item.details}</span>
              </div>
              <div className="flex flex-col items-end shrink-0 gap-1.5">
                <span className="text-xs font-black text-[var(--accent)]">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-[var(--text-muted)] hover:text-red-400 p-0.5 rounded hover:bg-white/5 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
          {receiptItems.length === 0 && (
            <div className="flex-1 flex items-center justify-center border border-dashed border-[var(--border)] rounded-xl py-12 text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">
              Carrito Vacío
            </div>
          )}
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
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Especialista en Techos, Siding y Canales</p>
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
                  <p className="font-bold text-zinc-800">{clientName}</p>
                  <p className="text-zinc-500">{clientAddress}</p>
                </div>
                <div className="text-right">
                  <h5 className="font-bold text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Fecha de Emisión:</h5>
                  <p className="font-bold text-zinc-800">{new Date().toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
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
