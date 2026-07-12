import React, { useState } from 'react';
import { Play } from 'lucide-react';

const INITIAL_PROJECTS = [
  { id: '1', title: 'Martínez Gutter Work', category: 'Canales', status: 'nuevo' },
  { id: '2', title: 'Sánchez Roofing Estimate', category: 'Techos', status: 'cita' },
  { id: '3', title: 'Wilson Siding Renovation', category: 'Siding', status: 'contactado' },
  { id: '4', title: 'Gómez Window Replacement', category: 'Ventanas', status: 'nuevo' },
];

const COLUMNS = [
  { id: 'nuevo', label: 'Lead' },
  { id: 'contactado', label: 'Contactado' },
  { id: 'cita', label: 'Cotizando' },
  { id: 'ganado', label: 'Completado' },
];

export default function KanbanSandbox() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [draggedId, setDraggedId] = useState(null);
  const [confettiParticles, setConfettiParticles] = useState([]);

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const triggerConfetti = () => {
    const particles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: `${(Math.random() - 0.5) * 300}px`,
      y: `${-Math.random() * 200 - 50}px`,
      color: ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#EC4899'][i % 6],
      size: `${Math.random() * 8 + 5}px`,
      delay: `${Math.random() * 0.2}s`,
      r: `${Math.random() * 720}deg`,
    }));
    setConfettiParticles(particles);
    setTimeout(() => setConfettiParticles([]), 1500);
  };

  const handleDrop = (columnId) => {
    if (!draggedId) return;
    
    // Check if moving to "completado" (ganado)
    if (columnId === 'ganado') {
      const currentProj = projects.find(p => p.id === draggedId);
      if (currentProj && currentProj.status !== 'ganado') {
        triggerConfetti();
      }
    }

    setProjects(
      projects.map((p) => (p.id === draggedId ? { ...p, status: columnId } : p))
    );
    setDraggedId(null);
  };

  return (
    <div className="space-y-6 text-zinc-300 relative select-none">
      {/* CSS Confetti Overlay */}
      {confettiParticles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
          <style>{`
            @keyframes confetti-fall {
              0% {
                transform: translate(0, 0) scale(1) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translate(var(--cx), var(--cy)) scale(0.5) rotate(var(--cr));
                opacity: 0;
              }
            }
            .confetti-piece {
              position: absolute;
              animation: confetti-fall 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
            }
          `}</style>
          {confettiParticles.map((p) => (
            <div
              key={p.id}
              className="confetti-piece rounded-sm"
              style={{
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                '--cx': p.x,
                '--cy': p.y,
                '--cr': p.r,
              }}
            />
          ))}
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold text-zinc-100">Control de Obras</h3>
        <p className="text-xs text-zinc-400">Arrastra y suelta las tarjetas para actualizar el estado del proyecto.</p>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colProjects = projects.filter((p) => p.status === col.id);
          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
              className="flex flex-col bg-zinc-900/30 border border-white/5 rounded-2xl p-4 min-h-[300px] transition-all hover:bg-zinc-900/40"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black tracking-widest uppercase text-zinc-400">{col.label}</span>
                <span className="text-[10px] font-black bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                  {colProjects.length}
                </span>
              </div>

              {/* Column Body */}
              <div className="flex-1 flex flex-col gap-3">
                {colProjects.map((p) => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => handleDragStart(p.id)}
                    className="bg-zinc-950/60 border border-white/5 p-4 rounded-xl cursor-grab active:cursor-grabbing hover:border-white/20 transition-all select-none shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-black bg-violet-600/10 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded-md">
                        {p.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-zinc-100">{p.title}</h4>
                  </div>
                ))}
                {colProjects.length === 0 && (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl py-8 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                    Vacio
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
