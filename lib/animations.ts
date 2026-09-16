// ==================================================
// ANIMACIONES Y CURVAS UNIFICADAS
// ==================================================

export const jetonEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: jetonEase } }
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: jetonEase } }
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: jetonEase } }
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: jetonEase } }
};

export const letraPorLetra = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: jetonEase } }
};

export const viewportOnce = { once: true, margin: "-80px" };