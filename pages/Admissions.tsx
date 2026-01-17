
import React from 'react';
import { FileText, Calendar, UserCheck, CreditCard } from 'lucide-react';
import Button from '../components/Button';
/* Fix: Standard import for react-router-dom Link */
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Admissions: React.FC = () => {
  return (
    <div className="pb-20 bg-white min-h-screen pt-16">
       <SEO title="Join the Future" description="Secure your child's place in India's premier iSTEM-powered institution." />
       
       {/* Header */}
       <section className="py-32 text-center bg-slate-50 border-b border-slate-100">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-brand-red/20 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
            <span className="text-brand-red font-display text-[10px] uppercase tracking-widest font-black">Open Enrollment Matrix</span>
         </div>
         <h1 className="text-5xl md:text-8xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-tighter leading-none">Join the <span className="text-brand-red">Future</span></h1>
         <p className="text-xl text-slate-500 max-w-3xl mx-auto px-4 font-light leading-relaxed">
           We are looking for curious minds and future leaders. The admission process is designed to identify potential, not just rote memory.
         </p>
       </section>

       {/* Process Steps */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "1. Enquiry", desc: "Reach out via our contact form or visit our campus." },
              { icon: UserCheck, title: "2. Assessment", desc: "A fun, logic-based I-STEM aptitude test." },
              { icon: Calendar, title: "3. Interaction", desc: "Parent and student interview with our Principal." },
              { icon: Calendar, title: "4. Enrollment", desc: "Fee payment and document submission." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group hover:border-brand-red/30 transition-all">
                <div className="absolute top-0 right-0 text-9xl font-display font-bold text-slate-50 opacity-50 -mr-4 -mt-4 transition-colors group-hover:text-brand-red/10">{idx + 1}</div>
                <step.icon className="w-12 h-12 text-brand-red mb-6" />
                <h3 className="text-xl font-bold text-brand-indigo mb-3 uppercase tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
         </div>
       </section>

       {/* Details Grid */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Requirements */}
            <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 shadow-inner">
              <h2 className="text-2xl font-display font-bold text-brand-indigo mb-10 border-b border-slate-200 pb-4 uppercase tracking-widest">Eligibility & Documents</h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-brand-red font-bold mb-3 uppercase tracking-tight text-lg">Age Criteria</h4>
                  <p className="text-slate-600 text-base leading-relaxed">Grade 1: 6+ years as of March 31st</p>
                  <p className="text-slate-600 text-base leading-relaxed">Pre-Kindergarten: 4+ years</p>
                </div>
                <div>
                  <h4 className="text-brand-red font-bold mb-3 uppercase tracking-tight text-lg">Required Documents</h4>
                  <ul className="space-y-3">
                    {['Birth Certificate', 'Previous School Report Card (last 2 years)', 'Vaccination Record', 'Passport size photographs (Student & Parents)', 'Aadhar Card / ID Proof'].map((doc, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div> {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="flex flex-col justify-center bg-white p-12 rounded-[3.5rem] border-2 border-slate-100 text-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl"></div>
               <h2 className="text-4xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-tighter">Admissions Open</h2>
               <p className="text-slate-500 text-lg mb-10 font-light leading-relaxed">
                 Seats are limited for the upcoming academic session. Please visit our campus or contact us to start the enrollment process.
               </p>
               <div className="space-y-6">
                 <Link to="/contact">
                   <Button fullWidth variant="primary" className="py-6 rounded-3xl uppercase font-black tracking-widest shadow-xl shadow-brand-red/20">Enquire Now</Button>
                 </Link>
                 <div className="pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Terminal</p>
                    <p className="text-brand-indigo font-bold">admissions@quantanova.org | +91 70754 91347</p>
                 </div>
               </div>
            </div>
         </div>
       </section>

       {/* Visit Banner */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
         <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between shadow-xl">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h3 className="text-3xl font-display font-bold text-brand-indigo mb-3 uppercase tracking-tight leading-none">Visit Our Campus</h3>
              <p className="text-slate-500 text-lg font-light italic">Schedule a visit to witness our iSTEM labs in action.</p>
            </div>
            <Link to="/contact">
              <Button variant="secondary" className="px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest">Book Campus Tour</Button>
            </Link>
         </div>
       </section>
    </div>
  );
};

export default Admissions;
