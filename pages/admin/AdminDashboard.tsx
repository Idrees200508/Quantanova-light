
import React from 'react';
/* Fix: Standard imports for react-router-dom v6 */
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import { 
  LogOut, Settings, PenTool, ImageIcon, 
  Database, Home, Globe, LayoutDashboard, 
  Star, Users, FileText, LayoutGrid
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { logout, isAuthenticated } = useSite();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) navigate('/wbmanagement/3276/login');
  }, [isAuthenticated, navigate]);

  const navItems = [
    { path: '/wbmanagement/3276/dashboard', icon: LayoutDashboard, label: 'Control Hub' },
    { path: '/wbmanagement/3276/dashboard/home', icon: Home, label: 'Portal UI' },
    { path: '/wbmanagement/3276/dashboard/slider', icon: LayoutGrid, label: 'Slider Matrix' },
    { path: '/wbmanagement/3276/dashboard/journal', icon: PenTool, label: 'Journal Studio' },
    { path: '/wbmanagement/3276/dashboard/spotlights', icon: Star, label: 'Excellence Hub' },
    { path: '/wbmanagement/3276/dashboard/faculty', icon: Users, label: 'Faculty Matrix' },
    { path: '/wbmanagement/3276/dashboard/resources', icon: FileText, label: 'Circulars & Docs' },
    { path: '/wbmanagement/3276/dashboard/gallery', icon: ImageIcon, label: 'Media Lab' },
    { path: '/wbmanagement/3276/dashboard/settings', icon: Settings, label: 'Global Config' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex text-slate-300 font-sans selection:bg-brand-red/30">
      <aside className="w-80 bg-[#0a0f1d] border-r border-white/5 flex flex-col fixed h-full z-50 shadow-2xl">
        <div className="p-10 border-b border-white/5 flex items-center gap-5">
          <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center text-white font-black shadow-[0_0_30px_rgba(198,25,32,0.3)]">QN</div>
          <div className="overflow-hidden">
            <h1 className="font-display font-bold text-white text-lg tracking-widest">QUANTA<span className="text-brand-red">CMS</span></h1>
            <p className="text-[7px] text-slate-500 font-black uppercase tracking-[0.4em]">Auth: Institutional_v5</p>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`w-full flex items-center space-x-5 px-6 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${isActive ? 'bg-brand-red text-white' : 'text-slate-500 hover:bg-white/5'}`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-brand-red'} />
                <span className="font-bold uppercase text-[10px] tracking-[0.2em]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-8 border-t border-white/5 space-y-4">
          <Link to="/" className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/5">
             <Globe size={14} /> View Public Portal
          </Link>
          <button onClick={logout} className="w-full flex items-center justify-center gap-3 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl border border-transparent hover:border-red-500/20">
            <LogOut size={18} />
            <span className="font-bold uppercase text-[9px] tracking-[0.2em]">Kill Session</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-80 min-h-screen bg-[#020617] relative">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
