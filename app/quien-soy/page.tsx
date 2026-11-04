import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function QuienSoyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07090b] pt-32 text-[#f2f4ee] sm:pt-40">
      <Navbar />
      <section className="relative isolate px-6 pb-24 sm:px-10 lg:pb-36">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 h-[36rem] w-[36rem] rounded-full bg-[#176653]/15 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow">Detrás de COFIWORK</p>
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-20">
            <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.065em] sm:text-7xl">Soy Nicolás. Diseño experiencias digitales con identidad propia.</h1>
            <div>
              <p className="text-lg leading-relaxed text-white/65 sm:text-xl">Trabajo de forma directa con cada marca para entender su idea, darle una dirección clara y convertirla en una web que se sienta propia.</p>
              <p className="mt-5 leading-relaxed text-white/45">Estrategia, diseño y desarrollo forman parte de una misma conversación. Así, cada decisión tiene un porqué y cada proyecto encuentra su manera de conectar.</p>
              <Link href="/#contacto" className="mt-8 inline-flex items-center gap-3 border-b border-[#a6f5dd]/30 pb-2 text-sm font-medium transition hover:border-[#a6f5dd]">Hablemos de tu idea <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
