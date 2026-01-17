
import React from 'react';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';
import { Cpu, Zap, ArrowUpRight, Building2, Terminal, ShieldCheck, Heart, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';
import SmoothReveal from '../components/SmoothReveal';
import Magnet from '../components/Magnet';
import Iridescence from '../components/Iridescence';

const Campus: React.FC = () => {
  const { content } = useSite();
  const { infrastructure = [] } = content;

  return (
    <div className="pb-20 bg-white pt-20">
      <SEO title="Campus Infrastructure" />
      
      {/* Hero Header - Iridescent Light Background */}
      <section className="pt-32 pb-24 px-6 border-b border-slate-100 relative overflow-hidden">
        {/* Fix: use colorA instead of color and cast to tuple */}
        <Iridescence colorA={[0.95, 0.95, 1] as [number, number, number]} speed={0.2} className="opacity-50" />
        <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-40"></div>
        <div className="max-w-[1600px] mx-auto text-center relative z-10">
           <SmoothReveal>
             <div className="inline-flex flex-col items-center gap-6 mb-12">
                <Magnet strength={0.2}>
                  <img src="https://wheresoft.in/images/logo.png" alt="Wheresoft" className="h-20 object-contain mb-4 mx-auto" />
                </Magnet>
                <div className="bg-white/70 backdrop-blur-sm border border-brand-indigo/20 rounded-full px-8 py-2.5">
                  <span className="text-brand-indigo font-display text-[10px] uppercase tracking-[0.5em] font-black">Architectural Tech Partner</span>
                </div>
             </div>
             <h1 className="text-6xl md:text-9xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none mb-10">
                THE <span className="text-brand-red">ECOSYSTEM</span>
             </h1>
             <p className="text-xl md:text-3xl text-slate-500 font-light leading-relaxed max-w-5xl mx-auto italic text-center">
                Our infrastructure is enterprise-grade, designed by **Wheresoft Technologies** to support the intense cognitive bandwidth of the Quantum Age.
             </p>
           </SmoothReveal>
        </div>
      </section>

      {/* CORE INFRASTRUCTURE GRID */}
      <section className="py-32 bg-white blueprint-grid">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {infrastructure.slice(0, 4).map((zone, idx) => (
              <SmoothReveal key={zone.id} delay={idx * 150}>
                <div className="bg-slate-50 border border-slate-100 rounded-[4rem] overflow-hidden shadow-2xl group hover:border-brand-red/30 transition-all duration-700 block">
                  <div className="h-[450px] relative overflow-hidden">
                    <img src={zone.image} alt={zone.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-brand-indigo/10 group-hover:bg-transparent transition-colors"></div>
                    {/* Centered Node Label */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl px-10 py-5 rounded-[2.5rem] border border-slate-200 flex items-center gap-6 shadow-2xl w-[80%] max-w-[400px] justify-center text-center">
                      <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red shrink-0"><Cpu size={28} /></div>
                      <div>
                         <span className="text-brand-indigo font-display font-bold text-xl tracking-tight uppercase block leading-none mb-1">{zone.title}</span>
                         <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Wheresoft_Verified Node</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-16 space-y-10 text-center flex flex-col items-center">
                    <p className="text-slate-500 text-xl font-light leading-relaxed italic">"{zone.description}"</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center w-full">
                      {['24/7 Monitoring', 'AI Air Control', 'Logic Grids'].map(f => (
                        <div key={f} className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl border border-slate-200 text-[9px] font-black uppercase text-brand-indigo tracking-widest">
                           <Zap size={14} className="text-brand-red" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY & CARE MODULE */}
      <section className="py-32 bg-navy-950 text-white blueprint-major">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <SmoothReveal>
            <div className="w-24 h-24 bg-brand-red/20 rounded-[2.5rem] flex items-center justify-center border border-brand-red/30 mx-auto mb-12 shadow-2xl shadow-brand-red/20">
              <ShieldCheck className="text-brand-red" size={48} />
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none mb-24">INSTITUTIONAL <br /><span className="text-brand-red">SAFEGUARDS</span></h2>
          </SmoothReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: MapPin, title: 'AI Logistics', desc: 'Managed transport fleets powered by Wheresoft GPS synchronization.' },
              { icon: ShieldCheck, title: 'Bio-Security', desc: 'Secure biometric access at every entry/exit node.' },
              { icon: Heart, title: 'Medical Node', desc: '24/7 dedicated infirmary with specialized child-care experts.' }
            ].map((p, i) => (
              <SmoothReveal key={i} delay={i * 200}>
                <div className="p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3.5rem] shadow-2xl group hover:border-brand-red/40 transition-all h-full flex flex-col items-center">
                  <p.icon className="text-brand-red mb-8" size={40} />
                  <h4 className="text-2xl font-display font-bold uppercase mb-4">{p.title}</h4>
                  <p className="text-slate-400 text-lg font-light leading-relaxed">{p.desc}</p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Campus;
