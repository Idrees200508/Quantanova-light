
import React, { useState, useEffect } from 'react';
import { 
  Box, Maximize, Map, Camera, Info, ArrowRight, 
  ChevronLeft, ChevronRight, Zap, Target, Crosshair,
  Cpu, Monitor, Microscope, FlaskConical, Layers, Home
} from 'lucide-react';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/Button';

const VirtualTour: React.FC = () => {
  const [activeZone, setActiveZone] = useState('entrance');
  const [isNavigating, setIsNavigating] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 17.5239, y: 78.3907 });

  const zones = [
    { id: 'entrance', title: 'Main Portal', icon: Home, desc: 'The architectural entry point of QuantaNova.' },
    { id: 'istem', title: 'iSTEM Hub', icon: Layers, desc: 'A dedicated 5,000 sq.ft innovation floor.' },
    { id: 'robotics', title: 'Robotics Lab', icon: Cpu, desc: 'Industrial robotics and hardware prototyping center.' },
    { id: 'classroom', title: 'Smart Zone', icon: Monitor, desc: 'Next-gen interactive learning environments.' },
    { id: 'physics', title: 'Quantum Lab', icon: FlaskConical, desc: 'Precision empirical research facility.' }
  ];

  const handleZoneChange = (id: string) => {
    setIsNavigating(true);
    setTimeout(() => {
      setActiveZone(id);
      setIsNavigating(false);
      setCoordinates({ 
        x: 17.5239 + (Math.random() - 0.5) * 0.001, 
        y: 78.3907 + (Math.random() - 0.5) * 0.001 
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col pt-20">
      <SEO title="3D Virtual Immersion" description="Step inside the Quantum Age. Explore our world-class iSTEM infrastructure in high-definition 3D." />
      
      {/* HUD Header */}
      <header className="px-10 py-6 border-b border-white/10 flex justify-between items-center bg-[#0a0f1d]/80 backdrop-blur-xl z-20">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">LIVE_IMMERSION: ACTIVE</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="text-[10px] font-mono text-brand-red">COORD_REF: {coordinates.x.toFixed(4)}N / {coordinates.y.toFixed(4)}E</div>
         </div>
         
         <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-4 text-slate-500">
               <Camera size={16} />
               <span className="text-[9px] font-black uppercase tracking-widest">Render: High Definition</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
               <Zap size={16} className="text-gold-500" />
               <span className="text-[9px] font-black uppercase tracking-widest">Signal: Stable</span>
            </div>
         </div>

         <Link to="/campus">
            <button className="flex items-center gap-3 px-6 py-2 border border-white/20 rounded-full hover:bg-white/5 transition-all">
               <span className="text-[9px] font-black uppercase tracking-widest">Exit Immersion</span>
            </button>
         </Link>
      </header>

      <div className="flex-1 relative flex">
         {/* Sidebar Navigator */}
         <aside className="w-80 bg-[#0a0f1d] border-r border-white/10 p-10 hidden lg:flex flex-col z-20">
            <div className="text-brand-red font-display text-[10px] font-black uppercase tracking-[0.4em] mb-10">Institutional Zones</div>
            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
               {zones.map((zone) => (
                  <button 
                    key={zone.id}
                    onClick={() => handleZoneChange(zone.id)}
                    className={`w-full text-left p-6 rounded-3xl transition-all duration-500 border ${
                      activeZone === zone.id 
                        ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20' 
                        : 'bg-navy-950 border-white/5 text-slate-500 hover:border-white/20'
                    } group`}
                  >
                     <div className="flex items-center justify-between mb-2">
                        <zone.icon size={20} className={activeZone === zone.id ? 'text-white' : 'text-brand-red'} />
                        <ArrowRight size={14} className={`transition-transform duration-500 ${activeZone === zone.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                     </div>
                     <div className="font-display font-bold text-sm uppercase tracking-wider mb-1">{zone.title}</div>
                     <div className={`text-[9px] leading-relaxed line-clamp-1 ${activeZone === zone.id ? 'text-white/70' : 'text-slate-600'}`}>{zone.desc}</div>
                  </button>
               ))}
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/5">
               <div className="bg-navy-950 p-6 rounded-3xl border border-white/5">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Current View Detail</div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-[8px] uppercase text-slate-400">Environment</span>
                        <span className="text-[9px] font-bold text-white">INTERIOR_STABLE</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[8px] uppercase text-slate-400">Occupancy</span>
                        <span className="text-[9px] font-bold text-brand-red">ACTIVE_SESSION</span>
                     </div>
                  </div>
               </div>
            </div>
         </aside>

         {/* Main Viewport */}
         <main className="flex-1 bg-[#020617] relative flex items-center justify-center p-6 md:p-12 overflow-hidden">
            {/* Viewport Corners (Drafting Style) */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-brand-red/30"></div>
            <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-brand-red/30"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-brand-red/30"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-brand-red/30"></div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30"></div>

            <div className="w-full h-full rounded-[3rem] bg-navy-950 overflow-hidden relative border border-white/5 shadow-2xl group">
               {/* Navigating Overlay */}
               {isNavigating && (
                  <div className="absolute inset-0 bg-navy-950 z-[100] flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300">
                     <div className="w-16 h-16 border-t-2 border-brand-red rounded-full animate-spin"></div>
                     <div className="font-display text-xs uppercase tracking-[0.5em] text-brand-red animate-pulse">Relocating Node...</div>
                  </div>
               )}

               {/* Interaction Hotspots (Simulated) */}
               <div className="absolute top-1/4 left-1/3 z-50 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-brand-red/20 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform">
                     <div className="w-3 h-3 bg-brand-red rounded-full"></div>
                  </div>
               </div>

               {/* Actual Placeholder Image representing the 3D space */}
               <img 
                 src={`https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop`} 
                 className={`w-full h-full object-cover transition-all duration-1000 transform ${isNavigating ? 'scale-110 blur-xl opacity-0' : 'scale-100 blur-0 opacity-10'}`} 
                 alt="3D View"
               />
               
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6 max-w-xl px-10">
                     <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 mb-4">
                        <Crosshair size={14} className="text-brand-red" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Active Link: {zones.find(z => z.id === activeZone)?.title}</span>
                     </div>
                     <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-none">{zones.find(z => z.id === activeZone)?.title}</h2>
                     <p className="text-slate-400 text-lg font-light leading-relaxed italic">
                        Accessing visual metadata for the Quantum Ecosystem. This is a high-fidelity rendering of our {zones.find(z => z.id === activeZone)?.title}.
                     </p>
                     <div className="flex justify-center gap-4">
                        <Button variant="primary" className="px-10 py-3 rounded-full text-[9px] uppercase font-black tracking-[0.2em] bg-brand-red text-white">Enter POV Mode</Button>
                        <Button variant="secondary" className="px-10 py-3 rounded-full text-[9px] uppercase font-black tracking-[0.2em] border-white/20 text-white">View Schematics</Button>
                     </div>
                  </div>
               </div>

               {/* View Controls HUD */}
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
                  <button className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                     <ChevronLeft size={24} />
                  </button>
                  <div className="px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-4">
                     <Maximize size={18} className="text-slate-400" />
                     <div className="w-px h-4 bg-white/10"></div>
                     <Map size={18} className="text-slate-400" />
                     <div className="w-px h-4 bg-white/10"></div>
                     <Info size={18} className="text-slate-400" />
                  </div>
                  <button className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                     <ChevronRight size={24} />
                  </button>
               </div>
            </div>
         </main>
      </div>
    </div>
  );
};

export default VirtualTour;
