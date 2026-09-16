import {
  NavLink,
  Project,
  ProcessStep,
  Plan,
  StatItem,
} from './types';

export const WA_NUMBER = '5491166173514';

export const WA_TEXT =
  'Hola Nicolás, vi COFIWORK y quiero hablar sobre mi proyecto.';

export const WA_URL =
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;

export const INSTAGRAM_URL =
  'https://www.instagram.com/3zequielxlombardo/';

/* =========================================================
   NAVIGATION
========================================================= */

export const navLinks: NavLink[] = [
  {
    label: 'Quién Soy',
    href: '#quien-soy',
  },
  {
    label: 'Servicios',
    href: '#servicios',
  },
];

/* =========================================================
   HERO
========================================================= */

export const tituloLineas = [
  'TU WEB',
  'TAL COMO',
  'NECESITÁS.',
];

export const heroItems = [
  {
    titulo: 'TUYA',
    desc: 'Pensada alrededor de tu negocio, no de una plantilla.',
  },
  {
    titulo: 'CLARA',
    desc: 'Cada parte está ahí para comunicar algo.',
  },
  {
    titulo: 'LISTA',
    desc: 'La publico y la dejo funcionando para vos.',
  },
];

/* =========================================================
   HERO TELEMETRY
========================================================= */

export const heroTelemetry = [
  {
    value: '01',
    label: 'IDEA',
  },
  {
    value: '02',
    label: 'DISEÑO',
  },
  {
    value: '03',
    label: 'CONSTRUCCIÓN',
  },
  {
    value: '04',
    label: 'LANZAMIENTO',
  },
];

export const heroStatus = {
  system: 'COFIWORK',
  mode: 'HECHA PARA VOS',
  status: 'ONLINE',
  location: 'BUENOS AIRES / AR',
};

/* =========================================================
   PORTFOLIO
========================================================= */

export const portfolio: Project[] = [
  {
    name: 'Una web con identidad',
    tag: 'DISEÑO',
    description:
      'Una presencia digital que se siente propia desde el primer vistazo y transmite lo que hace diferente a tu negocio.',
    image: '/foto1.jpeg',
  },
  {
    name: 'Una web con propósito',
    tag: 'ESTRATEGIA',
    description:
      'Ordenamos la información para que quien llega entienda quién sos, qué hacés y cómo puede contactarte.',
    image: '/foto2.jpeg',
  },
  {
    name: 'Una experiencia completa',
    tag: 'EXPERIENCIA',
    description:
      'Todo conectado para que la web no sea solamente linda, sino también útil para las personas que la visitan.',
    image: '/foto3.jpeg',
  },
];

/* =========================================================
   PROCESS
========================================================= */

export const process: ProcessStep[] = [
  {
    n: '01',
    title: 'Me contás',
    description:
      'Hablamos sobre tu negocio, tu idea y qué necesitás conseguir con la web.',
  },
  {
    n: '02',
    title: 'Le damos forma',
    description:
      'Ordenamos la idea y definimos cómo debería verse, sentirse y funcionar.',
  },
  {
    n: '03',
    title: 'La construyo',
    description:
      'Transformo todo eso en una web real, cuidando cada detalle de la experiencia.',
  },
  {
    n: '04',
    title: 'La ponemos online',
    description:
      'Te entrego todo funcionando y listo para que empieces a recibir visitas.',
  },
];

/* =========================================================
   PLANS
========================================================= */

export const plans: Plan[] = [
  {
    name: 'ESENCIAL',
    price: 'Desde $200.000',
    maintenance: 'Mantenimiento opcional',
    description:
      'Para tener una web profesional, clara y lista para mostrar tu negocio.',
    features: [
      'Diseño pensado para tu negocio',
      'Se adapta perfectamente al celular',
      'Información clara y fácil de encontrar',
      'WhatsApp para recibir consultas',
      'Te la dejo publicada y funcionando',
    ],
    cta: 'Quiero empezar',
    featured: false,
  },

  {
    name: 'PROFESIONAL',
    price: 'Desde $380.000',
    maintenance: 'Mantenimiento opcional',
    description:
      'Para negocios que quieren una web más completa y pensada para convertir visitas en consultas.',
    features: [
      'Todo lo del plan Esencial',
      'Presentación completa de tus servicios',
      'Formas de contacto adaptadas a tu negocio',
      'Formularios para recibir consultas',
      'Preparada para aparecer en Google',
      'Publicación y configuración incluida',
    ],
    cta: 'Quiero este plan',
    featured: true,
  },

  {
    name: 'A MEDIDA',
    price: 'Hablemos',
    maintenance: 'Acompañamiento después de publicar',
    description:
      'Para proyectos que necesitan algo diferente y quieren construirlo desde cero.',
    features: [
      'Partimos de lo que realmente necesitás',
      'Diseñamos la estructura juntos',
      'Secciones y funciones personalizadas',
      'Podemos hacer crecer la web con el tiempo',
      'Te muestro cómo está funcionando',
    ],
    cta: 'Contame mi idea',
    featured: false,
  },
];

/* =========================================================
   STATS
========================================================= */

export const stats: StatItem[] = [
  {
    value: '100%',
    label: 'PENSADA PARA VOS',
  },
  {
    value: '01',
    label: 'IDEA POR PROYECTO',
  },
  {
    value: '∞',
    label: 'FORMAS DE HACERLA',
  },
];

/* =========================================================
   SECTION NAVIGATION
========================================================= */

export const sectionNames = [
  'Inicio',
  'Quién Soy',
  'Servicios',
  'Proyectos',
  'Proceso',
];