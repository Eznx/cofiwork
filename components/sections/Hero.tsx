'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section id="inicio" className="relative z-10 isolate flex min-h-[100svh] items-center overflow-hidden bg-transparent px-6 pb-16 pt-28 text-[#f2f4ee] sm:px-10 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-[-12rem] h-[48rem] w-[48rem] rounded-full bg-[#176653]/20 blur-[140px]" />
        <div className="absolute -left-40 bottom-[-20rem] h-[42rem] w-[42rem] rounded-full bg-[#51417b]/15 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(185,255,232,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(185,255,232,.18) 1px, transparent 1px)', backgroundSize: '78px 78px', maskImage: 'radial-gradient(ellipse at 70% 45%, black, transparent 72%)' }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-7 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#c5d4cc]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b4ff39] shadow-[0_0_15px_#b4ff39]" />
            COFIWORK · Estudio digital independiente
          </p>
          <h1 className="max-w-3xl text-[clamp(3.7rem,9.4vw,8.6rem)] font-medium leading-[0.86] tracking-[-0.075em]">
            Diseños web
            <br />
            <span className="bg-gradient-to-r from-[#ecfff8] via-[#a6f5dd] to-[#b4ff39] bg-clip-text text-transparent">Con presencia</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#c5d4cc]/70 sm:text-lg">
            Experiencias digitales con presencia, personalidad y una razón clara para ser elegidas. Estrategia, identidad, tecnología e interacción en un sistema propio.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="#proyectos" className="group inline-flex items-center gap-4 rounded-full border border-[#b4ff39]/55 bg-[#b4ff39] px-6 py-3.5 text-sm font-semibold text-[#07100b] shadow-[0_0_38px_rgba(180,255,57,.12)] transition hover:shadow-[0_0_48px_rgba(180,255,57,.27)]">
              Explorar proyectos <span className="transition-transform group-hover:translate-x-1">↗</span>
            </Link>
            <span className="text-xs tracking-wide text-white/35">Una idea. Un lenguaje. Una experiencia.</span>
          </div>
        </div>
      </div>

      <a href="#enfoque" aria-label="Desplazarse para explorar" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/40">
        Explorar <span className="h-9 w-px bg-gradient-to-b from-[#b4ff39]/80 to-transparent" />
      </a>
    </section>
  );
}
