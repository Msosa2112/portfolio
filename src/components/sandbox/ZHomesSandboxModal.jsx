import React, { useState, useEffect } from 'react';
import { 
  X, Map, Sparkles, Mail, Bot, CheckCircle, AlertCircle, 
  Upload, Send, ChevronRight, Calendar, Info, RefreshCw, 
  Home, Building, MapPin, Maximize, Flame, Lock, Eye, Menu
} from 'lucide-react';

const MOCK_PROPERTIES = [
  { id: 'prop-1', address: '1234 Street, Louisville, KY', price: 450000, status: 'approved', icon: CheckCircle, badgeColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10', statusText: 'Aprobado' },
  { id: 'prop-2', address: '334 East Kentucky St, Louisville, KY', price: 340000, status: 'back_on_market', icon: Flame, badgeColor: 'text-amber-400 border-amber-500/20 bg-amber-500/10', statusText: 'Volvió al Mercado' },
  { id: 'prop-3', address: '1048 Ocean Parkway, Brooklyn, NY', price: 1250000, status: 'pending', icon: Lock, badgeColor: 'text-blue-400 border-blue-500/20 bg-blue-500/10', statusText: 'Pendiente' }
];

export default function ZHomesSandboxModal({ isOpen, onClose }) {
  const [activeScreen, setActiveScreen] = useState('map'); // map, vibe, deal, copilot, email
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docStatus, setDocStatus] = useState('pending_upload'); // pending_upload, scanning, approved
  const [copilotMessages, setCopilotMessages] = useState([
    { sender: 'bot', text: 'Hola, soy tu AI Copilot Transaccional. He analizado el contrato de Compra-Venta subido para 1234 Street. ¿Qué deseas consultar?' }
  ]);
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotTyping, setCopilotTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');

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

  // Sidebar triggers
  const navigateTo = (screen) => {
    setActiveScreen(screen);
    setMenuOpen(false);
  };

  // Document upload simulation
  const handleUpload = () => {
    if (docStatus === 'approved' || uploadingDoc) return;
    setUploadingDoc(true);
    setTimeout(() => {
      setDocStatus('scanning');
      setTimeout(() => {
        setDocStatus('approved');
        setUploadingDoc(false);
        // Add message in chat
        setCopilotMessages(prev => [
          ...prev,
          { sender: 'bot', text: '✓ Reporte de Inspección analizado por Vision AI. Sin reparaciones estructurales mayores obligatorias detectadas. Cláusula de compliance aprobada.' }
        ]);
        // Trigger notification
        triggerNotification('¡Inspección aprobada por IA e Inyectada al Deal Room!');
      }, 1500);
    }, 1000);
  };

  const triggerNotification = (text) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Copilot message handler
  const handleCopilotSend = (textToSend) => {
    const text = textToSend || copilotInput;
    if (!text.trim()) return;

    setCopilotMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setCopilotInput('');
    setCopilotTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('inspeccion') || lower.includes('fecha') || lower.includes('inspección')) {
        reply = 'Según la cláusula 4.2 del contrato de Compra-Venta de 1234 Street, el plazo de inspección expira el 24 de Julio de 2026. Faltan 12 días naturales.';
      } else if (lower.includes('documento') || lower.includes('falta') || lower.includes('compliance')) {
        reply = docStatus === 'approved' 
          ? 'Todos los documentos obligatorios del checklist han sido subidos y aprobados con firma de compliance.' 
          : 'Falta subir el "Reporte de Inspección". Puedes cargarlo desde la sección de Documentos para que el OCR lo valide.';
      } else if (lower.includes('reenviar') || lower.includes('cliente') || lower.includes('john')) {
        reply = '¡Entendido! He enviado un extracto del estado del Deal y los hitos del contrato al chat privado del cliente John Doe.';
        triggerNotification('Notificación enviada al Deal Room del cliente.');
      } else {
        reply = 'He verificado la metadata del Deal. Todo marcha según el cronograma. El Appraisal está fijado para el 28 de Julio.';
      }

      setCopilotMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setCopilotTyping(false);
    }, 1200);
  };

  // Descriptions for left panel
  const getScreenDescription = () => {
    switch (activeScreen) {
      case 'map':
        return {
          title: 'Mapa & Búsqueda Geográfica',
          desc: 'Interfaz móvil de búsqueda inmobiliaria. Integra filtros rápidos (Casas, Apartamentos) y marcadores interactivos. Los inmuebles cuentan con etiquetas visuales de estado y compliance de transacciones vinculadas.',
          highlight: 'Observa cómo 1234 Street figura con estatus "Aprobado", mientras que otras propiedades muestran alertas de "Volvió al Mercado" o "Pendiente".'
        };
      case 'vibe':
        return {
          title: 'Vibe Feed IA',
          desc: 'Un muro interactivo impulsado por IA que condensa estadísticas de estilo de vida, seguridad y accesibilidad de los vecindarios. En lugar de leer PDFs masivos, los compradores e inversores obtienen un sumario conversacional.',
          highlight: 'El feed analiza métricas de conectividad y ruido y provee un resumen proactivo automatizado.'
        };
      case 'deal':
        return {
          title: 'Checklist & Deal Room',
          desc: 'Espacio de trabajo transaccional. Los Realtors y Brokers supervisan el checklist legal. Subir un archivo inicia un escaneo OCR automático con Vision AI que valida los hitos del contrato y los aprueba automáticamente.',
          highlight: 'Haz clic en el botón "+ Subir" en el casillero de "Reporte de Inspección" para simular el escaneo legal y ver cómo la IA valida el documento en tiempo real.'
        };
      case 'copilot':
        return {
          title: 'AI Copilot Transaccional',
          desc: 'El núcleo inteligente del Transaction Coordinator. El copilot accede al contrato PDF vectorizado (RAG), a la metadata de la transacción y a las fechas de inspección. Permite chatear y reenviar resúmenes directamente al cliente.',
          highlight: 'Usa las preguntas sugeridas en la parte inferior para pedirle las fechas de inspección o simular el reenvío directo a John Doe.'
        };
      case 'email':
        return {
          title: 'Plantillas de Resend API',
          desc: 'Auditoría visual de los correos transaccionales generados por el backend. Los emails de ZHomes fueron modernizados a una estética charcoal elegante utilizando íconos SVG vectorizados en lugar de emojis informales, despachados de un dominio verificado.',
          highlight: 'Muestra la plantilla real recibida por el cliente y el Realtor tras la aprobación del compliance de un contrato.'
        };
      default:
        return { title: '', desc: '', highlight: '' };
    }
  };

  const screenInfo = getScreenDescription();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/85 backdrop-blur-md font-sans">
      
      {/* Liquid Glass Shell Container wrapped in cyan theme */}
      <div className="relative w-full h-full md:max-w-5xl md:h-[90vh] bg-[#070b13] md:rounded-3xl border border-cyan-500/10 shadow-2xl flex flex-col md:flex-row overflow-hidden text-zinc-300">
        
        {/* Glow effect */}
        <div className="absolute -top-[10%] -left-[10%] w-[35%] h-[35%] rounded-full bg-cyan-500/5 blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[35%] h-[35%] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />

        {/* Left Explainer Panel */}
        <div className="w-full md:w-[380px] border-b md:border-b-0 md:border-r border-zinc-900 bg-[#080d19] p-6 flex flex-col justify-between shrink-0 select-none">
          
          <div className="space-y-6">
            
            {/* Header logo */}
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <div className="h-9 w-9 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold">
                ZH
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-wider">ZHOMES TC</h3>
                <p className="text-[9px] text-cyan-400 uppercase tracking-widest font-black">Transaction Portal</p>
              </div>
            </div>

            {/* Screen info */}
            <div className="space-y-3.5 animate-in fade-in duration-300">
              <span className="text-[8px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 px-2 py-0.5 rounded font-black tracking-widest uppercase inline-block">
                EXPLICADOR DE SANDBOX
              </span>
              <h2 className="text-lg font-black text-white leading-tight">{screenInfo.title}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                {screenInfo.desc}
              </p>
              
              <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-3.5 space-y-1.5 mt-2">
                <span className="text-[9px] font-black text-cyan-400 uppercase tracking-wider block">Punto Clave a Probar:</span>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-medium">
                  {screenInfo.highlight}
                </p>
              </div>
            </div>

          </div>

          {/* Quick Screen Switcher Menu (lateral a la app) */}
          <div className="mt-8 border-t border-zinc-900 pt-4 space-y-1.5">
            <span className="text-[8px] font-black tracking-wider text-zinc-500 uppercase block mb-1">
              Menú Rápido del Simulador
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-1.5">
              {[
                { id: 'map', label: 'Buscador Mapa', icon: Map },
                { id: 'vibe', label: 'Vibe Feed IA', icon: Sparkles },
                { id: 'deal', label: 'Deal Checklists', icon: CheckCircle },
                { id: 'copilot', label: 'AI Copilot Chat', icon: Bot },
                { id: 'email', label: 'Emails Resend', icon: Mail },
              ].map((item) => {
                const isActive = activeScreen === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all whitespace-nowrap active:scale-97 border ${
                      isActive 
                        ? 'bg-cyan-950/45 text-cyan-400 border-cyan-500/30 font-black' 
                        : 'text-zinc-400 hover:text-white border-transparent hover:bg-white/5'
                    }`}
                  >
                    <Icon size={12} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-white font-bold rounded-xl text-[10px] uppercase border border-zinc-800 transition-all active:scale-95 text-center"
            >
              Cerrar Simulador
            </button>
          </div>

        </div>

        {/* Center/Right Phone Simulator Viewport */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-[#090f1a] relative overflow-hidden">
          
          {/* Notifications banner inside simulator */}
          {showNotification && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#0e1726] border border-cyan-500/30 text-cyan-400 text-[10px] font-black tracking-wider uppercase px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 z-[130] animate-in slide-in-from-top-4 duration-300">
              <CheckCircle size={12} />
              <span>{notificationText}</span>
            </div>
          )}

          {/* Smartphone Simulator Mock Container */}
          <div className="relative w-[280px] h-[550px] bg-black rounded-[40px] p-2.5 shadow-2xl border-[5px] border-zinc-800 flex flex-col overflow-hidden shrink-0">
            
            {/* Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-zinc-900 ml-6" />
            </div>

            {/* Screen Inner Container */}
            <div className="flex-1 bg-[#0b0e14] rounded-[30px] overflow-hidden flex flex-col relative text-[11px]">
              
              {/* App Status bar */}
              <div className="h-6 pt-1.5 px-6 flex justify-between items-center text-[8px] text-zinc-500 font-bold tracking-wider bg-[#0b0e14]/50 select-none z-40 shrink-0">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1">
                  <span>LTE</span>
                  <div className="w-4 h-2 border border-zinc-600 rounded-sm p-0.5 flex items-center justify-start">
                    <div className="w-2.5 h-1 bg-zinc-400 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* App Header */}
              <header className="px-4 py-3 bg-[#0d121c] border-b border-zinc-900 flex justify-between items-center z-40 shrink-0 select-none">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-all"
                >
                  <Menu size={14} />
                </button>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-[10px] text-white tracking-widest">ZHOMES</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-[8px]">
                  JD
                </div>
              </header>

              {/* Sidebar Menu Overlay inside Phone Simulator */}
              {menuOpen && (
                <div 
                  className="absolute inset-0 bg-[#070b13]/90 backdrop-blur-sm z-[110] flex flex-col p-5 animate-in slide-in-from-left duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <div 
                    className="w-48 bg-[#0d121c] h-full border-r border-zinc-900 p-4 space-y-4 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
                      <span className="font-black text-[9px] text-white uppercase tracking-wider">Menú ZHomes</span>
                      <button onClick={() => setMenuOpen(false)} className="text-zinc-500 hover:text-white">
                        <X size={12} />
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      {[
                        { id: 'map', label: 'Buscador Propiedades', icon: Map },
                        { id: 'vibe', label: 'Vibe Feed IA', icon: Sparkles },
                        { id: 'deal', label: 'Checklist Deal Room', icon: CheckCircle },
                        { id: 'copilot', label: 'AI Copilot Assistant', icon: Bot },
                        { id: 'email', label: 'Plantillas Email', icon: Mail },
                      ].map((link) => {
                        const Icon = link.icon;
                        const isLinkActive = activeScreen === link.id;
                        return (
                          <button
                            key={link.id}
                            onClick={() => navigateTo(link.id)}
                            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[9px] font-bold text-left tracking-wider uppercase transition-all ${
                              isLinkActive ? 'bg-cyan-500/10 text-cyan-400' : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            <Icon size={11} />
                            <span>{link.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-zinc-900 pt-3 text-[7px] text-zinc-500 font-bold uppercase tracking-wider text-center">
                      John Doe (Realtor)
                    </div>
                  </div>
                </div>
              )}

              {/* Viewport Content */}
              <div className="flex-1 overflow-y-auto relative p-3.5 space-y-3.5 scrollbar-none select-none">
                
                {/* 1. Map Search Page Screen */}
                {activeScreen === 'map' && (
                  <div className="space-y-3.5 animate-in fade-in duration-300">
                    
                    {/* Mock Searchbar */}
                    <div className="bg-[#121926] border border-zinc-900 rounded-xl px-3 py-2 text-[10px] text-zinc-400 flex items-center justify-between">
                      <span>Buscar ciudad, código postal...</span>
                      <MapPin size={10} className="text-cyan-400" />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/20 text-[8px] font-black uppercase whitespace-nowrap">Casas</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#121926] text-zinc-400 text-[8px] font-black uppercase whitespace-nowrap">Departamentos</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#121926] text-zinc-400 text-[8px] font-black uppercase whitespace-nowrap">AI Labels</span>
                    </div>

                    {/* Mock Map Vector Grid */}
                    <div className="h-44 bg-[#0d121c] border border-zinc-900 rounded-2xl relative overflow-hidden flex items-center justify-center">
                      
                      {/* Grid representation */}
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5 pointer-events-none">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div key={i} className="border border-white" />
                        ))}
                      </div>

                      {/* Map Pins */}
                      <div className="absolute top-1/4 left-1/3 flex flex-col items-center animate-bounce">
                        <MapPin size={14} className="text-cyan-400 fill-cyan-450" />
                        <span className="bg-black/80 px-1 py-0.2 rounded text-[7px] font-black text-white">$450k</span>
                      </div>

                      <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
                        <MapPin size={12} className="text-amber-400" />
                        <span className="bg-black/80 px-1 py-0.2 rounded text-[7px] font-black text-white">$340k</span>
                      </div>

                      <span className="text-[8px] font-black tracking-widest text-zinc-600 uppercase">Interactive Map view</span>
                    </div>

                    {/* Properties List */}
                    <div className="space-y-2">
                      <h5 className="text-[9px] font-black text-white uppercase tracking-wider">Propiedades Cercanas</h5>
                      <div className="space-y-2">
                        {MOCK_PROPERTIES.map((prop) => {
                          const Icon = prop.icon;
                          return (
                            <div 
                              key={prop.id}
                              onClick={() => navigateTo('deal')}
                              className="bg-[#0d121c] border border-zinc-900 rounded-xl p-2.5 flex items-center justify-between gap-3 hover:border-cyan-500/25 transition-all cursor-pointer"
                            >
                              <div className="space-y-1">
                                <p className="font-bold text-white text-[10px] leading-tight truncate max-w-[150px]">{prop.address}</p>
                                <span className="text-[9px] font-bold text-zinc-500">${prop.price.toLocaleString()}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded border text-[8px] font-black tracking-wider uppercase flex items-center gap-1 ${prop.badgeColor}`}>
                                <Icon size={8} />
                                {prop.statusText}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. Vibe Feed Screen */}
                {activeScreen === 'vibe' && (
                  <div className="space-y-3.5 animate-in fade-in duration-300">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <h5 className="text-[9px] font-black text-white uppercase tracking-wider">Vecindario Vibe Feed</h5>
                      <span className="text-[8px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded font-black">AI ANALYZED</span>
                    </div>

                    {/* Vibe Score Card */}
                    <div className="bg-gradient-to-br from-[#0d121c] to-[#121a2c] border border-zinc-900 rounded-2xl p-3.5 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5 text-cyan-400">
                          <Sparkles size={12} />
                          <span className="font-black text-[9px] uppercase tracking-wider">Ocean Parkway Area</span>
                        </div>
                        <span className="text-[12px] font-black text-white">92%</span>
                      </div>
                      
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
                        "Este vecindario cuenta con una valoración de tranquilidad excepcional. Se destaca por una alta concentración de parques familiares, ciclovías, y excelente índice de conectividad vial."
                      </p>

                      <div className="grid grid-cols-2 gap-1.5 text-[8px] font-black uppercase text-zinc-300">
                        <span className="bg-cyan-950/30 border border-cyan-500/10 px-2 py-1 rounded flex items-center gap-1">
                          🟢 Alta Conectividad
                        </span>
                        <span className="bg-cyan-950/30 border border-cyan-500/10 px-2 py-1 rounded flex items-center gap-1">
                          🟢 Nivel Ruido: Bajo
                        </span>
                      </div>
                    </div>

                    {/* Additional Posts */}
                    <div className="bg-[#0d121c] border border-zinc-900 rounded-xl p-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-zinc-400 text-[8px] font-bold">
                        <Building size={10} />
                        <span>Residencias Unifamiliares</span>
                      </div>
                      <p className="text-[9px] text-zinc-500 font-medium">
                        El 84% de las propiedades corresponde a residencias unifamiliares con una media de 3.5 habitaciones.
                      </p>
                    </div>

                  </div>
                )}

                {/* 3. Deal Checklist / Properties Screen */}
                {activeScreen === 'deal' && (
                  <div className="space-y-3.5 animate-in fade-in duration-300">
                    
                    {/* Property header */}
                    <div className="bg-[#0d121c] border border-zinc-900 rounded-xl p-3 space-y-1.5">
                      <div className="flex justify-between items-center text-[7px] font-black text-zinc-500 uppercase tracking-widest">
                        <span>Transaction ID: #TC-1234</span>
                        <span className="text-cyan-400">Client Deal Room</span>
                      </div>
                      <h4 className="font-extrabold text-white text-[11px] leading-tight">1234 Street, Louisville, KY</h4>
                      <div className="flex justify-between items-center text-[9px] pt-1">
                        <span className="text-zinc-400 font-bold">$450,000</span>
                        <span className="text-emerald-400 font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">Activo</span>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h5 className="text-[9px] font-black text-white uppercase tracking-wider">Documentos Compliance</h5>
                        <span className="text-[8px] text-zinc-500 font-black">2 / 3 Completados</span>
                      </div>

                      <div className="space-y-2">
                        
                        {/* Doc 1 */}
                        <div className="bg-[#0d121c] border border-zinc-900 rounded-xl p-2.5 flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <p className="font-bold text-white text-[9px]">Contrato de Compra-Venta</p>
                            <span className="text-[8px] text-zinc-500">Subido el 10 Jul</span>
                          </div>
                          <span className="text-emerald-400 font-black flex items-center gap-1 text-[8px] uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle size={8} /> Aprobado
                          </span>
                        </div>

                        {/* Doc 2 */}
                        <div className="bg-[#0d121c] border border-zinc-900 rounded-xl p-2.5 flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <p className="font-bold text-white text-[9px]">Prueba de Fondos (POF)</p>
                            <span className="text-[8px] text-zinc-500">Subido el 11 Jul</span>
                          </div>
                          <span className="text-emerald-400 font-black flex items-center gap-1 text-[8px] uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle size={8} /> Aprobado
                          </span>
                        </div>

                        {/* Doc 3 (Interactive Upload) */}
                        <div className="bg-[#0d121c] border border-zinc-900 rounded-xl p-2.5 flex items-center justify-between gap-3 relative overflow-hidden">
                          
                          {/* OCR scanning overlay effect */}
                          {docStatus === 'scanning' && (
                            <div className="absolute inset-0 bg-cyan-950/20 backdrop-blur-2xs flex items-center justify-center text-cyan-400 font-bold text-[8px] uppercase tracking-wider">
                              <span className="animate-pulse">Vision AI OCR Escaneando...</span>
                            </div>
                          )}

                          <div className="space-y-0.5">
                            <p className="font-bold text-white text-[9px]">Reporte de Inspección</p>
                            <span className="text-[8px] text-zinc-500">
                              {docStatus === 'approved' ? 'Aprobado automáticamente' : 'Requerido'}
                            </span>
                          </div>

                          {docStatus === 'approved' ? (
                            <span className="text-emerald-400 font-black flex items-center gap-1 text-[8px] uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                              <CheckCircle size={8} /> Aprobado
                            </span>
                          ) : (
                            <button
                              onClick={handleUpload}
                              disabled={uploadingDoc}
                              className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-black font-black rounded-lg text-[8px] uppercase flex items-center gap-1 active:scale-95 transition-all disabled:opacity-50"
                            >
                              <Upload size={8} />
                              <span>{uploadingDoc ? 'Cargando...' : '+ Subir'}</span>
                            </button>
                          )}
                        </div>

                      </div>
                    </div>

                  </div>
                )}

                {/* 4. AI Copilot Chat Screen */}
                {activeScreen === 'copilot' && (
                  <div className="flex flex-col h-[400px] -m-3.5 relative bg-[#0b0e14]">
                    
                    {/* Chat top header */}
                    <div className="p-3 bg-[#0d121c] border-b border-zinc-900 flex items-center justify-between select-none">
                      <div className="flex items-center gap-1.5">
                        <Bot size={12} className="text-cyan-400 animate-pulse" />
                        <span className="font-black text-[9px] text-white uppercase tracking-wider">Asistente Transaccional</span>
                      </div>
                      <span className="text-[8px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 px-1.5 py-0.2 rounded font-black">RAG ACTIVE</span>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3.5 scrollbar-none text-[10px]">
                      {copilotMessages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                        >
                          {msg.sender === 'bot' && (
                            <div className="h-5 w-5 rounded bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                              <Bot size={10} />
                            </div>
                          )}
                          <div className={`p-2 rounded-xl leading-normal font-medium ${
                            msg.sender === 'user' 
                              ? 'bg-cyan-950 text-white rounded-tr-none border border-cyan-500/20' 
                              : 'bg-[#0d121c] text-zinc-300 border border-zinc-900 rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {copilotTyping && (
                        <div className="flex gap-2 max-w-[85%]">
                          <div className="h-5 w-5 rounded bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                            <Bot size={10} />
                          </div>
                          <div className="bg-[#0d121c] border border-zinc-900 p-2 rounded-xl rounded-tl-none text-zinc-500 flex items-center gap-1">
                            <span className="h-1 w-1 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="h-1 w-1 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="h-1 w-1 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Suggestions Area */}
                    <div className="p-2 border-t border-zinc-900 bg-black/15 flex gap-1.5 overflow-x-auto scrollbar-none select-none">
                      <button
                        onClick={() => handleCopilotSend('¿Cuándo vence la inspección de 1234 Street?')}
                        className="px-2 py-1 bg-[#0d121c] border border-zinc-900 rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-cyan-500/30 whitespace-nowrap"
                      >
                        Inspección Fecha
                      </button>
                      <button
                        onClick={() => handleCopilotSend('¿Faltan documentos en 1234 Street?')}
                        className="px-2 py-1 bg-[#0d121c] border border-zinc-900 rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-cyan-500/30 whitespace-nowrap"
                      >
                        Faltantes
                      </button>
                      <button
                        onClick={() => handleCopilotSend('Reenviar resumen al cliente')}
                        className="px-2 py-1 bg-[#0d121c] border border-zinc-900 rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-cyan-500/30 whitespace-nowrap"
                      >
                        Reenviar Al Cliente
                      </button>
                    </div>

                    {/* Input Bar */}
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleCopilotSend(); }}
                      className="p-2 bg-[#090f1a] border-t border-zinc-900 flex gap-1.5 items-center select-none shrink-0"
                    >
                      <input
                        type="text"
                        placeholder="Pregúntale al Copilot..."
                        value={copilotInput}
                        onChange={(e) => setCopilotInput(e.target.value)}
                        disabled={copilotTyping}
                        className="flex-1 bg-[#0d121c] border border-zinc-900 rounded-xl px-2.5 py-1.5 text-[9px] text-white focus:outline-none placeholder-zinc-700"
                      />
                      <button
                        type="submit"
                        disabled={copilotTyping || !copilotInput.trim()}
                        className="p-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-black rounded-lg transition-all"
                      >
                        <Send size={10} />
                      </button>
                    </form>

                  </div>
                )}

                {/* 5. Resend Email Screen */}
                {activeScreen === 'email' && (
                  <div className="space-y-3 animate-in fade-in duration-300 text-[10px]">
                    
                    {/* Email Headers */}
                    <div className="bg-[#0d121c] border border-zinc-900 rounded-xl p-3 space-y-1.5 text-zinc-400">
                      <div>
                        <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-500 block">De:</span>
                        <p className="font-bold text-white">info@zhomesapp.com</p>
                      </div>
                      <div className="border-t border-zinc-900 pt-1.5">
                        <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-500 block">Para:</span>
                        <p className="font-bold text-white">john.doe@example.com</p>
                      </div>
                      <div className="border-t border-zinc-900 pt-1.5">
                        <span className="font-bold text-[8px] uppercase tracking-wider text-zinc-500 block">Asunto:</span>
                        <p className="font-bold text-cyan-400 leading-tight">Compliance Aprobado - 1234 Street, Louisville, KY</p>
                      </div>
                    </div>

                    {/* Email Template Body (Charcoal background) */}
                    <div className="bg-[#121824] border border-zinc-900 rounded-xl p-4 space-y-4 text-zinc-300 font-medium">
                      
                      {/* Logo header */}
                      <div className="flex justify-center border-b border-zinc-800 pb-3">
                        <span className="font-extrabold text-[12px] text-white tracking-widest">ZHOMES REAL ESTATE</span>
                      </div>

                      <p className="text-[10px] leading-relaxed">
                        Estimado **John Doe**,
                      </p>

                      <p className="text-[10px] leading-relaxed">
                        Nos complace informarle que el checklist de compliance para la transacción de su propiedad en **1234 Street** ha sido completado y validado.
                      </p>

                      {/* Status timeline with SVG-like Lucide items (Modernized, no emojis) */}
                      <div className="border border-zinc-800 rounded-lg p-3 space-y-2 bg-black/10">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle size={12} />
                          <span className="font-bold">Contrato de Compra-Venta: Validado</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle size={12} />
                          <span className="font-bold">Prueba de Fondos (POF): Validado</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle size={12} />
                          <span className="font-bold">Reporte de Inspección: Validado</span>
                        </div>
                      </div>

                      <p className="text-[9px] text-zinc-500 leading-relaxed pt-2 border-t border-zinc-800">
                        Si tiene alguna duda sobre el Appraisal o la fecha del cierre, consulte con su Realtor o chatee con el AI Copilot en su panel.
                      </p>

                    </div>

                  </div>
                )}

              </div>

              {/* Home Indicator bar */}
              <div className="h-4 bg-[#0b0e14] flex items-center justify-center shrink-0 select-none pb-1">
                <div className="w-20 h-1 bg-zinc-700 rounded-full" />
              </div>

            </div>

          </div>

          {/* Floating Bubble launcher mock inside mockup window */}
          {activeScreen !== 'copilot' && (
            <button
              onClick={() => setActiveScreen('copilot')}
              className="absolute bottom-12 right-[calc(50%-110px)] h-9 w-9 rounded-full bg-cyan-600 hover:bg-cyan-500 text-black flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer z-50 animate-bounce"
              title="Abrir AI Copilot"
            >
              <Bot size={16} />
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
