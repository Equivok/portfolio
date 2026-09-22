/* ==============================================================
   CONFIGURATION SPLINE À PERSONNALISER
   ==============================================================
   a) URL de la scène exportée en "Vanilla JS / Code" depuis
      Spline (Export > Code > Vanilla) :
*/
export const SCENE_URL = 'https://prod.spline.design/3nyVCTSnHG8Hr80N/scene.splinecode';

export type SceneAction = 'projets' | 'cv' | 'contact';

/*
   b) Nom EXACT (sensible à la casse) de chaque objet interactif
      dans le panneau "Objects" de l'éditeur Spline, associé à
      l'action qu'il doit déclencher. Renommez vos objets dans
      Spline pour qu'ils correspondent aux clés ci-dessous (ou
      l'inverse).

      Comment trouver le nom exact : cliquez sur l'objet dans
      l'éditeur Spline → son nom apparaît en haut du panneau de
      droite et dans l'arborescence "Objects" à gauche. Vous
      pouvez aussi activer DEBUG ci-dessous pour le voir dans la
      console au clic.
*/
export const SCREEN_ACTIONS: Record<string, SceneAction> = {
  Écran: 'projets',
  Projets: 'projets',
  Mac: 'cv',
  CV: 'cv',
  Téléphone: 'contact',
  Contact: 'contact',
};

// Passez à true le temps de retrouver le nom exact de vos objets
// dans la console du navigateur, puis repassez à false.
export const DEBUG = true;
