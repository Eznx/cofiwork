const plans = [
  {
    name: "BÁSICA",
    description: "Para tener presencia profesional en Internet.",
    featured: false,
    features: [
      "Página de inicio",
      "Diseño personalizado",
      "Botón de WhatsApp",
      "Formulario de contacto",
      "Google Maps",
      "Adaptada a celular",
    ],
  },
  {
    name: "PROFESIONAL",
    description: "La opción ideal para hacer crecer tu negocio.",
    featured: true,
    features: [
      "Todo lo de Básica",
      "Varias páginas",
      "Galería de productos o trabajos",
      "Google para medir visitas",
      "SEO básico",
      "Botones y llamadas a la acción",
      "Configuración completa",
    ],
  },
  {
    name: "PREMIUM",
    description: "Para negocios que necesitan una web más completa.",
    featured: false,
    features: [
      "Todo lo de Profesional",
      "Funciones especiales",
      "Integraciones",
      "Catálogo avanzado",
      "Automatizaciones",
      "Prioridad de atención",
      "Mantenimiento incluido",
    ],
  },
];

export default function Plans() {
  return (
    <section
      id="planes"
      className="bg-white px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#165DFF]">
            Planes
          </p>

          <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.03em] text-black sm:text-5xl lg:text-6xl">
            Elegí la opción para tu negocio.
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-600">
            Todos nuestros sitios se diseñan pensando en tu negocio y se
            adaptan correctamente a celular, tablet y computadora.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-[28px] border p-7 sm:p-9 ${
                plan.featured
                  ? "border-[#165DFF] bg-[#165DFF] text-white shadow-2xl"
                  : "border-gray-200 bg-white text-black"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-black px-5 py-2 text-xs font-black uppercase tracking-wider text-white">
                  Más elegido
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  {plan.name}
                </h3>

                <p
                  className={`mt-3 text-sm leading-6 ${
                    plan.featured ? "text-white/80" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-1 flex-col gap-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-sm leading-6 ${
                      plan.featured ? "text-white" : "text-gray-700"
                    }`}
                  >
                    <span
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                        plan.featured
                          ? "bg-white text-[#165DFF]"
                          : "bg-[#165DFF] text-white"
                      }`}
                    >
                      ✓
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`mt-10 flex h-12 items-center justify-center rounded-full px-6 text-sm font-black uppercase tracking-wide transition ${
                  plan.featured
                    ? "bg-white text-[#165DFF] hover:bg-black hover:text-white"
                    : "bg-black text-white hover:bg-[#165DFF]"
                }`}
              >
                Consultar
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}