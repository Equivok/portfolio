/* ==============================================================
   DONNÉES DU CV — contenu fictif d'un Product Designer expérimenté
   ============================================================== */

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Education {
  title: string;
  school: string;
  period: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const CV_IDENTITY = {
  name: 'Alexandre Grandjean',
  title: 'Product Designer Senior',
  tagline:
    'Contenu factice — 8 ans d’expérience en design produit, spécialisé dans les parcours complexes B2B/B2C, la recherche utilisateur et les design systems.',
  pdfUrl: '/cv/alexandre-grandjean-cv.pdf',
};

export const EXPERIENCES: Experience[] = [
  {
    role: 'Lead Product Designer',
    company: 'Nova Finance (fictif)',
    period: '2022 — aujourd’hui',
    location: 'Paris, France',
    bullets: [
      'Contenu factice — Pilotage d’une équipe de 4 designers sur l’ensemble du parcours bancaire mobile.',
      'Contenu factice — Mise en place d’un design system partagé avec 3 équipes produit, réduisant le temps de conception de 30 %.',
      'Contenu factice — Animation d’ateliers de recherche utilisateur trimestriels avec plus de 40 participants par cycle.',
    ],
  },
  {
    role: 'Product Designer',
    company: 'Flux Analytics (fictif)',
    period: '2019 — 2022',
    location: 'Lyon, France',
    bullets: [
      'Contenu factice — Conception d’un dashboard analytics B2B utilisé par plus de 5 000 comptes professionnels.',
      'Contenu factice — Collaboration étroite avec les équipes produit et data pour prioriser les indicateurs clés.',
      'Contenu factice — Mise en place de tests utilisateurs mensuels et de boucles de feedback continues.',
    ],
  },
  {
    role: 'UX/UI Designer',
    company: 'Studio Kaleido (fictif)',
    period: '2016 — 2019',
    location: 'Nantes, France',
    bullets: [
      'Contenu factice — Conception d’interfaces pour une dizaine de clients dans les secteurs santé et retail.',
      'Contenu factice — Réalisation de wireframes, prototypes interactifs et tests d’utilisabilité.',
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    title: 'Master Design d’Interaction (fictif)',
    school: 'École de Design Nantes Atlantique (fictif)',
    period: '2014 — 2016',
  },
  {
    title: 'Licence Arts Appliqués (fictif)',
    school: 'Université de Nantes (fictif)',
    period: '2011 — 2014',
  },
];

export const SKILLS: SkillGroup[] = [
  { category: 'Recherche', items: ['Entretiens utilisateurs', 'Tests d’utilisabilité', 'Tri par cartes', 'Analyse de données'] },
  { category: 'Conception', items: ['Wireframing', 'Prototypage', 'Design systems', 'Accessibilité (WCAG)'] },
  { category: 'Outils', items: ['Figma', 'Notion', 'Maze', 'Storybook', 'Amplitude'] },
  { category: 'Collaboration', items: ['Ateliers design sprint', 'Handoff développeurs', 'Facilitation d’atelier'] },
];
