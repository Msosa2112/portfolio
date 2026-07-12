import React, { useState, useEffect } from 'react';
import { 
  X, Map, Sparkles, Mail, Bot, CheckCircle, AlertCircle, 
  Upload, Send, ChevronRight, Calendar, Info, RefreshCw, 
  Home, Building, MapPin, Maximize, Flame, Lock, Eye, Menu, Search
} from 'lucide-react';

export default function ZHomesSandboxModal({ isOpen, onClose }) {
  const [activeScreen, setActiveScreen] = useState('inicio'); // inicio, buscar, match, mapa, vibe
  const [iframeUrl, setIframeUrl] = useState('https://zhomesapp.com/');
  const [showCompliancePopup, setShowCompliancePopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [docStatus, setDocStatus] = useState('pending'); // pending, scanning, approved
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [complianceLog, setComplianceLog] = useState([
    'Iniciando auditoría de compliance para 14812 Landmark Dr...',
    'Contrato de Compra-Venta: VALIDADO ✓',
    'Prueba de Fondos (POF): VALIDADO ✓'
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
    setShowMobileMenu(false);
    switch (screen) {
      case 'inicio':
        setIframeUrl('https://zhomesapp.com/');
        break;
      case 'buscar':
        setIframeUrl('https://zhomesapp.com/propiedades');
        break;
      case 'match':
        setIframeUrl('https://zhomesapp.com/swipe');
        break;
      case 'mapa':
        setIframeUrl('https://zhomesapp.com/mapa');
        break;
      case 'vibe':
        setIframeUrl('https://zhomesapp.com/vibe');
        break;
      default:
        setIframeUrl('https://zhomesapp.com/');
    }
  };

  const triggerNotification = (text) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2500);
  };

  const handleUpload = () => {
    if (docStatus === 'approved' || uploadingDoc) return;
    setUploadingDoc(true);
    setComplianceLog(prev => [...prev, 'Cargando Reporte de Inspección PDF...']);
    setTimeout(() => {
      setDocStatus('scanning');
      setComplianceLog(prev => [...prev, 'Analizando cláusulas estructurales con Vision AI...']);
      setTimeout(() => {
        setDocStatus('approved');
        setUploadingDoc(false);
        setComplianceLog(prev => [
          ...prev,
          '✓ Reporte de Inspección: APROBADO por IA.',
          '¡COMPLIANCE DE LA TRANSACCIÓN COMPLETADO!'
        ]);
        triggerNotification('¡Compliance Aprobado e Inyectado!');
      }, 1500);
    }, 1000);
  };

  const getScreenDescription = () => {
    switch (activeScreen) {
      case 'inicio':
        return {
          title: 'Portada / Inicio de ZHomes',
          desc: 'La página de inicio de la aplicación ZHomes cargada en tiempo real. Contiene la cabecera, buscador, listados recomendados y accesos directos al cotizador y agentes.',
          highlight: 'El teléfono embebe la aplicación web de producción directa de ZHomes. Puedes interactuar con ella libremente.'
        };
      case 'buscar':
        return {
          title: 'Buscador & Lista de Propiedades',
          desc: 'Listado público de propiedades IDX de Louisville, KY. Muestra listados actualizados con insignias sobrepuestas calculadas mediante inteligencia artificial.',
          highlight: 'Puedes deslizar, usar los filtros superiores de cuartos o baños, o cambiar al modo mapa.'
        };
      case 'match':
        return {
          title: 'ZHomes Match (Tinder-Style)',
          desc: 'Portal interactivo de emparejamiento. Desliza hacia la derecha si te gusta la propiedad, o a la izquierda si prefieres descartarla.',
          highlight: 'Prueba la interacción nativa del swipe o usa los botones de cruz y corazón.'
        };
      case 'mapa':
        return {
          title: 'Mapa de Calor (MapLibre)',
          desc: 'Sección del mapa en tiempo real de ZHomes. Agrupa propiedades en clusters rojos de densidad térmica para una visualización más cómoda desde el móvil.',
          highlight: 'Puedes deslizar el mapa para explorar las ubicaciones o hacer clic en los marcadores.'
        };
      case 'vibe':
        return {
          title: 'Vibe Feed IA de Vecindario',
          desc: 'Feed de videos cortos estilo TikTok/Reels que describe las cualidades y estadísticas de estilo de vida del vecindario en lenguaje natural.',
          highlight: 'Prueba a pausar/reproducir o a interactuar con los botones de la esquina derecha.'
        };
      default:
        return { title: '', desc: '', highlight: '' };
    }
  };

  const screenInfo = getScreenDescription();

  // Shared Left panel markup (used in desktop sidebar and mobile drawer)
  const renderExplainerPanel = (isMobileView = false) => (
    <div className="flex flex-col justify-between h-full select-none">
      <div className="space-y-6">
        {/* Header logo */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center text-[#E31E24] font-extrabold text-sm">
              ZH
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white tracking-wider">ZHOMES TC</h3>
              <p className="text-[9px] text-[#E31E24] uppercase tracking-widest font-black">Transaction Portal</p>
            </div>
          </div>
          {isMobileView && (
            <button 
              onClick={() => setShowMobileMenu(false)} 
              className="h-8 w-8 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-800"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Screen info */}
        <div className="space-y-3.5">
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

      {/* Quick Screen Switcher Menu */}
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

        {!isMobileView && (
          <button
            onClick={onClose}
            className="w-full mt-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-white font-bold rounded-xl text-[10px] uppercase border border-zinc-800 transition-all active:scale-95 text-center shadow-lg"
          >
            Cerrar Simulador
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md font-sans"
      data-lenis-prevent
      onClick={(e) => e.stopPropagation()}
    >
      
      {/* Liquid Glass Shell Container wrapped in red theme */}
      <div className="relative w-full h-full md:max-w-5xl md:h-[92vh] bg-[#0b0c10] md:rounded-3xl border border-red-500/10 shadow-2xl flex flex-col md:flex-row overflow-hidden text-zinc-300">
        
        {/* Glow effect */}
        <div className="absolute -top-[10%] -left-[10%] w-[35%] h-[35%] rounded-full bg-[#E31E24]/5 blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[35%] h-[35%] rounded-full bg-red-600/5 blur-[90px] pointer-events-none" />

        {/* Mobile Explainer Drawer/Menu overlay */}
        {showMobileMenu && (
          <div 
            className="md:hidden fixed inset-0 bg-black/85 backdrop-blur-sm z-[160] flex animate-in fade-in duration-200"
            onClick={() => setShowMobileMenu(false)}
          >
            <div 
              className="w-[290px] bg-[#08090d] border-r border-zinc-900 p-6 h-full overflow-y-auto animate-in slide-in-from-left duration-250"
              onClick={(e) => e.stopPropagation()}
            >
              {renderExplainerPanel(true)}
            </div>
          </div>
        )}

        {/* Desktop Explainer Panel */}
        <div 
          className="w-full md:w-[380px] border-b md:border-b-0 md:border-r border-zinc-900 bg-[#08090d] p-6 hidden md:flex flex-col justify-between shrink-0 overflow-y-auto"
          data-lenis-prevent
        >
          {renderExplainerPanel(false)}
        </div>

        {/* Center/Right Phone Simulator Viewport */}
        <div 
          className="flex-1 flex items-center justify-center p-0 md:p-6 bg-[#06070a] relative overflow-hidden h-full w-full"
          data-lenis-prevent
        >
          
          {/* Mobile Top Header (floating controls visible only on mobile viewports) */}
          <div className="md:hidden absolute top-4 left-4 right-4 flex justify-between items-center z-50 pointer-events-none">
            <button 
              onClick={() => setShowMobileMenu(true)} 
              className="h-10 w-10 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-lg pointer-events-auto active:scale-95 transition-all"
            >
              <Menu size={18} />
            </button>
            <button 
              onClick={onClose} 
              className="h-10 w-10 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-lg pointer-events-auto active:scale-95 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Notifications Banner inside simulator */}
          {showNotification && (
            <div className="absolute top-16 md:top-6 left-1/2 -translate-x-1/2 bg-[#141414] border border-red-500/30 text-[#E31E24] text-[10px] font-black tracking-wider uppercase px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 z-[200] animate-in slide-in-from-top-4 duration-300">
              <CheckCircle size={12} />
              <span>{notificationText}</span>
            </div>
          )}

          {/* Compliance deal room modal overlay popup inside simulator */}
          {showCompliancePopup && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-[#141414] border border-zinc-800 rounded-3xl w-[260px] p-4 space-y-3.5 text-left text-zinc-300 shadow-2xl">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <span className="font-black text-[9px] uppercase tracking-wider text-[#E31E24]">Compliance Deal Room</span>
                  <button 
                    onClick={() => setShowCompliancePopup(false)} 
                    className="text-zinc-500 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>

                <div className="space-y-1.5 text-[8.2px] bg-black/50 p-2.5 rounded-xl border border-zinc-900 font-mono text-zinc-400">
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

          {/* iPhone 17 Pro Max Simulator - Responsive layout */}
          {/* On mobile: shell style border-0, p-0, h-full, w-full, rounded-none */}
          {/* On desktop: w-[370px], h-[790px], borders, notch, shadow */}
          <div className="relative w-full h-full md:w-[370px] md:h-[790px] md:max-h-[85vh] bg-transparent md:bg-[#121215] md:rounded-[56px] p-0 md:p-3 md:shadow-2xl md:border-[12px] md:border-[#2d2e32] md:ring-2 md:ring-zinc-800 flex flex-col overflow-hidden shrink-0 transition-all select-none">
            
            {/* Volume Buttons (Visible only on desktop viewports) */}
            <div className="hidden md:block absolute left-[-15px] top-[110px] w-[3px] h-[35px] bg-[#3a3b3f] rounded-l-md" />
            <div className="hidden md:block absolute left-[-15px] top-[165px] w-[3px] h-[55px] bg-[#3a3b3f] rounded-l-md" />
            <div className="hidden md:block absolute left-[-15px] top-[230px] w-[3px] h-[55px] bg-[#3a3b3f] rounded-l-md" />
            
            {/* Power Button (Visible only on desktop viewports) */}
            <div className="hidden md:block absolute right-[-15px] top-[185px] w-[3px] h-[70px] bg-[#3a3b3f] rounded-r-md" />

            {/* Speaker Earphone (Visible only on desktop viewports) */}
            <div className="hidden md:block absolute top-[8px] left-1/2 -translate-x-1/2 w-16 h-1 bg-[#252528] rounded-full z-50" />

            {/* Screen Inner Viewport (Matches iPhone 17 Pro Max 19.6:9 aspect on desktop, stretches on mobile) */}
            <div 
              className="flex-1 bg-white rounded-none md:rounded-[44px] overflow-hidden flex flex-col relative"
              data-lenis-prevent
            >
              
              {/* Dynamic Island (Pill Notch - Visible only on desktop viewports) */}
              <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 items-center justify-between px-3.5 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-indigo-950/80" />
                </div>
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Status bar (Visible only on desktop viewports) */}
              <div className="hidden md:flex h-10 pt-4 px-8 justify-between items-center text-[9px] text-black font-bold tracking-wider bg-white select-none z-40 shrink-0">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <div className="w-4.5 h-2 border border-black rounded-sm p-0.5 flex items-center justify-start">
                    <div className="w-3 h-1 bg-black rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Live Web Application embedded via iframe */}
              <div className="flex-1 overflow-hidden relative bg-white">
                <iframe
                  src={iframeUrl}
                  className="w-full h-full border-none"
                  title="ZHomes Live App"
                  allow="geolocation"
                />
              </div>

              {/* iOS Home Indicator bar (Visible only on desktop viewports) */}
              <div className="hidden md:flex h-5 bg-white items-center justify-center shrink-0 select-none pb-2 relative z-40">
                <div className="w-24 h-1 bg-zinc-355 rounded-full" />
              </div>

            </div>

          </div>

          {/* Floating Assistant bubble button inside mockup */}
          <button
            onClick={() => {
              setComplianceLog([
                'Iniciando auditoría de compliance para 14812 Landmark Dr...',
                'Contrato de Compra-Venta: VALIDADO ✓',
                'Prueba de Fondos (POF): VALIDADO ✓'
              ]);
              setDocStatus('pending');
              setShowCompliancePopup(true);
            }}
            className="absolute bottom-6 md:bottom-16 right-4 md:right-[calc(50%-150px)] h-11 w-11 md:h-10 md:w-10 rounded-full bg-[#E31E24] hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer z-[130] animate-bounce"
            title="Abrir Auditoría de Compliance"
          >
            <Bot size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}
