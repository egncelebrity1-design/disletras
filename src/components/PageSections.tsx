import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Rocket, 
  Users, 
  ClipboardCheck, 
  ArrowRight, 
  Verified, 
  BarChart3, 
  Clock, 
  Quote, 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle,
  Star,
  Sparkles,
  Facebook,
  X,
  Upload,
  Plus,
  Trash2,
  Settings
} from 'lucide-react';
import { useState, useRef, ChangeEvent } from 'react';
import { SiteConfig, Testimonial } from '../data/siteConfig';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/ADBb0ugcojQjeXjDLMK3v_C_xpmnZgLxdNIK0P71zO4oIlMdkxxhFkTyX0SE268veidNxyho6rXZosu5Gt1tQcbtfXsR7HfeVMAvK3tTnWAHN1_6vyaBEHcI5zMMGkwQF6ifhXxKraB-GptkM_4zdMJiXaZRKPD3N88Okjsv_Xoi50U1hiRNPZurqxtKLJbf2f9e31cIAuQBBJ4ZzCxgW5ejbOnvKY0NBpKz2QEVZV33c937njpZsTjbC8zEZqcrshdHaVuZqgqkCKg4iw";

// --- Helpers ---
function ImageUploadButton({ onUpload, label = "Cambiar Imagen" }: { onUpload: (url: string) => void, label?: string }) {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group/upload">
      <input 
        type="file" 
        ref={fileInput} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
      <button 
        onClick={() => fileInput.current?.click()}
        className="flex items-center gap-2 bg-white/90 hover:bg-white text-zinc-800 px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-all"
      >
        <Upload className="w-3.5 h-3.5" /> {label}
      </button>
    </div>
  );
}

// --- Components ---

function Modal({ isOpen, onClose, title, content }: { isOpen: boolean, onClose: () => void, title: string, content: string }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-primary transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold text-zinc-900 border-b-4 border-primary/20 pb-2 inline-block">
              {title}
            </h3>
            <p className="text-zinc-600 text-lg leading-relaxed whitespace-pre-line">
              {content}
            </p>
            <button 
              onClick={onClose}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function Navbar({ config, setConfig, isEditing }: { config: SiteConfig, setConfig: any, isEditing: boolean }) {
  const [modal, setModal] = useState({ open: false, title: '', content: '' });

  const openInfo = (type: 'nosotros' | 'beneficios') => {
    if (type === 'nosotros') {
      setModal({ open: true, title: 'Sobre Nosotros', content: config.empresa.about });
    } else {
      setModal({ open: true, title: 'Nuestros Beneficios', content: config.empresa.benefits });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Disletras Logo" className="h-10 w-10 rounded-lg" referrerPolicy="no-referrer" />
            <span className="font-sans text-xl font-extrabold text-primary tracking-tight">
              {isEditing ? (
                <input 
                  type="text" 
                  value={config.companyName}
                  onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                  className="bg-zinc-100 px-2 rounded border-none focus:ring-1 focus:ring-primary inline-block"
                />
              ) : config.companyName}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-semibold text-primary border-b-2 border-primary pb-1">Servicios</a>
            <button onClick={() => openInfo('nosotros')} className="text-sm font-semibold text-zinc-600 hover:text-primary transition-colors">Nosotros</button>
            <button onClick={() => openInfo('beneficios')} className="text-sm font-semibold text-zinc-600 hover:text-primary transition-colors">Beneficios</button>
            <a href="#contact" className="text-sm font-semibold text-zinc-600 hover:text-primary transition-colors">Contacto</a>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`, '_blank')}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md"
          >
            Inscripciones Abiertas
          </motion.button>
        </div>
      </nav>
      <Modal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })} 
        title={modal.title} 
        content={modal.content} 
      />
    </>
  );
}

export function Hero({ config, setConfig, isEditing }: { config: SiteConfig, setConfig: any, isEditing: boolean }) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-container/10 to-primary-container/10 -z-10" />
      
      {/* Decorative Doodles */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 text-secondary-container/20 hidden lg:block"
      >
        <Star className="w-16 h-16 fill-current" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 right-20 text-tertiary-container/20 hidden lg:block"
      >
        <Rocket className="w-24 h-24 -rotate-45" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <span className="bg-tertiary-container/20 text-tertiary font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest flex items-center gap-2">
              Ciclo Escolar 
              {isEditing ? (
                <input 
                  type="text" 
                  value={config.hero.cicloEscolar} 
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, cicloEscolar: e.target.value } })}
                  className="bg-white/50 w-16 px-2 rounded border-none focus:ring-1 focus:ring-tertiary text-center"
                />
              ) : config.hero.cicloEscolar}
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-zinc-900 leading-[1] tracking-tight">
            ¡Iniciamos el <span className="text-primary italic">Año Escolar</span>!
          </h1>
          {isEditing ? (
            <textarea 
              value={config.hero.description}
              onChange={(e) => setConfig({ ...config, hero: { ...config.hero, description: e.target.value } })}
              className="w-full text-lg text-zinc-600 leading-relaxed bg-zinc-50 rounded-xl p-4 border-2 border-zinc-100 focus:ring-primary focus:border-primary resize-none h-32"
            />
          ) : (
            <p className="text-lg text-zinc-600 leading-relaxed max-w-lg">
              {config.hero.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              onClick={() => window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`, '_blank')}
              className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 group"
            >
              ¡Inscribirse Ahora!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
          
          {/* Aprendizaje Activo a la izquierda, color Lila (Personalizable) */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#e29bfe]/20 p-6 rounded-3xl shadow-sm border-2 border-[#e29bfe]/30 max-w-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Verified className="w-6 h-6 text-secondary fill-secondary/10" />
              <span className="font-bold text-secondary text-lg">Aprendizaje Activo</span>
            </div>
            {isEditing ? (
              <input 
                type="text" 
                value={config.hero.activeLearningText}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, activeLearningText: e.target.value } })}
                className="w-full bg-white/50 rounded px-2 border-none focus:ring-1 focus:ring-secondary text-secondary italic font-medium"
              />
            ) : (
              <p className="text-secondary italic font-medium">{config.hero.activeLearningText}</p>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[650px] w-full"
        >
          {/* Imagen completa, sin cortes */}
          <div className="h-full w-full rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white flex items-center justify-center relative group">
            <img 
              src={config.hero.heroImage} 
              alt="Año Escolar" 
              className="max-w-full max-h-full object-contain" 
              referrerPolicy="no-referrer" 
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <ImageUploadButton onUpload={(url) => setConfig({ ...config, hero: { ...config.hero, heroImage: url } })} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const SERVICE_ICONS: Record<string, any> = {
  BookOpen, Rocket, Users, ClipboardCheck
};

const SERVICE_COLORS: Record<string, any> = {
  primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary" },
  tertiary: { bg: "bg-tertiary/10", text: "text-tertiary", border: "border-tertiary" },
};

export function Services({ config, setConfig, isEditing }: { config: SiteConfig, setConfig: any, isEditing: boolean }) {
  const [modal, setModal] = useState({ open: false, title: '', content: '' });

  return (
    <>
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-zinc-900">Servicios Especializados</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Explora nuestros programas y pulsa en "Saber más" para ver toda la información.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              const theme = SERVICE_COLORS[s.color];
              return (
                <div 
                  key={s.id}
                  className={`p-8 rounded-[2.5rem] bg-zinc-50 border-t-4 ${theme.border} hover:shadow-2xl transition-all group relative`}
                >
                  <div className={`w-14 h-14 ${theme.bg} rounded-2xl flex items-center justify-center ${theme.text} mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  {isEditing ? (
                    <>
                      <input 
                        type="text" 
                        value={s.title}
                        onChange={(e) => {
                          const newServices = [...config.services];
                          newServices[i].title = e.target.value;
                          setConfig({ ...config, services: newServices });
                        }}
                        className="w-full text-xl font-bold text-zinc-900 bg-white rounded px-2 border-none focus:ring-1 focus:ring-primary mb-4"
                      />
                      <textarea 
                        value={s.shortDesc}
                        onChange={(e) => {
                          const newServices = [...config.services];
                          newServices[i].shortDesc = e.target.value;
                          setConfig({ ...config, services: newServices });
                        }}
                        className="w-full text-zinc-600 text-sm mb-6 leading-relaxed bg-white rounded px-2 border-none focus:ring-1 focus:ring-primary resize-none h-20"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-zinc-900 mb-4">{s.title}</h3>
                      <p className="text-zinc-600 text-sm mb-6 leading-relaxed min-h-[4rem]">{s.shortDesc}</p>
                    </>
                  )}
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setModal({ open: true, title: s.title, content: s.longDesc })}
                      className={`${theme.text} font-bold text-sm inline-flex items-center gap-1 hover:translate-x-1 transition-transform`}
                    >
                      Saber más <ArrowRight className="w-4 h-4" />
                    </button>
                    {isEditing && (
                      <button 
                        onClick={() => {
                          const newLong = prompt('Edita la información detallada:', s.longDesc);
                          if(newLong !== null) {
                             const newServices = [...config.services];
                             newServices[i].longDesc = newLong;
                             setConfig({ ...config, services: newServices });
                          }
                        }}
                        className="text-[10px] text-zinc-400 hover:text-zinc-600 flex items-center gap-1"
                      >
                        <Settings className="w-3 h-3" /> Editar Info
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Modal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })} 
        title={modal.title} 
        content={modal.content} 
      />
    </>
  );
}

export function Benefits({ config, setConfig, isEditing }: { config: SiteConfig, setConfig: any, isEditing: boolean }) {
  return (
    <section id="benefits" className="py-24 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">¿Por qué elegir Disletras?</h2>
          <div className="space-y-4">
             <div className="flex gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100">
               <div className="shrink-0 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white"><Verified className="w-6 h-6" /></div>
               <div><h4 className="font-bold text-zinc-900 mb-1">Inclusión y Comprensión</h4><p className="text-zinc-600 text-sm">Metodología 100% inclusiva para cada ritmo.</p></div>
             </div>
             <div className="flex gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100">
               <div className="shrink-0 w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white"><BarChart3 className="w-6 h-6" /></div>
               <div><h4 className="font-bold text-zinc-900 mb-1">Evaluación Progresiva</h4><p className="text-zinc-600 text-sm">Seguimiento constante del avance escolar.</p></div>
             </div>
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-6">
            <div className="pt-12 relative group">
              <img src={config.benefits.image1} alt="Beneficio 1" className="rounded-[2.5rem] shadow-lg border-4 border-white aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
              {isEditing && (
                <div className="absolute inset-0 p-12 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ImageUploadButton onUpload={(url) => setConfig({ ...config, benefits: { ...config.benefits, image1: url } })} label="Cambiar Foto" />
                </div>
              )}
            </div>
            <div className="relative group">
              <img src={config.benefits.image2} alt="Beneficio 2" className="rounded-[2.5rem] shadow-lg border-4 border-white aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
              {isEditing && (
                <div className="absolute inset-0 p-12 flex items-start justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ImageUploadButton onUpload={(url) => setConfig({ ...config, benefits: { ...config.benefits, image2: url } })} label="Cambiar Foto" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ config, setConfig, isEditing }: { config: SiteConfig, setConfig: any, isEditing: boolean }) {
  const addTestimonial = () => {
    const newT: Testimonial = {
      name: "Nuevo Padre",
      role: "Padre de...",
      photo: "https://i.pravatar.cc/150",
      quote: "Escribe aquí el testimonio del padre.",
      color: "#fec107"
    };
    setConfig({ ...config, testimonials: [...config.testimonials, newT] });
  };

  const removeTestimonial = (index: number) => {
    const newT = config.testimonials.filter((_, i) => i !== index);
    setConfig({ ...config, testimonials: newT });
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-secondary font-bold uppercase tracking-widest text-xs">Comunidad Disletras</span>
            <h2 className="text-4xl font-extrabold text-zinc-900 leading-tight">Testimonios que nos inspiran</h2>
          </div>
          {isEditing && (
            <button 
              onClick={addTestimonial}
              className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" /> Agregar Testimonio
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.testimonials.map((t, i) => (
            <div 
              key={i}
              style={{ backgroundColor: t.color }}
              className="p-10 rounded-[3.5rem] border-4 border-white flex flex-col items-center text-center shadow-xl relative group transition-all"
            >
              {isEditing && (
                <button 
                  onClick={() => removeTestimonial(i)}
                  className="absolute top-6 right-6 text-zinc-900/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              
              <div className="mb-6 relative group/photo">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-zinc-100 flex items-center justify-center">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </div>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity">
                     <ImageUploadButton label="" onUpload={(url) => {
                        const newT = [...config.testimonials];
                        newT[i].photo = url;
                        setConfig({ ...config, testimonials: newT });
                     }} />
                  </div>
                )}
              </div>

              {isEditing ? (
                <textarea 
                  value={t.quote}
                  onChange={(e) => {
                    const newT = [...config.testimonials];
                    newT[i].quote = e.target.value;
                    setConfig({ ...config, testimonials: newT });
                  }}
                  className="w-full bg-white/30 rounded-xl p-2 text-zinc-900 font-medium italic mb-8 leading-relaxed text-center border-none focus:ring-1 focus:ring-zinc-900 resize-none h-32"
                />
              ) : (
                <p className="text-zinc-900 font-medium italic mb-8 leading-relaxed text-center">"{t.quote}"</p>
              )}
              
              <div className="w-full space-y-1">
                {isEditing ? (
                  <>
                    <input 
                      type="text" 
                      value={t.name}
                      onChange={(e) => {
                        const newT = [...config.testimonials];
                        newT[i].name = e.target.value;
                        setConfig({ ...config, testimonials: newT });
                      }}
                      className="w-full font-bold text-zinc-900 text-lg uppercase tracking-tight text-center bg-white/30 rounded px-2 border-none focus:ring-1 focus:ring-zinc-900"
                    />
                    <input 
                      type="text" 
                      value={t.role}
                      onChange={(e) => {
                        const newT = [...config.testimonials];
                        newT[i].role = e.target.value;
                        setConfig({ ...config, testimonials: newT });
                      }}
                      className="w-full text-zinc-800 text-xs font-bold uppercase tracking-widest text-center bg-white/30 rounded px-2 border-none focus:ring-1 focus:ring-zinc-900 opacity-70"
                    />
                  </>
                ) : (
                  <>
                    <h4 className="font-bold text-zinc-900 text-lg uppercase">{t.name}</h4>
                    <p className="text-zinc-800 text-xs font-bold uppercase tracking-widest opacity-60">{t.role}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA({ config }: { config: SiteConfig }) {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 p-12 opacity-10"
        >
          <Rocket className="w-64 h-64 rotate-12" />
        </motion.div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">¡Inscripciones Abiertas!</h2>
          <p className="text-2xl font-medium opacity-90">¡Cupos limitados para el nuevo periodo!</p>
          <div className="flex flex-col items-center gap-6 pt-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`, '_blank')}
              className="bg-primary-container text-primary px-12 py-5 rounded-full font-bold text-xl shadow-2xl mt-4 hover:shadow-primary-container/30 transition-all flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6 shrink-0" /> Quiero más información
            </motion.button>
            <a href={`tel:${config.whatsappNumber}`} className="text-white/80 hover:text-white font-bold flex items-center gap-2 underline underline-offset-4">
              <Phone className="w-4 h-4" /> O llámanos al {config.whatsappNumber}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ config, setConfig, isEditing }: { config: SiteConfig, setConfig: any, isEditing: boolean }) {
  const [modal, setModal] = useState({ open: false, title: '', content: '' });
  const SOCIAL_ICONS: Record<string, any> = { Facebook, Instagram, MessageCircle };

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6 col-span-1 md:col-span-1">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Logo" className="h-8 w-8" referrerPolicy="no-referrer" />
            <span className="font-sans text-xl font-extrabold text-primary tracking-tight">
              {isEditing ? (
                <input 
                  type="text" 
                  value={config.companyName}
                  onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                  className="bg-zinc-100 px-2 rounded border-none focus:ring-1 focus:ring-primary inline-block"
                />
              ) : config.companyName}
            </span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed font-medium">
            Transformando el aprendizaje en una aventura inolvidable. Expertos en nivelación y apoyo pedagógico integral.
          </p>
        </div>
        
        <div>
          <h5 className="font-bold text-primary uppercase text-xs tracking-widest mb-8">Empresa</h5>
          <ul className="space-y-4 text-zinc-600 text-sm font-bold">
            <li><button onClick={() => setModal({ open: true, title: 'Nuestros Servicios', content: config.services.map(s => `• ${s.title}: ${s.shortDesc}`).join('\n\n')})} className="hover:text-secondary transition-colors underline-offset-4 decoration-2">Servicios</button></li>
            <li><button onClick={() => setModal({ open: true, title: 'Sobre Nosotros', content: config.empresa.about })} className="hover:text-secondary transition-colors underline-offset-4 decoration-2">Sobre Nosotros</button></li>
            <li><button onClick={() => setModal({ open: true, title: 'Beneficios', content: config.empresa.benefits })} className="hover:text-secondary transition-colors underline-offset-4 decoration-2">Beneficios</button></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold text-primary uppercase text-xs tracking-widest mb-8">Social</h5>
          <ul className="space-y-4 text-zinc-600 text-sm font-bold">
            {config.social.map((s, idx) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <li key={s.name} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-secondary" />
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={s.url}
                      onChange={(e) => {
                        const newSocial = [...config.social];
                        newSocial[idx].url = e.target.value;
                        setConfig({ ...config, social: newSocial });
                      }}
                      className="bg-zinc-100 border-none focus:ring-1 focus:ring-primary p-1 rounded text-zinc-500 truncate text-xs w-full"
                      placeholder={`Link de ${s.name}`}
                    />
                  ) : (
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-secondary transition-colors">{s.name}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="space-y-6">
          <h5 className="font-bold text-primary uppercase text-xs tracking-widest mb-8">Ubicación</h5>
          <div className="flex items-start gap-3 text-zinc-600 text-sm font-bold">
            <MapPin className="w-6 h-6 text-secondary shrink-0" />
            {isEditing ? (
              <input 
                type="text" 
                value={config.location}
                onChange={(e) => setConfig({ ...config, location: e.target.value })}
                className="bg-zinc-100 px-2 rounded border-none focus:ring-1 focus:ring-primary w-full"
              />
            ) : (
              <p className="leading-tight">{config.location}</p>
            )}
          </div>
          <div className="w-full h-36 bg-zinc-200 rounded-[2rem] flex items-center justify-center overflow-hidden relative shadow-inner group">
             <img src="https://static-maps.yandex.ru/1.x/?lang=en_US&ll=79.1774,-0.2523&z=13&l=map&size=400,250" className="w-full h-full object-cover opacity-50" alt="Mapa" />
             <div className="absolute inset-0 flex items-center justify-center"><MapPin className="w-10 h-10 text-secondary" /></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-zinc-200 text-center">
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest opacity-60">
          © {new Date().getFullYear()} {config.companyName}. {config.location}.
        </p>
      </div>
      <Modal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })} 
        title={modal.title} 
        content={modal.content} 
      />
    </footer>
  );
}
