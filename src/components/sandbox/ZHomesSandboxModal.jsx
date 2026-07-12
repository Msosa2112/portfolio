import React, { useState, useEffect } from 'react';
import { 
  X, Map, Sparkles, Mail, Bot, CheckCircle, AlertCircle, 
  Upload, Send, ChevronRight, Calendar, Info, RefreshCw, 
  Home, Building, MapPin, Maximize, Flame, Lock, Eye, Menu,
  Heart, Share2, Phone, Play, Pause, Trash2
} from 'lucide-react';

const MOCK_PROPERTIES = [
  { id: 'prop-1', address: '1234 Street, Louisville, KY', price: 450000, beds: 3, baths: 2, sqft: 1800, status: 'Active', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', exclusive: true },
  { id: 'prop-2', address: '334 East Kentucky St, Louisville, KY', price: 340000, beds: 4, baths: 2, sqft: 2100, status: 'Active', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', exclusive: false },
  { id: 'prop-3', address: '1048 Ocean Parkway, Brooklyn, NY', price: 1250000, beds: 5, baths: 4, sqft: 3400, status: 'Pending', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', exclusive: true }
];

export default function ZHomesSandboxModal({ isOpen, onClose }) {
  const [activeScreen, setActiveScreen] = useState('map'); // map, vibe, deal, copilot, email
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docStatus, setDocStatus] = useState('pending_upload'); // pending_upload, scanning, approved
  const [copilotMessages, setCopilotMessages] = useState([
    { sender: 'bot', text: 'Hola, soy tu AI Copilot Transaccional de ZHomes. He analizado el contrato de Compra-Venta subido para 1234 Street. ¿Qué deseas consultar hoy?' }
  ]);
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotTyping, setCopilotTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  // Vibe Feed specific states
  const [vibeLiked, setVibeLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Sync scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateTo = (screen) => {
    setActiveScreen(screen);
    setMenuOpen(false);
  };

  const handleUpload = () => {
    if (docStatus === 'approved' || uploadingDoc) return;
    setUploadingDoc(true);
    setTimeout(() => {
      setDocStatus('scanning');
      setTimeout(() => {
        setDocStatus('approved');
        setUploadingDoc(false);
        setCopilotMessages(prev => [
          ...prev,
          { sender: 'bot', text: '✓ Reporte de Inspección analizado por el OCR de Vision AI. Cláusula de compliance aprobada y guardada.' }
        ]);
        triggerNotification('¡Inspección aprobada por IA e inyectada al Deal Room!');
      }, 1500);
    }, 1000);
  };

  const triggerNotification = (text) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

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
        reply = 'Según la cláusula 4.2 del contrato de Compra-Venta de 1234 Street, el plazo de inspección expira el 24 de Julio de 2026. Quedan 12 días.';
      } else if (lower.includes('documento') || lower.includes('falta') || lower.includes('compliance')) {
        reply = docStatus === 'approved' 
          ? 'Todos los documentos obligatorios del checklist han sido subidos y aprobados con firma de compliance.' 
          : 'Falta subir el "Reporte de Inspección". Haz clic en + Subir en la sección de Documentos para que el OCR lo valide.';
      } else if (lower.includes('reenviar') || lower.includes('cliente') || lower.includes('john')) {
        reply = 'He enviado un extracto del estado de compliance y las fechas límite del contrato al chat privado del cliente John Doe.';
        triggerNotification('Mensaje enviado al Deal Room del cliente.');
      } else {
        reply = 'He verificado la metadata del Deal. Todo marcha según el cronograma. El Appraisal está fijado para el 28 de Julio.';
      }

      setCopilotMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setCopilotTyping(false);
    }, 1200);
  };

  const getScreenDescription = () => {
    switch (activeScreen) {
      case 'map':
        return {
          title: 'Mapa & Búsqueda Geográfica',
          desc: 'Interfaz móvil de búsqueda inmobiliaria. Reclama un diseño idéntico al del portal de ZHomes: fondo oscuro, barra de búsqueda con IA integrada y pins flotantes con los precios de los listados en rojo.',
          highlight: 'Observa la tarjeta inferior estilo Airbnb que te permite explorar detalles de la propiedad en un formato sumamente fluido.'
        };
      case 'vibe':
        return {
          title: 'Vibe Feed IA',
          desc: 'Sección inspirada en el formato de videos verticales de TikTok. En ZHomes, los listados exclusivos se presentan mediante micro-videos del vecindario con estadísticas de estilo de vida, seguridad y accesibilidad superpuestas.',
          highlight: 'Prueba a darle Like (Corazón) o a pausar la reproducción de la propiedad para ver cómo interactúa el feed.'
        };
      case 'deal':
        return {
          title: 'Checklist & Deal Room',
          desc: 'Espacio de trabajo transaccional. Los Realtors y Brokers supervisan el checklist de compliance. Subir un archivo inicia un escaneo OCR automático con Vision AI que valida los hitos del contrato y los aprueba automáticamente.',
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
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md font-sans"
      data-lenis-prevent
      onClick={(e) => e.stopPropagation()}
    >
      
      {/* Liquid Glass Shell Container wrapped in red theme */}
      <div className="relative w-full h-full md:max-w-5xl md:h-[90vh] bg-[#0c0d12] md:rounded-3xl border border-red-500/10 shadow-2xl flex flex-col md:flex-row overflow-hidden text-zinc-300">
        
        {/* Glow effect */}
        <div className="absolute -top-[10%] -left-[10%] w-[35%] h-[35%] rounded-full bg-[#E31E24]/5 blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[35%] h-[35%] rounded-full bg-red-600/5 blur-[90px] pointer-events-none" />

        {/* Left Explainer Panel */}
        <div 
          className="w-full md:w-[380px] border-b md:border-b-0 md:border-r border-zinc-900 bg-[#08090e] p-6 flex flex-col justify-between shrink-0 select-none overflow-y-auto"
          data-lenis-prevent
        >
          
          <div className="space-y-6">
            
            {/* Header logo */}
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <div className="h-9 w-9 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center text-[#E31E24] font-extrabold text-sm">
                ZH
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-wider">ZHOMES TC</h3>
                <p className="text-[9px] text-[#E31E24] uppercase tracking-widest font-black">Transaction Portal</p>
              </div>
            </div>

            {/* Screen info */}
            <div className="space-y-3.5 animate-in fade-in duration-300">
              <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/25 px-2 py-0.5 rounded font-black tracking-widest uppercase inline-block">
                EXPLICADOR DE SANDBOX
              </span>
              <h2 className="text-lg font-black text-white leading-tight">{screenInfo.title}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                {screenInfo.desc}
              </p>
              
              <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3.5 space-y-1.5 mt-2">
                <span className="text-[9px] font-black text-[#E31E24] uppercase tracking-wider block">Punto Clave a Probar:</span>
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
                        ? 'bg-red-950/45 text-red-400 border-red-500/30 font-black' 
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
              className="w-full mt-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-white font-bold rounded-xl text-[10px] uppercase border border-zinc-800 transition-all active:scale-95 text-center shadow-lg"
            >
              Cerrar Simulador
            </button>
          </div>

        </div>

        {/* Center/Right Phone Simulator Viewport */}
        <div 
          className="flex-1 flex items-center justify-center p-4 md:p-8 bg-[#07080c] relative overflow-hidden"
          data-lenis-prevent
        >
          
          {/* Notifications banner inside simulator */}
          {showNotification && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#0e0f14] border border-red-500/30 text-[#E31E24] text-[10px] font-black tracking-wider uppercase px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 z-[130] animate-in slide-in-from-top-4 duration-300">
              <CheckCircle size={12} />
              <span>{notificationText}</span>
            </div>
          )}

          {/* Smartphone Simulator Mock Container */}
          <div className="relative w-[300px] h-[580px] bg-black rounded-[45px] p-3 shadow-2xl border-[6px] border-zinc-800 flex flex-col overflow-hidden shrink-0">
            
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ml-8" />
            </div>

            {/* Screen Inner Container */}
            <div 
              className="flex-1 bg-[#121212] rounded-[32px] overflow-hidden flex flex-col relative text-[11px]"
              data-lenis-prevent
            >
              
              {/* App Status bar */}
              <div className="h-6 pt-1.5 px-6 flex justify-between items-center text-[8px] text-zinc-500 font-bold tracking-wider bg-transparent select-none z-40 shrink-0">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1">
                  <span>LTE</span>
                  <div className="w-4.5 h-2 border border-zinc-600 rounded-sm p-0.5 flex items-center justify-start">
                    <div className="w-3 h-1 bg-zinc-400 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* App Header */}
              <header className="px-4 py-3 bg-[#141414]/90 backdrop-blur-md border-b border-zinc-900 flex justify-between items-center z-45 shrink-0 select-none">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-all"
                >
                  <Menu size={14} />
                </button>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-[10px] text-white tracking-widest">ZHOMES</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E31E24] animate-pulse" />
                </div>
                <div className="w-5 h-5 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-[8px]">
                  JD
                </div>
              </header>

              {/* Sidebar Menu Overlay inside Phone Simulator */}
              {menuOpen && (
                <div 
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm z-[110] flex flex-col p-5 animate-in slide-in-from-left duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <div 
                    className="w-48 bg-[#141414] h-full border-r border-zinc-900 p-4 space-y-4 flex flex-col"
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
                              isLinkActive ? 'bg-red-500/10 text-red-400' : 'text-zinc-400 hover:text-white'
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
              <div 
                className="flex-1 overflow-y-auto relative p-3.5 space-y-3.5 scrollbar-none select-none"
                data-lenis-prevent
              >
                
                {/* 1. Map Search Page Screen */}
                {activeScreen === 'map' && (
                  <div className="space-y-3.5 animate-in fade-in duration-200">
                    
                    {/* Mock Searchbar */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl px-3.5 py-2.5 text-[10px] text-zinc-400 flex items-center justify-between shadow-md">
                      <span className="truncate">Casas cerca de escuelas...</span>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E31E24] animate-ping" />
                        <MapPin size={11} className="text-[#E31E24]" />
                      </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      <span className="px-3 py-1 rounded-full bg-red-950/40 text-red-400 border border-red-500/20 text-[8px] font-black uppercase whitespace-nowrap">Casas</span>
                      <span className="px-3 py-1 rounded-full bg-[#1a1a1a] text-zinc-400 border border-zinc-800 text-[8px] font-black uppercase whitespace-nowrap">Departamentos</span>
                      <span className="px-3 py-1 rounded-full bg-[#1a1a1a] text-zinc-400 border border-zinc-800 text-[8px] font-black uppercase whitespace-nowrap">AI Labels</span>
                    </div>

                    {/* Mock Map Vector Grid */}
                    <div className="h-44 bg-[#141414] border border-zinc-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
                      
                      {/* Grid representation */}
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div key={i} className="border border-white" />
                        ))}
                      </div>

                      {/* Map Pins (Prices in Red style like actual MapPageMobile) */}
                      <div className="absolute top-1/4 left-1/3 flex flex-col items-center animate-bounce">
                        <div className="bg-[#E31E24] text-white text-[8px] font-black px-2 py-0.5 rounded-full border border-white/20 shadow-md">
                          $450K
                        </div>
                        <div className="w-1.5 h-1.5 bg-[#E31E24] rotate-45 -mt-0.5" />
                      </div>

                      <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
                        <div className="bg-[#222] text-white text-[8px] font-black px-2 py-0.5 rounded-full border border-zinc-700 shadow-md">
                          $340K
                        </div>
                        <div className="w-1.5 h-1.5 bg-[#222] rotate-45 -mt-0.5" />
                      </div>

                      <span className="text-[8px] font-black tracking-widest text-zinc-700 uppercase">MapLibre Raster Engine</span>
                    </div>

                    {/* Properties List (Airbnb-style bottom card in actual code) */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <h5 className="text-[9px] font-black text-white uppercase tracking-wider">Propiedades Encontradas</h5>
                        <span className="text-[8px] text-zinc-500 font-bold">3 resultados</span>
                      </div>
                      
                      <div className="space-y-2.5">
                        {MOCK_PROPERTIES.map((prop) => (
                          <div 
                            key={prop.id}
                            onClick={() => navigateTo('deal')}
                            className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden flex gap-3 hover:border-red-500/20 transition-all cursor-pointer"
                          >
                            <div className="w-20 h-16 shrink-0 relative">
                              <img src={prop.image} alt="" className="w-full h-full object-cover" />
                              {prop.exclusive && (
                                <span className="absolute top-1 left-1 bg-[#E31E24] text-white text-[6px] font-black px-1.5 py-0.2 rounded uppercase">
                                  ZH
                                </span>
                              )}
                            </div>
                            <div className="p-2 flex flex-col justify-center min-w-0">
                              <p className="font-bold text-white text-[9px] leading-tight truncate">{prop.address}</p>
                              <div className="flex items-center gap-1.5 text-zinc-400 text-[8px] mt-1 font-semibold">
                                <span>{prop.beds}bd</span>
                                <span>•</span>
                                <span>{prop.baths}ba</span>
                                <span>•</span>
                                <span className="text-[#E31E24] font-black">${(prop.price/1000)}K</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. Vibe Feed Screen */}
                {activeScreen === 'vibe' && (
                  <div className="space-y-3.5 -m-3.5 h-[480px] relative bg-black flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
                    
                    {/* Background Ken Burns Pan Image Mocking Video */}
                    <div className="absolute inset-0 z-1">
                      <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" 
                        alt="" 
                        className={`w-full h-full object-cover transform scale-110 origin-center ${isPlaying ? 'animate-pulse' : ''}`}
                        style={{ filter: 'brightness(0.75)' }}
                      />
                    </div>

                    {/* Vibe overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/45 z-2" />

                    {/* Top overlay navigation */}
                    <div className="p-4 flex justify-between items-center z-10 select-none">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest text-shadow">Ocean Parkway Area</span>
                      <span className="bg-[#E31E24] text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow">
                        92% VIBE
                      </span>
                    </div>

                    {/* Right action controls */}
                    <div className="absolute right-3.5 bottom-24 flex flex-col gap-4 z-10 items-center">
                      <button 
                        onClick={() => setVibeLiked(!vibeLiked)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center border shadow transition-all ${
                          vibeLiked ? 'bg-[#E31E24] border-[#E31E24] text-white' : 'bg-black/40 border-white/20 text-white'
                        }`}
                      >
                        <Heart size={14} className={vibeLiked ? 'fill-white' : ''} />
                      </button>
                      <button className="h-9 w-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white shadow">
                        <Share2 size={12} />
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-9 w-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white shadow"
                      >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                      </button>
                    </div>

                    {/* Bottom Property Detail overlay */}
                    <div className="p-4 z-10 space-y-2 select-none">
                      <div className="flex items-center gap-1.5 text-red-400">
                        <Sparkles size={11} />
                        <span className="font-black text-[9px] uppercase tracking-wider">RECOMENDADO POR IA</span>
                      </div>
                      <h4 className="text-white font-extrabold text-[12px] leading-tight text-shadow">1234 Street, Louisville, KY</h4>
                      <p className="text-[9px] text-zinc-300 leading-relaxed font-medium text-shadow">
                        "Estadísticas del vecindario muestran bajos niveles de ruido y alta densidad de zonas verdes familiares. La IA reporta un excelente ratio de revalorización."
                      </p>
                      <div className="flex gap-1.5 text-[8px] font-black uppercase text-zinc-300 pt-1">
                        <span className="bg-black/60 border border-white/10 px-2 py-0.5 rounded">
                          🌳 Parques Familiares
                        </span>
                        <span className="bg-black/60 border border-white/10 px-2 py-0.5 rounded">
                          📶 Fibra Simétrica
                        </span>
                      </div>
                    </div>

                  </div>
                )}

                {/* 3. Deal Checklist / Properties Screen */}
                {activeScreen === 'deal' && (
                  <div className="space-y-3.5 animate-in fade-in duration-200">
                    
                    {/* Deal Header */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-3 space-y-1.5 shadow-sm">
                      <div className="flex justify-between items-center text-[7px] font-black text-zinc-500 uppercase tracking-widest">
                        <span>DEAL: #TC-1234</span>
                        <span className="text-[#E31E24]">Compliance Audit</span>
                      </div>
                      <h4 className="font-extrabold text-white text-[10px] leading-tight">1234 Street, Louisville, KY</h4>
                      <div className="flex justify-between items-center text-[8px] pt-1 border-t border-zinc-900 mt-1">
                        <span className="text-zinc-400 font-bold">$450,000</span>
                        <span className="text-emerald-400 font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">Aprobado</span>
                      </div>
                    </div>

                    {/* Checklist Documents */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h5 className="text-[9px] font-black text-white uppercase tracking-wider">Checklist Transaccional</h5>
                        <span className="text-[8px] text-zinc-500 font-bold">2 / 3 Listo</span>
                      </div>

                      <div className="space-y-2">
                        
                        {/* Doc 1 */}
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-0.5">
                            <p className="font-bold text-white text-[9px]">Purchase Agreement</p>
                            <span className="text-[8px] text-zinc-500">Subido el 10 Jul</span>
                          </div>
                          <span className="text-emerald-400 font-black flex items-center gap-1 text-[8px] uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle size={8} /> Aprobado
                          </span>
                        </div>

                        {/* Doc 2 */}
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-0.5">
                            <p className="font-bold text-white text-[9px]">Proof of Funds (POF)</p>
                            <span className="text-[8px] text-zinc-500">Subido el 11 Jul</span>
                          </div>
                          <span className="text-emerald-400 font-black flex items-center gap-1 text-[8px] uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle size={8} /> Aprobado
                          </span>
                        </div>

                        {/* Doc 3 (Interactive Upload) */}
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-2.5 flex items-center justify-between gap-3 relative overflow-hidden shadow-2xs">
                          
                          {/* OCR scanning overlay effect */}
                          {docStatus === 'scanning' && (
                            <div className="absolute inset-0 bg-red-950/20 backdrop-blur-2xs flex items-center justify-center text-red-400 font-bold text-[8px] uppercase tracking-wider">
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
                            <span className="text-emerald-400 font-black flex items-center gap-1 text-[8px] uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full animate-bounce">
                              <CheckCircle size={8} /> Aprobado
                            </span>
                          ) : (
                            <button
                              onClick={handleUpload}
                              disabled={uploadingDoc}
                              className="px-2.5 py-1.5 bg-[#E31E24] hover:bg-red-500 text-white font-black rounded-lg text-[8px] uppercase flex items-center gap-1 active:scale-95 transition-all disabled:opacity-50"
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
                  <div className="flex flex-col h-[400px] -m-3.5 relative bg-[#121212]">
                    
                    {/* Chat top header */}
                    <div className="p-3 bg-[#141414] border-b border-zinc-900 flex items-center justify-between select-none">
                      <div className="flex items-center gap-1.5">
                        <Bot size={12} className="text-[#E31E24] animate-pulse" />
                        <span className="font-black text-[9px] text-white uppercase tracking-wider">Asistente Transaccional</span>
                      </div>
                      <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/25 px-1.5 py-0.2 rounded font-black">RAG ACTIVE</span>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3.5 scrollbar-none text-[10px]">
                      {copilotMessages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                        >
                          {msg.sender === 'bot' && (
                            <div className="h-5 w-5 rounded bg-red-950 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                              <Bot size={10} />
                            </div>
                          )}
                          <div className={`p-2 rounded-xl leading-normal font-medium ${
                            msg.sender === 'user' 
                              ? 'bg-red-500/10 text-white rounded-tr-none border border-red-500/20' 
                              : 'bg-[#1a1a1a] text-zinc-300 border border-zinc-800 rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {copilotTyping && (
                        <div className="flex gap-2 max-w-[85%]">
                          <div className="h-5 w-5 rounded bg-red-950 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                            <Bot size={10} />
                          </div>
                          <div className="bg-[#1a1a1a] border border-zinc-800 p-2 rounded-xl rounded-tl-none text-zinc-500 flex items-center gap-1">
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
                        className="px-2 py-1 bg-[#1a1a1a] border border-zinc-850 rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-red-500/30 whitespace-nowrap"
                      >
                        Inspección Fecha
                      </button>
                      <button
                        onClick={() => handleCopilotSend('¿Faltan documentos en 1234 Street?')}
                        className="px-2 py-1 bg-[#1a1a1a] border border-zinc-850 rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-red-500/30 whitespace-nowrap"
                      >
                        Faltantes
                      </button>
                      <button
                        onClick={() => handleCopilotSend('Reenviar resumen al cliente')}
                        className="px-2 py-1 bg-[#1a1a1a] border border-zinc-850 rounded-lg text-[8px] font-black uppercase text-zinc-300 hover:border-red-500/30 whitespace-nowrap"
                      >
                        Reenviar Al Cliente
                      </button>
                    </div>

                    {/* Input Bar */}
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleCopilotSend(); }}
                      className="p-2 bg-black border-t border-zinc-900 flex gap-1.5 items-center select-none shrink-0"
                    >
                      <input
                        type="text"
                        placeholder="Pregúntale al Copilot..."
                        value={copilotInput}
                        onChange={(e) => setCopilotInput(e.target.value)}
                        disabled={copilotTyping}
                        className="flex-1 bg-[#1a1a1a] border border-zinc-850 rounded-xl px-2.5 py-1.5 text-[9px] text-white focus:outline-none placeholder-zinc-700"
                      />
                      <button
                        type="submit"
                        disabled={copilotTyping || !copilotInput.trim()}
                        className="p-1.5 bg-[#E31E24] hover:bg-red-500 disabled:opacity-50 text-white rounded-lg transition-all"
                      >
                        <Send size={10} />
                      </button>
                    </form>

                  </div>
                )}

                {/* 5. Resend Email Screen */}
                {activeScreen === 'email' && (
                  <div className="space-y-3 animate-in fade-in duration-200 text-[10px]">
                    
                    {/* Email Headers */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-3 space-y-1.5 text-zinc-400">
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
                        <p className="font-bold text-[#E31E24] leading-tight">Compliance Aprobado - 1234 Street, Louisville, KY</p>
                      </div>
                    </div>

                    {/* Email Template Body (Charcoal background) */}
                    <div className="bg-[#1c1c1e] border border-zinc-800 rounded-xl p-4 space-y-4 text-zinc-355 font-medium shadow-md">
                      
                      {/* Logo header */}
                      <div className="flex justify-center border-b border-zinc-800 pb-3">
                        <span className="font-extrabold text-[12px] text-white tracking-widest">ZHOMES REAL ESTATE</span>
                      </div>

                      <p className="text-[10px] leading-relaxed">
                        Estimado **John Doe**,
                      </p>

                      <p className="text-[10px] leading-relaxed font-medium">
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
              <div className="h-4 bg-[#121212] flex items-center justify-center shrink-0 select-none pb-1">
                <div className="w-20 h-1 bg-zinc-700 rounded-full" />
              </div>

            </div>

          </div>

          {/* Floating Bubble launcher mock inside mockup window */}
          {activeScreen !== 'copilot' && (
            <button
              onClick={() => setActiveScreen('copilot')}
              className="absolute bottom-12 right-[calc(50%-120px)] h-9 w-9 rounded-full bg-[#E31E24] hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer z-50 animate-bounce"
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
