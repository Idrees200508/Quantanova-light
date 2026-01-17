
import React from 'react';
import SmoothReveal from '../components/SmoothReveal';
import SEO from '../components/SEO';
import { Calendar, PenTool, Radio, Globe, Zap, Users } from 'lucide-react';
import Iridescence from '../components/Iridescence';

const Experience: React.FC = () => {
    return (
        <div className="pt-24 pb-12 bg-white min-h-screen">
            <SEO title="Experience | Beyond The Textbook" />

            {/* Hero Header */}
            <section className="py-24 bg-brand-indigo text-white relative overflow-hidden">
                <Iridescence colorA={[0.1, 0.15, 0.3]} speed={0.2} className="opacity-30" />
                <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-8">
                    <SmoothReveal>
                        <span className="text-brand-red text-xs font-black uppercase tracking-[0.5em] mb-4 inline-block">Concrete Action over Idealism</span>
                        <h1 className="text-4xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none mb-6">
                            THE <span className="text-brand-gold italic text-white/90">QUANTA</span> <br /> EXPERIENCE
                        </h1>
                        <p className="text-lg md:text-3xl font-light text-slate-300 leading-relaxed italic max-w-3xl mx-auto">
                            "Bridging the Gap through experiential rituals that build curiosity."
                        </p>
                    </SmoothReveal>
                </div>
            </section>

            {/* Weekly iSTEM Days */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <SmoothReveal>
                        <div className="space-y-10">
                            <div className="inline-flex items-center gap-4 bg-brand-red text-white py-3 px-8 rounded-full shadow-2xl">
                                <Calendar size={20} />
                                <span className="font-display font-black text-xs uppercase tracking-widest">Weekly iSTEM Day</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-indigo uppercase tracking-tight leading-none">
                                ONE DAY FOR <br /><span className="text-brand-red">EXPERIENCE</span>
                            </h2>
                            <p className="text-slate-600 text-xl font-light leading-relaxed">
                                Dedicating one full day every week to convert theory into experience. No books, no desks, only innovation zones.
                            </p>
                            <div className="space-y-6">
                                <div className="p-8 bg-slate-50 rounded-3xl border-l-4 border-brand-red shadow-sm">
                                    <h4 className="font-bold text-brand-indigo uppercase mb-2">Fridays (Primary)</h4>
                                    <p className="text-slate-500 font-light">Fun-based exploration & foundational experiments through play.</p>
                                </div>
                                <div className="p-8 bg-slate-50 rounded-3xl border-l-4 border-brand-indigo shadow-sm">
                                    <h4 className="font-bold text-brand-indigo uppercase mb-2">Saturdays (High School)</h4>
                                    <p className="text-slate-500 font-light">Advanced engineering thinking & robotics project-based work.</p>
                                </div>
                            </div>
                        </div>
                    </SmoothReveal>
                    <div className="relative">
                        <SmoothReveal delay={300}>
                            <div className="aspect-[4/5] bg-slate-100 rounded-[5rem] overflow-hidden border border-slate-200 shadow-2xl p-4">
                                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000" className="w-full h-full object-cover rounded-[4rem]" alt="iSTEM Lab" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 bg-brand-red text-white p-10 rounded-[3rem] shadow-2xl animate-pulse-slow">
                                <Zap size={40} className="mb-2" />
                                <div className="text-2xl font-display font-black">20%</div>
                                <p className="text-[8px] uppercase font-black tracking-widest opacity-80">Experiential Curriculum</p>
                            </div>
                        </SmoothReveal>
                    </div>
                </div>
            </section>

            {/* Novagzine Section */}
            <section className="py-32 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
                    <SmoothReveal>
                        <div className="inline-flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 text-brand-red mb-8">
                                <PenTool size={32} />
                            </div>
                            <h2 className="text-4xl md:text-7xl font-display font-bold text-brand-indigo uppercase tracking-tight">NOVAGZINE</h2>
                            <p className="text-brand-red text-xs font-black uppercase tracking-[0.4em] mt-4">The "No-Internet" Hub</p>
                        </div>
                        <p className="max-w-3xl mx-auto text-slate-600 text-xl font-light leading-relaxed mt-12 mb-16">
                            A monthly student-led magazine where research is handwritten and sources are sourced strictly from libraries—detoxing from screens to build deep subject mastery.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Globe, title: "Zero Digital", text: "100% powered by library books." },
                                { icon: PenTool, title: "Handwritten", text: "Preserving the art of personal expression." },
                                { icon: Users, title: "Industry Shared", text: "Sent directly to our tech & academic partners." }
                            ].map((f, i) => (
                                <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl group hover:border-brand-red/30 transition-all">
                                    <f.icon className="text-brand-red mx-auto mb-6" size={32} />
                                    <h4 className="font-display font-bold text-brand-indigo uppercase mb-3">{f.title}</h4>
                                    <p className="text-slate-500 text-sm font-light">{f.text}</p>
                                </div>
                            ))}
                        </div>
                    </SmoothReveal>
                </div>
            </section>

            {/* Final Expert CTA */}
            <section className="py-32 text-center">
                <div className="max-w-4xl mx-auto px-6 space-y-12">
                    <SmoothReveal>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-indigo uppercase">INDUSTRY COLLABORATION</h2>
                        <p className="text-slate-500 text-xl font-light italic">Connecting students with CEOs, Scientists, and Creative Pioneers.</p>
                        <div className="h-px w-32 bg-slate-200 mx-auto mt-12"></div>
                    </SmoothReveal>
                </div>
            </section>
        </div>
    );
};

export default Experience;
