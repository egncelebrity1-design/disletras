export interface Testimonial {
  name: string;
  role: string;
  photo: string;
  quote: string;
  color: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  color: string;
}

export interface SiteConfig {
  companyName: string;
  location: string;
  whatsappNumber: string;
  whatsappMessage: string;
  hero: {
    cicloEscolar: string;
    title: string;
    description: string;
    heroImage: string;
    activeLearningText: string;
  };
  services: Service[];
  benefits: {
    image1: string;
    image2: string;
  };
  testimonials: Testimonial[];
  social: { name: string; url: string; icon: string }[];
  empresa: {
    about: string;
    benefits: string;
  };
}

export const initialConfig: SiteConfig = {
  companyName: "Disletras",
  location: "Santo Domingo, Ecuador",
  whatsappNumber: "593982150518",
  whatsappMessage: "Hola Disletras, quiero más información sobre sus programas educativos.",
  
  hero: {
    cicloEscolar: "2024",
    title: "¡Iniciamos el Año Escolar!",
    description: "Este es el momento perfecto para aprender, crecer y alcanzar tus metas. En Disletras transformamos los desafíos en oportunidades de éxito.",
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
    activeLearningText: "Metodologías diseñadas para disfrutar cada paso del proceso.",
  },

  services: [
    {
      id: "nivelacion",
      title: "Nivelación Académica",
      shortDesc: "Reforzamos los conocimientos fundamentales para cerrar brechas de aprendizaje.",
      longDesc: "Nuestra nivelación académica se enfoca en identificar los vacíos de conocimiento específicos de cada alumno. Trabajamos en áreas clave como matemáticas, lenguaje y comprensión lectora.",
      icon: "BookOpen",
      color: "primary",
    },
    {
      id: "adelanto",
      title: "Adelanto Académico",
      shortDesc: "Preparamos a los estudiantes para futuros desafíos escolares, dándoles ventaja.",
      longDesc: "El adelanto académico permite que los estudiantes se familiaricen con contenidos de niveles superiores. Esto reduce la ansiedad y mejora la participación en el aula regular.",
      icon: "Rocket",
      color: "secondary",
    },
    {
      id: "adaptacion",
      title: "Adaptación Escolar",
      shortDesc: "Desarrollamos habilidades emocionales y sociales para una transición positiva.",
      longDesc: "Especialmente diseñado para alumnos que cambian de institución o nivel. Trabajamos en la confianza, la socialización y la gestión de emociones ante nuevos entornos.",
      icon: "Users",
      color: "tertiary",
    },
    {
      id: "tareas",
      title: "Tareas Dirigidas",
      shortDesc: "Fomentamos hábitos de estudio saludables y responsabilidad guiada.",
      longDesc: "No solo ayudamos a terminar la tarea; enseñamos cómo estudiar. Ayudamos a los alumnos a organizar su tiempo y a entender lo que están haciendo.",
      icon: "ClipboardCheck",
      color: "primary",
    }
  ],

  benefits: {
    image1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    image2: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
  },

  testimonials: [
    {
      name: "María Rodríguez",
      role: "Madre de Mateo",
      photo: "https://i.pravatar.cc/150?u=maria",
      quote: "Disletras cambió la forma en que mi hijo ve el estudio. Ahora se siente capaz y motivado cada día.",
      color: "#fec107"
    },
    {
      name: "Carlos Mendoza",
      role: "Padre de Sofía",
      photo: "https://i.pravatar.cc/150?u=carlos",
      quote: "El equipo es increíble. Su enfoque inclusivo permitió que Sofía se adaptara a su nueva escuela sin estrés.",
      color: "#fec107"
    }
  ],

  social: [
    { name: "Facebook", url: "https://facebook.com/disletras", icon: "Facebook" },
    { name: "Instagram", url: "https://instagram.com/disletras", icon: "Instagram" },
    { name: "WhatsApp", url: "https://wa.me/593982150518", icon: "MessageCircle" }
  ],

  empresa: {
    about: "Somos un centro psicopedagógico líder en Santo Domingo, dedicados a potenciar las capacidades cognitivas y emocionales.",
    benefits: "Acceso a material didáctico exclusivo, evaluaciones periódicas de progreso y un entorno seguro.",
  }
};

