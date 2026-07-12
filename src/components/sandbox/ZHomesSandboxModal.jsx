import React, { useState, useEffect } from 'react';
import { 
  X, Map, Sparkles, Mail, Bot, CheckCircle, AlertCircle, 
  Upload, Send, ChevronRight, Calendar, Info, RefreshCw, 
  Home, Building, MapPin, Maximize, Flame, Lock, Eye, Menu,
  Heart, Share2, Phone, Play, Pause, Search, User, ShieldAlert
} from 'lucide-react';

export default function ZHomesSandboxModal({ isOpen, onClose }) {
  const [activeScreen, setActiveScreen] = useState('inicio'); // inicio, buscar, match, mapa, vibe
  const [showCompliancePopup, setShowCompliancePopup] = useState(false);
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
          title: 'Pantalla de Inicio (Landing)',
          desc: 'Esta es la pantalla de inicio real de la app móvil de ZHomes. Muestra el encabezado corporativo, la propiedad destacada de $1,570,000 en Landmark Dr, el buscador y las herramientas operativas.',
          highlight: 'Haz clic en el botón de "👤 Perfil" (arriba a la derecha) o en el banner de "ZHomes Match" para interactuar.'
        };
      case 'buscar':
        return {
          title: 'Buscador & Listado de Propiedades',
          desc: 'Resultados reales de búsqueda en Louisville. Presenta las tarjetas de propiedades con insignias automáticas de IA (Luz natural, Excelente ubicación) y métricas de precio/habitaciones.',
          highlight: 'Haz clic en el botón oscuro de "Ver Detalles >" en la tarjeta de propiedad para ingresar al Deal Room de Compliance.'
        };
      case 'match':
        return {
          title: 'ZHomes Match (Tinder-Style)',
          desc: 'Simulación del portal de emparejamiento interactivo de ZHomes. Los usuarios deslizan hacia la derecha o izquierda para clasificar sus casas preferidas de manera dinámica.',
          highlight: 'Prueba a hacer clic en los botones circulares inferiores de X (Descartar) o Corazón (Favoritos) para recibir retroalimentación.'
        };
      case 'mapa':
        return {
          title: 'Mapa de Calor de Propiedades',
          desc: 'Vista real de geolocalización de propiedades. Utiliza círculos de densidad rojos en lugar de pines individuales para facilitar la lectura del volumen de listados por zona.',
          highlight: 'Haz clic en la lista desplegable de propiedades de la parte inferior para ver más detalles.'
        };
      case 'vibe':
        return {
          title: 'Vibe Feed IA de Vecindario',
          desc: 'Sección de micro-videos verticales que detallan la vibra del vecindario, ruidos locales, parques y velocidad de internet móvil, traduciendo reportes aburridos a lenguaje visual.',
          highlight: 'Interactúa con los botones de acción del video en el margen derecho.'
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
          
          {/* Notifications Banner inside simulator */}
          {showNotification && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#141414] border border-red-500/30 text-[#E31E24] text-[10px] font-black tracking-wider uppercase px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 z-[200] animate-in slide-in-from-top-4 duration-300">
              <CheckCircle size={12} />
              <span>{notificationText}</span>
            </div>
          )}

          {/* Compliance deal room modal overlay popup inside simulator */}
          {showCompliancePopup && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200">
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
              
              {/* Actual screenshot rendering based on active screen */}
              <div className="absolute inset-0 z-10 w-full h-full overflow-hidden select-none bg-zinc-100">
                {activeScreen === 'inicio' && (
                  <div className="w-full h-full relative">
                    <img 
                      src="/assets/zhomes/home.png" 
                      alt="ZHomes Home Screen" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Invisible hitboxes over the screenshot for interactivity */}
                    {/* Perfil Button (Top Right) -> opens Compliance Room */}
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
                      className="absolute top-[4.5%] right-[5%] w-[25%] h-[5%] bg-transparent cursor-pointer outline-none focus:outline-none"
                    />

                    {/* ZHomes Match Banner (Middle) -> navigates to match */}
                    <button 
                      onClick={() => navigateTo('match')} 
                      className="absolute top-[52%] left-[5%] w-[90%] h-[11%] bg-transparent cursor-pointer outline-none focus:outline-none"
                    />

                    {/* Ver todas > (Bottom-Middle) -> navigates to search list */}
                    <button 
                      onClick={() => navigateTo('buscar')} 
                      className="absolute top-[80%] right-[5%] w-[25%] h-[4%] bg-transparent cursor-pointer outline-none focus:outline-none"
                    />
                  </div>
                )}

                {activeScreen === 'buscar' && (
                  <div className="w-full h-full relative">
                    <img 
                      src="/assets/zhomes/search.png" 
                      alt="ZHomes Search Screen" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Ver Detalles Button on properties card -> opens Compliance room */}
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
                      className="absolute top-[82%] left-[12%] w-[76%] h-[5.5%] bg-transparent cursor-pointer outline-none focus:outline-none animate-pulse"
                      style={{ border: '2px dashed rgba(227,30,36,0.3)', borderRadius: '12px' }}
                      title="Ver Detalles Compliance"
                    />

                    {/* Match button at top row -> navigates to match */}
                    <button 
                      onClick={() => navigateTo('match')} 
                      className="absolute top-[35%] right-[8%] w-[24%] h-[4.5%] bg-transparent cursor-pointer outline-none focus:outline-none"
                    />
                  </div>
                )}

                {activeScreen === 'match' && (
                  <div className="w-full h-full relative">
                    <img 
                      src="/assets/zhomes/match.png" 
                      alt="ZHomes Match Screen" 
                      className="w-full h-full object-cover"
                    />

                    {/* Tinder controls hitboxes */}
                    {/* Red X button */}
                    <button 
                      onClick={() => triggerNotification('Propiedad descartada')} 
                      className="absolute bottom-[16%] left-[17%] w-[16%] h-[8%] bg-transparent cursor-pointer outline-none"
                    />
                    
                    {/* Green Heart button */}
                    <button 
                      onClick={() => triggerNotification('¡Propiedad Guardada en Favoritos!')} 
                      className="absolute bottom-[16%] right-[17%] w-[16%] h-[8%] bg-transparent cursor-pointer outline-none"
                    />

                    {/* Back arrow button top-left */}
                    <button 
                      onClick={() => navigateTo('inicio')} 
                      className="absolute top-[9.5%] left-[6%] w-[10%] h-[4%] bg-transparent cursor-pointer outline-none"
                    />
                  </div>
                )}

                {activeScreen === 'mapa' && (
                  <div className="w-full h-full relative">
                    <img 
                      src="/assets/zhomes/map.png" 
                      alt="ZHomes Map Screen" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Bottom list panel -> goes to list view */}
                    <button 
                      onClick={() => navigateTo('buscar')} 
                      className="absolute bottom-[15%] left-[5%] w-[90%] h-[15%] bg-transparent cursor-pointer outline-none"
                    />
                  </div>
                )}

                {activeScreen === 'vibe' && (
                  <div className="w-full h-full relative">
                    <img 
                      src="/assets/zhomes/vibe.png" 
                      alt="ZHomes Vibe Feed Screen" 
                      className="w-full h-full object-cover"
                    />

                    {/* Vibe audio/play button */}
                    <button 
                      onClick={() => triggerNotification('Reproduciendo clip de vecindario...')} 
                      className="absolute bottom-[23%] right-[5%] w-[12%] h-[6%] bg-transparent cursor-pointer outline-none"
                    />
                  </div>
                )}

                {/* GLOBAL MOCK BOTTOM NAVIGATION BAR OVERLAY */}
                {/* We map this directly over the navigation bar in the screenshots to allow seamless switching */}
                <div className="absolute bottom-[6%] left-[5%] right-[5%] h-[7%] z-[120] flex justify-between bg-transparent pointer-events-auto">
                  <button 
                    onClick={() => navigateTo('inicio')} 
                    className="w-[18%] h-full bg-transparent hover:bg-black/5 rounded-full cursor-pointer outline-none transition-all" 
                  />
                  <button 
                    onClick={() => navigateTo('buscar')} 
                    className="w-[18%] h-full bg-transparent hover:bg-black/5 rounded-full cursor-pointer outline-none transition-all" 
                  />
                  <button 
                    onClick={() => navigateTo('match')} 
                    className="w-[18%] h-full bg-transparent hover:bg-black/5 rounded-full cursor-pointer outline-none transition-all" 
                  />
                  <button 
                    onClick={() => navigateTo('mapa')} 
                    className="w-[18%] h-full bg-transparent hover:bg-black/5 rounded-full cursor-pointer outline-none transition-all" 
                  />
                  <button 
                    onClick={() => navigateTo('vibe')} 
                    className="w-[18%] h-full bg-transparent hover:bg-black/5 rounded-full cursor-pointer outline-none transition-all" 
                  />
                </div>

              </div>

              {/* Home Indicator bar */}
              <div className="h-4 bg-transparent flex items-center justify-center shrink-0 select-none pb-1 relative z-40">
                <div className="w-20 h-1 bg-zinc-400 rounded-full" />
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
            className="absolute bottom-12 right-[calc(50%-120px)] h-9 w-9 rounded-full bg-[#E31E24] hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer z-[130] animate-bounce"
            title="Abrir Auditoría de Compliance"
          >
            <Bot size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}
