
import React from 'react';
import { 
  GraduationCap, CheckCircle2, BookOpen, Brain, 
  Globe, Cpu, ShieldCheck, ChevronRight, Microscope
} from 'lucide-react';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SmoothReveal from '../components/SmoothReveal';
import SEO from '../components/SEO';
import Magnet from '../components/Magnet';
import Iridescence from '../components/Iridescence';

const Academics: React.FC = () => {
  const levels = [
    {
      title: 'FOUNDATIONAL YEARS',
      grades: 'Nursery to UKG',
      partner: 'Oxford Advantage',
      desc: 'Early logic and phonetic mastery. Focusing on sensory development and collaborative play.',
      features: ['Phonetic Foundations', 'Number Logic', 'Motor-Skill Labs', 'Sensory Play'],
      icon: Brain,
      slug: 'oxford-preprimary'
    },
    {
      title: 'PRIMARY YEARS',
      grades: 'Grades 1 to 5',
      partner: 'Oxford Core',
      desc: 'Bridging conceptual learning with practical lab observation. The start of the I-STEM journey.',
      features: ['Inquiry-Based Science', 'Global English', 'Logic Mastery', 'Junior Robotics'],
      // Added missing Microscope import to fix reference error
      icon: Microscope,
      slug: 'oxford-primary'
    },
    {
      title: 'HIGH SCHOOL',
      grades: 'Grades 6 to 10',
      partner: 'TS State Board + Quanta I-STEM',
      desc: 'Preparing for board excellence while mastering industrial-grade hardware and software engineering.',
      features: ['State Board Mastery', 'Applied Physics', 'AI Programming', 'Elite Leadership'],
      icon: Cpu,
      slug: 'ts-stateboard'
    }
  ];

  return (
    <div className="bg-white pb-32 pt-20">
      <SEO title="Academic Matrix" />
      
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center border-b border-slate-100 relative overflow-hidden">
        {/* Fix: use colorA instead of color and cast to tuple */}
        <Iridescence colorA={[0.9, 1, 1] as [number, number, number]} speed={0.3} className="opacity-50" />
        <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-40"></div>
        <SmoothReveal>
          <div className="inline-flex flex-col items-center gap-6 mb-12 relative z-10">
            <Magnet strength={0.2}>
              <img src="https://oxfordadvantage.co.in/OxfordAdvantage/Images/OxfordAdvantage/OxfordAdvantageLogo.svg" alt="Oxford Logo" className="h-20 object-contain mb-4 mx-auto" />
            </Magnet>
            <div className="bg-white/70 backdrop-blur-sm border border-brand-indigo/20 rounded-full px-8 py-2.5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-indigo">Core Curriculum Synergy</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-[8rem] font-display font-bold text-brand-indigo uppercase tracking-tighter mb-10 leading-none relative z-10">
            THE <span className="text-brand-red">MATRIX</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 font-light max-w-4xl mx-auto italic leading-relaxed relative z-10">
            QuantaNova blends world-class <strong className="text-brand-indigo">Oxford Advantage</strong> pedagogy with 21st-century I-STEM implementation.
          </p>
        </SmoothReveal>
      </section>

      {/* Grade Levels Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {levels.map((level, idx) => (
            <SmoothReveal key={idx} delay={idx * 150}>
              <div className="bg-slate-50 rounded-[4rem] p-12 md:p-20 border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center hover:border-brand-red/20 transition-all shadow-2xl">
                <div className="lg:col-span-1 hidden lg:block">
                   <div className="w-16 h-16 bg-brand-red text-white rounded-2xl flex items-center justify-center font-display font-bold text-2xl">0{idx+1}</div>
                </div>
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-2">
                    <div className="text-[10px] font-black text-brand-red uppercase tracking-[0.4em]">{level.title}</div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none">{level.grades}</h2>
                    <div className="text-brand-indigo font-bold text-sm italic">{level.partner}</div>
                  </div>
                  <p className="text-slate-500 text-xl font-light leading-relaxed">{level.desc}</p>
                  <div className="flex flex-wrap gap-4">
                     {level.features.map(f => (
                       <div key={f} className="bg-white px-6 py-2 rounded-full border border-slate-200 text-[10px] font-black uppercase text-brand-indigo tracking-widest flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-brand-red" /> {f}
                       </div>
                     ))}
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-10">
                   <div className="w-32 h-32 bg-white rounded-[2.5rem] border border-slate-100 flex items-center justify-center text-brand-indigo shadow-xl">
                      <level.icon size={64} />
                   </div>
                   <Link to={`/curriculum/${level.slug}`} className="w-full">
                      <Button variant="primary" className="w-full rounded-2xl py-6 flex items-center justify-center gap-3 uppercase font-black tracking-widest">
                        Full Syllabus <ChevronRight size={18} />
                      </Button>
                   </Link>
                </div>
              </div>
            </SmoothReveal>
          ))}
        </div>
      </section>

      {/* Final Callout */}
      <section className="py-32 bg-navy-950 text-white blueprint-major">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
           <ShieldCheck size={64} className="text-brand-red mx-auto" />
           <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter">GLOBAL <span className="text-brand-red">BENCHMARKS</span></h2>
           <p className="text-slate-400 text-2xl font-light leading-relaxed italic">
             "We don't just teach kids to score; we teach them to lead in a globalized economy."
           </p>
           <Link to="/contact" className="inline-block"><Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-navy-950 px-16 py-8 rounded-full text-lg font-black tracking-widest">Inquire About Admission</Button></Link>
        </div>
      </section>
    </div>
  );
};

export default Academics;
