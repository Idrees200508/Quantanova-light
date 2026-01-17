
import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Play, Pause } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { content } = useSite();
  const { showAnthem, anthemAudioUrl } = content;

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = () => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio(anthemAudioUrl);
    audio.volume = 0.4;
    audio.loop = true;
    audioRef.current = audio;
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    return audio;
  };

  const toggleAnthem = () => {
    const audio = initAudio();
    if (isPlaying) audio.pause();
    else audio.play().catch(e => console.log("Interaction required"));
  };

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'iSTEM EDGE', path: '/istem' },
    { label: 'ACADEMICS', path: '/academics' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'MANIFESTO', path: '/manifesto' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    setIsOpen(false);
    if (location.pathname === item.path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-8 left-0 w-full z-[100] px-4 sm:px-8 pointer-events-none flex justify-center">
      <nav className="bg-white/80 backdrop-blur-2xl border border-white/30 rounded-full shadow-2xl pointer-events-auto overflow-hidden flex items-center p-1.5 sm:p-2">
        <div className="bg-slate-50/50 rounded-full pl-3 sm:pl-5 pr-4 sm:pr-8 py-1.5 sm:py-2 border border-white/40 flex items-center gap-2 sm:gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-700 group-hover:rotate-[360deg]">
              <img src="https://quantanovaschool.org/logo/logo.png" alt="QuantaNova" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:flex flex-col -space-y-0.5">
              <span className="font-display font-black text-sm lg:text-base tracking-wider text-brand-indigo uppercase">QUANTANOVA</span>
              <span className="text-[6px] font-black text-brand-red uppercase tracking-[0.3em] flex items-center gap-0.5">
                SCHOOL OF EXCELLENCE
              </span>
            </div>
          </Link>
        </div>

        <div className="w-px h-8 sm:h-10 bg-slate-200 mx-1 sm:mx-3 hidden lg:block"></div>

        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? 'text-brand-red bg-brand-red/5' : 'text-slate-500 hover:text-brand-indigo hover:bg-slate-100/50'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 ml-1 sm:ml-3 bg-slate-50/50 rounded-full p-1 border border-white/40">
          {showAnthem && (
            <button onClick={toggleAnthem} className={`p-2 sm:p-3.5 transition-all rounded-full ${isPlaying ? 'text-brand-red bg-brand-red/10 animate-pulse' : 'text-slate-500 hover:text-brand-red hover:bg-white'}`}>
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className="p-2 sm:p-3.5 text-brand-indigo hover:text-brand-red transition-all rounded-full hover:bg-white lg:hidden">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-[-1] bg-white/98 backdrop-blur-3xl lg:hidden animate-in fade-in slide-in-from-top-10 duration-500">
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none"></div>
          <div className="h-full flex flex-col items-center justify-center p-12 space-y-6">
            <div className="mb-10 text-center">
              <img src="https://quantanovaschool.org/logo/logo.png" className="w-20 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-black text-brand-indigo">QUANTANOVA</h2>
              <p className="text-[10px] font-black text-brand-red uppercase tracking-widest">School of Excellence</p>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className="text-2xl font-display font-black uppercase tracking-tighter text-brand-indigo hover:text-brand-red transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
