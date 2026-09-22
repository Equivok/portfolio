import { useEffect, useRef, useState } from 'react';
import type { Application as SplineApplication, SplineEvent } from '@splinetool/runtime';
import { DEBUG, SCENE_URL, SCREEN_ACTIONS, type SceneAction } from './splineConfig';
import { SceneErrorBoundary } from './SceneErrorBoundary';
import styles from './Scene3D.module.css';

interface Scene3DProps {
  onAction: (action: SceneAction) => void;
}

type LoadState = 'loading' | 'ready' | 'error';

// Le runtime Spline expose parfois l'objet complet (avec .parent)
// au-delà du type SplineEvent minimal documenté ; on remonte la
// hiérarchie si elle est présente, jusqu'à trouver un nom déclaré
// dans SCREEN_ACTIONS.
interface RuntimeSceneObject {
  name?: string;
  parent?: RuntimeSceneObject | null;
}

function resolveAction(target: SplineEvent['target'] | RuntimeSceneObject | null | undefined): SceneAction | null {
  let obj = target as RuntimeSceneObject | null | undefined;
  let depth = 0;
  while (obj && depth < 6) {
    if (obj.name && SCREEN_ACTIONS[obj.name]) return SCREEN_ACTIONS[obj.name];
    obj = obj.parent ?? null;
    depth++;
  }
  return null;
}

function SceneCanvas({ onAction }: Scene3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LoadState>('loading');
  const appRef = useRef<SplineApplication | null>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Lazy loading : le runtime Spline (lourd) n'est importé que
    // lorsque ce composant est réellement monté.
    import('@splinetool/runtime')
      .then(({ Application }) => {
        if (cancelled) return;
        const app = new Application(canvas);
        appRef.current = app;
        return app.load(SCENE_URL).then(() => app);
      })
      .then((app) => {
        if (cancelled || !app) return;
        setState('ready');
        canvas.style.cursor = 'pointer';

        const handlePointer = (e: SplineEvent) => {
          if (DEBUG) {
            console.log('[Spline debug] objet activé :', e.target?.name, e.target);
          }
          const action = resolveAction(e.target);
          if (action) {
            onAction(action);
          } else if (DEBUG) {
            console.log(
              "[Spline debug] aucun objet dans SCREEN_ACTIONS ne correspond. Ajoutez le nom ci-dessus dans splineConfig.ts.",
            );
          }
        };

        // mouseDown couvre à la fois le clic souris et le tap tactile
        // dans le runtime Spline (les événements pointer sont unifiés).
        app.addEventListener('mouseDown', handlePointer);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Erreur de chargement de la scène Spline :', err);
        setState('error');
      });

    return () => {
      cancelled = true;
      appRef.current?.dispose();
    };
  }, [onAction]);

  if (state === 'error') {
    return <SceneFallback onAction={onAction} />;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvas3d"
        className={styles.canvas}
        aria-label="Scène 3D interactive d'un bureau — activez l'écran, le Mac ou le téléphone pour découvrir les projets, le CV et les contacts"
      />
      <div className={`${styles.status} ${state === 'ready' ? styles.hidden : ''}`} aria-hidden={state === 'ready'}>
        <div className={styles.spinner} />
        <p>Chargement de la scène 3D…</p>
      </div>
    </>
  );
}

function SceneFallback({ onAction }: Scene3DProps) {
  return (
    <div className={styles.fallback} role="img" aria-label="Illustration statique d'un bureau">
      <span className={styles.fallbackEmoji} aria-hidden="true">
        🖥️
      </span>
      <h2>La scène 3D n’a pas pu se charger</h2>
      <p>Pas de souci : vous pouvez accéder à tout le contenu directement grâce aux boutons ci-dessous.</p>
      <div className={styles.fallbackActions}>
        <button type="button" className={styles.fallbackBtn} onClick={() => onAction('projets')}>
          Voir les projets
        </button>
        <button type="button" className={styles.fallbackBtn} onClick={() => onAction('cv')}>
          Voir le CV
        </button>
        <button type="button" className={styles.fallbackBtn} onClick={() => onAction('contact')}>
          Contact
        </button>
      </div>
    </div>
  );
}

/**
 * Scène 3D Spline avec lazy loading, écran de chargement, gestion
 * unifiée clic/tap, et repli (error boundary + fallback visuel) en
 * cas d'échec de chargement ou de scène trop lourde. Des boutons
 * d'accessibilité en overlay HTML permettent toujours d'ouvrir
 * Projets/CV/Contact au clavier ou avec un lecteur d'écran, même
 * quand la scène fonctionne (les objets 3D ne sont pas des
 * éléments DOM focusables).
 */
export function Scene3D({ onAction }: Scene3DProps) {
  return (
    <div className={styles.wrap}>
      <SceneErrorBoundary fallback={<SceneFallback onAction={onAction} />}>
        <SceneCanvas onAction={onAction} />
      </SceneErrorBoundary>

      <p className={styles.hint}>
        <strong>Astuce —</strong> touchez ou cliquez sur l’écran, le Mac ou le téléphone du bureau pour ouvrir Projets, CV ou
        Contact.
      </p>

      <div className={styles.a11yActions}>
        <button type="button" className={styles.a11yBtn} onClick={() => onAction('projets')}>
          Projets
        </button>
        <button type="button" className={styles.a11yBtn} onClick={() => onAction('cv')}>
          CV
        </button>
        <button type="button" className={styles.a11yBtn} onClick={() => onAction('contact')}>
          Contact
        </button>
      </div>
    </div>
  );
}
