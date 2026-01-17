
import React from 'react';
import { Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';

const Footer: React.FC = () => {
  const { content } = useSite();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-1">
            <div className="flex items-center space-x-4 mb-6">
               <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src="https://quantanovaschool.org/logo/logo.png" 
                    alt="QuantaNova Logo" 
                    className="w-full h-full object-contain"
                  />
               </div>
               <div className="flex flex-col">
                  <span className="font-display font-bold text-xl tracking-wider text-brand-indigo leading-none">QUANTANOVA</span>
                  <span className="text-[8px] font-black text-brand-red uppercase tracking-[0.3em] mt-1">School of Excellence</span>
               </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {content.footerDescription}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@QuantaNovaSchoolofExcellence" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-red transition-colors"><Youtube size={20} /></a>
              <a href="https://x.com/Excellence_Nova" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-red transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.instagram.com/quantanovaschool?igsh=ZWcxOTUyNXZvZ2ph" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-red transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-brand-indigo text-lg mb-6 uppercase tracking-widest">Quick Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-600 hover:text-brand-red text-sm transition-colors">Home Portal</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-brand-red text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-brand-indigo text-lg mb-6 uppercase tracking-widest">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-brand-red w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Pragathi Nagar,<br />Hyderabad, Telangana</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-red w-5 h-5 shrink-0" />
                <span className="text-slate-600 text-sm">{content.contactPhone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-red w-5 h-5 shrink-0" />
                <span className="text-slate-600 text-sm">{content.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-12 pt-8 text-center md:text-left">
          <p className="text-slate-400 text-xs">© {new Date().getFullYear()} QuantaNova School of Excellence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
