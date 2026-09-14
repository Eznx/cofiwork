'use client';
import { motion } from 'framer-motion';
// ✅ Curva corregida con tipo para TypeScript
const jetonEase = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: jetonEase },
};
const WA_NUMBER = "5491166173514";
const WA_TEXT = "Hola Nicolás, vi tu web. Quiero hablar sobre mi proyecto.";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;
const INSTAGRAM_URL = "https://www.instagram.com/3zequielxlombardo/";
const portfolio = [
  {
    name: "Desarrollo Web Profesional",
    tag: "Desarrollo",
    description: "Diseño y desarrollo pensado para atraer clientes y mostrar servicios con presencia profesional.",
    image: "/foto1.jpeg",
  },
  {
    name: "Soluciones a Medida",
    tag: "Consultoría",
    description: "Estructura, contenido y diseño adaptado a tus necesidades. Cada proyecto desde cero, no desde plantillas.",
    image: "/foto2.jpeg",
  },
  {
    name: "Presencia Completa",
    tag: "Presencia Digital",
    description: "Web con información, ubicación, contacto directo y todo lo necesario para crecer en internet.",
    image: "/foto3.jpeg",
  },
];
const process = [
  { n: "01", title: "Me contactas", description: "Me contas qué necesitas, sin formularios largos ni complicaciones." },
  { n: "02", title: "Ves la propuesta", description: "Definimos juntos la estructura y el diseño antes de avanzar." },
  { n: "03", title: "Queda lista", description: "Publicamos tu web y queda funcionando para recibir visitas." },
];
const plans = [
  {
    name: "INICIO",
    price: "Desde $200.000",
    maintenance: "Mantenimiento opcional",
    description: "Presencia web profesional para empezar.",
    features: ["Landing de una página", "Diseño a medida", "Adaptable a celular", "WhatsApp integrado", "Publicación incluida"],
    cta: "Consultar",
    featured: false,
  },
  {
    name: "PROFESIONAL",
    price: "Desde $380.000",
    maintenance: "Mantenimiento opcional",
    description: "Web completa para presentar tu negocio.",
    features: ["Hasta 5 páginas", "Diseño a medida", "Inicio y servicios", "Contacto y ubicación", "Formularios", "Google Analytics", "Publicación incluida"],
    cta: "Quiero este plan",
    featured: true,
  },
  {
    name: "A MEDIDA",
    price: "A definir",
    maintenance: "Presupuesto personalizado",
    description: "Funcionalidades específicas para tu proyecto.",
    features: ["Catálogos", "Reservas", "Tienda en línea", "Integraciones", "Desarrollo desde cero"],
    cta: "Hablar de mi proyecto",
    featured: false,
  },
];
export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-[#B4FF39] selection:text-black">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: jetonEase }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
          
          {/* ✅ TU LOGO EN LUGAR DEL TEXTO */}
          <a href="#inicio" className="flex items-center">
            <img
              src="/logo2.png"
              alt="COFIWORK"
              className="h-9 w-auto object-contain"
            />
          </a>

          <div className="flex items-center gap-6">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#B4FF39] px-5 py-2.5 text-[11px] font-black uppercase text-black transition-all duration-300 hover:bg-white hover:scale-105">Instagram</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#B4FF39] px-5 py-2.5 text-[11px] font-black uppercase text-black transition-all duration-300 hover:bg-white hover:scale-105">
              WHATSAPP
            </a>
          </div>
        </div>
      </motion.nav>

      <section id="inicio" className="relative flex min-h-screen items-center px-5 pb-24 pt-36 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: jetonEase, delay: 0.15 }}
            className="text-[clamp(3.5rem,9vw,7.5rem)] font-black uppercase leading-[0.85] tracking-[-0.06em]"
          >
            Tu presencia<br />en internet,<br />construida a medida.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: jetonEase, delay: 0.3 }}
            className="mt-8 max-w-2xl text-2xl leading-relaxed text-white/60"
          >
            Para presentar tu negocio, atraer clientes y crecer. Todo lo que necesitás, sin lo que no necesitás.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: jetonEase, delay: 0.45 }}
            className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              { titulo: "Simple", desc: "Entendida de un vistazo" },
              { titulo: "Rápida", desc: "Carga al instante" },
              { titulo: "Tuya", desc: "Hecha a medida" },
            ].map((item, i) => (
              <motion.div
                key={item.titulo}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: jetonEase, delay: 0.5 + i * 0.12 }}
                className="border-l-2 border-[#B4FF39] pl-6"
              >
                <h3 className="text-3xl font-black text-[#B4FF39]">{item.titulo}</h3>
                <p className="mt-2 text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: jetonEase, delay: 0.65 }}
            className="mt-14 inline-flex h-16 items-center justify-center rounded-full bg-[#B4FF39] px-10 text-lg font-black uppercase text-black transition-all duration-300 hover:bg-white hover:scale-105"
          >
            Quiero mi web →
          </motion.a>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: jetonEase }}
              className="md:w-2/5 flex justify-center md:justify-start"
            >
              <img
                src="/foto2t.png"
                alt="Nicolás Ezequiel Lombardo — Desarrollador Web"
                className="w-full max-w-xs object-contain"
                style={{ filter: "drop-shadow(0 0 40px rgba(180, 255, 57, 0.18))" }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: jetonEase, delay: 0.15 }}
              className="md:w-3/5"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-[#B4FF39]">Quién soy</span>
              <h2 className="mt-3 text-4xl font-black uppercase leading-tight">
                Soy Nicolás Lombardo
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60">
                Diseño y desarrollo webs pensadas para marcas que buscan imponerse.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/60">
                Cada proyecto lo empiezo desde cero y lo termino cuando cada parte está en su lugar.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/60">
                Tu web tiene que ser esencial, clara y trabajar por vos.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm">Diseño a medida</span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm">Desarrollo desde cero</span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm">Enfoque en resultados</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="trabajos" className="border-t border-white/10 bg-[#080808] px-5 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-4xl font-black uppercase">Una web con un propósito.</motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.08 }} className="mt-4 max-w-xl text-lg text-white/50">
            Cada proyecto parte de tu negocio, no de una plantilla.
          </motion.p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {portfolio.map((project, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: jetonEase, delay: i * 0.12 }}
                className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#111] transition-all duration-400 hover:border-[#B4FF39]/30 hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={project.image} alt={project.name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold text-[#B4FF39]">{project.tag}</p>
                  <h3 className="mt-2 text-xl font-black uppercase">{project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{project.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="border-t border-white/10 px-5 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-4xl font-black uppercase">Así de simple.</motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {process.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: jetonEase, delay: i * 0.12 }}
                className="border-t-2 border-[#B4FF39] pt-6"
              >
                <span className="text-5xl font-black text-[#B4FF39]">{step.n}</span>
                <h3 className="mt-4 text-2xl font-black uppercase">{step.title}</h3>
                <p className="mt-3 text-white/50">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-4xl font-black uppercase">Sabés cuánto pagás.</motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.08 }} className="mt-4 max-w-xl text-lg text-white/50">
            Sin facturas sorpresa. Sin letra chica.
          </motion.p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: jetonEase, delay: i * 0.15 }}
                className={`rounded-[24px] p-8 transition-all duration-400 hover:-translate-y-1 ${
                  plan.featured ? "bg-white text-black scale-105 shadow-2xl" : "border border-white/10 bg-[#0f0f0f]"
                }`}
              >
                {plan.featured && <span className="text-sm font-bold text-black/50">Más elegido</span>}
                <h3 className="mt-2 text-2xl font-black">{plan.name}</h3>
                <p className="mt-3 text-4xl font-black">{plan.price}</p>
                <p className={`mt-2 text-sm ${plan.featured ? "text-black/50" : "text-[#B4FF39]"}`}>
                  {plan.maintenance}
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className={`font-bold ${plan.featured ? "text-black" : "text-[#B4FF39]"}`}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 block text-center rounded-full py-3 font-black uppercase transition-all duration-300 hover:scale-105 ${
                  plan.featured ? "bg-[#B4FF39] text-black hover:bg-white" : "bg-[#B4FF39] text-black hover:bg-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-28 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...fadeUp} className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-tight">
            Tu negocio merece<br />estar en internet.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.12 }} className="mt-6 text-xl text-white/50">
            Tomá el control hoy mismo. Una web que trabaja por vos.
          </motion.p>
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: jetonEase, delay: 0.25 }}
            className="mt-10 inline-flex h-16 items-center justify-center rounded-full bg-[#B4FF39] px-12 text-lg font-black uppercase text-black transition-all duration-300 hover:bg-white hover:scale-105"
          >
            Empezar mi web →
          </motion.a>
          <motion.p {...fadeUp} transition={{ delay: 0.4 }} className="mt-4 text-sm text-white/30">
            Solo toma unos segundos comenzar.
          </motion.p>
        </div>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: jetonEase }}
        className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/30"
      >
        © {new Date().getFullYear()} Nicolás Ezequiel Lombardo · Webs para negocios que quieren crecer.
        {" · "}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[#B4FF39] hover:underline">Instagram</a>
      </motion.footer>
    </main>
  );
}