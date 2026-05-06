/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar, Hero, Services, Benefits, Testimonials, CTA, Footer } from './components/PageSections';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { initialConfig, SiteConfig } from './data/siteConfig';
import { 
  Quote,
  MessageCircle,
  Phone,
  ArrowRight,
  Settings,
  X,
  Lock
} from 'lucide-react';

function AdminLoginModal({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState('');
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center text-center"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-primary transition-colors">
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
            <Lock className="w-8 h-8" />
          </div>
          
          <h3 className="text-2xl font-extrabold text-zinc-900 mb-2">Panel de Edición</h3>
          <p className="text-zinc-500 text-sm mb-6">Ingresa la clave para habilitar las herramientas de edición.</p>
          
          <input 
            type="password" 
            placeholder="Clave de acceso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onLogin(password)}
            className="w-full bg-zinc-100 border-none rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-primary text-center font-bold"
            autoFocus
          />
          
          <button 
            onClick={() => onLogin(password)}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Entrar
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('disletras_config');
      return saved ? JSON.parse(saved) : initialConfig;
    } catch (e) {
      console.error('Error loading config:', e);
      return initialConfig;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('disletras_admin') === 'true';
    if (isAdmin) setIsEditing(true);
  }, []);

  const handleLogin = (password: string) => {
    if (password === 'disletras2026') {
      setIsEditing(true);
      setShowLogin(false);
      sessionStorage.setItem('disletras_admin', 'true');
    } else {
      alert('Clave incorrecta');
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('disletras_config', JSON.stringify(config));
    } catch (e) {
      console.error('Storage error (likely quota exceeded):', e);
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        alert('La imagen es demasiado grande para guardarse. Por favor usa una más pequeña.');
      }
    }
  }, [config]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-secondary-container selection:text-secondary group/app">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar config={config} setConfig={setConfig} isEditing={isEditing} />
      
      <main>
        <Hero config={config} setConfig={setConfig} isEditing={isEditing} />
        <Services config={config} setConfig={setConfig} isEditing={isEditing} />
        <Benefits config={config} setConfig={setConfig} isEditing={isEditing} />
        <Testimonials config={config} setConfig={setConfig} isEditing={isEditing} />
        <CTA config={config} />
      </main>
      
      <Footer config={config} setConfig={setConfig} isEditing={isEditing} />

      {/* Admin Toggle Button */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 items-end z-50">
        {isEditing ? (
          <div className="flex flex-col gap-2 bg-white/90 backdrop-blur p-4 rounded-[2rem] shadow-2xl border border-zinc-200">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-2">Panel Admin</h4>
            <div className="flex gap-2">
              <button 
                onClick={() => { if(confirm('¿Reiniciar a valores originales?')) { setConfig(initialConfig); localStorage.removeItem('disletras_config'); } }}
                className="bg-zinc-800 text-white text-[10px] px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors"
              >
                Resetear Web
              </button>
              <button 
                onClick={() => { setIsEditing(false); sessionStorage.removeItem('disletras_admin'); }}
                className="bg-red-600 text-white text-[10px] px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                Cerrar Edición
              </button>
            </div>
            <div className="mt-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-[9px] text-primary font-bold leading-tight uppercase tracking-tighter">
                Para descargar la web:
              </p>
              <p className="text-[10px] text-zinc-600 leading-tight mt-1">
                Haz clic en el icono de <strong>Ajustes (engranaje)</strong> arriba a la derecha de AI Studio y selecciona <strong>Export code</strong>.
              </p>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-xs font-bold px-1">Editar Web</span>
          </button>
        )}
      </div>

      <AdminLoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
