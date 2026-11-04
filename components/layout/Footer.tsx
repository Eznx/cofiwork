import { INSTAGRAM_URL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#07090b]/80 px-6 pb-8 text-[#f2f4ee] sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} COFIWORK · Diseño digital con intención.</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#a6f5dd]">Instagram ↗</a>
      </div>
    </footer>
  );
}
