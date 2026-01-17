import React from 'react';

interface QuantumVisualProps {
  type: 'network' | 'grid' | 'orbit' | 'circuit';
  className?: string;
}

const QuantumVisual: React.FC<QuantumVisualProps> = ({ type, className = "" }) => {
  return (
    <div className={`relative overflow-hidden bg-navy-950 rounded-[2rem] border border-white/10 group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-brand-indigo/10 opacity-50"></div>
      
      {/* Dynamic Animated Content based on Type */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {type === 'network' && (
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
            <circle cx="100" cy="100" r="2" fill="#c61920" className="animate-pulse" />
            <g stroke="#c61920" strokeWidth="0.5" fill="none" className="animate-pulse-slow">
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="90" />
            </g>
            <path d="M100 10 L100 190 M10 100 L190 100" stroke="white" strokeWidth="0.1" strokeDasharray="2,2" />
            <g className="animate-spin-slow origin-center">
               <circle cx="100" cy="40" r="4" fill="#c61920" />
               <circle cx="160" cy="100" r="4" fill="#393182" />
               <circle cx="100" cy="160" r="4" fill="#c61920" />
               <circle cx="40" cy="100" r="4" fill="#393182" />
            </g>
          </svg>
        )}

        {type === 'grid' && (
          <div className="w-full h-full relative">
             <div className="absolute inset-0 blueprint-grid opacity-20"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-brand-red/30 rounded-full animate-ping"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-brand-indigo/30 rounded-full animate-spin-slow"></div>
             <div className="absolute top-0 left-0 w-full h-1 bg-brand-red/40 animate-scan"></div>
          </div>
        )}

        {type === 'orbit' && (
           <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="1" fill="#c61920" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(198,25,32,0.2)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(57,49,130,0.2)" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="rgba(198,25,32,0.1)" strokeWidth="0.2" transform="rotate(45 50 50)" className="animate-pulse" />
              <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="rgba(198,25,32,0.1)" strokeWidth="0.2" transform="rotate(-45 50 50)" className="animate-pulse" />
              <g className="animate-spin-slow origin-center">
                 <circle cx="70" cy="50" r="2" fill="#c61920" />
              </g>
           </svg>
        )}

        {type === 'circuit' && (
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
            <path d="M10 10 H90 V90 H10 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M30 30 L50 50 L70 30" fill="none" stroke="#c61920" strokeWidth="1" className="animate-pulse" />
            <path d="M30 70 L50 50 L70 70" fill="none" stroke="#393182" strokeWidth="1" className="animate-pulse" />
            <circle cx="50" cy="50" r="5" fill="#c61920" className="animate-ping" />
          </svg>
        )}
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-4 left-4 flex gap-1">
         <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse"></div>
         <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
         <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
      </div>
      <div className="absolute bottom-4 right-4 text-[7px] font-mono text-white/30 tracking-widest uppercase">
         Nexus_Auth_Validated
      </div>
    </div>
  );
};

export default QuantumVisual;