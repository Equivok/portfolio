import { useEffect } from 'react';

/**
 * Verrouille le scroll du body pendant qu'une modale est ouverte,
 * en conservant la position de scroll pour éviter tout saut visuel.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const previousOverflow = body.style.overflow;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    return () => {
      body.style.overflow = previousOverflow;
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
