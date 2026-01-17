
import React from 'react';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import { Cpu, Zap, Box, Terminal, Server, Rocket, Microscope, Activity, HardHat } from 'lucide-react';
import SmoothReveal from '../components/SmoothReveal';
import SEO from '../components/SEO';
import Button from '../components/Button';
import Magnet from '../components/Magnet';
import Iridescence from '../components/Iridescence';

const IStem: React.FC = () => {
  return (
    <div className="bg-white pb-32 pt-20">
      <SEO title="Quantum Hub | Join Botics" />
      
      {/* Hero Header - Iridescent Light Background */}
      <section className="pt-32 pb-24 text-center border-b border-slate-100 relative overflow-hidden">
        {/* Fix: use colorA instead of color and cast to tuple */}
        <Iridescence colorA={[1, 0.9, 0.95] as [number, number, number]} speed={0.5} className="opacity-40" />
        <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-40"></div>
        <SmoothReveal>
          <div className="inline-flex flex-col items-center gap-6 mb-12 relative z-10">
            <Magnet strength={0.2}>
              <img src="https://static.wixstatic.com/media/f9217f_1914cfd7e3b1422683663828c9b64a2b~mv2.png/v1/fill/w_294,h_166,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Joinbotics%20logo.png" alt="Join Botics" className="h-24 object-contain mb-4 mx-auto" />
            </Magnet>
            <div className="bg-white/70 backdrop-blur-sm border border-brand-red/20 rounded-full px-8 py-2.5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-indigo">Official Robotics Lab Partner</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none mb-10 relative z-10">
            QUANTUM <span className="text-brand-red">HUB</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 font-light max-w-4xl mx-auto italic leading-relaxed relative z-10">
            The heart of innovation at QuantaNova. Powered by <strong>Join Botics</strong>, our students spend 20% of their curriculum building real-world industrial prototypes.
          </p>
        </SmoothReveal>
      </section>

      {/* Industrial Synergy Grid */}
      <section className="py-32 px-6 blueprint-grid">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <SmoothReveal>
            <div className="bg-slate-50 border border-slate-200 p-16 rounded-[5rem] space-y-10 border-beam shadow-2xl group hover:border-brand-red/30 transition-all h-full flex flex-col items-center text-center">
              <div className="flex flex-col items-center gap-8">
                <div className="w-24 h-24 bg-brand-red rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand-red/20 group-hover:scale-110 transition-transform duration-500 mx-auto"><Box className="text-white" size={48} /></div>
                <h3 className="text-4xl font-display font-bold text-brand-indigo uppercase tracking-tight">FABRICATION<br/>CENTER</h3>
              </div>
              <p className="text-slate-500 text-xl font-light leading-relaxed">
                Supervised by **Join Botics** mentors, this node provides students with 3D printers, circuit fabrication arrays, and mechanical toolsets.
              </p>
              <div className="grid grid-cols-2 gap-6 w-full">
                 {['Circuit Design', '3D Prototyping', 'Logic Hacking', 'AI Vision'].map(f => (
                   <div key={f} className="bg-white p-6 rounded-2xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-brand-indigo flex items-center justify-center gap-4 shadow-sm group-hover:border-brand-red/10">
                      <Zap size={16} className="text-brand-red" /> {f}
                   </div>
                 ))}
              </div>
            </div>
          </SmoothReveal>

          <SmoothReveal delay={300}>
            <div className="bg-navy-950 p-16 rounded-[5rem] space-y-10 text-white shadow-2xl h-full relative overflow-hidden group border border-white/5 hover:border-brand-indigo/40 transition-all flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000"><Terminal size={300} /></div>
              <div className="flex flex-col items-center gap-8">
                <div className="w-24 h-24 bg-brand-indigo rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand-indigo/30 group-hover:scale-110 transition-transform duration-500 mx-auto"><Server className="text-white" size={48} /></div>
                <h3 className="text-4xl font-display font-bold uppercase tracking-tight leading-tight">WHERESOFT<br/>TECH CORE</h3>
              </div>
              <p className="text-slate-400 text-xl font-light leading-relaxed">
                Architected by **Wheresoft**, this node powers high-bandwidth computing, AI research nodes, and enterprise-grade software studios.
              </p>
              <div className="grid grid-cols-2 gap-6 w-full">
                 {['Neural Compute', 'Data Research', 'Cloud Systems', 'Cyber Labs'].map(f => (
                   <div key={f} className="bg-white/5 p-6 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white flex items-center justify-center gap-4 group-hover:border-brand-red/20 transition-all">
                      <Activity size={16} className="text-brand-red" /> {f}
                   </div>
                 ))}
              </div>
            </div>
          </SmoothReveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-100 text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.02] pointer-events-none"><HardHat size={500} className="text-brand-red mx-auto" /></div>
         <SmoothReveal>
           <h2 className="text-4xl md:text-[7rem] font-display font-bold text-brand-indigo mb-10 uppercase tracking-tighter leading-none">JOIN THE <br /><span className="text-brand-red">FOUNDING</span> BATCH</h2>
           <p className="text-slate-500 text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed italic">
             Witness the future of I-STEM education in Hyderabad. Book a private tour of the Quantum Hub today.
           </p>
           <Magnet strength={0.3}>
             <Link to="/contact">
               <Button variant="primary" className="px-20 py-8 rounded-full uppercase font-black text-xl tracking-[0.2em] shadow-2xl bg-brand-red">Claim Your Slot</Button>
             </Link>
           </Magnet>
         </SmoothReveal>
      </section>
    </div>
  );
};

export default IStem;
