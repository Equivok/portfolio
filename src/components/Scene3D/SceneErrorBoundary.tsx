import { Component, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Capture les erreurs de chargement/exécution de la scène 3D
 * (scène trop lourde, échec réseau, WebGL indisponible…) et
 * affiche un visuel de secours au lieu de casser toute la page.
 */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('[Scene3D] erreur capturée :', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
