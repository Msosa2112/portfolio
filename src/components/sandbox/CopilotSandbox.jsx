import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, Database, Check } from 'lucide-react';

const INITIAL_PRICES = [
  { id: 'p1', name: 'Tejas Composite (SQ)', category: 'Techos', price: 380.00, lastUpdated: 'Hace 3 días' },
  { id: 'p2', name: 'Metal Standing Seam (SQ)', category: 'Techos', price: 650.00, lastUpdated: 'Hace 3 días' },
  { id: 'p3', name: 'Canal 5" K-Style (PL)', category: 'Canales', price: 12.50, lastUpdated: 'Hace 2 semanas' },
  { id: 'p4', name: 'Canal 6" Half-Round (PL)', category: 'Canales', price: 15.00, lastUpdated: 'Hace 2 semanas' },
  { id: 'p5', name: 'Siding de Vinilo (Sq Ft)', category: 'Siding', price: 6.50, lastUpdated: 'Ayer' },
  { id: 'p6', name: 'James Hardie Plank (Sq Ft)', category: 'Siding', price: 12.00, lastUpdated: 'Hace 1 mes' },
  { id: 'p7', name: 'Ventana Double Hung (Ud)', category: 'Ventanas', price: 450.00, lastUpdated: 'Hace 1 mes' },
];

export default function CopilotSandbox() {
  const [prices, setPrices] = useState(INITIAL_PRICES);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hola Lázaro, soy tu Copiloto de Inteligencia Artificial. Puedo ajustar precios de materiales en el catálogo, consultar el estado de las obras o sincronizar datos en lenguaje natural. ¿En qué te ayudo hoy?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('teja') && (lower.includes('sube') || lower.includes('actualiza') || lower.includes('pon'))) {
        // Match numbers
        const numMatch = lower.match(/\$?(\d+)/);
        const newPrice = numMatch ? parseFloat(numMatch[1]) : 400;
        
        setPrices(prev => prev.map(p => {
          if (p.id === 'p1') {
            return { ...p, price: newPrice, lastUpdated: 'Ahora (Vía IA)' };
          }
          return p;
        }));
        
        setHighlightedRow('p1');
        replyText = `¡Listo Lázaro! He actualizado el precio de **Tejas Composite** a **$${newPrice.toFixed(2)} / SQ** en el catálogo del sistema y he enviado la actualización de inventario a QuickBooks Online.`;
        
        setTimeout(() => setHighlightedRow(null), 3000);

      } else if (lower.includes('canal') && (lower.includes('sube') || lower.includes('actualiza') || lower.includes('pon'))) {
        const numMatch = lower.match(/\$?(\d+(\.\d+)?)/);
        const newPrice = numMatch ? parseFloat(numMatch[1]) : 14.50;

        setPrices(prev => prev.map(p => {
          if (p.id === 'p3') {
            return { ...p, price: newPrice, lastUpdated: 'Ahora (Vía IA)' };
          }
          return p;
        }));

        setHighlightedRow('p3');
        replyText = `Entendido. El precio de **Canal 5" K-Style** se ha actualizado a **$${newPrice.toFixed(2)} por Pie Lineal** en la base de datos de Barba Construction y QBO.`;

        setTimeout(() => setHighlightedRow(null), 3000);

      } else if (lower.includes('john') || lower.includes('5846') || lower.includes('proyecto')) {
        replyText = `Consultando el sistema logístico... El proyecto **PRJ-5846** de **John Doe** (Roofing & Gutters) en **1234 Street** está en estado **Aprobado**. La Orden de Compra (PO) de materiales fue despachada con éxito a **ABC Supply Co.** y el envío está programado para la dirección de la obra.`;
      } else if (lower.includes('payroll') || lower.includes('nómina') || lower.includes('nomina')) {
        replyText = `El presupuesto total de Payroll para la semana en curso (Sábado a Viernes) es de **$3,580.00** dividido entre 4 trabajadores. El estado de la nómina es: **Pendiente de Cierre (Viernes)**.`;
      } else {
        replyText = `Recibido Lázaro. He procesado tu instrucción sobre el sistema de Barba Construction. ¿Deseas que revise el catálogo de QuickBooks o actualice las órdenes de compra asociadas?`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (prompt) => {
    handleSend(prompt);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch text-[var(--text-secondary)] select-none">
      
      {/* Left Chatbot Pane */}
      <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg h-[460px]">
        
        {/* Header */}
        <div className="p-4 bg-black/15 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-[var(--accent)] animate-pulse" />
            <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">Copiloto AI de Control</h4>
          </div>
          <span className="text-[9px] bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20 px-2 py-0.5 rounded font-black tracking-wider uppercase">
            Online
          </span>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-none">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {msg.sender === 'bot' && (
                <div className="h-7 w-7 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Bot size={14} />
                </div>
              )}
              <div className={`p-3 rounded-2xl leading-relaxed font-medium ${
                msg.sender === 'user' 
                  ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] rounded-tr-none' 
                  : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border border-[var(--border)] rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="h-7 w-7 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-[var(--bg-input)] border border-[var(--border)] p-3 rounded-2xl rounded-tl-none text-[var(--text-muted)] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 border-t border-[var(--border)] bg-black/5 flex gap-2 overflow-x-auto scrollbar-none">
          <button 
            type="button"
            onClick={() => handleSuggestionClick('Sube el precio de tejas Composite a $400')}
            className="px-2.5 py-1.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[9px] font-black uppercase text-[var(--text-primary)] hover:border-[var(--accent)]/30 transition-all shrink-0"
          >
            Actualizar Tejas a $400
          </button>
          <button 
            type="button"
            onClick={() => handleSuggestionClick('Pon Canales K-Style a $14.50')}
            className="px-2.5 py-1.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[9px] font-black uppercase text-[var(--text-primary)] hover:border-[var(--accent)]/30 transition-all shrink-0"
          >
            Subir Canales a $14.50
          </button>
          <button 
            type="button"
            onClick={() => handleSuggestionClick('¿Cuál es el estado de John Doe (PRJ-5846)?')}
            className="px-2.5 py-1.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[9px] font-black uppercase text-[var(--text-primary)] hover:border-[var(--accent)]/30 transition-all shrink-0"
          >
            Estado John Doe
          </button>
        </div>

        {/* Chat Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
          className="p-3 bg-[#0d1321] border-t border-[var(--border)] flex gap-2 items-center"
        >
          <input
            type="text"
            placeholder="Pídele al asistente (ej. Sube tejas a $400 o consulta sobre John Doe...)"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isTyping}
            className="crm-input flex-1 bg-[var(--bg-input)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none placeholder-zinc-500"
          />
          <button
            type="submit"
            disabled={isTyping || !chatInput.trim()}
            className="crm-btn-accent p-2.5 bg-[var(--accent)] text-black rounded-xl hover:bg-[var(--accent-hover)] transition-all active:scale-95 disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </form>

      </div>

      {/* Right Pricing Database Pane */}
      <div className="w-full lg:w-[350px] bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl flex flex-col overflow-hidden shadow-lg h-[460px]">
        
        {/* Header */}
        <div className="p-4 bg-black/15 border-b border-[var(--border)] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-emerald-400" />
            <h4 className="text-xs font-black tracking-widest uppercase text-[var(--text-primary)]">Catálogo de Materiales</h4>
          </div>
          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black tracking-wider uppercase flex items-center gap-1">
            <Check size={8} /> QBO SYNC
          </span>
        </div>

        {/* Pricing List Table */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--border)] bg-black/10 text-[var(--text-muted)] text-[9px] font-black uppercase tracking-wider">
                <th className="py-2.5 px-4">Material</th>
                <th className="py-2.5 px-4 text-right">Precio Std</th>
                <th className="py-2.5 px-4 text-right">Actualización</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
              {prices.map((item) => {
                const isHighlighted = highlightedRow === item.id;
                return (
                  <tr 
                    key={item.id}
                    className={`transition-all duration-500 ${
                      isHighlighted 
                        ? 'bg-[var(--accent-soft)] border-l-2 border-l-[var(--accent)] font-bold text-white' 
                        : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[var(--text-primary)]">{item.name}</p>
                      <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{item.category}</span>
                    </td>
                    <td className={`py-3.5 px-4 text-right font-mono transition-colors duration-500 ${
                      isHighlighted ? 'text-[var(--accent)] text-sm font-black' : 'text-[var(--text-primary)]'
                    }`}>
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-[10px] text-[var(--text-muted)] font-medium">
                      {item.lastUpdated}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <div className="p-3 bg-black/15 border-t border-[var(--border)] text-[10px] text-center text-[var(--text-muted)] font-medium">
          Cualquier cambio se sincroniza instantáneamente vía Webhooks.
        </div>

      </div>

    </div>
  );
}
