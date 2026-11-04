import { WA_URL } from '@/lib/constants';

export default function Closing() {
  return (
    <section id="contacto" className="relative z-10 overflow-hidden bg-[#07090b]/75 px-6 pb-24 pt-16 text-[#f2f4ee] backdrop-blur-[2px] sm:px-10 lg:pb-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#176653]/15 blur-[120px]" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 overflow-hidden rounded-[2rem] border border-[#a6f5dd]/15 bg-[linear-gradient(120deg,rgba(18,34,31,.92),rgba(18,22,26,.9))] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_30px_100px_rgba(0,0,0,.25)] sm:p-12 md:flex-row md:items-end lg:p-16">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-[#a6f5dd]/10 shadow-[0_0_80px_rgba(166,245,221,.08)]" />
        <div>
          <p className="eyebrow text-[#a6f5dd]/65">El próximo paso</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.055em] sm:text-6xl">Hagamos que tu marca ocupe su lugar.</h2>
        </div>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="relative inline-flex w-fit shrink-0 items-center gap-5 rounded-full border border-[#b4ff39]/50 bg-[#b4ff39] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_35px_rgba(180,255,57,.13)] transition hover:shadow-[0_0_45px_rgba(180,255,57,.28)]" style={{ textShadow: '0 0 2px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.6)' }}>
  Contame tu idea <span aria-hidden="true">↗</span>
</a>
      </div>
    </section>
  );
}
