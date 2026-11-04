'use client';

import dynamic from 'next/dynamic';

const HolographicScene = dynamic(() => import('@/components/ui/HolographicScene'), { ssr: false });

export default function HolographicBackdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 opacity-40 sm:opacity-50 lg:opacity-60">
      <HolographicScene />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,9,11,.45)_100%)]" />
    </div>
  );
}
