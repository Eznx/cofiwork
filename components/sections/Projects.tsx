'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
  { title: 'Desarrollo Web Profesional', category: 'Presencia digital', image: '/foto1.jpeg' },
  { title: 'Soluciones a Medida', category: 'Estrategia y diseño', image: '/foto2.jpeg' },
  { title: 'Presencia Completa', category: 'Experiencia digital', image: '/foto3.jpeg' },
];

export default function Projects() {
  return (
    <section id="proyectos" className="relative z-10 isolate overflow-hidden bg-[#07090b]/62 px-6 py-24 text-[#f2f4ee] backdrop-blur-[1px] sm:px-10 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-1/4 h-[34rem] w-[34rem] rounded-full bg-[#51417b]/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Trabajo con intención</p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Ideas hechas experiencia.</h2>
          </div>
          <p className="max-w-sm leading-relaxed text-white/50">Cada proyecto encuentra su propio lenguaje para conectar marca y personas.</p>
        </div>
        <div className="relative grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 36, rotateY: index === 1 ? 0 : index === 0 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{ y: -8, rotateY: index === 0 ? 1.5 : -1.5, scale: 1.012 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
              className="group rounded-[1.35rem] border border-white/[0.08] bg-white/[0.025] p-2 transition-colors duration-500 hover:border-[#b4ff39]/25 hover:bg-white/[0.045]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-[#111719]">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
              </div>
              <div className="px-4 pb-4 pt-5">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[#a6f5dd]/65">{project.category}</p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-white/90">{project.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
