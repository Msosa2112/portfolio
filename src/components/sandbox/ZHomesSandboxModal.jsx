import React, { useState, useEffect } from 'react';
import { 
  X, Map, Sparkles, Mail, Bot, CheckCircle, AlertCircle, 
  Upload, Send, ChevronRight, Calendar, Info, RefreshCw, 
  Home, Building, MapPin, Maximize, Flame, Lock, Eye, Menu,
  Heart, Share2, Phone, Play, Pause, Search, User, ShieldAlert,
  Moon, Globe, Sparkle, Compass, HelpCircle, ChevronUp
} from 'lucide-react';

export default function ZHomesSandboxModal({ isOpen, onClose }) {
  const [activeScreen, setActiveScreen] = useState('inicio'); // inicio, buscar, match, mapa, vibe
  const [vibeLiked, setVibeLiked] = useState(false);
  const [swipeLiked, setSwipeLiked] = useState(null); // true, false, null
  const [isVibePlaying, setIsVibePlaying] = useState(true);

  // Deal compliance simulator popup trigger
  const [showCompliancePopup, setShowCompliancePopup] = useState(false);
  const [docStatus, setDocStatus] = useState('pending'); // pending, scanning, approved
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [complianceLog, setComplianceLog] = useState([
    'Iniciando auditoría de compliance de la propiedad 14812 Landmark Dr...',
    'Contrato de Compra-Venta: VALIDADO ✓',
    'Prueba de Fondos: VALIDADO ✓'
  ]);

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
  };

  const handleUpload = () => {
    if (docStatus === 'approved' || uploadingDoc) return;
    setUploadingDoc(true);
    setComplianceLog(prev => [...prev, 'Cargando Reporte de Inspección...']);
    setTimeout(() => {
      setDocStatus('scanning');
      setComplianceLog(prev => [...prev, 'Analizando Reporte de Inspección con Vision AI...']);
      setTimeout(() => {
        setDocStatus('approved');
        setUploadingDoc(false);
        setComplianceLog(prev => [
          ...prev,
          '✓ Reporte de Inspección analizado y aprobado. Cláusulas de reparación estructural conformes.',
          '¡COMPLIANCE COMPLETADO CON ÉXITO!'
        ]);
      }, 1500);
    }, 1000);
  };

  const getScreenDescription = () => {
    switch (activeScreen) {
      case 'inicio':
        return {
          title: 'Pantalla de Inicio (Landing)',
          desc: 'Vista inicial de la aplicación móvil de ZHomes. Muestra la cabecera con el logotipo oficial de ZHomes Real Estate, la propiedad destacada de $1,570,000 en Landmark Dr, el buscador por texto y el acceso al portal de emparejamiento (Match).',
          highlight: 'Haz clic en el banner rojo de "ZHomes Match" o en las herramientas (Calculadora, Agentes) para interactuar.'
        };
      case 'buscar':
        return {
          title: 'Resultados de Búsqueda',
          desc: 'Listado de propiedades filtradas en Louisville. Replica el diseño de tarjetas completas con etiquetas sobrepuestas de IA (Luz natural, Excelente ubicación) y detalles métricos rápidos como precio por millón, habitaciones y metraje.',
          highlight: 'Haz clic en el botón "Ver Detalles" de la propiedad para abrir el portal de cumplimiento de contratos (Compliance Deal Room).'
        };
      case 'match':
        return {
          title: 'ZHomes Match (Tinder-Style)',
          desc: 'Simulador de Swipe. Los compradores deslizan tarjetas hacia la derecha si les atrae la propiedad, o a la izquierda para descartarla. Incluye el agente asignado (Jessica Hernandez) y el distintivo ZHomes.',
          highlight: 'Usa los botones de Cruz (Descartar) o Corazón (Guardar) para interactuar con la tarjeta destacada.'
        };
      case 'mapa':
        return {
          title: 'Mapa Interactivo (MapLibre)',
          desc: 'Visualización de geolocalización de propiedades. Recrea los círculos de densidad de color rojo con los contadores de listados en cada zona, además de la tarjeta inferior desplegable que permite ojear propiedades exclusivas.',
          highlight: 'Desliza las propiedades de la lista inferior o haz clic en los pines para ver el rendimiento cartográfico.'
        };
      case 'vibe':
        return {
          title: 'Vibe Feed IA',
          desc: 'Feed de videos cortos (estilo TikTok/Reels) que combina metraje de las propiedades con resúmenes proactivos de estilo de vida, ruidos y parques generados por inteligencia artificial en tiempo real.',
          highlight: 'Interactúa con los controles de reproducción de video en la esquina derecha.'
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
                { id: 'inicio', label: 'Inicio / Home', icon: Home },
                { id: 'buscar', label: 'Buscador Lista', icon: Search },
                { id: 'match', label: 'ZHomes Match', icon: Heart },
                { id: 'mapa', label: 'Mapa Pines', icon: Map },
                { id: 'vibe', label: 'Vibe Feed', icon: Sparkles },
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
          
          {/* Compliance deal room modal overlay popup inside simulator */}
          {showCompliancePopup && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-[#141414] border border-zinc-800 rounded-3xl w-[260px] p-4 space-y-3.5 text-left text-zinc-300">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <span className="font-black text-[9px] uppercase tracking-wider text-[#E31E24]">Compliance Deal Room</span>
                  <button 
                    onClick={() => setShowCompliancePopup(false)} 
                    className="text-zinc-500 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>

                <div className="space-y-1.5 text-[8px] bg-black/50 p-2.5 rounded-xl border border-zinc-900 font-mono text-zinc-400">
                  {complianceLog.map((log, i) => (
                    <p key={i} className="leading-normal">{log}</p>
                  ))}
                  {uploadingDoc && <span className="h-1.5 w-1.5 rounded-full bg-[#E31E24] animate-ping inline-block" />}
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block">Acción Requerida</span>
                  <div className="bg-[#1c1c1e] border border-zinc-850 p-2 rounded-xl flex items-center justify-between gap-1.5">
                    <div>
                      <p className="font-bold text-[9px] text-white">Reporte de Inspección</p>
                      <span className="text-[7px] text-zinc-500">Formato PDF</span>
                    </div>
                    {docStatus === 'approved' ? (
                      <span className="text-emerald-400 font-black text-[8px] flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                        Aprobado
                      </span>
                    ) : (
                      <button
                        onClick={handleUpload}
                        disabled={uploadingDoc}
                        className="px-2 py-1 bg-[#E31E24] hover:bg-red-500 text-white font-black rounded-lg text-[8px] uppercase flex items-center gap-0.5 active:scale-95 transition-all disabled:opacity-50"
                      >
                        <Upload size={8} />
                        <span>{uploadingDoc ? '...' : '+ Subir'}</span>
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setShowCompliancePopup(false)}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-[9px] font-black uppercase rounded-xl border border-zinc-800"
                >
                  Cerrar Deal Room
                </button>
              </div>
            </div>
          )}

          {/* Smartphone Simulator Mock Container */}
          <div className="relative w-[300px] h-[580px] bg-black rounded-[45px] p-3 shadow-2xl border-[6px] border-zinc-850 flex flex-col overflow-hidden shrink-0">
            
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ml-8" />
            </div>

            {/* Screen Inner Container */}
            <div 
              className="flex-1 bg-[#f7f8fa] rounded-[32px] overflow-hidden flex flex-col relative text-[11px] text-zinc-900"
              data-lenis-prevent
            >
              
              {/* App Status bar */}
              <div className="h-6 pt-1.5 px-6 flex justify-between items-center text-[8px] text-zinc-500 font-bold tracking-wider bg-transparent select-none z-40 shrink-0">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1">
                  <span>LTE</span>
                  <div className="w-4.5 h-2 border border-zinc-400 rounded-sm p-0.5 flex items-center justify-start">
                    <div className="w-3 h-1 bg-zinc-500 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Viewport Content */}
              <div 
                className="flex-1 overflow-y-auto relative pb-20 scrollbar-none select-none"
                data-lenis-prevent
              >
                
                {/* 1. SCREEN: INICIO (HOME) */}
                {activeScreen === 'inicio' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    
                    {/* Header bar matching Screenshot 1 */}
                    <div className="px-4 py-2.5 flex justify-between items-center bg-transparent z-40 relative">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4.5 h-4.5 rounded-full bg-[#E31E24] flex items-center justify-center text-[8px] font-black text-white">
                          Z
                        </div>
                        <div className="leading-none">
                          <span className="font-extrabold text-[11px] text-[#E31E24] tracking-widest block">ZHOMES</span>
                          <span className="text-[6px] text-zinc-400 tracking-wider font-bold uppercase">REAL ESTATE</span>
                        </div>
                      </div>
                      
                      {/* Icons on right */}
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-600 text-xs">🌙</span>
                        <span className="text-zinc-600 text-xs">🌐</span>
                        <button className="bg-[#E31E24] text-white px-3 py-1 rounded-full text-[8px] font-bold flex items-center gap-1">
                          <span>👤</span> Perfil
                        </button>
                      </div>
                    </div>

                    {/* Hero section with dusk house and price overlay */}
                    <div className="mx-4 rounded-3xl overflow-hidden relative shadow-md h-52 bg-zinc-800">
                      <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                      
                      {/* Dusk card content overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-white text-left space-y-1">
                        <span className="text-2xl font-black tracking-tight">$1,570,000</span>
                        <p className="text-[9px] font-bold text-zinc-200 leading-snug">14812 Landmark Dr, Louisville, KY 40245</p>
                        <div className="flex items-center gap-1.5 text-[8px] text-zinc-300 font-semibold pt-0.5">
                          <span>📍 Louisville</span>
                          <span>•</span>
                          <span>6 hab</span>
                          <span>•</span>
                          <span>7 baños</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Search pill input overlay */}
                    <div className="mx-6 -mt-6 relative z-10">
                      <div className="bg-white border border-zinc-100 rounded-full px-4 py-3 text-[10px] text-zinc-400 flex items-center justify-between shadow-lg">
                        <span>Ciudad, dirección o ZIP...</span>
                        <Search size={12} className="text-zinc-400" />
                      </div>
                    </div>

                    {/* Horizontal Category pills */}
                    <div className="px-4 flex gap-1.5 overflow-x-auto scrollbar-none pt-1">
                      <span className="px-3 py-1.5 rounded-full bg-[#E31E24] text-white text-[8px] font-black uppercase whitespace-nowrap shadow-sm">Todas</span>
                      <span className="px-3 py-1.5 rounded-full bg-white text-zinc-500 border border-zinc-150 text-[8px] font-black uppercase whitespace-nowrap">Exclusivas</span>
                      <span className="px-3 py-1.5 rounded-full bg-white text-zinc-500 border border-zinc-150 text-[8px] font-black uppercase whitespace-nowrap">Nuevas</span>
                      <span className="px-3 py-1.5 rounded-full bg-white text-zinc-500 border border-zinc-150 text-[8px] font-black uppercase whitespace-nowrap">Bajo $300k</span>
                    </div>

                    {/* ZHomes Match red banner card */}
                    <div 
                      onClick={() => navigateTo('match')}
                      className="mx-4 bg-gradient-to-r from-red-700 to-red-800 rounded-2xl p-3.5 flex justify-between items-center text-white cursor-pointer shadow-md hover:brightness-105 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                          <Heart size={16} className="fill-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-extrabold text-[11px] leading-tight tracking-wider">ZHomes Match</h4>
                          <p className="text-[7px] text-zinc-200">Desliza y encuentra tu hogar ideal</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-white/60" />
                    </div>

                    {/* Tools section */}
                    <div className="px-4 space-y-2 text-left">
                      <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-zinc-800">Herramientas</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { title: 'Calculadora', desc: 'Estima tu hipoteca', icon: '🧮' },
                          { title: 'Agentes', desc: 'Nuestro equipo', icon: '👥' },
                          { title: 'Mercado', desc: 'Explorar todo', icon: '📈' }
                        ].map((tool, idx) => (
                          <div key={idx} className="bg-white border border-zinc-150 rounded-2xl p-2.5 text-center space-y-1 shadow-2xs hover:border-[#E31E24]/20 transition-all cursor-pointer">
                            <span className="text-base block">{tool.icon}</span>
                            <p className="font-extrabold text-[8px] text-zinc-800 leading-tight">{tool.title}</p>
                            <span className="text-[6px] text-zinc-400 block">{tool.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recién Listadas section */}
                    <div className="px-4 space-y-2.5 text-left">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-zinc-800">Recién Listadas</h4>
                        <span className="text-[8px] text-[#E31E24] font-black cursor-pointer uppercase tracking-wider" onClick={() => navigateTo('buscar')}>Ver todas &gt;</span>
                      </div>
                      
                      {/* Big Card matching Screenshot 2 */}
                      <div className="bg-white border border-zinc-150 rounded-3xl overflow-hidden shadow-sm space-y-2">
                        <div className="h-44 relative bg-zinc-800">
                          <img 
                            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600" 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-[#E31E24] text-white text-[7px] font-black px-2 py-0.5 rounded uppercase">
                            ★ ZHomes
                          </span>
                        </div>
                        <div className="p-3 text-left space-y-1">
                          <h4 className="font-black text-sm text-zinc-900">$1,570,000</h4>
                          <p className="text-[9px] font-bold text-zinc-500 truncate leading-tight">14812 Landmark Dr, Louisville, KY 40245</p>
                          <div className="flex gap-1.5 text-[7px] text-zinc-400 pt-0.5 font-bold">
                            <span>Louisville</span>
                            <span>•</span>
                            <span>6 hab</span>
                            <span>•</span>
                            <span>7 baños</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. SCREEN: BUSCADOR LISTA */}
                {activeScreen === 'buscar' && (
                  <div className="space-y-3.5 p-3.5 animate-in fade-in duration-200">
                    
                    {/* Search filter bar matching Screenshot 3 */}
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 bg-white border border-zinc-200 rounded-full px-3.5 py-2 flex items-center justify-between shadow-2xs">
                        <span className="text-[9px] text-zinc-400">Buscar por dirección o ciudad</span>
                        <Search size={11} className="text-zinc-400" />
                      </div>
                      <button className="h-8 w-8 bg-[#E31E24] text-white rounded-full flex items-center justify-center shadow">
                        <span>🎚️</span>
                      </button>
                    </div>

                    {/* Filter pills row 1 */}
                    <div className="flex gap-2">
                      <span className="bg-red-500/10 text-[#E31E24] border border-red-500/20 px-2.5 py-1 rounded-full text-[8px] font-black uppercase flex items-center gap-1 shadow-2xs">
                        🏷️ En Venta <span className="bg-[#E31E24] text-white px-1.5 py-0.2 rounded-full text-[6px]">4585</span>
                      </span>
                      <span className="bg-zinc-100 text-zinc-500 border border-zinc-200 px-2.5 py-1 rounded-full text-[8px] font-bold uppercase flex items-center gap-1">
                        🔒 Exclusivas
                      </span>
                    </div>

                    {/* Filter pills row 2 */}
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                      <span className="px-3 py-1.5 rounded-full bg-zinc-900 text-white text-[8px] font-black uppercase whitespace-nowrap">Casas</span>
                      <span className="px-3 py-1.5 rounded-full bg-white text-zinc-500 border border-zinc-200 text-[8px] font-black uppercase whitespace-nowrap">Apartamentos</span>
                      <span className="px-3 py-1.5 rounded-full bg-white text-zinc-500 border border-zinc-200 text-[8px] font-black uppercase whitespace-nowrap">Lotes</span>
                    </div>

                    {/* Filter dropdowns */}
                    <div className="flex gap-1 overflow-x-auto scrollbar-none text-[8px] font-bold text-zinc-500 uppercase pb-1 border-b border-zinc-200">
                      <span className="px-2 py-1 bg-white border border-zinc-200 rounded-lg whitespace-nowrap">Cuartos ∨</span>
                      <span className="px-2 py-1 bg-white border border-zinc-200 rounded-lg whitespace-nowrap">Baños ∨</span>
                      <span className="px-2 py-1 bg-white border border-zinc-200 rounded-lg whitespace-nowrap">Sqft ∨</span>
                      <span className="px-2 py-1 bg-white border border-zinc-200 rounded-lg whitespace-nowrap">Precio ∨</span>
                    </div>

                    {/* Results count & match button */}
                    <div className="flex justify-between items-center text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-zinc-500">🏷️ En Venta</span>
                        <span className="text-[9px] font-extrabold text-zinc-800">4015 propiedades</span>
                      </div>
                      <button 
                        onClick={() => navigateTo('match')}
                        className="bg-[#E31E24] hover:bg-red-500 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase flex items-center gap-1 shadow-sm transition-all"
                      >
                        ❤️ Match
                      </button>
                    </div>

                    {/* Property Card Detail Listing (High Fidelity matching Screenshot 3) */}
                    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-md space-y-0.5 relative text-left">
                      
                      {/* Image section */}
                      <div className="h-56 relative bg-zinc-800">
                        <img 
                          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay badges */}
                        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 max-w-[80%]">
                          <span className="bg-black/60 text-white text-[7px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">Luz natural</span>
                          <span className="bg-black/60 text-white text-[7px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">Excelente ubicación</span>
                          <span className="bg-black/60 text-white text-[7px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">🚗 30 min</span>
                        </div>

                        {/* Location capsule */}
                        <span className="absolute top-24 left-3.5 bg-black/60 text-white text-[8px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                          📍 Louisville
                        </span>

                        {/* Heart icon button */}
                        <button className="absolute top-3.5 right-3.5 h-7 w-7 rounded-full bg-white/95 flex items-center justify-center text-red-500 shadow-md">
                          <Heart size={12} className="fill-red-500" />
                        </button>
                      </div>

                      {/* Info body */}
                      <div className="p-4 space-y-3">
                        <h4 className="font-extrabold text-[12px] text-zinc-950 leading-tight">
                          14812 Landmark Dr, Louisville, KY 40245
                        </h4>

                        {/* Bottom stats capsules */}
                        <div className="flex gap-2.5 text-[8.5px] font-black text-zinc-300 uppercase">
                          <span className="bg-zinc-800 px-3 py-1 rounded-lg text-white font-black">$1.57M</span>
                          <span className="bg-zinc-800/80 px-2.5 py-1 rounded-lg text-zinc-200">🛏️ 6</span>
                          <span className="bg-zinc-800/80 px-2.5 py-1 rounded-lg text-zinc-200">🛁 7</span>
                          <span className="bg-zinc-800/80 px-2.5 py-1 rounded-lg text-zinc-200">7,291 sqft</span>
                        </div>

                        {/* Ver Detalles compliance integration button */}
                        <button 
                          onClick={() => {
                            setComplianceLog([
                              'Iniciando auditoría de compliance de la propiedad 14812 Landmark Dr...',
                              'Contrato de Compra-Venta: VALIDADO ✓',
                              'Prueba de Fondos: VALIDADO ✓'
                            ]);
                            setDocStatus('pending');
                            setShowCompliancePopup(true);
                          }}
                          className="w-full py-2.5 mt-1 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-[9px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all"
                        >
                          Ver Detalles &gt;
                        </button>
                      </div>

                    </div>

                  </div>
                )}

                {/* 3. SCREEN: ZHONES MATCH (SWIPE) */}
                {activeScreen === 'match' && (
                  <div className="space-y-4 p-4 animate-in fade-in duration-200 text-center">
                    
                    {/* Header row */}
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                      <button onClick={() => navigateTo('inicio')} className="p-1 hover:bg-zinc-100 rounded-lg text-zinc-600">
                        <span>←</span>
                      </button>
                      <h4 className="font-extrabold text-[12px] text-red-600 tracking-wider">Zhomes Match</h4>
                      <div className="w-6" />
                    </div>

                    <p className="text-[9px] text-zinc-400 leading-snug">
                      Desliza a la derecha si te gusta, a la izquierda si no.
                    </p>

                    {/* Swiper Card Mockup matching Screenshot 5 */}
                    <div className="relative mx-auto w-[230px] h-[340px] bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
                      <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                      {/* Exclusivas badge */}
                      <span className="absolute top-4 left-4 bg-[#E31E24] text-white text-[7px] font-black px-2 py-0.5 rounded uppercase">
                        ★ ZHomes
                      </span>

                      {/* Card Overlay Text */}
                      <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                        <span className="text-xl font-black leading-none">$1,570,000</span>
                        <p className="font-bold text-[9px] text-zinc-200 truncate">14812 Landmark Dr, Louisville, KY 40245</p>
                        
                        <div className="flex gap-2 text-[7px] text-zinc-300 font-bold">
                          <span>📍 Louisville</span>
                          <span>•</span>
                          <span>6 Cuartos</span>
                          <span>•</span>
                          <span>7 Baños</span>
                          <span>•</span>
                          <span>7,291 sqft</span>
                        </div>
                        <span className="text-[6.5px] text-zinc-400 block pt-0.5">Agente: Jessica Hernandez</span>
                      </div>
                    </div>

                    {/* Bottom Tinder-style Actions */}
                    <div className="flex justify-center gap-4 pt-1">
                      <button 
                        onClick={() => { setSwipeLiked(false); triggerNotification('Propiedad descartada'); }}
                        className="h-11 w-11 rounded-full bg-white border border-red-200/50 flex items-center justify-center text-red-500 shadow-md active:scale-90 transition-all text-sm font-bold"
                      >
                        ✕
                      </button>
                      <button 
                        onClick={() => { setSwipeLiked(null); triggerNotification('Deshaciendo acción...'); }}
                        className="h-9 w-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 shadow-md active:scale-90 transition-all text-xs"
                      >
                        ↩
                      </button>
                      <button 
                        onClick={() => { setSwipeLiked(true); triggerNotification('¡Propiedad Guardada en Favoritos!'); }}
                        className="h-11 w-11 rounded-full bg-white border border-green-200/50 flex items-center justify-center text-emerald-500 shadow-md active:scale-90 transition-all text-sm"
                      >
                        ♥
                      </button>
                    </div>

                  </div>
                )}

                {/* 4. SCREEN: MAPA PINES (MAPLIBRE) */}
                {activeScreen === 'mapa' && (
                  <div className="h-[480px] -m-3.5 relative bg-[#eef1f6] flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
                    
                    {/* Search and filters matching Screenshot 4 */}
                    <div className="p-3 space-y-2.5 z-10 bg-transparent relative">
                      
                      {/* Search bar input with search and filters icon */}
                      <div className="bg-white border border-zinc-200/60 rounded-full px-3.5 py-2.5 text-[9.5px] text-zinc-400 flex items-center justify-between shadow-md">
                        <span>Describe tu hogar ideal...</span>
                        <Search size={11} className="text-zinc-400" />
                      </div>

                      {/* Row 1 pills */}
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-none text-[8px] font-bold uppercase">
                        <span className="px-3 py-1 rounded-full bg-zinc-950 text-white font-black whitespace-nowrap">Todas</span>
                        <span className="px-3 py-1 rounded-full bg-white text-zinc-500 border border-zinc-200 whitespace-nowrap">En Venta</span>
                        <span className="px-3 py-1 rounded-full bg-white text-zinc-500 border border-zinc-200 whitespace-nowrap">Exclusivas</span>
                      </div>

                      {/* Row 2 pills */}
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-none text-[8px] font-bold text-zinc-500 uppercase">
                        <span className="px-2 py-0.5 bg-zinc-900 text-white rounded-md whitespace-nowrap">Todos</span>
                        <span className="px-2 py-0.5 bg-white border border-zinc-200 rounded-md whitespace-nowrap">Casas</span>
                        <span className="px-2 py-0.5 bg-white border border-zinc-200 rounded-md whitespace-nowrap">Apt</span>
                        <span className="px-2 py-0.5 bg-white border border-zinc-200 rounded-md whitespace-nowrap">Lotes</span>
                      </div>

                    </div>

                    {/* Vector Map image overlay mimicking pins */}
                    <div className="absolute inset-0 bg-[#e3eafd] flex items-center justify-center">
                      <div className="absolute inset-0 bg-cover opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000')" }} />
                      
                      {/* Map Pins counts matching Screenshot 4 */}
                      <div className="absolute top-28 left-6 bg-[#E31E24] text-white text-[8px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg border border-white/20">10</div>
                      <div className="absolute top-20 right-16 bg-[#E31E24] text-white text-[8px] font-black h-6 w-6 rounded-full flex items-center justify-center shadow-lg border border-white/20">30</div>
                      <div className="absolute top-36 right-8 bg-[#E31E24] text-white text-[8px] font-black h-5.5 w-5.5 rounded-full flex items-center justify-center shadow-lg border border-white/20">17</div>
                      <div className="absolute top-44 left-20 bg-[#E31E24] text-white text-[8px] font-black h-6.5 w-6.5 rounded-full flex items-center justify-center shadow-lg border border-white/20">53</div>
                      <div className="absolute bottom-36 right-20 bg-[#E31E24] text-white text-[8px] font-black h-5.5 w-5.5 rounded-full flex items-center justify-center shadow-lg border border-white/20">27</div>
                      <div className="absolute bottom-28 left-14 bg-[#E31E24] text-white text-[8px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg border border-white/20">43</div>

                    </div>

                    {/* Translucent floating map action buttons on right */}
                    <div className="absolute right-3 top-36 flex flex-col gap-2 z-10">
                      <button className="h-7 w-7 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-500 shadow-md"><Map size={10} /></button>
                      <button className="h-7 w-7 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-500 shadow-md"><Flame size={10} /></button>
                      <button className="h-7 w-7 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-500 shadow-md">⎔</button>
                    </div>

                    {/* Bottom slider sheet listing matching Screenshot 4 */}
                    <div className="z-10 bg-white/95 backdrop-blur-md rounded-t-3xl border-t border-zinc-200 p-3 space-y-2.5 text-left shadow-2xl">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[9px] font-black text-zinc-800 uppercase tracking-wider">Ver 40 propiedades →</span>
                        <ChevronUp size={12} className="text-zinc-400" />
                      </div>

                      {/* Horizontal list of properties */}
                      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                        
                        {/* Card 1 */}
                        <div className="w-36 shrink-0 bg-white border border-zinc-150 rounded-2xl overflow-hidden space-y-1.5 shadow-2xs">
                          <div className="h-20 relative bg-zinc-800">
                            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300" alt="" className="w-full h-full object-cover" />
                            <span className="absolute top-1 left-1 bg-zinc-950 text-white text-[5.5px] font-black px-1.5 py-0.2 rounded">ZH</span>
                          </div>
                          <div className="p-1.5 text-left">
                            <p className="font-black text-[9px] text-zinc-900">$515K</p>
                            <span className="text-[6.5px] text-zinc-400 font-bold block">5 bd • 3 ba • 3,462 sqft</span>
                          </div>
                        </div>

                        {/* Card 2 */}
                        <div className="w-36 shrink-0 bg-white border border-zinc-150 rounded-2xl overflow-hidden space-y-1.5 shadow-2xs">
                          <div className="h-20 relative bg-zinc-800">
                            <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300" alt="" className="w-full h-full object-cover" />
                            <span className="absolute top-1 left-1 bg-zinc-950 text-white text-[5.5px] font-black px-1.5 py-0.2 rounded">ZH</span>
                          </div>
                          <div className="p-1.5 text-left">
                            <p className="font-black text-[9px] text-zinc-900">$440K</p>
                            <span className="text-[6.5px] text-zinc-400 font-bold block">4 bd • 3 ba • 2,500 sqft</span>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                )}

                {/* 5. SCREEN: VIBE FEED */}
                {activeScreen === 'vibe' && (
                  <div className="space-y-3.5 -m-3.5 h-[480px] relative bg-black flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
                    
                    {/* Background video mock */}
                    <div className="absolute inset-0 z-1">
                      <img 
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600" 
                        alt="" 
                        className="w-full h-full object-cover"
                        style={{ filter: 'brightness(0.75)' }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35 z-2" />

                    <div className="p-4 flex justify-between items-center z-10 text-white select-none">
                      <span className="text-[9px] font-black tracking-widest text-shadow uppercase">Vibe Feed IA</span>
                      <span className="bg-[#E31E24] text-white text-[7px] font-black px-1.5 py-0.2 rounded">LIVE SUMMARY</span>
                    </div>

                    <div className="absolute right-3 bottom-24 flex flex-col gap-4 z-10 items-center">
                      <button 
                        onClick={() => setVibeLiked(!vibeLiked)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center border shadow transition-all ${
                          vibeLiked ? 'bg-[#E31E24] border-[#E31E24] text-white' : 'bg-black/40 border-white/20 text-white'
                        }`}
                      >
                        <Heart size={14} className={vibeLiked ? 'fill-white' : ''} />
                      </button>
                      <button className="h-9 w-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white shadow"><Share2 size={12} /></button>
                      <button 
                        onClick={() => setIsVibePlaying(!isVibePlaying)}
                        className="h-9 w-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white shadow"
                      >
                        {isVibePlaying ? <Pause size={12} /> : <Play size={12} />}
                      </button>
                    </div>

                    {/* Bottom AI data card overlay */}
                    <div className="p-4 z-10 text-left text-white space-y-1.5 select-none">
                      <div className="flex items-center gap-1.5 text-red-400">
                        <Sparkles size={11} className="animate-spin-slow" />
                        <span className="font-black text-[9px] uppercase tracking-wider">Tranquilidad Estimada: 92%</span>
                      </div>
                      <h4 className="font-extrabold text-[12px] text-shadow leading-tight">10906 Milwaukee Way, Louisville, KY</h4>
                      <p className="text-[9px] text-zinc-300 leading-relaxed font-medium text-shadow">
                        "La IA de vecindarios destaca baja emisión de ruidos viales nocturnos, cercanía a escuelas públicas de alta valoración y senderos ecológicos."
                      </p>
                      <div className="flex gap-1.5 text-[7px] font-black uppercase text-zinc-300 pt-0.5">
                        <span className="bg-black/60 border border-white/10 px-2 py-0.5 rounded">🌳 Alta Densidad Verde</span>
                        <span className="bg-black/60 border border-white/10 px-2 py-0.5 rounded">📶 Fibra Activa</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* FLOATING CAPSULE NAVIGATION BAR matching exactly Screenshots */}
              <div className="absolute bottom-4 left-3.5 right-3.5 bg-white/70 backdrop-blur-md border border-zinc-200/50 rounded-full py-1.5 px-3 flex justify-between items-center shadow-lg z-50 select-none">
                {[
                  { id: 'inicio', label: 'Inicio', icon: '🏠' },
                  { id: 'buscar', label: 'Buscar', icon: '🔍' },
                  { id: 'match', label: 'Match', icon: '❤️' },
                  { id: 'mapa', label: 'Mapa', icon: '🗺️' },
                  { id: 'vibe', label: 'Vibe', icon: '🔥' }
                ].map((tabItem) => {
                  const isActive = activeScreen === tabItem.id;
                  return (
                    <button
                      key={tabItem.id}
                      onClick={() => navigateTo(tabItem.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-200 ${
                        isActive 
                          ? 'bg-white text-zinc-950 font-black shadow-md border border-zinc-150' 
                          : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      <span className="text-xs leading-none">{tabItem.icon}</span>
                      {isActive && <span className="text-[8px] font-black uppercase tracking-wider">{tabItem.label}</span>}
                    </button>
                  );
                })}
              </div>

              {/* Home Indicator bar */}
              <div className="h-4 bg-transparent flex items-center justify-center shrink-0 select-none pb-1 relative z-40">
                <div className="w-20 h-1 bg-zinc-400 rounded-full" />
              </div>

            </div>

          </div>

          {/* Floating Assistant bubble button inside mockup */}
          {activeScreen !== 'vibe' && (
            <button
              onClick={() => {
                setComplianceLog([
                  'Iniciando auditoría de compliance de la propiedad 14812 Landmark Dr...',
                  'Contrato de Compra-Venta: VALIDADO ✓',
                  'Prueba de Fondos: VALIDADO ✓'
                ]);
                setDocStatus('pending');
                setShowCompliancePopup(true);
              }}
              className="absolute bottom-12 right-[calc(50%-120px)] h-9 w-9 rounded-full bg-[#E31E24] hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer z-50 animate-bounce"
              title="Abrir Auditoría de Compliance"
            >
              <Bot size={16} />
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
