import React, { useState } from 'react';
import { Box, Droplets, Hammer, Grid, MapPin, Square, Circle, CornerDownLeft, FileText, Send, X, Trash2, Sparkles, ClipboardCheck, Truck, Plus } from 'lucide-react';

const CATEGORIES = [
  { id: 'roofing', title: 'Techos', desc: 'Composite & Metal', icon: Box, label: 'Techos' },
  { id: 'siding', title: 'Siding', desc: 'Vinyl & Plank', icon: Hammer, label: 'Siding' },
  { id: 'windows', title: 'Ventanas', desc: 'Double Hung / Casement', icon: Grid, label: 'Ventanas' },
  { id: 'gutters', title: 'Canales', desc: 'Seamless Aluminum', icon: Droplets, label: 'Canales' },
];

const MOCK_ADDRESSES = [
  { address: '1234 Street, Louisville, KY', client: 'John Doe' },
  { address: '1234 Street, Suite A, Louisville, KY', client: 'John Doe' },
  { address: '1234 Street, Apt 101, Louisville, KY', client: 'John Doe' },
  { address: '1234 Street North, Louisville, KY', client: 'John Doe' },
  { address: '1234 Street South, Louisville, KY', client: 'John Doe' },
];

const MOCK_ESTIMATES = [
  {
    id: 'est-5846',
    projNo: 'PRJ-5846',
    qboNo: 'QBO #EST-0053',
    client: 'John Doe',
    services: 'Roofing & Gutters',
    address: '1234 Street, Louisville, KY',
    total: 3319.25,
    status: 'approved',
    date: 'Jul 9, 2026',
    items: [
      { id: 101, name: 'Techado (Teja Composite)', details: '8.00 SQ @ $380.00/SQ (Pendiente Estándar)', price: 3040.00 },
      { id: 102, name: 'Canal (5" K-Style)', details: '10.00 PL @ $12.50/pie (5")', price: 125.00 }
    ],
    proposalText: `PROJECT DESCRIPTION\nBarba Construction will perform exterior renovation services for John Doe at 1234 Street, Louisville, KY.\nContact: +1 (555) 019-2834 | john.doe@example.com\n\nSCOPE OF WORK\n  - Complete removal of existing roofing materials down to plywood decking.\n  - Installation of seamless aluminum gutters securely sloped.\n\nWARRANTY\n  - 2-year comprehensive labor warranty backed by Barba Construction.`
  },
  {
    id: 'est-5466',
    projNo: 'PRJ-5466',
    qboNo: 'QBO #EST-0044',
    client: 'John Doe',
    services: 'Roofing & Siding',
    address: '1234 Street, Louisville, KY',
    total: 8000.00,
    status: 'approved',
    date: 'Jul 5, 2026',
    items: [
      { id: 201, name: 'Techado (Teja Composite)', details: '15.00 SQ @ $380.00/SQ (Pendiente Estándar)', price: 5700.00 },
      { id: 202, name: 'Siding (James Hardie Plank)', details: '120.00 sq ft @ $12.00/sq ft (Moldura Std)', price: 1440.00 },
      { id: 203, name: 'Canal (5" K-Style)', details: '50.00 PL @ $12.50/pie (5")', price: 625.00 }
    ],
    proposalText: `PROJECT DESCRIPTION\nBarba Construction will perform exterior renovation services for John Doe at 1234 Street, Louisville, KY.\nContact: +1 (555) 019-2834 | john.doe@example.com\n\nSCOPE OF WORK\n  - Complete removal of existing roofing materials.\n  - Installation of premium siding panels.\n  - Installation of seamless gutters.`
  },
  {
    id: 'est-5473',
    projNo: 'PRJ-5473',
    qboNo: 'QBO #EST-0043',
    client: 'John Doe',
    services: 'Gutters & Windows',
    address: '1234 Street, Louisville, KY',
    total: 4500.00,
    status: 'draft',
    date: 'Jul 1, 2026',
    items: [
      { id: 301, name: 'Canal (6" Half-Round)', details: '120.00 PL @ $15.00/pie (6")', price: 1800.00 },
      { id: 302, name: 'Ventana (Double Hung)', details: '6.00 ud. @ $450.00/ud. (Marco Blanco)', price: 2700.00 }
    ],
    proposalText: `PROJECT DESCRIPTION\nBarba Construction will perform exterior renovation services for John Doe at 1234 Street, Louisville, KY.\nContact: +1 (555) 019-2834 | john.doe@example.com\n\nSCOPE OF WORK\n  - Installation of seamless aluminum gutters sloped properly.\n  - Precise window unit leveling and insulation.`
  }
];

// Materials dynamic calculation helper
const calculateMaterials = (items) => {
  const list = [];
  
  items.forEach(item => {
    const name = item.name.toLowerCase();
    const details = item.details.toLowerCase();
    
    // Parse quantity
    const qtyMatch = details.match(/^([\d.]+)\s*(sq|sq ft|ud\.|pl)/i);
    const qty = qtyMatch ? parseFloat(qtyMatch[1]) : 0;
    
    if (qty === 0) return;
    
    if (name.includes('techado') || name.includes('techo') || name.includes('roofing')) {
      const isMetal = name.includes('metal');
      if (isMetal) {
        list.push({
          name: 'Metal Standing Seam Panels (24 Gauge)',
          qty: `${qty} SQ`,
          supplier: 'ABC Supply Co.',
          purpose: 'Paneles de Cubierta de Techo'
        });
        list.push({
          name: 'High-Temp Roof Underlayment (3\' x 72\' rolls)',
          qty: `${Math.ceil(qty / 2)} rollos`,
          supplier: 'ABC Supply Co.',
          purpose: 'Subcapa Térmica'
        });
        list.push({
          name: 'Metal Roofing Screws (Color Matched)',
          qty: `${Math.ceil(qty * 1.5)} cajas`,
          supplier: 'ABC Supply Co.',
          purpose: 'Fijación de Metal'
        });
      } else {
        list.push({
          name: 'Tejas Asfálticas Composite (3 bundles/SQ)',
          qty: `${Math.ceil(qty * 3)} paquetes`,
          supplier: 'ABC Supply Co.',
          purpose: 'Tejas de Techo'
        });
        list.push({
          name: 'Synthetic Underlayment (10 SQ roll)',
          qty: `${Math.ceil(qty / 10)} rollos`,
          supplier: 'ABC Supply Co.',
          purpose: 'Fieltro Sintético Impermeable'
        });
        list.push({
          name: 'Ice & Water Shield (Valleys & Rakes)',
          qty: `${Math.ceil(qty / 2.5)} rollos`,
          supplier: 'ABC Supply Co.',
          purpose: 'Protección de Valles/Eaves'
        });
        list.push({
          name: 'Clavos Galvanizados en Bobina (1-1/4" Coil)',
          qty: `${Math.ceil(qty / 15)} cajas`,
          supplier: 'ABC Supply Co.',
          purpose: 'Fijaciones de Tejas'
        });
      }
    } else if (name.includes('siding')) {
      const isVinyl = name.includes('vinilo') || name.includes('vinyl');
      if (isVinyl) {
        list.push({
          name: 'D4 Vinyl Siding Panels (Double 4" Clapboard)',
          qty: `${Math.ceil(qty / 2)} paneles`,
          supplier: "Lowe's Pro",
          purpose: 'Revestimiento Exterior'
        });
      } else {
        list.push({
          name: 'HardiePlank Lap Siding (8.25" x 12\')',
          qty: `${Math.ceil(qty / 6.8)} piezas`,
          supplier: "Lowe's Pro",
          purpose: 'Tablones de Fibrocemento'
        });
      }
      list.push({
        name: 'House Wrap Moisture Barrier (9\' x 100\')',
        qty: `${Math.ceil(qty / 900)} rollos`,
        supplier: "Lowe's Pro",
        purpose: 'Protección de Muro'
      });
      list.push({
        name: 'Siding Nails (2" Galvanized)',
        qty: `${Math.ceil(qty / 1800)} cajas`,
        supplier: "Lowe's Pro",
        purpose: 'Fijación de Fachada'
      });
    } else if (name.includes('ventana') || name.includes('window')) {
      list.push({
        name: `Unidades de Ventana (${item.name.replace('Ventana ', '')})`,
        qty: `${qty} ud.`,
        supplier: 'Home Depot Pro',
        purpose: 'Marcos de ventana'
      });
      list.push({
        name: 'Window Flashing Tape (4" x 75\')',
        qty: `${Math.ceil(qty / 4)} rollos`,
        supplier: 'Home Depot Pro',
        purpose: 'Impermeabilización de junta'
      });
      list.push({
        name: 'Low-Expansion Window & Door Foam (16oz)',
        qty: `${Math.ceil(qty / 2)} latas`,
        supplier: 'Home Depot Pro',
        purpose: 'Sellador térmico'
      });
    } else if (name.includes('canal') || name.includes('gutter')) {
      const isKStyle = name.includes('k-style');
      list.push({
        name: `Aluminum Gutter Coil (11.75" for ${isKStyle ? 'K-Style' : 'Half-Round'})`,
        qty: `${qty} pies`,
        supplier: 'ABC Supply Co.',
        purpose: 'Formación de Canalón'
      });
      list.push({
        name: 'Heavy Duty Gutter Hangers',
        qty: `${Math.ceil(qty / 2)} soportes`,
        supplier: 'ABC Supply Co.',
        purpose: 'Fijaciones al alero'
      });
      list.push({
        name: 'Geocel Gutter Sealant (10.3 oz)',
        qty: `${Math.ceil(qty / 60)} tubos`,
        supplier: 'ABC Supply Co.',
        purpose: 'Uniones y tapas finales'
      });
    }
  });

  return list;
};

export default function EstimatorSandbox() {
  const [subTab, setSubTab] = useState('list'); // 'list' or 'create'
  const [activeCategory, setActiveCategory] = useState('gutters');
  
  // Client details autocomplete state
  const [addressSearch, setAddressSearch] = useState('1234 Street, Louisville, KY');
  const [clientName, setClientName] = useState('John Doe');
  const [clientAddress, setClientAddress] = useState('1234 Street, Louisville, KY');
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

  // AI Proposal States
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showAIProposal, setShowAIProposal] = useState(false);
  const [aiProposalText, setAiProposalText] = useState('');
  const [refineInput, setRefineInput] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  
  // PDF Proposal view modal
  const [showProposal, setShowProposal] = useState(false);

  // Signing & Purchase Order (PO) States
  const [signatureText, setSignatureText] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isGeneratingPO, setIsGeneratingPO] = useState(false);
  const [showPOView, setShowPOView] = useState(false);
  const [isSendingPO, setIsSendingPO] = useState(false);
  const [isPOSent, setIsPOSent] = useState(false);

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

  // AI trigger flow
  const handleGenerateProposal = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      const initialText = generateInitialProposalText(clientName, receiptItems, total);
      setAiProposalText(initialText);
      setIsGeneratingAI(false);
      setShowAIProposal(true);
    }, 2000);
  };

  // Refine Proposal context dynamically via user prompts
  const handleRefineProposal = (e) => {
    e.preventDefault();
    if (!refineInput.trim()) return;

    setIsRefining(true);
    const instruction = refineInput.trim();
    setRefineInput('');

    setTimeout(() => {
      let updatedText = aiProposalText;
      const lower = instruction.toLowerCase();

      // Simple keywords mapping to update draft text intelligently
      if (lower.includes('charcoal') || lower.includes('color') || lower.includes('negro') || lower.includes('oscuro')) {
        updatedText = updatedText.replace(
          /Complete removal of existing roofing materials down to the plywood decking\./,
          'Complete removal of existing roofing materials down to the plywood decking.\n  - Installation of premium shingles in Charcoal / Dark Slate color as requested by client.'
        ).replace(
          /Siding \((.*?)\)/,
          'Siding (James Hardie Plank - Custom Dark Bronze finish)'
        );
      } else if (lower.includes('weather') || lower.includes('clima') || lower.includes('lluvia') || lower.includes('retraso')) {
        updatedText = updatedText.replace(
          /EXCLUSIONS & TERMS/,
          'EXCLUSIONS & TERMS\n  - Weather delay clause: delays due to severe weather or environmental conditions are excluded from contract durations.'
        );
      } else if (lower.includes('warranty') || lower.includes('garantía') || lower.includes('garantia') || lower.includes('años')) {
        updatedText = updatedText.replace(
          /2-year comprehensive labor warranty backed by Barba Construction\./,
          '5-year extended comprehensive labor warranty backed by Barba Construction.'
        );
      } else if (lower.includes('descuento') || lower.includes('discount') || lower.includes('precio') || lower.includes('bajar')) {
        updatedText = updatedText.replace(
          /ESTIMATED PROJECT INVESTMENT: \$(.*?)/,
          `ESTIMATED PROJECT INVESTMENT: $${(total * 0.95).toFixed(2)} (Reflects a 5% promotional discount applied by AI)`
        );
      } else {
        // Fallback: append instruction as a custom clause
        updatedText = updatedText.replace(
          /INCLUDED SERVICES/,
          `ADDITIONAL CLAUSE\n  - ${instruction}\n\nINCLUDED SERVICES`
        );
      }

      setAiProposalText(updatedText);
      setIsRefining(false);
    }, 1500);
  };

  // Sign & approve proposal contract
  const handleSignContract = (e) => {
    e.preventDefault();
    if (!signatureText.trim()) return;

    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setIsSigned(true);
      setIsGeneratingPO(true);
      setShowProposal(false);

      // Transition loading screen to show material PO
      setTimeout(() => {
        setIsGeneratingPO(false);
        setShowPOView(true);
      }, 2000);
    }, 1500);
  };

  // Dispatch PO to Suppliers
  const handleDispatchPO = () => {
    setIsSendingPO(true);
    setTimeout(() => {
      setIsSendingPO(false);
      setIsPOSent(true);
    }, 2000);
  };

  const handleResetEstimator = () => {
    setShowAIProposal(false);
    setShowPOView(false);
    setIsSigned(false);
    setIsPOSent(false);
    setSignatureText('');
    setReceiptItems([
      {
        id: 1,
        name: 'Mano de Obra (Instalación)',
        details: 'Estimado 6.5 Horas de Cuadrilla',
        price: 845.00
      }
    ]);
    setSubTab('list');
  };

  // Load a pre-approved mock estimate straight into PO view
  const handleQuickLoadPO = (est) => {
    setClientName(est.client);
    setClientAddress(est.address);
    setReceiptItems(est.items);
    setAiProposalText(est.proposalText);
    
    setIsGeneratingPO(true);
    setTimeout(() => {
      setIsGeneratingPO(false);
      setShowPOView(true);
    }, 1000);
  };

  // Load a pre-loaded draft straight into AI proposal sign view
  const handleQuickLoadProposal = (est) => {
    setClientName(est.client);
    setClientAddress(est.address);
    setReceiptItems(est.items);
    setAiProposalText(est.proposalText);
    setShowAIProposal(true);
  };

  const computedMaterials = calculateMaterials(receiptItems);

  return (
    <div className="w-full relative">
      
      {/* AI Generation Loading Overlay */}
      {isGeneratingAI && (
        <div className="absolute inset-0 bg-zinc-950/90 z-50 flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-[var(--border)]">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full border-4 border-[var(--accent)]/25 border-t-[var(--accent)] animate-spin" />
            <Sparkles size={24} className="text-[var(--accent)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h3 className="text-sm font-bold text-white mb-2 tracking-widest uppercase">Generando con IA</h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
            Redactando la propuesta técnica y el alcance de obra de forma automática...
          </p>
        </div>
      )}

      {/* PO Generation Loading Overlay */}
      {isGeneratingPO && (
        <div className="absolute inset-0 bg-zinc-950/90 z-50 flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-[var(--border)]">
          <div className="relative mb-6 text-[var(--accent)]">
            <ClipboardCheck size={48} className="animate-bounce" />
          </div>
          <h3 className="text-sm font-bold text-white mb-2 tracking-widest uppercase">Cargando Orden de Compra</h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
            Calculando materiales requeridos y generando Orden de Compra (PO) automáticamente...
          </p>
        </div>
      )}

      {/* Main UI Switch */}
      {showPOView ? (
        
        /* High-Fidelity Purchase Order View */
        <div className="max-w-3xl mx-auto w-full space-y-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col shadow-lg">
            
            {/* Header */}
            <div className="p-4 bg-black/15 border-b border-[var(--border)] flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-[var(--accent)]" />
                <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">
                  Orden de Compra de Materiales (PO)
                </h4>
              </div>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-black px-2 py-0.5 rounded tracking-wider uppercase">
                {isPOSent ? 'DESPACHADO' : 'PENDIENTE DE ENVÍO'}
              </span>
            </div>

            {/* PO Sheet */}
            <div className="p-6 md:p-8 bg-white text-zinc-950 font-sans leading-relaxed select-text min-h-[350px] space-y-6 relative">
              {isSendingPO && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin mb-3" />
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest animate-pulse">
                    Enviando Orden al Portal del Distribuidor...
                  </span>
                </div>
              )}

              {/* Logo / PO Header */}
              <div className="border-b border-zinc-200 pb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-md font-black uppercase tracking-wide text-zinc-900">Barba Construction</h3>
                  <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Logística y Abastecimiento</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-zinc-800 font-mono">PO-2026-9042</span>
                  <p className="text-[8px] text-zinc-400 mt-1 uppercase tracking-wider font-bold">
                    Ref Proyecto: PROP-2026-004
                  </p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-2 gap-4 text-[10px] text-zinc-600">
                <div>
                  <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-400 block">Enviar a Obra (Jobsite):</span>
                  <p className="font-bold text-zinc-800">{clientName}</p>
                  <p>{clientAddress}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-400 block">Fecha Solicitud:</span>
                  <p className="font-bold text-zinc-800">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p>Metodo: Entrega Directa en Obra</p>
                </div>
              </div>

              {/* Materials Table */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-[9px] font-black uppercase text-zinc-500">
                      <th className="py-2.5 px-4">Material / Insumo</th>
                      <th className="py-2.5 px-4">Cantidad</th>
                      <th className="py-2.5 px-4">Proveedor</th>
                      <th className="py-2.5 px-4 text-right">Uso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700">
                    {computedMaterials.map((mat, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50">
                        <td className="py-3 px-4 font-bold text-zinc-800">{mat.name}</td>
                        <td className="py-3 px-4 font-bold text-orange-600">{mat.qty}</td>
                        <td className="py-3 px-4 text-zinc-500">{mat.supplier}</td>
                        <td className="py-3 px-4 text-right text-zinc-400 text-[10px] font-medium">{mat.purpose}</td>
                      </tr>
                    ))}
                    {computedMaterials.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-zinc-400 text-xs italic">
                          No se requieren materiales de catálogo para este estimado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Status Message */}
              {isPOSent && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-xs leading-relaxed">
                  <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="font-bold">¡Orden de Compra Despachada!</p>
                    <p className="text-[11px] text-emerald-600">
                      La orden se envió automáticamente a los portales de ABC Supply, Lowe's y Home Depot. Los despachos han sido programados para la dirección del cliente.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="p-4 bg-black/15 border-t border-[var(--border)] flex gap-4">
              <button
                onClick={handleResetEstimator}
                className="flex-1 py-3 border border-[var(--border)] hover:bg-white/5 rounded-xl text-xs font-bold text-white transition-all"
              >
                Volver / Ver Lista de Proyectos
              </button>

              {!isPOSent && computedMaterials.length > 0 && (
                <button
                  onClick={handleDispatchPO}
                  disabled={isSendingPO}
                  className="crm-btn-accent flex-1 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black rounded-xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all shadow-lg"
                >
                  Enviar Orden al Proveedor
                </button>
              )}
            </div>

          </div>
        </div>
      ) : !showAIProposal ? (
        
        /* Estimator Page Navigation (List vs Create) */
        <div className="space-y-6">
          
          {/* Sub-tabs header matching Projects tab layout of live CRM */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex bg-[var(--bg-input)] rounded-xl p-1 border border-[var(--border)] self-start">
              <button
                onClick={() => setSubTab('list')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  subTab === 'list' ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20' : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                Proyectos & Estimados
              </button>
              <button
                onClick={() => { setSubTab('create'); handleResetEstimator(); setSubTab('create'); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  subTab === 'create' ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20' : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                + Nuevo Proyecto
              </button>
            </div>

            {subTab === 'list' && (
              <button
                onClick={() => setSubTab('create')}
                className="crm-btn-accent flex items-center justify-center gap-2 px-4 py-2 bg-[var(--accent)] text-black rounded-xl text-xs font-bold transition-all active:scale-95"
              >
                <Plus size={14} />
                <span>Nuevo Estimado</span>
              </button>
            )}
          </div>

          {subTab === 'list' ? (
            
            /* High-fidelity Projects Grid matching the actual Barba CRM screenshot */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_ESTIMATES.map((est) => {
                const isApproved = est.status === 'approved';
                return (
                  <div 
                    key={est.id}
                    className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[var(--accent)]/30 transition-all shadow-md group relative overflow-hidden"
                  >
                    
                    {/* Glow effect on hover */}
                    <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-[var(--accent)]/5 blur-[30px] pointer-events-none group-hover:bg-[var(--accent)]/10 transition-all" />

                    {/* Card Header */}
                    <div className="flex justify-between items-center gap-2 border-b border-[var(--border)] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-orange-500 font-mono">{est.projNo}</span>
                        <span className="text-[8px] bg-[var(--bg-sidebar)] text-[var(--text-secondary)] border border-[var(--border)] px-1.5 py-0.5 rounded font-mono">
                          {est.qboNo}
                        </span>
                      </div>
                      
                      {/* Status Badge */}
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isApproved 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {isApproved ? 'Aprobado' : 'Borrador'}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-white leading-tight">{est.client} — {est.services}</h4>
                      <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                        <MapPin size={11} className="shrink-0" />
                        <span className="truncate">{est.address}</span>
                      </p>
                    </div>

                    {/* Progress Bar (0% for in-progress/draft, 100% for completed/approved) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-black text-[var(--text-muted)] uppercase tracking-wider">
                        <span>Progreso de Obra</span>
                        <span>{isApproved ? '100%' : '0%'}</span>
                      </div>
                      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 overflow-hidden border border-[var(--border)]">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isApproved ? 'bg-emerald-500' : 'bg-orange-500'}`} 
                          style={{ width: isApproved ? '100%' : '0%' }}
                        />
                      </div>
                    </div>

                    {/* Footer values and Action */}
                    <div className="flex justify-between items-center border-t border-[var(--border)] pt-4 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest">{est.date}</span>
                        <span className="text-md font-black text-emerald-400 mt-0.5">${est.total.toLocaleString()}</span>
                      </div>

                      {/* PO / Proposal triggers */}
                      {isApproved ? (
                        <button
                          onClick={() => handleQuickLoadPO(est)}
                          className="crm-btn-accent px-4 py-2 bg-[var(--accent)] text-black rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow"
                        >
                          <Truck size={13} />
                          <span>Ver PO</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleQuickLoadProposal(est)}
                          className="px-4 py-2 border border-[var(--border)] hover:bg-white/5 text-white rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
                        >
                          <FileText size={13} />
                          <span>Ver Propuesta</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            
            /* standard material estimator layout */
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
                    onClick={handleGenerateProposal}
                    className="crm-btn-accent w-full py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black rounded-xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                  >
                    <Sparkles size={14} className="mr-1" />
                    <span>Generar con IA</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      ) : (
        /* Interactive Proposal refinement flow */
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col shadow-lg min-h-[500px]">
            
            {/* Header / Actions */}
            <div className="p-4 bg-black/15 border-b border-[var(--border)] flex justify-between items-center flex-wrap gap-3">
              <button
                onClick={() => setShowAIProposal(false)}
                className="px-3.5 py-1.5 border border-[var(--border)] hover:bg-white/5 rounded-xl text-xs font-bold text-white transition-all"
              >
                ← Volver al Estimador
              </button>
              
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[var(--accent)]" />
                <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">Propuesta de Trabajo</h4>
              </div>

              <button
                onClick={() => setShowProposal(true)}
                className="crm-btn-accent px-4 py-1.5 bg-[var(--accent)] text-black rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Send size={11} />
                <span>Ver PDF Firmable</span>
              </button>
            </div>

            {/* The Document Sheet */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-white text-zinc-950 font-sans leading-relaxed select-text shadow-inner relative min-h-[350px]">
              
              {/* Overlay Loader */}
              {isRefining && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin mb-3" />
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest animate-pulse">Ajustando Contrato con IA...</span>
                </div>
              )}

              {/* Letterhead */}
              <div className="border-b border-zinc-200 pb-4 mb-6">
                <h3 className="text-md font-black uppercase tracking-wide text-zinc-900">Barba Construction</h3>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Est. 2012 | Kentucky License #KY-9042</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6 text-[10px] text-zinc-600">
                  <div>
                    <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-400 block">Homeowner:</span>
                    <p className="font-bold text-zinc-800">{clientName}</p>
                    <p>{clientAddress}</p>
                    <p className="text-zinc-500 text-[9px] mt-0.5">+1 (555) 019-2834 | john.doe@example.com</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-400 block">Date Generated:</span>
                    <p className="font-bold text-zinc-800">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p>Status: Draft (Pending Signature)</p>
                  </div>
                </div>
              </div>

              {/* Generated text content */}
              <pre className="text-xs whitespace-pre-wrap font-sans text-zinc-700 leading-relaxed font-medium">
                {aiProposalText}
              </pre>

              {/* Signature lines */}
              <div className="border-t border-zinc-200 mt-8 pt-6 grid grid-cols-2 gap-8 text-[9px] text-zinc-400 uppercase tracking-wider font-bold">
                <div className="border-b border-zinc-200 pb-1 mt-6">Homeowner Signature</div>
                <div className="border-b border-zinc-200 pb-1 mt-6">Barba Construction Inspector</div>
              </div>
            </div>

            {/* Prompt Refinement Bar */}
            <form onSubmit={handleRefineProposal} className="p-4 bg-[#0c101b] border-t border-[var(--border)] flex gap-3 items-center">
              <div className="flex-1 relative flex items-center">
                <Sparkles size={14} className="text-[var(--accent)] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Pídele a la IA (ej. Cambia el color a tejas Charcoal y añade 5 años de garantía...)"
                  value={refineInput}
                  onChange={(e) => setRefineInput(e.target.value)}
                  className="crm-input w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-3 text-xs text-[var(--text-primary)] focus:outline-none placeholder-zinc-500"
                />
              </div>
              <button
                type="submit"
                disabled={isRefining || !refineInput.trim()}
                className="crm-btn-accent px-4 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-black rounded-xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all"
              >
                Refinar
              </button>
            </form>

          </div>
        </div>
      )}

      {/* PDF Proposal Preview Modal with Sign & Approve Flow */}
      {showProposal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md text-zinc-900">
          <div className="bg-white rounded-3xl w-full max-w-xl p-8 space-y-6 shadow-2xl relative">
            
            {/* Signing loader overlay inside modal */}
            {isSigning && (
              <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-6 rounded-3xl">
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin animate-pulse" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest animate-pulse">Registrando Firma del Cliente...</h4>
              </div>
            )}

            <button
              onClick={() => setShowProposal(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-all"
            >
              <X size={16} />
            </button>

            {/* Mock Invoice Layout */}
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 scrollbar-none">
              <div className="flex justify-between items-start border-b border-zinc-100 pb-5">
                <div>
                  <h3 className="text-lg font-black tracking-wider uppercase text-zinc-900">Barba Construction</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Especialista en Techos, Siding y Canales</p>
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
                  <p className="text-zinc-400 text-[10px] mt-0.5">+1 (555) 019-2834 | john.doe@example.com</p>
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

              {/* Scope of Work Section generated by AI */}
              <div className="border border-zinc-100 rounded-xl p-4 bg-zinc-50 text-[10px] leading-relaxed text-zinc-600">
                <h5 className="font-black text-zinc-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles size={11} className="text-orange-500" />
                  <span>Especificaciones Técnicas (IA)</span>
                </h5>
                <pre className="whitespace-pre-wrap font-sans">
                  {aiProposalText}
                </pre>
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

            {/* Signature Box / Action */}
            <form onSubmit={handleSignContract} className="border-t border-zinc-100 pt-4 space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black uppercase tracking-wider text-zinc-400">
                  Firma Electrónica del Cliente (Escribe Nombre Completo)
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Bessie Wilson"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowProposal(false)}
                  className="flex-1 py-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-500 rounded-xl text-xs font-bold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!signatureText.trim()}
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-600/10"
                >
                  Aprobar y Firmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
