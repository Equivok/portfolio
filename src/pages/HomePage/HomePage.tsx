import { useState } from 'react';
import { Header } from '../../components/Header';
import { Scene3D, type SceneAction } from '../../components/Scene3D';
import { MobileHero } from '../../components/MobileHero';
import { ProjectsModal } from '../../components/ProjectsModal';
import { CvModal } from '../../components/CvModal';
import { ContactModal } from '../../components/ContactModal';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useIsMobile } from '../../hooks/useIsMobile';

/**
 * Page d'accueil : scène 3D flottante + trois modales (Projets,
 * CV, Contact), déclenchées à la fois par les objets 3D (via
 * Scene3D → onAction) et par les boutons de secours accessibles
 * du header / de la scène.
 *
 * Sur mobile, le runtime Spline (plusieurs centaines de Ko) rend le
 * premier affichage trop lent sur des connexions mobiles : on affiche
 * donc par défaut une page d'accueil allégée (MobileHero, 100% CSS/SVG)
 * qui reprend les mêmes points d'entrée. L'utilisateur peut charger la
 * scène 3D interactive explicitement s'il le souhaite.
 */
export function HomePage() {
  const [activeModal, setActiveModal] = useState<SceneAction | null>(null);
  const isMobile = useIsMobile();
  const [wantsScene, setWantsScene] = useState(false);

  useDocumentMeta({
    title: 'Portfolio - Alexandre GRANDJEAN',
    description: "Portfolio d'Alexandre Grandjean, Product Designer — projets, CV et contact.",
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  });

  const showScene = !isMobile || wantsScene;

  return (
    <>
      <a href="#main-content" className="skip-link visually-hidden">
        Aller au contenu principal
      </a>

      <Header onOpen={setActiveModal} />

      <div id="main-content">
        {showScene ? <Scene3D onAction={setActiveModal} /> : <MobileHero onOpen={setActiveModal} onLoadScene={() => setWantsScene(true)} />}
      </div>

      <ProjectsModal open={activeModal === 'projets'} onClose={() => setActiveModal(null)} />
      <CvModal open={activeModal === 'cv'} onClose={() => setActiveModal(null)} />
      <ContactModal open={activeModal === 'contact'} onClose={() => setActiveModal(null)} />
    </>
  );
}
