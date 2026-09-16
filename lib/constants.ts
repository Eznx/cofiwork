export const WA_NUMBER = "5491166173514";
export const WA_TEXT = "Hola Nicolás, vi tu web. Quiero hablar sobre mi proyecto.";
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;
export const INSTAGRAM_URL = "https://www.instagram.com/3zequielxlombardo/";

export const plans = [
  {
    name: "ESENCIAL",
    price: "Desde $200.000",
    maintenance: "Mantenimiento opcional",
    featured: false,
    description: "Tu presencia en internet lista para que te encuentren.",
    features: [
      "Página principal completa",
      "Tus datos y formas de contacto",
      "Se ve bien en celular y computadora",
      "Publicación incluida"
    ],
    cta: "Quiero este plan"
  },
  {
    name: "PROFESIONAL",
    price: "Desde $380.000",
    maintenance: "Mantenimiento opcional",
    featured: true,
    description: "La opción elegida por quienes quieren destacar.",
    features: [
      "Hasta 5 páginas estructuradas",
      "Diseño hecho solo para vos",
      "Formulario de contacto",
      "Configuración para que te encuentren fácil",
      "Publicación y DNS configurados"
    ],
    cta: "Quiero este plan"
  },
  {
    name: "COMPLETO",
    price: "A consultar",
    maintenance: "A medida",
    featured: false,
    description: "Armamos todo lo que necesitamos juntos.",
    features: [
      "Todo lo de los planes anteriores",
      "Secciones que vayamos sumando",
      "Estadísticas de visitas",
      "Te ayudo a mantenerla al día"
    ],
    cta: "Hablemos"
  }
] as const;
