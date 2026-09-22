import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal';
import { Carousel } from '../Carousel';
import { PROJECTS } from '../../data/projects';
import styles from './ProjectsModal.module.css';

interface ProjectsModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modale "Projets" : carrousel de tous les projets, chacun pointant
 * vers sa page interne /projets/:slug (template unique alimenté par
 * les données de src/data/projects.ts).
 */
export function ProjectsModal({ open, onClose }: ProjectsModalProps) {
  const [index, setIndex] = useState(0);

  return (
    <Modal open={open} onClose={onClose} titleId="projectsModalTitle" wide closeLabel="Fermer la fenêtre des projets">
      <p className={styles.eyebrow}>Product design · UX research · Design system</p>
      <h2 id="projectsModalTitle" className={styles.title}>
        Mes projets
      </h2>

      <Carousel label="Mes projets" index={index} onIndexChange={setIndex}>
        {PROJECTS.map((project) => (
          <div className={styles.slide} key={project.slug}>
            <img
              src={project.cover}
              alt=""
              loading="lazy"
              width={960}
              height={600}
              style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
            />
            <h3 className={styles.slideTitle}>{project.title}</h3>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.tags}>
              {project.tech.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.actions}>
              <Link to={`/projets/${project.slug}`} className={`${styles.btn} ${styles.btnPrimary}`} onClick={onClose}>
                Voir la page projet
              </Link>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>
                  Site en ligne ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </Modal>
  );
}
