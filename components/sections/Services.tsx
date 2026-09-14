const services = [
  {
    number: "01",
    title: "PÁGINA WEB",
    description:
      "Una página profesional para que tu negocio tenga presencia en Internet y tus clientes puedan encontrarte y contactarte.",
  },
  {
    number: "02",
    title: "DISEÑO ADAPTADO",
    description:
      "Diseñamos la página pensando en tu negocio, tus clientes y la imagen que querés transmitir.",
  },
  {
    number: "03",
    title: "WHATSAPP Y CONTACTO",
    description:
      "Conectamos tu página con WhatsApp, formularios, ubicación y los medios que tus clientes utilizan para contactarte.",
  },
  {
    number: "04",
    title: "PUBLICACIÓN",
    description:
      "Nos encargamos de dejar tu página funcionando y accesible desde computadora, tablet y celular.",
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      className="bg-white px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#165DFF]">
            Lo que hacemos
          </p>

          <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.03em] text-black sm:text-5xl lg:text-6xl">
            Todo lo necesario para tener tu página web.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.number}
              className="group rounded-[28px] border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#165DFF] hover:shadow-xl sm:p-9"
            >
              <div className="mb-12 flex items-start justify-between">
                <span className="text-sm font-black text-[#165DFF]">
                  {service.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#165DFF] text-xl font-bold text-white transition group-hover:bg-[#0F42CC]">
                  →
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-black">
                {service.title}
              </h3>

              <p className="max-w-lg text-base leading-7 text-gray-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}