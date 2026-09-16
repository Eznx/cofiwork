'use client';
import { motion } from 'framer-motion';

const jetonEase = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: jetonEase },
};

export default function QuienSoyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <p className="font-mono text-[#B4FF39]/70 text-xs uppercase tracking-[0.3em] mb-4">
            COFIWORK / SOBRE MÍ
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] mb-6">
            Soy <span className="text-[#B4FF39]">Nicolás Ezequiel Lombardo</span>
          </h1>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="space-y-6 text-lg leading-relaxed text-white/70">
          <p>
            Diseño y desarrollo webs pensadas para que tu negocio se vea profesional,
            se entienda claro y atraiga clientes. No uso plantillas: cada página se
            construye desde cero con lo que vos necesitás.
          </p>
          <p>
            Mi enfoque: sitios rápidos, elegantes, que funcionen perfecto en celular
            y en computadora. Simples de usar y directos al punto.
          </p>
          <p>
            Trabajo cerca, hablamos claro y vamos ajustando todo hasta que estés
            conforme.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mt-12 text-center">
          <a
            href="/servicios"
            className="inline-flex items-center gap-2 bg-[#B4FF39] text-black px-8 py-3 rounded-full font-bold hover:shadow-[0_0_30px_rgba(180,255,57,0.25)] transition-all duration-300"
          >
            Ver cómo trabajamos →
          </a>
        </motion.div>
      </div>
    </main>
  );
}
