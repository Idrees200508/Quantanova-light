
import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, Youtube, Instagram, Linkedin, CalendarCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import { useSite } from '../contexts/SiteContext';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { content } = useSite();
  const { showCampusVisit, googleFormUrl } = content;
  
  const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=17.523917,78.390750";
  const mapEmbedUrl = "https://maps.google.com/maps?q=17.523917,78.390750&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="min-h-screen pt-20 pb-20 bg-white">
      <SEO />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
            <span className="text-brand-red font-display text-[10px] uppercase tracking-widest font-black">Direct Communication Channel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-tight">Get in <span className="text-brand-red">Touch</span></h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">We'd love to hear from you. Reach out with any questions or visit our campus.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-10">
             <div className="bg-slate-50 p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl">
               <h3 className="text-2xl font-display font-bold text-brand-indigo mb-10 uppercase tracking-widest">Contact Information</h3>
               
               <div className="space-y-10">
                 <a 
                   href={MAPS_LINK} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-start gap-6 group cursor-pointer"
                 >
                   <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-200 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                     <MapPin size={24} />
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-brand-indigo font-bold text-lg">Our Campus</h4>
                        <ArrowUpRight size={16} className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300" />
                     </div>
                     <p className="text-slate-500 text-sm leading-relaxed">Pragathi Nagar,<br />Hyderabad, Telangana</p>
                   </div>
                 </a>

                 <a href={`tel:${content.contactPhone}`} className="flex items-start gap-6 group">
                   <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-200 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                     <Phone size={24} />
                   </div>
                   <div>
                     <h4 className="text-brand-indigo font-bold text-lg mb-1">Phone</h4>
                     <p className="text-slate-500 text-sm leading-relaxed">{content.contactPhone}</p>
                   </div>
                 </a>

                 <a href={`mailto:${content.contactEmail}`} className="flex items-start gap-6 group">
                   <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-200 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                     <Mail size={24} />
                   </div>
                   <div>
                     <h4 className="text-brand-indigo font-bold text-lg mb-1">Email</h4>
                     <p className="text-slate-500 text-sm leading-relaxed">{content.contactEmail}</p>
                   </div>
                 </a>
               </div>
             </div>

             <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-display font-bold text-brand-indigo mb-6 uppercase tracking-widest">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.youtube.com/@QuantaNovaSchoolofExcellence" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-2xl text-slate-400 hover:text-brand-red hover:border-brand-red/50 border border-slate-200 transition-all group shadow-sm">
                    <Youtube size={24} className="group-hover:scale-110 transition-transform"/>
                  </a>
                  <a href="https://x.com/Excellence_Nova" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-2xl text-slate-400 hover:text-brand-red hover:border-brand-red/50 border border-slate-200 transition-all group shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/quantanovaschool?igsh=ZWcxOTUyNXZvZ2ph" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-2xl text-slate-400 hover:text-brand-red hover:border-brand-red/50 border border-slate-200 transition-all group shadow-sm">
                    <Instagram size={24} className="group-hover:scale-110 transition-transform"/>
                  </a>
                  <a href="#" className="p-4 bg-white rounded-2xl text-slate-400 hover:text-brand-red hover:border-brand-red/50 border border-slate-200 transition-all group shadow-sm">
                    <Linkedin size={24} className="group-hover:scale-110 transition-transform"/>
                  </a>
                </div>
             </div>
          </div>

          {/* Visit & Map Side */}
          <div className="space-y-10">
             {showCampusVisit && (
               <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center justify-center space-y-8 relative overflow-hidden group shadow-xl">
                  <div className="absolute top-10 right-10 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg transform rotate-6 group-hover:rotate-0 transition-transform">
                    Complementary Visit
                  </div>

                  <div className="relative z-10 w-24 h-24 bg-white rounded-3xl flex items-center justify-center border border-brand-red/10 shadow-sm">
                     <CalendarCheck className="w-12 h-12 text-brand-red" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-indigo uppercase tracking-tighter">Experience QuantaNova</h3>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto font-light">
                      Step into the future. We invite parents and students to tour our cutting-edge STEM labs and innovative learning spaces. <span className="text-brand-red font-bold">This visit is entirely complementary.</span>
                    </p>
                  </div>

                  <div className="relative z-10 w-full pt-4">
                    <a 
                      href={googleFormUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button fullWidth className="py-5 text-xl group/btn rounded-2xl uppercase tracking-widest font-black">
                        Schedule Free Visit <ExternalLink size={20} className="ml-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
               </div>
             )}

             <div className="bg-slate-100 h-[450px] rounded-[3rem] overflow-hidden relative border border-slate-200 flex items-center justify-center group shadow-xl">
                <iframe
                  title="QuantaNova Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                
                <div className="absolute top-8 right-8 z-10 flex flex-col items-end gap-3">
                   <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-lg">
                      <span className="w-2.5 h-2.5 bg-brand-red rounded-full animate-pulse"></span>
                      <span className="text-[11px] font-display font-bold text-brand-indigo uppercase tracking-widest">QuantaNova Campus</span>
                   </div>
                   <a 
                     href={MAPS_LINK} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="bg-brand-red hover:opacity-90 text-white px-6 py-3 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105"
                   >
                     <ExternalLink size={16} />
                     Open Full Maps
                   </a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
