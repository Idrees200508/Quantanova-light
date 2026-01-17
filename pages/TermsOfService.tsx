
import React from 'react';
import { Scale, FileText, Gavel, UserCheck, ArrowLeft } from 'lucide-react';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 pt-20">
      <SEO />
      <div className="max-w-[1000px] mx-auto px-6 pt-16">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-red mb-12 transition-colors uppercase text-[10px] font-black tracking-[0.3em] group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          EXIT COMPACT
        </Link>

        <header className="mb-20">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-2.5 mb-8 text-brand-indigo shadow-sm">
            <Scale size={20} className="text-brand-red" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-black">Institutional compact v2026</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-brand-indigo uppercase tracking-tighter mb-4 leading-none">Terms of <span className="text-brand-red">Service</span></h1>
          <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest border-l-4 border-brand-red pl-4">Enforcement Date: Session 2026-27</p>
        </header>

        <div className="space-y-20">
          <section className="space-y-8">
            <h3 className="text-3xl font-display font-bold text-brand-indigo flex items-center gap-5 uppercase tracking-tight">
              <div className="w-2 h-8 bg-brand-red rounded-full"></div>
              Enrollment Compact
            </h3>
            <p className="text-slate-600 text-xl leading-relaxed font-light">
              Admission to QuantaNova is a mutual commitment to intellectual excellence. By finalizing enrollment, students and legal guardians agree to adhere to the institution's academic rigor, including the mandatory weekly **iSTEM Innovation Days**. Participation in original research and laboratory sessions is a core requirement of the curriculum.
            </p>
          </section>

          <section className="space-y-8">
            <h3 className="text-3xl font-display font-bold text-brand-indigo flex items-center gap-5 uppercase tracking-tight">
              <div className="w-2 h-8 bg-brand-red rounded-full"></div>
              Behavioral Standards
            </h3>
            <p className="text-slate-600 text-xl leading-relaxed font-light">
              QuantaNova maintains a zero-tolerance mandate regarding bullying, harassment, or any activity that compromises campus safety. Intellectual honesty is paramount; plagiarism or internet-copying in **Novagzine** submissions or project reports is strictly monitored by our neural auditing systems.
            </p>
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 border-l-[10px] border-l-brand-red shadow-inner">
               <div className="flex gap-6">
                  <Gavel size={32} className="text-brand-indigo shrink-0" />
                  <p className="text-brand-indigo italic text-lg leading-relaxed font-medium">
                    "The institution reserves the definitive right to suspend or terminate enrollment for repeated violations of the Code of Conduct or confirmed academic dishonesty."
                  </p>
               </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-3xl font-display font-bold text-brand-indigo flex items-center gap-5 uppercase tracking-tight">
              <div className="w-2 h-8 bg-brand-red rounded-full"></div>
              Financial Protocol
            </h3>
            <p className="text-slate-600 text-xl leading-relaxed font-light">
              Institutional fees are architected to support high-bandwidth infrastructure, advanced fabrication labs, and world-class expert faculty. All payment schedules must be synchronized with the registrar's calendar. Refund protocols are governed by the specific dates defined in the **2026-27 Enrollment Guide**.
            </p>
          </section>

          <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-200 flex flex-col md:flex-row items-center gap-10 shadow-sm">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-slate-200 text-brand-red shadow-lg shrink-0">
                <UserCheck size={48} />
             </div>
             <div>
                <h4 className="text-2xl font-display font-bold text-brand-indigo mb-3 uppercase tracking-tight">Acceptance Confirmation</h4>
                <p className="text-slate-500 text-base leading-relaxed font-light">By accessing this institutional portal or proceeding with enrollment, you acknowledge that you have reviewed and consented to the **QuantaNova Institutional Compact** in its entirety.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
