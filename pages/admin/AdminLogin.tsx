
import React, { useState } from 'react';
/* Fix: Standard import for react-router-dom useNavigate */
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import { Lock, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '../../components/Button';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useSite();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/wbmanagement/3276/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username !== 'admin') {
        setError('Invalid username');
        return;
    }
    
    const success = login(password);
    if (success) {
      navigate('/wbmanagement/3276/dashboard');
    } else {
      setError('Invalid credentials provided.');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-md w-full bg-navy-900 border border-slate-700 rounded-2xl p-8 shadow-2xl relative z-10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
            <Lock className="text-gold-500 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Management Portal</h1>
          <p className="text-slate-400 text-sm mt-2">Restricted Access. Authorized Personnel Only.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-500 w-5 h-5 shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-navy-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="Enter password"
            />
          </div>

          <Button fullWidth type="submit" variant="primary" className="mt-4">
            Access Portal <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
        
        <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">IP Logged for security purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
