import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAdjacentProjects, getProjectBySlug } from '../../data/projects';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { Carousel } from '../../components/Carousel';
import styles from './ProjectPage.module.css';

/**
 * Template unique de page projet, alimenté par les données de
 * src/data/projects.ts. Ajouter un projet = ajouter une entrée au
 * tableau PROJECTS, cette page se génère automatiquement (slug,
 * navigation précédent/suivant, meta/OG).
 */
export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const { prev, next } = slug ? getAdjacentProjects(slug) : {};
  const [galleryIndex, setGalleryIndex] = useState(0);

  const absoluteUrl = typeof window !== 'undefined' ? window.location.href : undefined;

  useDocumentMeta({
    title: project ? `${project.title} · Portfolio Alexandre Grandjean` : 'Projet introuvable',
    description: project?.summary ?? 'Ce projet n’existe pas ou plus.',
    image: project ? new URL(project.cover, window.location.origin).toString() : undefined,
    url: absoluteUrl,
    type: 'article',
  });

  if (!project) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Projet introuvable</h1>
          <p>Ce projet n’existe pas ou a été retiré.</p>
          <Link to="/" className={styles.backLink}>
            ← Retour à la scène 3D
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Retour à la scène 3D
      </Link>

      <p className={styles.eyebrow}>Étude de cas</p>
      <h1 className={styles.title}>{project.title}</h1>

      <div className={styles.metaRow}>
        <span>Rôle : {project.role}</span>
        <span>Année : {project.year}</span>
      </div>

      <div className={styles.tags}>
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <div className={styles.actions}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
            Voir le projet en ligne ↗
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>
            Voir le dépôt ↗
          </a>
        )}
      </div>

      {project.gallery.length > 0 && (
        <div className={styles.gallery}>
          <Carousel label={`Galerie du projet ${project.title}`} index={galleryIndex} onIndexChange={setGalleryIndex}>
            {project.gallery.map((media, i) =>
              media.type === 'video' ? (
                <video key={media.src} src={media.src} controls preload="metadata" style={{ width: '100%', borderRadius: 'var(--radius-sm)' }} />
              ) : (
                <img
                  key={media.src}
                  src={media.src}
                  alt={media.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  width={960}
                  height={600}
                />
              ),
            )}
          </Carousel>
        </div>
      )}

      <section className={styles.section} aria-labelledby="problemTitle">
        <h2 id="problemTitle" className={styles.sectionTitle}>
          Contexte &amp; problème
        </h2>
        <p className={styles.sectionBody}>{project.problem}</p>
      </section>

      <section className={styles.section} aria-labelledby="solutionTitle">
        <h2 id="solutionTitle" className={styles.sectionTitle}>
          Solution
        </h2>
        <p className={styles.sectionBody}>{project.solution}</p>
      </section>

      <section className={styles.section} aria-labelledby="resultsTitle">
        <h2 id="resultsTitle" className={styles.sectionTitle}>
          Résultats
        </h2>
        <p className={styles.sectionBody}>{project.results}</p>
      </section>

      <nav className={styles.nav} aria-label="Navigation entre projets">
        {prev && (
          <Link to={`/projets/${prev.slug}`} className={styles.navLink}>
            <span className={styles.navLabel}>← Projet précédent</span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link to={`/projets/${next.slug}`} className={`${styles.navLink} ${styles['navLink--next']}`}>
            <span className={styles.navLabel}>Projet suivant →</span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
