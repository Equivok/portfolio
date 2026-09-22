import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Détecte si le viewport correspond au breakpoint mobile (< 768px),
 * cohérent avec le breakpoint utilisé partout ailleurs dans le CSS
 * (Header, Modal, Scene3D…). Basé sur matchMedia + écoute des
 * changements (rotation d'écran, redimensionnement de fenêtre).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
