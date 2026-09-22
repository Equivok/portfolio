import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Piège le focus clavier à l'intérieur du conteneur `containerRef`
 * tant que `active` est vrai (utilisé par les modales). Restaure le
 * focus précédent à la fermeture.
 */
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusable[0] ?? container).focus();
    };
    focusFirst();

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
      previouslyFocused?.focus();
    };
  }, [active, containerRef]);
}
