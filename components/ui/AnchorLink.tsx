'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';

type AnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function AnchorLink({ href, onClick, ...props }: AnchorLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !href.includes('#')) return;

    const url = new URL(href, window.location.href);
    if (url.pathname !== window.location.pathname || !url.hash) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
      window.history.pushState(null, '', nextUrl);
    }
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
