'use client';
import { useState, useRef, useEffect } from 'react';
import Preloader from '@/components/ui/Preloader';
import CursorFollower from '@/components/ui/CursorFollower';
import SectionIndicator from '@/components/ui/SectionIndicator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Process from '@/components/sections/Process';
import Pricing from '@/components/sections/Pricing';
import Closing from '@/components/sections/Closing';
import { sectionNames } from '@/lib/constants';

export default function Home() {
  const [cargando, setCargando] = useState(true);
  const sectionRefs = Array.from({ length: sectionNames.length }).map(() => useRef(null));
  const [seccionActiva, setSeccionActiva] = useState(0);

  // Detector de secciones — SOLO corre cuando ya terminó de cargar
  useEffect(() => {
    if (cargando) return;

    const observerOptions = { rootMargin: "-40% 0px -40% 0px", threshold: 0 };
    const observers = sectionRefs.map((ref, index) => {
      if (!ref.current) return null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setSeccionActiva(index);
        });
      }, observerOptions);
      observer.observe(ref.current);
      return observer;
    }).filter(Boolean) as IntersectionObserver[];

    return () => observers.forEach(obs => obs.disconnect());
  }, [cargando]);

  if (cargando) {
    return <Preloader onComplete={() => setCargando(false)} />;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-[#B4FF39] selection:text-black">
      <CursorFollower />
      <SectionIndicator active={seccionActiva} total={sectionNames.length} />
      <Navbar />

      <div ref={sectionRefs[0]}><Hero /></div>

      <section className="py-10 border-y border-white/5">
        <div className="overflow-hidden whitespace-nowrap">
          <p className="text-4xl font-black uppercase text-white/10 mx-8">
            COFIWORK · TU WEB A MEDIDA · SIN PLANTILLAS · HECHA PARA VENDER ·
          </p>
        </div>
      </section>

      <div ref={sectionRefs[1]}><About /></div>
      <div ref={sectionRefs[2]}><Stats /></div>
      <div ref={sectionRefs[3]}><Services /></div>
      <div ref={sectionRefs[4]}><Projects /></div>
      <div ref={sectionRefs[5]}><Process /></div>
      <Pricing />
      <Closing />
      <Footer />
    </main>
  );
}