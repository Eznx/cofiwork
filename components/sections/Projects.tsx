const projects = [
  {
    category: "COMERCIO",
    title: "Página para un negocio local",
    description:
      "Una web clara y profesional para mostrar productos, ubicación, horarios y recibir consultas.",
  },
  {
    category: "SERVICIOS",
    title: "Web para profesionales",
    description:
      "Una presencia digital enfocada en explicar servicios y convertir visitas en consultas.",
  },
  {
    category: "NEGOCIO",
    title: "Web comercial",
    description:
      "Una página completa para presentar una empresa, sus servicios y facilitar el contacto.",
  },
];

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="bg-[#F8F9FC] px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#165DFF]">
              Ejemplos
            </p>

            <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.03em] text-black sm:text-5xl lg:text-6xl">
              Una web pensada para tu negocio.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-gray-600">
            Cada proyecto se adapta al negocio, al público y al objetivo que
            queremos conseguir.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-[28px] border border-gray-200 bg-white"
            >
              <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-black p-7">
                <div className="absolute inset-0 opacity-90">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#165DFF]" />
                  <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#0F42CC]" />
                </div>

                <div className="relative w-full">
                  <div className="mb-3 h-2 w-20 rounded-full bg-white" />
                  <div className="mb-2 h-2 w-36 rounded-full bg-white/70" />
                  <div className="h-2 w-24 rounded-full bg-white/40" />
                </div>

                <span className="absolute right-6 top-6 text-sm font-black text-white">
                  0{index + 1}
                </span>
              </div>

              <div className="p-7">
                <p className="mb-3 text-xs font-black tracking-[0.15em] text-[#165DFF]">
                  {project.category}
                </p>

                <h3 className="mb-3 text-2xl font-black uppercase tracking-tight text-black">
                  {project.title}
                </h3>

                <p className="text-base leading-7 text-gray-600">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}