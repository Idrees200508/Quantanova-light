
import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
/* Fix: Added missing Button import */
import Button from '../components/Button';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 pt-20">
      <SEO />
      <div className="max-w-[1000px] mx-auto px-6 pt-16">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-red mb-12 transition-colors uppercase text-[10px] font-black tracking-[0.3em] group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          EXIT PORTAL
        </Link>

        <header className="mb-20">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-2.5 mb-8 text-brand-indigo shadow-sm">
            <ShieldCheck size={20} className="text-brand-red" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-black">Data Sovereignty Charter</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-brand-indigo uppercase tracking-tighter mb-4 leading-none">Privacy <span className="text-brand-red">Policy</span></h1>
          <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest border-l-4 border-brand-red pl-4">Revised: October 2025 • Version 2.0</p>
        </header>

        <div className="space-y-20">
          <section className="space-y-8">
            <h3 className="text-3xl font-display font-bold text-brand-indigo flex items-center gap-5 uppercase tracking-tight">
              <div className="w-2 h-8 bg-brand-red rounded-full"></div>
              Data Collection
            </h3>
            <p className="text-slate-600 text-xl leading-relaxed font-light">
              QuantaNova School of Excellence collects only the metadata and essential records required to facilitate institutional safety and academic growth. This includes validated academic records, legal guardian identification, and health disclosures critical for emergency protocols.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
               <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col gap-6 shadow-sm group hover:border-brand-red/20 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-indigo border border-slate-200 shadow-sm group-hover:text-brand-red transition-colors">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h4 className="text-brand-indigo font-bold text-xl uppercase tracking-tight mb-2">Direct Artifacts</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Enrollment records, government identification, and primary correspondence provided voluntarily by guardians.</p>
                  </div>
               </div>
               <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col gap-6 shadow-sm group hover:border-brand-red/20 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-indigo border border-slate-200 shadow-sm group-hover:text-brand-red transition-colors">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h4 className="text-brand-indigo font-bold text-xl uppercase tracking-tight mb-2">Automated Metrics</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Digital attendance logs, academic performance analytics, and security footage within campus parameters.</p>
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-3xl font-display font-bold text-brand-indigo flex items-center gap-5 uppercase tracking-tight">
              <div className="w-2 h-8 bg-brand-red rounded-full"></div>
              Digital Transparency
            </h3>
            <p className="text-slate-600 text-xl leading-relaxed font-light">
              As an innovative institution, QuantaNova captures archival media of student progress during iSTEM Innovation Days and campus milestones. These assets are utilized exclusively for the student magazine (**Novagzine**), official social communications, and academic research papers. Absolute guardian opt-outs are available during the final enrollment stage.
            </p>
          </section>

          <section className="space-y-8 pb-12">
            <h3 className="text-3xl font-display font-bold text-brand-indigo flex items-center gap-5 uppercase tracking-tight">
              <div className="w-2 h-8 bg-brand-red rounded-full"></div>
              Security Infrastructure
            </h3>
            <p className="text-slate-600 text-xl leading-relaxed font-light">
              We do not commercialize student data. Information is shared only with verified educational partners (e.g., **Oxford Advantage**) or state authorities when mandated by law. Our internal neural networks are secured with 256-bit encryption standards to ensure the sanctity of the student archive.
            </p>
          </section>

          <div className="bg-brand-indigo p-12 rounded-[4rem] text-center shadow-2xl shadow-brand-indigo/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px]"></div>
             <FileText className="text-white/20 mx-auto mb-8" size={64} />
             <h4 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-widest">Legal Disclosure Matrix</h4>
             <p className="text-slate-300 mb-12 max-w-xl mx-auto font-light leading-relaxed">For comprehensive legal documentation or to request a private data audit, please synchronize with our compliance office.</p>
             <Link to="/contact">
               <Button variant="primary" className="mx-auto px-12 py-5 rounded-full uppercase font-black text-xs tracking-[0.3em]">Contact Compliance Office</Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
