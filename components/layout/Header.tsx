export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Marca */}
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#165DFF] text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
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
            <span className="block text-lg font-black uppercase leading-none tracking-tight text-[#165DFF]">
              NICOLAS LOMBARDO
            </span>

            <span className="mt-1 block h-0.5 w-12 bg-[#165DFF]" />
          </div>
        </a>

        {/* Navegación */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#servicios"
            className="text-sm font-semibold text-gray-700 transition hover:text-[#165DFF]"
          >
            Servicios
          </a>

          <a
            href="#ejemplos"
            className="text-sm font-semibold text-gray-700 transition hover:text-[#165DFF]"
          >
            Ejemplos
          </a>

          <a
            href="#planes"
            className="text-sm font-semibold text-gray-700 transition hover:text-[#165DFF]"
          >
            Planes
          </a>

          <a
            href="#preguntas"
            className="text-sm font-semibold text-gray-700 transition hover:text-[#165DFF]"
          >
            Preguntas
          </a>
        </nav>

        {/* Contacto */}
        <a
          href="#contacto"
          className="rounded-full bg-[#165DFF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0F42CC]"
        >
          Hablar por WhatsApp
        </a>
      </div>
    </header>
  );
}