'use client';
import { motion } from 'framer-motion';

const jetonEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

const pasos = [
  {
    n: '01',
    titulo: 'Me contactas',
    descripcion: 'Sin formularios largos ni complicaciones.',
  },
  {
    n: '02',
    titulo: 'Ves la propuesta',
    descripcion: 'Definimos juntos antes de avanzar.',
  },
  {
    n: '03',
    titulo: 'Queda lista',
    descripcion: 'Publicada y funcionando.',
  },
];

// 🌧️ Lluvia adaptada para celular
const LluviaParticulasMovil = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-px bg-[#B4FF39]/25"
        initial={{
          height: 0,
          top: '-5%',
          left: `${6 + (i * 8)}%`,
        }}
        animate={{
          height: [0, '16px', 0],
          opacity: [0, 0.4, 0],
          y: [0, 60],
        }}
        transition={{
          duration: 1.5 + Math.random() * 1.5,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

// 🌧️ Lluvia completa para escritorio
const LluviaParticulasEscritorio = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 24 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-px bg-[#B4FF39]/30"
        initial={{
          height: 0,
          top: '-10%',
          left: `${4 + (i * 4)}%`,
        }}
        animate={{
          height: [0, '20px', 0],
          opacity: [0, 0.5, 0],
          y: [0, 100],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 4,
        }}
      />
    ))}
  </div>
);

export default function Proceso() {
  return (
    <section className="relative border-b border-white/5 px-5 py-20 sm:px-6 lg:py-32 overflow-hidden">
      {/* 🌧️ Fondo holográfico — móvil */}
      <div className="lg:hidden absolute inset-0">
        <LluviaParticulasMovil />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(180,255,57,0.05), transparent 55%)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* 🌧️ Fondo holográfico — escritorio */}
      <div className="hidden lg:block absolute inset-0">
        <LluviaParticulasEscritorio />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(180,255,57,0.06), transparent 60%)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto max-w-2xl lg:max-w-6xl relative z-10">
        {/* TÍTULO */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: jetonEase }}
          className="
            text-3xl sm:text-4xl font-black uppercase text-white mb-10
            lg:text-6xl lg:mb-16 lg:text-center lg:tracking-tight
          "
        >
          Cómo <span className="text-[#B4FF39]">trabajamos</span>
        </motion.h2>

        {/* ================================= */}
        {/* 📱 VERSIÓN CELULAR — NIVEL Holograma */}
        {/* ================================= */}
        <div className="lg:hidden space-y-8">
          {pasos.map((paso, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: jetonEase, delay: i * 0.18 }}
              className="relative"
            >
              {/* Tarjeta con marco holográfico */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="
                  relative p-5 rounded-2xl
                  border border-white/10 bg-white/[0.02]
                  hover:border-[#B4FF39]/30 transition-colors duration-300
                  group
                "
              >
                {/* Esquinas que se iluminan */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#B4FF39]/0 group-hover:border-[#B4FF39]/35 transition-all duration-500 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#B4FF39]/0 group-hover:border-[#B4FF39]/35 transition-all duration-500 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#B4FF39]/0 group-hover:border-[#B4FF39]/35 transition-all duration-500 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#B4FF39]/0 group-hover:border-[#B4FF39]/35 transition-all duration-500 rounded-br-xl" />

                <div className="flex items-start gap-4">
                  {/* Número holográfico pulsante */}
                  <div className="flex-shrink-0 relative">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 6px rgba(180,255,57,0.25)',
                          '0 0 16px rgba(180,255,57,0.5)',
                          '0 0 6px rgba(180,255,57,0.25)',
                        ],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4,
                      }}
                      className="
                        w-10 h-10 rounded-full
                        border-2 border-[#B4FF39]/50
                        bg-black/60 backdrop-blur-sm
                        flex items-center justify-center
                        text-[#B4FF39] font-bold text-sm
                      "
                    >
                      {paso.n}
                      {/* Anillo de escaneo */}
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: i * 0.4,
                        }}
                        className="absolute inset-0 rounded-full border border-[#B4FF39]/20"
                      />
                    </motion.div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#B4FF39] transition-colors duration-300">
                      {paso.titulo}
                    </h3>
                    <p className="mt-2 text-base text-white/50 leading-relaxed">
                      {paso.descripcion}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Línea conectora hacia abajo */}
              {i < pasos.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: '32px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 + i * 0.15 }}
                  className="absolute left-5 top-full w-px bg-gradient-to-b from-[#B4FF39]/40 to-transparent"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* ================================= */}
        {/* 🖥️ VERSIÓN ESCRITORIO — completa */}
        {/* ================================= */}
        <div className="hidden lg:flex lg:flex-col lg:items-center">
          <div className="relative w-full max-w-4xl">
            <div className="absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-[#B4FF39]/40 via-[#B4FF39]/15 to-[#B4FF39]/40 -translate-x-1/2" />

            <div className="space-y-16 relative z-10">
              {pasos.map((paso, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.7,
                    ease: jetonEase,
                    delay: i * 0.2,
                  }}
                  className={`flex items-center ${
                    i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="w-5/12">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="
                        relative p-6 rounded-2xl
                        border border-white/10 bg-white/[0.02]
                        hover:border-[#B4FF39]/30 transition-colors duration-300
                        group
                      "
                    >
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#B4FF39]/0 group-hover:border-[#B4FF39]/40 transition-all duration-500 rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#B4FF39]/0 group-hover:border-[#B4FF39]/40 transition-all duration-500 rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#B4FF39]/0 group-hover:border-[#B4FF39]/40 transition-all duration-500 rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#B4FF39]/0 group-hover:border-[#B4FF39]/40 transition-all duration-500 rounded-br-xl" />

                      <h3 className="text-2xl font-bold text-white group-hover:text-[#B4FF39] transition-colors duration-300">
                        {paso.titulo}
                      </h3>
                      <p className="mt-2 text-lg text-white/50">
                        {paso.descripcion}
                      </p>
                    </motion.div>
                  </div>

                  <div className="w-2/12 flex justify-center relative">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 8px rgba(180,255,57,0.3)',
                          '0 0 24px rgba(180,255,57,0.6)',
                          '0 0 8px rgba(180,255,57,0.3)',
                        ],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                      }}
                      className="
                        w-14 h-14 rounded-full
                        border-2 border-[#B4FF39]/60
                        bg-black/60 backdrop-blur-sm
                        flex items-center justify-center
                        text-[#B4FF39] font-bold text-lg
                        relative z-10
                      "
                    >
                      {paso.n}
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: i * 0.5,
                        }}
                        className="absolute inset-0 rounded-full border border-[#B4FF39]/25"
                      />
                    </motion.div>
                  </div>

                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}