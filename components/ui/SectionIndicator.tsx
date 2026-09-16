'use client';

interface Props {
  active: number;
  total: number;
}

export default function SectionIndicator({ active, total }: Props) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i === active
              ? 'bg-[#B4FF39] scale-125 shadow-[0_0_10px_rgba(180,255,57,0.6)]'
              : 'bg-white/20 hover:bg-white/40'
          }`}
        />
      ))}
    </div>
  );
}