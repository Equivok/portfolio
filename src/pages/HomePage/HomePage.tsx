import { useState } from 'react';
import { Header } from '../../components/Header';
import { Scene3D, type SceneAction } from '../../components/Scene3D';
import { ProjectsModal } from '../../components/ProjectsModal';
import { CvModal } from '../../components/CvModal';
import { ContactModal } from '../../components/ContactModal';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

/**
 * Page d'accueil : scène 3D flottante + trois modales (Projets,
 * CV, Contact), déclenchées à la fois par les objets 3D (via
 * Scene3D → onAction) et par les boutons de secours accessibles
 * du header / de la scène.
 */
export function HomePage() {
  const [activeModal, setActiveModal] = useState<SceneAction | null>(null);

  useDocumentMeta({
    title: 'Portfolio - Alexandre GRANDJEAN',
    description: "Portfolio d'Alexandre Grandjean, Product Designer — projets, CV et contact.",
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  });

  return (
    <>
      <a href="#canvas3d" className="skip-link visually-hidden">
        Aller au contenu principal
      </a>

      <Header onOpen={setActiveModal} />

      <Scene3D onAction={setActiveModal} />

      <ProjectsModal open={activeModal === 'projets'} onClose={() => setActiveModal(null)} />
      <CvModal open={activeModal === 'cv'} onClose={() => setActiveModal(null)} />
      <ContactModal open={activeModal === 'contact'} onClose={() => setActiveModal(null)} />
    </>
  );
}
