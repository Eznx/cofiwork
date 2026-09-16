'use client';
import { motion } from 'framer-motion';

const jetonEase = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: jetonEase },
};

export default function QuienSoyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 pb-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">

        {/* 🔙 Botón Volver al Inicio */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: jetonEase }}
          className="inline-flex items-center gap-2 text-white/50 text-sm font-medium mb-8 hover:text-white hover:gap-3 transition-all"
        >
          ← Volver al Inicio
        </motion.a>

        <motion.div {...fadeUp} className="mb-12">
          <span className="text-white/40 text-sm font-medium tracking-widest uppercase mb-4 block">Sobre mí</span>
          <h1 className="text-5xl sm:text-6xl font-black mb-8 tracking-tight">
            Hola, soy <span className="text-white">Nicolás Ezequiel Lombardo</span>
          </h1>
        </motion.div>
        
        <motion.div {...fadeUp} transition={{ delay: 0.15, ease: jetonEase }} className="space-y-8 text-lg leading-relaxed">
          <p className="text-xl text-white/80">
            Diseño y desarrollo sitios web pensados para <strong className="text-white">atraer clientes y mostrar servicios</strong> con una presencia profesional real en internet.
          </p>
          
          <p className="text-white/50">
            No uso plantillas. Cada proyecto se construye desde cero: la estructura, el contenido y el diseño <strong className="text-white">se adaptan a lo que vos necesitás conseguir</strong>.
          </p>
          
          <p className="text-white/50">
            Mi compromiso: webs que cargan rápido, se ven impecables en cualquier dispositivo, y te representan tal cual sos.
          </p>
          
          <div className="border-t border-white/10 pt-8 mt-12">
            <p className="text-white text-xl font-semibold">
              Tu negocio merece verse bien. Empecemos.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}