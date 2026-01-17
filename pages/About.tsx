
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Loader2, Cpu as CpuIcon, Award, Quote, 
  Sparkles, Building2, Users, FileText, Download, Briefcase
} from 'lucide-react';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAbout } from '../contexts/AboutContext';
import { useSite } from '../contexts/SiteContext';
import Button from '../components/Button';
import Iridescence from '../components/Iridescence';

const About: React.FC = () => {
  const { 
    founderName, founderTitle, founderSubtitle, founderMessage, 
    vision, visionEnvision, missionPoints, founderAudioUrl, 
    paragraphTimestamps 
  } = useAbout();
  
  const { content } = useSite();
  const { showFaculty, showDownloads, faculty = [], downloads = [] } = content;

  const [isFounderPlaying, setIsFounderPlaying] = useState(false);
  const [isLoadingFounder, setIsLoadingFounder] = useState(false);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);
  const founderAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleFounderAudio = () => {
    if (!founderAudioRef.current) {
      setIsLoadingFounder(true);
      const audio = new Audio(founderAudioUrl);
      founderAudioRef.current = audio;
      audio.oncanplaythrough = () => { setIsLoadingFounder(false); audio.play().catch(console.error); };
      audio.ontimeupdate = () => {
        const currentTime = audio.currentTime;
        let currentIndex = -1;
        for (let i = 0; i < paragraphTimestamps.length; i++) {
          if (currentTime >= paragraphTimestamps[i]) currentIndex = i;
          else break;
        }
        setActiveParagraphIndex(currentIndex === -1 ? null : Math.min(currentIndex, founderMessage.length - 1));
      };
      audio.onplay = () => setIsFounderPlaying(true);
      audio.onpause = () => setIsFounderPlaying(false);
      audio.onended = () => { setIsFounderPlaying(false); setActiveParagraphIndex(null); };
    } else {
      if (isFounderPlaying) founderAudioRef.current.pause();
      else founderAudioRef.current.play().catch(console.error);
    }
  };

  useEffect(() => () => founderAudioRef.current?.pause(), []);

  return (
    <div className="pt-32 pb-12 bg-white">
      <SEO />
      
      {/* Hero Visual - Iridescent Overlays */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mb-20 relative">
         <div className="relative h-[400px] md:h-[600px] rounded-[4rem] overflow-hidden border border-slate-100 shadow-2xl">
            {/* Fix: use colorA instead of color and cast to tuple */}
            <Iridescence colorA={[0.9, 0.95, 1] as [number, number, number]} speed={0.4} className="opacity-40" />
            <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full px-6">
               <h1 className="text-4xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter leading-none mb-4">THE <span className="text-brand-red">QUANTUM</span> VISION</h1>
            </div>
         </div>
      </div>

      <section className="py-12 bg-white blueprint-grid">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 sticky top-24">
               <div className="relative bg-white/80 backdrop-blur-md rounded-[1.5rem] p-3 border border-slate-200 shadow-2xl overflow-hidden crest-mask">
                  <div className="aspect-[1/1.1] rounded-[1.2rem] overflow-hidden bg-slate-50 flex items-center justify-center p-8">
                     <img src="https://quantanovaschool.org/logo/logo.png" className="w-full h-full object-contain mx-auto" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-brand-indigo uppercase tracking-wider mb-1.5">{founderName}</h3>
                    <p className="text-brand-red text-[8px] font-black uppercase tracking-[0.3em]">{founderTitle}</p>
                    <button onClick={toggleFounderAudio} className={`mt-6 w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold transition-all ${isFounderPlaying ? 'bg-red-500 text-white animate-pulse' : 'bg-brand-red text-white hover:opacity-90'} uppercase tracking-widest text-[9px]`}>
                      {isLoadingFounder ? <Loader2 className="animate-spin" size={16} /> : isFounderPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                      <span>{isFounderPlaying ? 'Stop Talking' : 'Play Founder\'s Talk'}</span>
                    </button>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-4 text-brand-indigo text-lg leading-relaxed font-light">
                {founderMessage.map((p, idx) => (
                  <p key={idx} className={`transition-all duration-700 p-6 rounded-[1.2rem] border border-transparent ${activeParagraphIndex === idx ? 'text-brand-red bg-brand-red/5 border-brand-red/10 scale-[1.01]' : isFounderPlaying ? 'opacity-30 blur-[0.3px]' : ''}`}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Wing - Centered Cards */}
      {showFaculty && (
         <section className="py-24 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 relative overflow-hidden">
            {/* Fix: use colorA instead of color and cast to tuple */}
            <Iridescence colorA={[0.9, 1, 0.95] as [number, number, number]} speed={0.2} className="opacity-30" />
            <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20"></div>
            <div className="text-center mb-16 relative z-10">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-indigo/5 border border-brand-indigo/20 rounded-full mb-6">
                  <Users size={14} className="text-brand-indigo" />
                  <span className="text-brand-indigo font-display text-[9px] uppercase tracking-widest font-black">Architects of Thought</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none">THE <span className="text-brand-red">FACULTY</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
               {(faculty || []).map(f => (
                  <div key={f.id} className="bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] border border-slate-100 group hover:border-brand-red/30 transition-all shadow-xl flex flex-col items-center text-center">
                     <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 mx-auto">
                        <img src={f.image} className="w-full h-full object-cover" />
                     </div>
                     <h4 className="font-display font-bold text-xl text-brand-indigo uppercase tracking-tight leading-none mb-2">{f.name}</h4>
                     <p className="text-brand-red font-black text-[10px] uppercase tracking-widest mb-4">{f.designation}</p>
                     <div className="flex items-center gap-2 text-slate-400 text-[9px] font-medium uppercase tracking-widest border-t border-slate-100 pt-4 w-full justify-center">
                        <Award size={14} className="text-brand-indigo" /> {f.qualification}
                     </div>
                  </div>
               ))}
            </div>
         </section>
      )}

      {/* Download Center */}
      {showDownloads && (
         <section className="py-24 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="text-center lg:text-left">
                     <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-indigo uppercase tracking-tighter mb-8 leading-tight">Institutional <br/><span className="text-brand-red">Artifacts Hub</span></h2>
                     <p className="text-slate-500 text-lg font-light leading-relaxed mb-10">Access high-resolution circulars, prospectuses, and academic framework documents directly from the vault.</p>
                     <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
                        {(downloads || []).map(d => (
                           <a key={d.id} href={d.fileUrl} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 group hover:border-brand-red/30 transition-all shadow-sm">
                              <div className="flex items-center gap-4">
                                 <FileText size={20} className="text-brand-red" />
                                 <div className="text-brand-indigo font-bold uppercase text-xs tracking-widest">{d.title}</div>
                              </div>
                              <Download size={18} className="text-slate-300 group-hover:text-brand-red transition-colors" />
                           </a>
                        ))}
                     </div>
                  </div>
                  <div className="relative">
                     <div className="bg-brand-indigo p-12 rounded-[4rem] text-white overflow-hidden shadow-2xl relative text-center flex flex-col items-center">
                        <div className="absolute top-0 right-1/2 translate-x-1/2 p-10 opacity-10"><Briefcase size={150} /></div>
                        <h4 className="text-2xl font-display font-bold uppercase mb-6 relative z-10">Parent Support Matrix</h4>
                        <p className="text-slate-300 leading-relaxed mb-10 font-light relative z-10">For physical copies of documents or institutional verification, please synchronization with our admissions desk during operational hours.</p>
                        <div className="flex justify-center relative z-10 w-full">
                           <Link to="/contact" className="w-full max-w-xs"><Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-brand-indigo w-full">Direct Connectivity</Button></Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      )}

      <section className="py-16 bg-navy-950 blueprint-major">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="relative pt-10">
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-14 border border-slate-100 h-full text-center flex flex-col items-center justify-center">
                <Quote className="w-10 h-10 text-brand-red mb-8 mx-auto" fill="currentColor" />
                <p className="text-brand-indigo text-lg md:text-2xl leading-relaxed font-bold mb-6">{vision}</p>
                <p className="text-brand-indigo opacity-70 font-light">{visionEnvision}</p>
              </div>
            </div>
            <div className="relative pt-10">
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-14 border border-slate-100 h-full flex flex-col justify-center">
                <ul className="space-y-6">
                  {missionPoints.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="mt-1 p-0.5 bg-brand-red rounded-full shadow-lg shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-white"></div></div>
                      <span className="text-brand-indigo text-sm md:text-lg font-medium leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
