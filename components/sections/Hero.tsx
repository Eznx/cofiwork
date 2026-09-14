export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden bg-white">
      {/* Formas decorativas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-full w-[55%] -skew-x-[28deg] bg-[#0F42CC]" />

        <div className="absolute right-[-10%] top-[8%] h-24 w-[58%] bg-[#165DFF] sm:h-32" />

        <div className="absolute right-[-5%] top-[32%] h-24 w-[64%] bg-[#E5E7EB] sm:h-28" />

        <div className="absolute right-[-12%] top-[52%] h-24 w-[70%] bg-[#165DFF] sm:h-32" />

        <div className="absolute right-[-5%] bottom-[8%] h-28 w-[55%] bg-[#0F42CC]" />

        <div className="absolute right-[-5%] top-[-10%] h-72 w-72 rounded-full bg-[#165DFF] opacity-20 sm:h-96 sm:w-96" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        {/* Información */}
        <div className="relative z-10 max-w-xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#165DFF] text-white shadow-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
                <path d="M4.5 7.5h15" />
                <path d="M4.5 16.5h15" />
              </svg>
            </div>

            <div>
              <p className="text-xl font-black uppercase tracking-tight text-white">
                ¿Tu negocio todavía no tiene página web?
              </p>
              <div className="mt-1 h-1 w-16 bg-[#165DFF]" />
            </div>
          </div>

          <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-white">
            Animate a crecer en el mundo digital
          </p>

          <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Diseño
            <span className="mt-2 block text-black">tu página</span>
            <span className="mt-2 block text-[white]">web</span>
          </h1>

          <div className="my-7 h-1 w-24 bg-[#165DFF]" />

          <p className="mb-7 text-sm font-black uppercase tracking-wide text-white">
            Rápida · Profesional · Adaptada a tu negocio
          </p>

          <p className="mb-8 max-w-lg text-lg leading-8 text-white/85">
            Creo páginas web para negocios y me encargo de todo,
            desde el diseño hasta la publicación.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-[#165DFF] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#0F42CC]"
            >
              Quiero mi página web
            </a>

            <a
              href="#ejemplos"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[#0F42CC]"
            >
              Ver ejemplos
            </a>
          </div>
        </div>

        {/* Representación de página web */}
        <div className="relative z-10 flex min-h-[420px] items-center justify-center lg:min-h-[560px]">
          <div className="relative w-full max-w-2xl">
            {/* Ventana */}
            <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-2xl">
              {/* Barra superior */}
              <div className="flex h-12 items-center gap-2 border-b border-gray-200 px-5">
                <span className="h-3 w-3 rounded-full bg-gray-300" />
                <span className="h-3 w-3 rounded-full bg-gray-300" />
                <span className="h-3 w-3 rounded-full bg-gray-300" />

                <div className="ml-4 h-6 flex-1 rounded-full bg-gray-100" />
              </div>

              {/* Página de ejemplo */}
              <div className="p-5 sm:p-7">
                <div className="mb-8 flex items-center justify-between">
                  <div className="h-6 w-32 rounded bg-[#0F42CC]" />

                  <div className="hidden gap-3 sm:flex">
                    <div className="h-3 w-12 rounded bg-gray-200" />
                    <div className="h-3 w-12 rounded bg-gray-200" />
                    <div className="h-3 w-12 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="mb-4 h-10 w-full rounded bg-black" />
                    <div className="mb-3 h-4 w-full rounded bg-gray-200" />
                    <div className="mb-6 h-4 w-4/5 rounded bg-gray-200" />

                    <div className="h-11 w-36 rounded-full bg-[#165DFF]" />
                  </div>

                  <div className="min-h-40 rounded-2xl bg-[#0F42CC]" />
                </div>

                <div className="mt-7 grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-xl bg-gray-100" />
                  <div className="h-16 rounded-xl bg-gray-100" />
                  <div className="h-16 rounded-xl bg-gray-100" />
                </div>
              </div>
            </div>

            {/* Etiqueta */}
            <div className="absolute -bottom-5 left-5 rounded-full bg-black px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-xl sm:left-8">
              Rápida · Profesional · Adaptada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}