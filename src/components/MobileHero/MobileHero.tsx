import type { SceneAction } from '../Scene3D';
import styles from './MobileHero.module.css';

interface MobileHeroProps {
  onOpen: (action: SceneAction) => void;
  onLoadScene: () => void;
}

/**
 * Page d'accueil allégée pour mobile : reprend les mêmes points
 * d'entrée que la scène 3D (Projets / CV / Contact) mais sans
 * charger le runtime Spline (plusieurs centaines de Ko), qui rend
 * l'affichage trop lent sur des connexions mobiles. Une illustration
 * 100% CSS/SVG remplace le rendu 3D, et un lien discret permet de
 * charger la vraie scène 3D si l'utilisateur le souhaite explicitement.
 */
export function MobileHero({ onOpen, onLoadScene }: MobileHeroProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.illustration} aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="40" width="160" height="100" rx="14" fill="#1e222c" stroke="#2a2f3a" strokeWidth="2" />
          <rect x="34" y="54" width="132" height="72" rx="8" fill="#171a22" />
          <rect x="46" y="66" width="60" height="8" rx="4" fill="#7B5DE6" />
          <rect x="46" y="82" width="90" height="6" rx="3" fill="#8ccdf4" />
          <rect x="46" y="96" width="70" height="6" rx="3" fill="#8cf4b6" />
          <rect x="70" y="140" width="60" height="10" rx="5" fill="#2a2f3a" />
          <circle cx="100" cy="164" r="10" fill="#FF405E" />
        </svg>
      </div>

      <h1 className={styles.title}>Alexandre Grandjean</h1>
      <p className={styles.subtitle}>
        Product Designer. Découvrez mes projets, mon CV ou contactez-moi directement ci-dessous.
      </p>

      <div className={styles.actions}>
        <button type="button" className={`${styles.actionBtn} ${styles['actionBtn--primary']}`} onClick={() => onOpen('projets')}>
          Voir les projets
        </button>
        <button type="button" className={styles.actionBtn} onClick={() => onOpen('cv')}>
          Voir le CV
        </button>
        <button type="button" className={styles.actionBtn} onClick={() => onOpen('contact')}>
          Me contacter
        </button>
      </div>

      <button type="button" className={styles.sceneToggle} onClick={onLoadScene}>
        Charger la scène 3D interactive
      </button>
    </div>
  );
}
