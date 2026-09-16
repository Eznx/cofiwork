import Link from 'next/link';
import { INSTAGRAM_URL } from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-5 py-8 text-center text-sm text-white/30">
      © {year} Nicolás Ezequiel Lombardo · Webs hechas a medida.
      {' · '}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/50 hover:text-white transition-colors"
      >
        Instagram
      </a>
    </footer>
  );
}