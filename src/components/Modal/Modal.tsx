import { useEffect, useRef, type ReactNode } from 'react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  children: ReactNode;
  wide?: boolean;
  /** aria-label du bouton de fermeture, personnalisable par contexte */
  closeLabel?: string;
}

/**
 * Composant de base partagé par les modales Projets / CV / Contact :
 * overlay, animation d'entrée/sortie, fermeture (bouton, Échap, clic
 * overlay), focus piégé, scroll du body verrouillé, aria-modal.
 */
export function Modal({ open, onClose, titleId, children, wide, closeLabel = 'Fermer' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [open, onClose]);

  return (
    <div
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        className={`${styles.panel} ${wide ? styles['panel--wide'] : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <span className={styles.dragHandle} aria-hidden="true" />
        <button type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
