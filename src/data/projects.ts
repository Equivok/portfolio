/* ==============================================================
   DONNÉES DES PROJETS
   ==============================================================
   Pour ajouter un projet : ajoutez une entrée à la fin du tableau
   PROJECTS ci-dessous. Rien d'autre à modifier : le carrousel de
   la modale "Projets" et les pages /projets/:slug se génèrent
   automatiquement à partir de ce tableau (slug, navigation
   précédent/suivant, meta/OG).
   ============================================================== */

export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

export interface Project {
  /** Identifiant unique utilisé dans l'URL /projets/:slug */
  slug: string;
  /** Titre affiché */
  title: string;
  /** Résumé court, utilisé dans le carrousel et les meta OG */
  summary: string;
  /** Rôle occupé sur le projet */
  role: string;
  /** Année de réalisation */
  year: string;
  /** Technologies / outils utilisés */
  tech: string[];
  /** Contexte / problème rencontré */
  problem: string;
  /** Solution apportée */
  solution: string;
  /** Résultats obtenus */
  results: string;
  /** Galerie d'images ou vidéos */
  gallery: ProjectMedia[];
  /** Lien vers le projet en ligne (optionnel) */
  liveUrl?: string;
  /** Lien vers le dépôt de code (optionnel) */
  repoUrl?: string;
  /** Image de couverture pour le carrousel + partage OG */
  cover: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'nova-banking-app',
    title: '[EXEMPLE] Nova — application bancaire mobile',
    summary:
      'Refonte complète du parcours d’onboarding et de virement d’une néobanque fictive, avec un design system modulaire.',
    role: 'Product Designer (lead UX/UI)',
    year: '2024',
    tech: ['Figma', 'Design System', 'React Native', 'Maze'],
    problem:
      'Contenu factice — Le taux d’abandon lors de l’ouverture de compte dépassait 60 % à cause d’un parcours trop long et d’un vocabulaire bancaire peu clair pour les nouveaux utilisateurs.',
    solution:
      'Contenu factice — Refonte du parcours en étapes progressives avec sauvegarde automatique, simplification du vocabulaire, et création d’un design system partagé avec les développeurs pour accélérer les itérations.',
    results:
      'Contenu factice — Taux de complétion de l’onboarding amélioré de 61 % à 89 % en 3 mois, temps moyen de complétion réduit de 40 %, satisfaction utilisateur (CSAT) en hausse de 1,4 point.',
    gallery: [
      { type: 'image', src: '/img/projects/nova/cover.svg', alt: 'Écran d’accueil de l’application Nova (maquette factice)' },
      { type: 'image', src: '/img/projects/nova/flow.svg', alt: 'Parcours d’onboarding Nova (maquette factice)' },
      { type: 'image', src: '/img/projects/nova/system.svg', alt: 'Extrait du design system Nova (maquette factice)' },
    ],
    liveUrl: 'https://exemple.com/nova-banking-app',
    repoUrl: 'https://github.com/exemple/nova-banking-app',
    cover: '/img/projects/nova/cover.svg',
  },
  {
    slug: 'flux-dashboard-saas',
    title: '[EXEMPLE] Flux — dashboard analytics SaaS',
    summary:
      'Conception d’un dashboard de suivi d’indicateurs pour une plateforme SaaS B2B fictive, pensé pour la densité d’information sans surcharge cognitive.',
    role: 'Product Designer (UX research + UI)',
    year: '2023',
    tech: ['Figma', 'Notion', 'Storybook', 'Amplitude'],
    problem:
      'Contenu factice — Les utilisateurs professionnels se plaignaient de ne pas trouver les indicateurs clés au milieu d’un dashboard surchargé, ce qui augmentait les tickets support de 25 %.',
    solution:
      'Contenu factice — Réalisation d’entretiens utilisateurs, tri par cartes pour prioriser les indicateurs, puis conception d’un dashboard modulaire avec widgets personnalisables et hiérarchie visuelle claire.',
    results:
      'Contenu factice — Baisse de 32 % des tickets support liés à la navigation, temps moyen pour trouver un indicateur réduit de 3 minutes à 45 secondes, adoption des widgets personnalisés par 70 % des comptes actifs.',
    gallery: [
      { type: 'image', src: '/img/projects/flux/cover.svg', alt: 'Vue d’ensemble du dashboard Flux (maquette factice)' },
      { type: 'image', src: '/img/projects/flux/widgets.svg', alt: 'Widgets personnalisables Flux (maquette factice)' },
      { type: 'image', src: '/img/projects/flux/research.svg', alt: 'Synthèse de recherche utilisateur Flux (maquette factice)' },
    ],
    liveUrl: 'https://exemple.com/flux-dashboard-saas',
    cover: '/img/projects/flux/cover.svg',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return { prev, next };
}
