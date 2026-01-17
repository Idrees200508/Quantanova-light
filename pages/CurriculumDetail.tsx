
import React from 'react';
/* Fix: Standard imports for react-router-dom v6 hooks and components */
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Cpu, Brain, Microscope, Bot, Sparkles, GraduationCap } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const CurriculumDetail: React.FC = () => {
  const { slug } = useParams();

  const dataMap: Record<string, any> = {
    'oxford-preprimary': {
      title: 'Oxford Advantage',
      level: 'Nursery to UKG',
      theme: 'gold-500',
      icon: Brain,
      description: 'The early years at QuantaNova are defined by sensory exploration and logical awakening. We leverage the world-class Oxford Advantage framework to build a rock-solid foundation.',
      modules: [
        { title: 'Phonological Awareness', desc: 'Developing mastery over language sounds and rhythms.' },
        { title: 'Sensory Logic', desc: 'Learning mathematics and spatial concepts through physical manipulation.' },
        { title: 'Emotional Intelligence', desc: 'Building resilience and empathy in a collaborative play environment.' }
      ],
      techIntegration: 'Interactive smart panels and tactile logic puzzles designed for cognitive development.',
      iStemDay: 'Experimental Fridays: Guided sensory experiments with water, light, and non-toxic materials.'
    },
    'oxford-primary': {
      title: 'Oxford Advantage',
      level: 'Grades 1 to 5',
      theme: 'neon-blue',
      icon: Microscope,
      description: 'Moving from "What" to "Why". Our primary curriculum encourages rigorous inquiry and conceptual visualization, bridging the gap between books and reality.',
      modules: [
        { title: 'Inquiry-Based Science', desc: 'Primary science taught through observation and documentation.' },
        { title: 'Global Literacy', desc: 'Advanced reading and comprehension using global literature.' },
        { title: 'Numerical Fluency', desc: 'Moving beyond rote calculations to logical problem-solving.' }
      ],
      techIntegration: 'Digital simulations, augmented reality learning modules, and foundational coding concepts.',
      iStemDay: 'Innovation Fridays: Building physical prototypes and basic circuit understanding.'
    },
    'ts-stateboard': {
      title: 'TS State Board',
      level: 'Grades 6 to 10',
      theme: 'neon-pink',
      icon: Cpu,
      description: 'Preparing for institutional success without compromising on innovation. We blend the TS State Board syllabus with advanced technical training.',
      modules: [
        { title: 'Syllabus Mastery', desc: 'Intensive preparation for state board academic excellence.' },
        { title: 'Leadership Dynamics', desc: 'Formal workshops on public speaking, project management, and ethics.' },
        { title: 'Applied Hardware', desc: 'Integration of physics and math with actual electronics engineering.' }
      ],
      techIntegration: 'Professional robotics kits, AI programming environments, and advanced physics instrumentation.',
      iStemDay: 'iSTEM Saturdays: Full-day hardware hacking, prototype building, and competitive robotics.'
    }
  };

  const curriculum = dataMap[slug || ''] || dataMap['oxford-primary'];
  const Icon = curriculum.icon;
  const themeColor = 'text-brand-red';
  const themeBg = 'bg-brand-red';
  const themeBorder = 'border-brand-red/20';

  return (
    <div className="min-h-screen bg-white pb-20 pt-10">
      <SEO title={`${curriculum.title} | ${curriculum.level}`} />
      
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden border-b border-slate-100 pt-32">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${themeBg} rounded-full blur-[120px]`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link 
            to="/academics" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-red mb-16 transition-colors uppercase text-[10px] font-black tracking-[0.2em] group relative z-20"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            BACK TO ACADEMICS
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <div className={`${themeColor} font-display font-bold text-xs md:text-sm uppercase tracking-[0.5em] animate-in fade-in slide-in-from-left-4 duration-700`}>
                  {curriculum.level}
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                  {curriculum.title.split(' ')[0]} <br/> 
                  <span className="block">{curriculum.title.split(' ')[1]}</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light max-w-2xl animate-in fade-in duration-1000 delay-300">
                {curriculum.description}
              </p>
              <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
                 <div className={`px-6 py-2.5 rounded-full border border-slate-200 bg-slate-50 flex items-center gap-3 shadow-sm`}>
                    <ShieldCheck className={themeColor} size={18} />
                    <span className="text-[10px] font-black uppercase text-brand-indigo tracking-[0.2em]">OFFICIAL STANDARDS</span>
                 </div>
                 <div className={`px-6 py-2.5 rounded-full border border-slate-200 bg-slate-50 flex items-center gap-3 shadow-sm`}>
                    <Sparkles className="text-brand-red" size={18} />
                    <span className="text-[10px] font-black uppercase text-brand-indigo tracking-[0.2em]">ISTEM INTEGRATED</span>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block animate-in zoom-in duration-1000">
               <div className={`absolute inset-0 bg-brand-red/5 blur-[100px] rounded-full animate-pulse`}></div>
               <div className="relative bg-white border border-slate-100 p-20 rounded-[5rem] flex items-center justify-center shadow-2xl">
                  <Icon size={160} className="text-brand-red opacity-10 absolute" />
                  <div className="relative z-10 flex items-center justify-center">
                     <GraduationCap size={80} className="text-brand-indigo shadow-brand-indigo/10" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {(curriculum.modules || []).map((mod: any, idx: number) => (
             <div key={idx} className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 space-y-6 hover:border-brand-red/20 transition-all group shadow-sm">
                <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-red border border-slate-200 group-hover:scale-110 transition-transform shadow-sm`}>
                   <CheckCircle2 size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-brand-indigo uppercase tracking-tight">{mod.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-light">{mod.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Footer Callout */}
      <section className="py-32 text-center px-6 bg-slate-50 border-t border-slate-100">
         <h2 className="text-4xl md:text-8xl font-display font-bold text-brand-indigo mb-10 uppercase tracking-tighter">BEGIN THE <span className="text-brand-red">JOURNEY</span></h2>
         <p className="text-slate-500 text-xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">Admissions for the 2026-27 session are now evaluating students for this academic track. Limited seats available to maintain expert supervision and institutional excellence.</p>
         <Link to="/contact">
           <Button variant="primary" className="px-16 py-6 rounded-full uppercase font-black text-xl tracking-[0.2em] shadow-xl shadow-brand-red/20">
             START ADMISSION PROCESS
           </Button>
         </Link>
      </section>
    </div>
  );
};

export default CurriculumDetail;
