/* ==============================================================
   DONNÉES DE CONTACT — contenu fictif
   ============================================================== */

export interface SocialLink {
  label: string;
  url: string;
  icon: 'linkedin' | 'github' | 'dribbble' | 'x';
}

export const CONTACT = {
  email: 'alexandre.grandjean@exemple.com',
  phone: '+33 6 00 00 00 00',
  phoneDisplay: '06 00 00 00 00',
  location: 'Paris, France',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/exemple-agrandjean', icon: 'linkedin' },
  { label: 'GitHub', url: 'https://github.com/exemple-agrandjean', icon: 'github' },
  { label: 'Dribbble', url: 'https://dribbble.com/exemple-agrandjean', icon: 'dribbble' },
  { label: 'X (Twitter)', url: 'https://x.com/exemple_agrandjean', icon: 'x' },
];
