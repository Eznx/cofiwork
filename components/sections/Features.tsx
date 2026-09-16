'use client';
import { motion } from 'framer-motion';

const jetonEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: jetonEase },
};

const lineReveal = {
  initial: { scaleX: 0, originX: 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: true },
  transition: { duration: 1, ease: jetonEase, delay: 0.3 },
};

const glowPulse = {
  boxShadow: [
    '0 0 10px rgba(180, 255, 57, 0.15), inset 0 0 10px rgba(180, 255, 57, 0.05)',
    '0 0 30px rgba(180, 255, 57, 0.35), inset 0 0 20px rgba(180, 255, 57, 0.12)',
    '0 0 10px rgba(180, 255, 57, 0.15), inset 0 0 10px rgba(180, 255, 57, 0.05)',
  ],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
};

const puntosDiferenciales = [
  {
    numero: '01',
    subtitulo: 'SIN PLANTILLAS',
    titulo: 'Creada desde cero',
    detalle: 'Tu web nace de tu idea, no de un modelo que ya vieron mil veces.',
  },
  {
    numero: '02',
    subtitulo: 'CON PROPÓSITO',
    titulo: 'Diseñada para actuar',
    detalle: 'No solo se ve bien — está construida para que te elijan.',
  },
  {
    numero: '03',
    subtitulo: 'CLARO Y DIRECTO',
    titulo: 'Sin tecnicismos',
    detalle: 'Hablamos de lo que importa. Entendés todo en cada paso.',
  },
  {
    numero: '04',
    subtitulo: 'CRECÉ JUNTOS',
    titulo: 'Escalable',
    detalle: 'La ampliamos cuando tu negocio crece. Todo lo que necesites.',
  },
];

export default function Features() {
  return (
    <section className="relative py-32 px-5 sm:px-6 border-t border-white/5 overflow-hidden">
      {/* 🌌 Fondo luminoso */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.35 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#B4FF39]/5 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#B4FF39]/8 blur-[90px]"
        />
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`pt-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.3, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 2.5 + Math.random(), repeat: Infinity, delay: i * 0.15 }}
            className="absolute w-1 h-1 rounded-full bg-[#B4FF39]"
            style={{
              left: `${8 + Math.random() * 84}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* frase*/}
        <motion.div {...fadeUp} className="mb-20">
          <p className="text-[#B4FF39] font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            No es solo código
          </p>
          
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            DISEÑO WEB.
            <br />
            <span className="text-white">CONSTRUYO PRESENCIA</span>
          </h2>
          
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
            Cada proyecto parte de una idea, no de una plantilla. Estrategia,
            diseño y desarrollo se combinan para crear una experiencia digital
            que represente tu marca y tenga un propósito claro.
          </p>
          
          <motion.div
            {...lineReveal}
            className="mt-10 h-px w-full max-w-xl origin-left bg-gradient-to-r from-[#B4FF39] via-[#B4FF39]/40 to-transparent"
          />
        </motion.div>

        {/* Tarjetas con poder */}
        <div className="grid md:grid-cols-2 gap-8">
          {puntosDiferenciales.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: jetonEase, delay: 0.15 + i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <motion.div
                animate={glowPulse}
                transition={{ delay: i * 0.5 }}
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#B4FF39]/0 group-hover:border-[#B4FF39]/40 transition-all duration-500 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#B4FF39]/0 group-hover:border-[#B4FF39]/40 transition-all duration-500 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#B4FF39]/0 group-hover:border-[#B4FF39]/40 transition-all duration-500 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#B4FF39]/0 group-hover:border-[#B4FF39]/40 transition-all duration-500 rounded-br-3xl" />

                <div className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.02] pointer-events-none select-none">
                  {item.numero}
                </div>

                <div className="relative z-10">
                  <span className="text-xs font-semibold text-[#B4FF39]/60 tracking-widest uppercase">
                    {item.subtitulo}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-4 group-hover:text-[#B4FF39] transition-colors duration-300">
                    {item.titulo}
                  </h3>
                  <p className="text-white/50 text-base leading-relaxed max-w-sm">
                    {item.detalle}
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                    className="mt-6 h-0.5 bg-[#B4FF39]/40"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}