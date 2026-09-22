import { useRef, useState, type ReactNode, type TouchEvent, type KeyboardEvent } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  children: ReactNode[];
  /** Libellé accessible du groupe, ex. "Projets" ou "Galerie du projet" */
  label: string;
  index: number;
  onIndexChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 40;

/**
 * Carrousel générique : swipe tactile, flèches, navigation clavier
 * (flèches gauche/droite), indicateurs de position. Le slide actif
 * est piloté par le parent (index/onIndexChange) pour pouvoir
 * réutiliser le composant à la fois pour le carrousel de projets et
 * la galerie média d'une page projet.
 */
export function Carousel({ children, label, index, onIndexChange }: CarouselProps) {
  const count = children.length;
  const touchStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const goTo = (next: number) => {
    onIndexChange(((next % count) + count) % count);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    setDragOffset(e.touches[0].clientX - touchStartX.current);
  };

  const onTouchEnd = () => {
    if (Math.abs(dragOffset) > SWIPE_THRESHOLD) {
      goTo(index + (dragOffset < 0 ? 1 : -1));
    }
    touchStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    }
  };

  return (
    <div className={styles.carousel} role="group" aria-roledescription="carrousel" aria-label={label}>
      <div
        className={styles.track}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        tabIndex={0}
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
        }}
      >
        {children.map((child, i) => (
          <div
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} sur ${count}`}
            aria-hidden={i !== index}
            key={i}
          >
            {child}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => goTo(index - 1)} aria-label="Élément précédent">
            ﹤
          </button>
          <div className={styles.dots}>
            {children.map((_, i) => (
              <button
                key={i}
                type="button"
                className={styles.dot}
                aria-current={i === index}
                aria-label={`Aller à l’élément ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button type="button" className={styles.arrow} onClick={() => goTo(index + 1)} aria-label="Élément suivant">
            ﹥
          </button>
        </div>
      )}
    </div>
  );
}
