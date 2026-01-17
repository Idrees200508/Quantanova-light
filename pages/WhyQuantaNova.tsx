
import React from 'react';
import { 
  ShieldCheck, GraduationCap, Microscope, Lightbulb, Users, Scale, Trophy, Zap, Cpu, MessagesSquare, Globe, CheckCircle, Sparkles, ArrowRight, Search, Hammer, Brain
} from 'lucide-react';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Magnet from '../components/Magnet';
import SmoothReveal from '../components/SmoothReveal';
import Iridescence from '../components/Iridescence';

const WhyQuantaNova: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 pt-10">
      <SEO />

      {/* Hero Header - Iridescent Light Background */}
      <section className="relative py-32 overflow-hidden text-center px-6 border-b border-slate-100 flex flex-col items-center">
        {/* Fix: use colorA instead of color and cast to tuple */}
        <Iridescence colorA={[0.95, 1, 0.95] as [number, number, number]} speed={0.4} className="opacity-50" />
        <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-40"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <SmoothReveal delay={100}>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/70 backdrop-blur-md border border-brand-red/20 rounded-full mb-10 shadow-xl mx-auto">
              <Sparkles className="text-brand-red w-5 h-5 animate-pulse" />
              <span className="text-brand-indigo font-display text-[11px] uppercase tracking-[0.5em] font-black">The Quanta Advantage</span>
            </div>
          </SmoothReveal>
          
          <SmoothReveal delay={300}>
            <h1 className="text-6xl md:text-9xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none mb-10">
              WHY <span className="text-brand-red">QUANTANOVA</span>?
            </h1>
          </SmoothReveal>
          
          <SmoothReveal delay={500}>
            <p className="text-2xl md:text-4xl text-slate-500 font-light leading-relaxed mb-16 max-w-4xl mx-auto italic">
              "Because we are the only institution where subject experts are foundational partners, not just employees."
            </p>
          </SmoothReveal>
          
          <SmoothReveal delay={700}>
            <div className="flex justify-center">
              <Magnet strength={0.3}>
                <Link to="/contact">
                  <Button variant="primary" className="px-16 py-6 rounded-2xl uppercase font-black tracking-widest text-base shadow-2xl">Join the Founding Batch</Button>
                </Link>
              </Magnet>
            </div>
          </SmoothReveal>
        </div>
      </section>

      {/* Faculty Partnership Section */}
      <section className="py-24 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 blueprint-grid">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <SmoothReveal>
              <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto lg:mx-0">
                  <GraduationCap size={32} />
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none text-center lg:text-left">THE <span className="text-brand-red">EXPERT</span> <br className="hidden lg:block" /> MATRIX</h2>
              </div>
            </SmoothReveal>
            <SmoothReveal delay={200}>
              <p className="text-slate-600 text-2xl leading-relaxed font-light italic">
                QuantaNova is built on the belief that **Oxford Advantage** methods and **Join Botics** robotics shouldn't be secondary; they should be the core.
              </p>
            </SmoothReveal>
            <SmoothReveal delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {[
                  "Oxford-Certified Subject Experts",
                  "Join Botics Hardware Mentors",
                  "Wheresoft Software Engineers",
                  "Research-First Methodology",
                  "24/7 Digital Mentor Access",
                  "Global Curriculum Alignment"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl group hover:border-brand-red/30 transition-all shadow-md">
                    <CheckCircle className="text-brand-red w-6 h-6 shrink-0" />
                    <span className="text-brand-indigo font-bold text-sm tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </SmoothReveal>
          </div>
          
          <div className="relative">
            <SmoothReveal delay={600}>
              <div className="absolute inset-0 bg-brand-red/5 blur-[120px] rounded-full"></div>
              <div className="relative bg-white p-12 rounded-[4rem] border-4 border-slate-100 shadow-[0_40px_100px_rgba(57,49,130,0.15)] crest-mask text-center flex flex-col items-center">
                <div className="space-y-10 w-full">
                  <div className="p-8 bg-brand-indigo/5 rounded-[2.5rem] border border-brand-indigo/10 w-full">
                    <h4 className="text-brand-indigo font-display font-black mb-4 uppercase text-[12px] tracking-widest">Foundational Philosophy</h4>
                    <p className="text-slate-500 text-lg italic leading-relaxed">"We don't recruit staff; we curate a board of experts who are passionate about the future of their fields."</p>
                  </div>
                  <div className="flex flex-col items-center gap-6">
                     <div className="w-20 h-20 bg-brand-red rounded-3xl flex items-center justify-center shadow-xl shadow-brand-red/20 mx-auto"><Zap className="text-white" size={40} /></div>
                     <div className="w-full">
                        <div className="text-brand-indigo font-display font-bold text-2xl uppercase tracking-tight leading-none mb-2">Scientific Rigor</div>
                        <div className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black">Powered by Oxford standards</div>
                     </div>
                  </div>
                </div>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </section>

      {/* Core Excellence Modules */}
      <section className="py-24 bg-navy-950 blueprint-major text-white border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-8xl font-display font-bold uppercase tracking-tighter">QUANTUM PILLARS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: Microscope, 
                title: "Empirical Lab Mastery", 
                desc: "Every student performs real experiments. Join Botics kits allow students to build circuits and 3D prototypes from day one." 
              },
              { 
                icon: MessagesSquare, 
                title: "Cognitive Fluency", 
                desc: "Oxford Advantage English and debates ensure powerful communication. Leaders aren't silent; they express with clarity." 
              },
              { 
                icon: Hammer, 
                title: "Industrial Fabrication", 
                desc: "Our partnership with Wheresoft and Join Botics gives students access to actual software studios and robotics fab labs." 
              }
            ].map((feature, idx) => (
              <SmoothReveal key={idx} delay={idx * 200}>
                <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/10 hover:border-brand-red/40 transition-all group shadow-2xl relative overflow-hidden h-full flex flex-col items-center text-center">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><feature.icon size={120} /></div>
                  <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mb-10 border border-brand-red/20 group-hover:bg-brand-red group-hover:text-white transition-all shadow-xl mx-auto">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">{feature.desc}</p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Leadership Section */}
      <section className="py-32 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 blueprint-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-6 space-y-12 text-center lg:text-left flex flex-col items-center lg:items-start">
            <SmoothReveal>
              <div>
                <div className="text-brand-red font-display text-[11px] uppercase tracking-[0.6em] font-black mb-6">Foundational Mindset</div>
                <h2 className="text-5xl md:text-8xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none">LEADERSHIP <br className="hidden lg:block" /><span className="text-brand-red">ETHOS</span></h2>
              </div>
            </SmoothReveal>
            <SmoothReveal delay={200}>
              <p className="text-slate-500 text-2xl font-light leading-relaxed italic">
                "We don't just teach leadership; we practice it through student councils and iSTEM project management."
              </p>
            </SmoothReveal>
            <SmoothReveal delay={400}>
              <div className="p-10 bg-white border border-slate-100 rounded-[3rem] border-l-[12px] border-l-brand-red shadow-2xl flex flex-col lg:flex-row items-center gap-6">
                <ShieldCheck size={48} className="text-brand-red shrink-0" />
                <p className="text-brand-indigo text-lg leading-relaxed font-bold">
                  The QuantaNova framework ensures every child develops the character and integrity needed to lead in a globalized, tech-driven economy.
                </p>
              </div>
            </SmoothReveal>
          </div>
          
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
             <SmoothReveal delay={600}>
               <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-6 text-center flex flex-col items-center">
                  <Brain className="text-brand-red mx-auto" size={36} />
                  <h4 className="text-brand-indigo font-display font-bold text-xl uppercase tracking-tight">Logic Mastery</h4>
                  <p className="text-slate-500 text-sm font-light">Resilience and collaborative problem solving powered by Oxford Advantage.</p>
               </div>
             </SmoothReveal>
             <SmoothReveal delay={800}>
               <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-6 md:mt-12 text-center flex flex-col items-center">
                  <Globe className="text-brand-red mx-auto" size={36} />
                  <h4 className="text-brand-indigo font-display font-bold text-xl uppercase tracking-tight">Global Ethics</h4>
                  <p className="text-slate-500 text-sm font-light">A profound sense of empathy, discipline, and accountability.</p>
               </div>
             </SmoothReveal>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200 text-center flex flex-col items-center relative overflow-hidden">
        {/* Fix: use colorA instead of color and cast to tuple */}
        <Iridescence colorA={[1, 1, 0.9] as [number, number, number]} speed={0.2} className="opacity-30" />
        <SmoothReveal className="relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-8xl font-display font-bold text-brand-indigo uppercase tracking-tighter">THE <span className="text-brand-red">FUTURE</span> IS NOW</h2>
            <p className="text-slate-500 text-2xl font-light leading-relaxed italic">
               Admissions are open for our inaugural founding batch. Secure your child's legacy.
            </p>
            <div className="flex justify-center pt-8">
               <Magnet strength={0.3}>
                 <Link to="/contact">
                   <Button variant="primary" className="px-16 py-8 rounded-full text-xl uppercase font-black tracking-widest shadow-2xl">Initialize Admission</Button>
                 </Link>
               </Magnet>
            </div>
          </div>
        </SmoothReveal>
      </section>
    </div>
  );
};

export default WhyQuantaNova;
