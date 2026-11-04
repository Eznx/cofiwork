import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Closing from '@/components/sections/Closing';
import Introduction from '@/components/sections/Introduction';
import HolographicBackdrop from '@/components/ui/HolographicBackdrop';

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#07090b] text-[#f2f4ee]">
      <HolographicBackdrop />
      <Navbar />
      <Hero />
      <Introduction />
      <section id="enfoque" className="relative z-10 isolate overflow-hidden border-y border-white/[0.06] bg-[#0b1010]/70 px-6 py-24 backdrop-blur-[2px] sm:px-10 lg:py-36">
        <div aria-hidden="true" className="absolute -right-20 top-0 h-[30rem] w-[30rem] rounded-full bg-[#176653]/15 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <p className="eyebrow">Una idea, una identidad, una experiencia</p>
          <div>
            <h2 className="max-w-4xl text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Cada proyecto parte de una idea y termina convertido en un sistema digital propio.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/55 sm:text-xl">
              Diseño experiencias donde estrategia, identidad, tecnología e interacción trabajan juntas para que tu marca se haga presente y tenga una razón clara para ser elegida.
            </p>
          </div>
        </div>
      </section>
      <Services />
      <Projects />
      <Closing />
      <Footer />
    </main>
  );
}
