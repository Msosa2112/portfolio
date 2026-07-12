import React, { useState, useEffect } from 'react';
import { Send, Smartphone, MessageSquareCode } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'estimate',
    label: 'Presupuesto Listo',
    text: 'Hola {Cliente}, tu cotización de {Detalle} para la instalación de {Servicio} está lista. Revisa los detalles aquí: https://barbaprosystem.com/prop/1'
  },
  {
    id: 'signed',
    label: 'Contrato Recibido',
    text: '¡Gracias {Cliente}! Hemos recibido tu firma digital para el proyecto de {Servicio}. Comenzaremos la preparación y te notificaremos la fecha de inicio.'
  },
  {
    id: 'start',
    label: 'Recordatorio de Obra',
    text: 'Hola {Cliente}, te recordamos que el equipo de Barba Construction iniciará los trabajos de {Servicio} mañana a las 8:00 AM. Cualquier duda escríbenos.'
  }
];

export default function TwilioSandbox() {
  const [selectedTemplate, setSelectedTemplate] = useState('estimate');
  const [clientName, setClientName] = useState('John Doe');
  const [amount, setAmount] = useState('$4,500');
  const [service, setService] = useState('Canales');
  const [message, setMessage] = useState('');
  
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Compile template text
  useEffect(() => {
    const template = TEMPLATES.find(t => t.id === selectedTemplate);
    if (template) {
      let compiledText = template.text
        .replace('{Cliente}', clientName)
        .replace('{Detalle}', amount)
        .replace('{Servicio}', service);
      setMessage(compiledText);
    }
  }, [selectedTemplate, clientName, amount, service]);

  const handleSendSMS = () => {
    if (isSending) return;
    setIsSending(true);
    setIsSent(false);
    setShowNotification(false);

    // Simulate API call to Twilio Gateway
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Ring/Show iPhone notification after a brief delay
      setTimeout(() => {
        setShowNotification(true);
      }, 500);

      // Reset button state after a few seconds
      setTimeout(() => {
        setIsSent(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch text-zinc-300">
      <style>{`
        @keyframes ios-slide-down {
          0% {
            transform: translate(-50%, -100%) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }
        .ios-notification {
          animation: ios-slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Left: Configuration Form */}
      <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-zinc-200">Simulador de Notificaciones Automáticas</h4>
            <p className="text-[11px] text-zinc-400">Automatización de comunicación bidireccional mediante la API de Twilio.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Plantilla de Mensaje</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Nombre Cliente</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Monto / Detalle</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Servicio Contratado</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option value="Canales">Canales de Aluminio</option>
              <option value="Techo Completo">Techado de Shingle</option>
              <option value="Fachada Siding">Siding de Vinilo</option>
              <option value="Ventanas">Instalación de Ventanas</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Cuerpo del Mensaje (Compilado)</label>
            <textarea
              readOnly
              value={message}
              rows={4}
              className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-400 focus:outline-none resize-none font-mono leading-relaxed"
            />
          </div>
        </div>

        <button
          onClick={handleSendSMS}
          disabled={isSending}
          className={`w-full py-3.5 rounded-xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            isSent
              ? 'bg-emerald-600 text-white'
              : 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/10'
          }`}
        >
          <Send size={14} />
          <span>
            {isSending ? 'Conectando con Twilio Gateway...' : isSent ? '¡Mensaje Enviado!' : 'Enviar SMS de Prueba'}
          </span>
        </button>
      </div>

      {/* Right: Phone Simulator */}
      <div className="w-full lg:w-[320px] flex items-center justify-center shrink-0">
        {/* iPhone Wrapper */}
        <div className="relative w-64 h-[480px] bg-zinc-900 border-[8px] border-zinc-800 rounded-[36px] shadow-2xl overflow-hidden select-none">
          {/* Bezel Ring */}
          <div className="absolute inset-0 border border-zinc-950 rounded-[28px] pointer-events-none z-30" />
          
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40 flex items-center justify-center" />

          {/* iOS Notification Banner */}
          {showNotification && (
            <div className="ios-notification absolute top-8 left-1/2 w-[90%] bg-black/85 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-white z-50 flex gap-2 shadow-lg">
              <div className="h-6 w-6 rounded bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-[10px] font-black tracking-tight flex-none">
                BP
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-bold text-zinc-100">Barba CRM</span>
                  <span className="text-[9px] text-zinc-500 font-medium">ahora</span>
                </div>
                <p className="text-[10px] text-zinc-300 font-medium leading-relaxed mt-0.5 max-h-16 overflow-hidden text-ellipsis line-clamp-3">
                  {message}
                </p>
              </div>
            </div>
          )}

          {/* Screen Content */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center flex flex-col justify-between p-4 pt-10 pb-5 z-10"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop")',
            }}
          >
            {/* Lock Screen Time */}
            <div className="flex flex-col items-center justify-center text-white/90">
              <span className="text-[10px] font-bold tracking-widest uppercase">Domingo, 12 de Julio</span>
              <span className="text-4xl font-extralight tracking-tighter mt-1">4:20</span>
            </div>

            {/* Bottom Unlock Prompt */}
            <div className="flex flex-col items-center gap-1.5 text-white/70">
              <div className="h-1 w-20 bg-white/50 rounded-full" />
              <span className="text-[8px] font-black tracking-widest uppercase">Deslizar para desbloquear</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
