'use client';
import ScaleOnScroll from '@/components/ui/ScaleOnScroll';
import MagneticButton from '@/components/ui/MagneticButton';
import { WA_URL } from '@/lib/constants';

export default function Closing() {
  return (
    <section className="px-5 py-28 text-center sm:px-6">
      <div className="mx-auto max-w-3xl">
        <ScaleOnScroll>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-tight text-white">
            Tu negocio merece verse bien.
          </h2>
          <p className="mt-6 text-xl text-white/40">Empezamos cuando decidas.</p>
          <div className="mt-10">
            <MagneticButton href={WA_URL}>Hablemos →</MagneticButton>
          </div>
        </ScaleOnScroll>
      </div>
    </section>
  );
}