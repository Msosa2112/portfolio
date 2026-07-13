import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, DollarSign, Calculator, ChevronUp, ChevronDown } from "lucide-react";

const PROPERTIES = [
  { id: 1, title: "Condominio en Louisville", price: 340000, lat: 25, lng: 30, sqft: 1420, beds: 3 },
  { id: 2, title: "Residencia en Highlands", price: 650000, lat: 60, lng: 45, sqft: 2800, beds: 4 },
  { id: 3, title: "Villa Familiar en Dixie", price: 210000, lat: 40, lng: 70, sqft: 1100, beds: 2 }
];

export default function ZHomesSandbox() {
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0]);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  
  const [homePrice, setHomePrice] = useState(selectedProperty.price);
  const [interestRate, setInterestRate] = useState(6.5);
  const [downPaymentPct, setDownPaymentPct] = useState(20);

  useEffect(() => {
    setHomePrice(selectedProperty.price);
  }, [selectedProperty]);

  const downPaymentVal = (homePrice * downPaymentPct) / 100;
  const loanAmount = homePrice - downPaymentVal;
  const monthlyRate = interestRate / 12 / 100;
  const numberOfPayments = 30 * 12;

  const monthlyPayment = 
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-zinc-300 font-sans">
      
      {/* Left side description */}
      <div className="md:w-1/3 flex flex-col justify-between py-1 space-y-4">
        <div className="space-y-2">
          <h4 className="text-white font-extrabold uppercase tracking-wider text-xs text-cyan-400">Simulador de Transacciones (ZHomes)</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Esta demostración simula el módulo móvil de simulación hipotecaria y mapa interactivo. Ayuda a que los clientes simulen opciones de pago en tiempo real y califiquen para conectarse al instante con asesores.
          </p>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-xl space-y-2">
          <span className="text-[8.5px] font-black text-zinc-500 uppercase tracking-widest block">Beneficio de Negocio</span>
          <p className="text-[10px] text-zinc-300 leading-normal font-medium">
            Permite capturar leads altamente calificados con presupuestos realistas, eliminando el desperdicio de tiempo en llamadas frías.
          </p>
        </div>
      </div>

      {/* Right side Phone simulator */}
      <div className="flex-1 flex justify-center py-2">
        <div className="w-[280px] h-[420px] bg-zinc-900 rounded-[32px] border-[5px] border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col">
          
          {/* Simulated Map Viewport */}
          <div className="flex-1 bg-zinc-950 relative overflow-hidden">
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 opacity-20 pointer-events-none">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-zinc-700" />
              ))}
            </div>

            {/* Pins */}
            {PROPERTIES.map((p) => {
              const isSelected = p.id === selectedProperty.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProperty(p);
                    setIsSheetOpen(true);
                  }}
                  style={{ top: `${p.lat}%`, left: `${p.lng}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
                >
                  <div className={`px-2 py-0.5 rounded-full text-[8px] font-black font-sans border shadow-md transition-all ${
                    isSelected 
                      ? "bg-cyan-500 text-black border-cyan-400 font-bold scale-110" 
                      : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500"
                  }`}>
                    ${(p.price / 1000).toFixed(0)}k
                  </div>
                  <MapPin size={12} className={isSelected ? "text-cyan-400" : "text-zinc-500"} />
                </button>
              );
            })}

            {/* Instruction overlay */}
            <div className="absolute top-4 left-3 right-3 bg-zinc-900/90 border border-zinc-800 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-lg z-30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[7.5px] font-sans font-black text-zinc-400 uppercase tracking-widest">Toca un pin en el mapa</span>
            </div>
          </div>

          {/* Bottom sheet */}
          <motion.div
            animate={{ y: isSheetOpen ? 0 : 220 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="absolute bottom-0 left-0 right-0 bg-zinc-900/95 border-t border-zinc-800 rounded-t-2xl z-40 flex flex-col h-[270px] shadow-2xl px-3 py-2.5"
          >
            <div 
              onClick={() => setIsSheetOpen(!isSheetOpen)}
              className="w-full flex flex-col items-center cursor-pointer shrink-0 pb-1.5"
            >
              <div className="w-8 h-0.5 bg-zinc-750 rounded-full mb-1" />
              <div className="flex items-center justify-between w-full text-[8.5px] font-black tracking-widest text-zinc-500 uppercase">
                <span>Calculadora Hipotecaria</span>
                {isSheetOpen ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pb-3 scrollbar-none font-sans">
              <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/80">
                <h4 className="text-[9.5px] font-black text-white uppercase tracking-wider">{selectedProperty.title}</h4>
                <div className="flex items-center gap-2 text-[8px] text-zinc-400 font-medium mt-0.5">
                  <span>🛏️ {selectedProperty.beds} Hab</span>
                  <span>📐 {selectedProperty.sqft} Sq Ft</span>
                  <span className="text-cyan-400 font-black ml-auto">${selectedProperty.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Home Price Slider */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[8px] text-zinc-400">
                  <span>Precio de Compra</span>
                  <span className="font-bold text-white">${homePrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={150000} 
                  max={1000000} 
                  step={10000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Down Payment Slider */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[8px] text-zinc-400">
                  <span>Enganche ({downPaymentPct}%)</span>
                  <span className="font-bold text-white">${downPaymentVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <input 
                  type="range" 
                  min={5} 
                  max={30} 
                  step={1}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Result display */}
              <div className="bg-cyan-950/10 border border-cyan-500/20 p-2 rounded-lg flex items-center justify-between text-center">
                <div className="text-left">
                  <span className="text-[7.5px] font-black text-cyan-400 uppercase tracking-widest block">Pago Mensual Estimado</span>
                  <span className="text-xs font-black text-white font-mono">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mes</span>
                </div>
                <Calculator size={14} className="text-cyan-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
