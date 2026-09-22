import { useEffect } from 'react';

interface DocumentMetaOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Met à jour le <title> et les balises meta/Open Graph du document
 * pour la page courante. Limite connue : en SPA sans SSR/SSG, ces
 * balises sont injectées côté client après le premier rendu — la
 * plupart des navigateurs et outils de preview modernes les lisent
 * correctement, mais certains anciens crawlers qui n'exécutent pas
 * JS ne les verront pas. Pour une garantie totale il faudrait un
 * rendu statique par page (SSG), hors du périmètre choisi (Vite SPA).
 */
export function useDocumentMeta({ title, description, image, url, type = 'website' }: DocumentMetaOptions): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    if (image) upsertMeta('property', 'og:image', image);
    if (url) upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    if (image) upsertMeta('name', 'twitter:image', image);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, image, url, type]);
}
