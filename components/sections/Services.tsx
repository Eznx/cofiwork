'use client';

import { motion } from 'framer-motion';

const pilares = [
  { title: 'Estrategia', text: 'Encontramos qué hace única a tu marca y qué necesita comunicar.' },
  { title: 'Identidad', text: 'Traducimos esa esencia en una presencia visual reconocible.' },
  { title: 'Tecnología', text: 'Construimos una base ágil, accesible y preparada para crecer.' },
  { title: 'Interacción', text: 'Diseñamos cada recorrido para que visitar, entender y elegir sea natural.' },
];

export default function Services() {
  return (
    <section id="servicios" className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-[#0b1010]/75 px-6 py-24 text-[#f2f4ee] backdrop-blur-[2px] sm:px-10 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#176653]/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-5 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-[#a6f5dd]/65">Lo que hace que funcione</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-tight tracking-[-0.05em] sm:text-6xl">Una experiencia. Cuatro decisiones conectadas.</h2>
          </div>
          <p className="max-w-sm leading-relaxed text-white/55">Cada parte responde a la misma idea: hacer que tu marca se sienta y se recuerde.</p>
        </div>
        <div className="relative grid border-t border-white/15 sm:grid-cols-2">
          {pilares.map((pilar, index) => (
            <motion.article
              key={pilar.title}
              initial={{ opacity: 0, y: 28, rotateX: -4 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ y: -5, borderColor: 'rgba(166,245,221,.35)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 900 }}
              className="border-b border-white/15 py-7 sm:px-8 sm:py-9 [&:nth-child(odd)]:sm:border-r [&:nth-child(even)]:sm:pl-10"
            >
              <h3 className="text-2xl font-medium tracking-tight">{pilar.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/55">{pilar.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
