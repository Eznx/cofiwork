import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 px-6 pt-6 text-[#f2f4ee] sm:px-10 sm:pt-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/#inicio" className="text-lg font-semibold tracking-[-0.06em]">cofiwork<span className="text-[#b4ff39]">.</span></Link>
        <div className="flex items-center gap-6 text-sm text-white/55 sm:gap-9">
          <Link href="/#enfoque" className="transition hover:text-white">Enfoque</Link>
          <Link href="/#presentacion" className="hidden transition hover:text-white sm:block">Sobre mí</Link>
          <Link href="/#proyectos" className="transition hover:text-white">Proyectos</Link>
          <Link href="/#contacto" className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-[#f2f4ee] backdrop-blur-xl transition hover:border-[#b4ff39]/35 hover:bg-[#b4ff39]/10">Hablemos <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>
    </header>
  );
}
