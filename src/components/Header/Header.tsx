import styles from './Header.module.css';
import type { SceneAction } from '../Scene3D';

interface HeaderProps {
  onOpen: (action: SceneAction) => void;
}

/**
 * Header flottant. Les entrées de menu sont de vrais boutons HTML
 * (accessibles au clavier et aux lecteurs d'écran) qui ouvrent les
 * mêmes modales que les objets 3D — sert de fallback DOM puisque
 * les objets de la scène Spline ne sont pas dans le DOM.
 */
export function Header({ onOpen }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <div className={styles.brand}>
          A<span>GRANDJEAN</span>
        </div>
      </nav>
    </header>
  );
}
