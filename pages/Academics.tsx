
import React from 'react';
import SmoothReveal from '../components/SmoothReveal';
import SEO from '../components/SEO';
import { BookOpen, GraduationCap, Microscope, ClipboardCheck } from 'lucide-react';
import Iridescence from '../components/Iridescence';

const Academics: React.FC = () => {
  return (
    <div className="pt-24 pb-12 bg-white min-h-screen">
      <SEO title="Academics | The Hybrid Foundation" />

      {/* Hero Header */}
      <section className="py-24 text-center relative overflow-hidden bg-slate-50 border-b border-slate-100">
        <Iridescence colorA={[0.9, 0.95, 1]} speed={0.3} className="opacity-40" />
        <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-20"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SmoothReveal>
            <h1 className="text-4xl md:text-8xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none mb-6">
              THE <span className="text-brand-red">HYBRID</span> <br /> FRAMEWORK
            </h1>
            <p className="text-lg md:text-2xl text-slate-500 font-light leading-relaxed italic">
              "Selecting the most robust curriculum partners for every stage of development."
            </p>
          </SmoothReveal>
        </div>
      </section>

      {/* The Two Tracks */}
      <section className="py-24 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Early Years / Primary */}
          <SmoothReveal>
            <div className="group bg-white p-12 rounded-[4rem] border border-slate-200 hover:border-brand-red/30 transition-all shadow-2xl h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-brand-red/10 rounded-3xl flex items-center justify-center text-brand-red mb-8 group-hover:bg-brand-red group-hover:text-white transition-all shadow-xl">
                <BookOpen size={40} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-indigo mb-4 uppercase">EARLY YEARS <br /> & PRIMARY</h2>
              <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nursery to Class 5 • Oxford Advantage</span>
              </div>
              <p className="text-slate-600 text-xl font-light leading-relaxed mb-8 flex-grow">
                Partnered with **Oxford Advantage**, we focus on foundational language mastery and curiosity-driven activities. We ensure children understand *why* before they learn *what*.
              </p>
              <div className="w-full grid grid-cols-2 gap-4">
                {['Curiosity First', 'Language Mastery', 'Phonics & Logic', 'Play-Based Labs'].map(f => (
                  <div key={f} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[9px] font-black uppercase tracking-widest text-brand-indigo flex items-center justify-center gap-3">
                    <Microscope size={14} className="text-brand-red" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </SmoothReveal>

          {/* Middle & High School */}
          <SmoothReveal delay={200}>
            <div className="group bg-brand-indigo p-12 rounded-[4rem] border border-brand-indigo/20 hover:border-brand-red/50 transition-all shadow-2xl h-full flex flex-col items-center text-center text-white">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-white mb-8 group-hover:bg-brand-red transition-all shadow-xl border border-white/10">
                <GraduationCap size={40} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 uppercase">MIDDLE & <br /> HIGH SCHOOL</h2>
              <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full mb-8 border border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Class 6 to Grade 10 • Supercharged State</span>
              </div>
              <p className="text-slate-300 text-xl font-light leading-relaxed mb-8 flex-grow">
                Transitioning to the **Telangana State Syllabus**, but enhanced with lab-oriented instruction. Students meet board standards while possessing a **Research Mindset**.
              </p>
              <div className="w-full grid grid-cols-2 gap-4">
                {['Rigorous Academics', 'iSTEM Integrated', 'Research Focus', 'Board Ready'].map(f => (
                  <div key={f} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[9px] font-black uppercase tracking-widest text-brand-gold flex items-center justify-center gap-3">
                    <ClipboardCheck size={14} className="text-brand-red" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </SmoothReveal>

        </div>
      </section>

      {/* Final Note */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="w-20 h-1 bg-brand-red mx-auto mb-10"></div>
          <p className="text-slate-500 italic text-lg md:text-2xl leading-relaxed">
            "We don't just teach the syllabus; we teach the logic behind every axiom."
          </p>
        </div>
      </section>
    </div>
  );
};

export default Academics;
