
import React, { useState, useRef, useEffect } from 'react';
import { CalendarCheck, X, Sparkles, MapPin, ArrowRight, MoveVertical } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import Button from './Button';

const VisitPortal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useSite();
  const { showCampusVisit, googleFormUrl } = content;

  const [positionY, setPositionY] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const y = (e.clientY / window.innerHeight) * 100;
      setPositionY(Math.max(10, Math.min(85, y)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = 'auto';
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!showCampusVisit) return null;

  return (
    <>
      <div 
        ref={tabRef}
        style={{ top: `${positionY}%` }}
        className="fixed left-0 -translate-y-1/2 z-[110] group flex items-center touch-none"
      >
        <button 
          onClick={() => !isDragging && setIsOpen(true)}
          className="bg-white backdrop-blur-3xl border border-slate-200 rounded-r-[1.5rem] flex items-center transition-all duration-500 overflow-hidden shadow-2xl border-l-0 hover:scale-105"
        >
          <div className="w-16 h-16 flex items-center justify-center text-brand-red shrink-0">
            <CalendarCheck size={28} className="group-hover:scale-110 transition-transform" />
          </div>
          <div className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-[200px] group-hover:pr-10">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-indigo pl-2">
              RESERVE VISIT
            </span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[1000] bg-brand-indigo/20 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-[4rem] p-12 relative shadow-[0_30px_100px_rgba(57,49,130,0.15)] animate-in zoom-in duration-300">
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-8 right-8 text-slate-400 hover:text-brand-red transition-colors p-2 hover:bg-slate-50 rounded-full"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col items-center text-center space-y-10">
                 <div className="relative">
                    <div className="absolute inset-0 bg-brand-red/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] border border-brand-red/10 flex items-center justify-center relative z-10 shadow-sm">
                       <Sparkles size={48} className="text-brand-red" />
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="inline-block bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.4em] px-6 py-1.5 rounded-full shadow-lg shadow-brand-red/20 mb-4">
                      FREE ADMISSION TOUR
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-indigo uppercase tracking-tighter">
                      EXPERIENCE THE <span className="text-brand-red">FUTURE</span>
                    </h2>
                    <p className="text-slate-600 text-xl font-light leading-relaxed max-w-lg">
                      Book your personalized institutional tour. Explore our iSTEM labs, meet the faculty, and witness the Quantum Age learning framework in action.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-[11px] font-black text-brand-red uppercase tracking-widest">
                       <MapPin size={16} /> Pragathi Nagar, Hyderabad
                    </div>
                 </div>

                 <div className="w-full pt-6 space-y-4">
                    <a 
                      href={googleFormUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button fullWidth className="py-6 text-xl rounded-3xl font-black uppercase tracking-widest bg-brand-red text-white shadow-xl shadow-brand-red/30">
                        RESERVE FREE SLOT <ArrowRight size={24} className="ml-4" />
                      </Button>
                    </a>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       ENTIRELY FREE • PROFESSIONAL SUPERVISION • 30 MIN DURATION
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default VisitPortal;
