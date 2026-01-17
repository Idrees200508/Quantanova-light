
import React from 'react';
import SmoothReveal from '../components/SmoothReveal';
import SEO from '../components/SEO';
import { Lightbulb, Fingerprint, Cpu, Wrench, Sigma, Globe, Users, BookOpen } from 'lucide-react';

const Manifesto: React.FC = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-white">
            <SEO
                title="Our Manifesto"
                description="Bridging the Gap: Education for the Quantum Age. The QuantaNova School of Excellence Manifesto."
            />

            <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 space-y-24">

                {/* Header */}
                <section className="text-center space-y-8 pt-12 pb-12">
                    <SmoothReveal>
                        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-brand-red/30 bg-brand-red/5">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">The Vision</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-display font-bold text-brand-indigo uppercase tracking-tighter leading-none max-w-5xl mx-auto">
                            Bridging the <span className="text-brand-red">Gap</span>
                        </h1>
                        <p className="text-xl md:text-3xl font-light text-slate-500 tracking-wide uppercase mt-4 max-w-3xl mx-auto">
                            Education for the Quantum Age
                        </p>
                    </SmoothReveal>
                </section>

                {/* Introduction */}
                <section className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5">
                        <SmoothReveal>
                            <div className="sticky top-32 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                                <h2 className="text-2xl font-display font-bold text-brand-indigo mb-6 uppercase leading-tight">The QuantaNova Manifesto</h2>
                                <div className="w-12 h-1 bg-brand-red mb-6"></div>
                                <p className="text-slate-600 leading-relaxed mb-6 font-light text-lg">
                                    The world has entered the "Quantum Age," a defined era driven by artificial intelligence, advanced sciences, and rapid technological transformation.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-light text-lg">
                                    Yet, in the face of this seismic shift, the global education system often remains anchored in the past. While classrooms have become more digital, the mode of thinking has largely remained conventional.
                                </p>
                            </div>
                        </SmoothReveal>
                    </div>
                    <div className="lg:col-span-7 space-y-8 text-lg text-slate-700 leading-relaxed font-light">
                        <SmoothReveal delay={100}>
                            <p>
                                <strong className="text-brand-indigo font-bold">QuantaNova School of Excellence</strong>, located in Pragathi Nagar, India, was born from a specific realization by its founder—a Software CEO who observed that the industry needed problem solvers, not just exam-takers.
                            </p>
                        </SmoothReveal>
                        <SmoothReveal delay={200}>
                            <p>
                                Positioned as Asia’s first <strong className="text-brand-red">iSTEM-based school</strong>, QuantaNova exists to solve a fundamental problem: students often know the answers but do not understand the concepts. By reimagining education, the school aims to bridge the widening gap between modern technology and outdated teaching methods, ensuring that learning is meaningful rather than mechanical.
                            </p>
                        </SmoothReveal>
                    </div>
                </section>

                {/* Core Philosophy */}
                <section className="py-12">
                    <SmoothReveal delay={200}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-indigo mb-6 uppercase">The Core Philosophy: <span className="text-brand-red">iSTEM</span></h2>
                            <p className="max-w-3xl mx-auto text-slate-500 text-lg">
                                While traditional STEM programs are often subject-based, theory-heavy, and exam-oriented, QuantaNova’s approach is concept-driven and application-focused.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {[
                                { letter: "i", title: "Innovation", desc: "Not a subject, but a daily habit.", icon: Lightbulb },
                                { letter: "S", title: "Science", desc: "Explored through experimentation.", icon: Fingerprint },
                                { letter: "T", title: "Technology", desc: "To create, not just to consume.", icon: Cpu },
                                { letter: "E", title: "Engineering", desc: "Building and real-world solving.", icon: Wrench },
                                { letter: "M", title: "Mathematics", desc: "Logic, patterns, and applications.", icon: Sigma }
                            ].map((item, idx) => (
                                <div key={item.letter} className="group relative p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-xl hover:border-brand-red/20 transition-all duration-500 flex flex-col items-center text-center">
                                    <div className="mb-6 p-4 bg-slate-50 rounded-2xl group-hover:bg-brand-red group-hover:text-white transition-colors">
                                        <item.icon size={24} />
                                    </div>
                                    <span className="absolute top-4 right-4 text-4xl font-display font-black text-slate-100 group-hover:text-brand-indigo/10 transition-colors">{item.letter}</span>
                                    <h3 className="text-lg font-bold text-brand-indigo mb-3">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center p-8 bg-brand-indigo/5 rounded-3xl border border-brand-indigo/10 max-w-4xl mx-auto">
                            <p className="text-brand-indigo font-medium italic text-lg">
                                "From fear of exams to the power of curiosity."
                            </p>
                        </div>
                    </SmoothReveal>
                </section>

                {/* Academic Framework */}
                <section className="bg-slate-50 text-brand-indigo -mx-6 sm:-mx-10 lg:-mx-16 px-6 sm:px-10 lg:px-16 py-24 blueprint-major border-y border-slate-100">
                    <SmoothReveal delay={300}>
                        <div className="max-w-[1600px] mx-auto">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 uppercase text-center">Hybrid Academic Framework</h2>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl hover:border-brand-red/40 transition-all">
                                    <h3 className="text-2xl font-display font-bold text-brand-indigo mb-4">Earl Years - Primary</h3>
                                    <p className="text-xs uppercase tracking-widest text-brand-red mb-6 font-bold">Nursery to Class 5 • Oxford Advantage</p>
                                    <p className="text-slate-600 leading-relaxed font-light">
                                        Focuses on strong foundational learning, language development, and logical thinking through curiosity-driven activities. The teaching approach ensures concept clarity before rigorous evaluation.
                                    </p>
                                </div>
                                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl hover:border-brand-red/40 transition-all">
                                    <h3 className="text-2xl font-display font-bold text-brand-indigo mb-4">Middle & High School</h3>
                                    <p className="text-xs uppercase tracking-widest text-brand-red mb-6 font-bold">Class 6 to Grade 10 • Supercharged State Syllabus</p>
                                    <p className="text-slate-600 leading-relaxed font-light">
                                        Transitioning to the Telangana State Syllabus but enhanced with iSTEM integration. Students meet board standards while possessing the "Research Mindset" required by the modern workforce.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SmoothReveal>
                </section>

                {/* Partnerships */}
                <section className="py-12">
                    <SmoothReveal delay={400}>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-indigo mb-16 uppercase text-center">Strategic Partnerships</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-lg flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                                <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center shrink-0">
                                    <Cpu className="text-brand-red" size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-brand-indigo mb-2">Join Robotics</h3>
                                    <p className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">Robotics Partner</p>
                                    <p className="text-slate-600 font-light">Central to the engineering aspect of iSTEM. Enabling students to build, experiment, and innovate using robotics concepts.</p>
                                </div>
                            </div>
                            <div className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-lg flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                                <div className="w-20 h-20 bg-brand-indigo/10 rounded-full flex items-center justify-center shrink-0">
                                    <CodeIcon className="text-brand-indigo" size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-brand-indigo mb-2">Wheresoft</h3>
                                    <p className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">Technology Partner</p>
                                    <p className="text-slate-600 font-light">Founded by the CEO. Supports digital learning infrastructure, smart classrooms, and innovation labs.</p>
                                </div>
                            </div>
                        </div>
                    </SmoothReveal>
                </section>

                {/* Programs */}
                <section className="space-y-16 py-12">
                    <SmoothReveal delay={500}>
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-indigo uppercase">Beyond The Textbook</h2>
                            <p className="text-lg text-slate-500 uppercase tracking-widest">Concrete Action over Idealistic Statements</p>
                        </div>

                        <div className="grid gap-12">
                            <ProgramCard number="01" title="Weekly iSTEM Day" subtitle="Fridays (Primary) & Saturdays (High School)">
                                Dedicating one full day every week to convert theory into experience. From fun-based exploration to advanced engineering thinking.
                            </ProgramCard>
                            <ProgramCard number="02" title="Novagzine" subtitle="The 'No-Internet' Initiative">
                                A monthly student-led magazine where students research via the school library, not the internet. Handwritten to preserve personal expression and detox from screens.
                            </ProgramCard>
                            <ProgramCard number="03" title="Industry Interactions" subtitle="Real World Context">
                                Actively connecting students with distinguished professionals from science, entrepreneurship, and creative industries.
                            </ProgramCard>
                        </div>
                    </SmoothReveal>
                </section>

                {/* Infrastructure */}
                <section className="py-20 relative">
                    <div className="absolute inset-0 bg-slate-50 -mx-6 sm:-mx-10 lg:-mx-16 rounded-[4rem] -z-10"></div>
                    <SmoothReveal delay={600}>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-indigo mb-12 uppercase text-center">The Knowledge Hub</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                            <InfraCard title="Innovation Zone" desc="Robotics kits, sensors, and prototyping tools." />
                            <InfraCard title="Advanced Labs" desc="Specialized facilities for Science, AI, and Robotics." />
                            <InfraCard title="Smart Classrooms" desc="Technology-enabled spaces for interactive learning." />
                        </div>
                    </SmoothReveal>
                </section>

                {/* Conclusion */}
                <section className="text-center max-w-4xl mx-auto space-y-10 py-12">
                    <SmoothReveal delay={700}>
                        <div className="w-24 h-24 bg-brand-red mx-auto rounded-full flex items-center justify-center mb-8 shadow-xl shadow-brand-red/30">
                            <Globe className="text-white" size={40} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-indigo uppercase leading-none">Empowering <br />Future Leaders</h2>
                        <p className="text-xl md:text-2xl text-slate-500 font-light italic leading-relaxed">
                            "Scientifically advanced, ethically grounded, and innovation-driven."
                        </p>
                        <div className="h-px w-full bg-slate-200"></div>
                        <p className="text-lg text-brand-indigo font-bold uppercase tracking-widest">
                            In 2026, We Open Our Doors.
                        </p>
                    </SmoothReveal>
                </section>

            </div>
        </div>
    );
};

const ProgramCard: React.FC<{ number: string, title: string, subtitle: string, children: React.ReactNode }> = ({ number, title, subtitle, children }) => (
    <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-100 pb-12 last:border-0">
        <div className="text-6xl font-display font-black text-slate-100 md:w-32 text-center shrink-0">{number}</div>
        <div className="space-y-4">
            <h3 className="text-3xl font-bold text-brand-indigo">{title}</h3>
            <div className="inline-block px-3 py-1 bg-slate-100 rounded-md text-xs font-bold uppercase tracking-widest text-slate-500">{subtitle}</div>
            <p className="text-lg text-slate-600 leading-relaxed font-light">{children}</p>
        </div>
    </div>
);

const InfraCard: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
    <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
        <h3 className="font-display font-bold text-brand-indigo text-xl mb-4">{title}</h3>
        <p className="text-slate-500 font-light">{desc}</p>
    </div>
);

const CodeIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

export default Manifesto;
