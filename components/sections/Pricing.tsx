'use client';
import TextReveal from '@/components/ui/TextReveal';
import ScaleOnScroll from '@/components/ui/ScaleOnScroll';
import MagneticButton from '@/components/ui/MagneticButton';
import { plans, WA_URL } from '@/lib/constants';

export default function Pricing() {
  return (
    <section className="border-b border-[#B4FF39]/15 px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <TextReveal>
          <h2 className="text-4xl font-black uppercase text-white">Sabés cuánto pagás. Sabés qué obtenés.</h2>
          <p className="mt-4 max-w-xl text-lg text-white/40">Sin sorpresas. Sin letra chica.</p>
        </TextReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <ScaleOnScroll key={plan.name} delay={i * 0.15}>
              <div className={`rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(180,255,57,0.08)] ${
                plan.featured
                  ? 'border-2 border-[#B4FF39]/50 bg-[#B4FF39]/5 shadow-[0_0_30px_rgba(180,255,57,0.08)]'
                  : 'border border-white/10 bg-white/[0.02] hover:border-[#B4FF39]/30'
              }`}>
                {plan.featured && <span className="text-sm font-medium text-[#B4FF39]/70">⭐ Más elegido</span>}
                <h3 className="mt-2 text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-3 text-3xl font-black text-[#B4FF39]">{plan.price}</p>
                <p className="mt-2 text-sm text-white/40">{plan.maintenance}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-white/60">
                      <span className="font-bold text-[#B4FF39]">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <MagneticButton href={WA_URL}>{plan.cta}</MagneticButton>
              </div>
            </ScaleOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}