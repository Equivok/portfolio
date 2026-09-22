import { Modal } from '../Modal';
import { CV_IDENTITY, EDUCATION, EXPERIENCES, SKILLS } from '../../data/cv';
import styles from './CvModal.module.css';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modale "CV" : CV structuré en HTML (expériences, formation,
 * compétences) plutôt qu'un PDF intégré (mal supporté sur mobile),
 * avec un bouton de téléchargement du PDF en secours.
 */
export function CvModal({ open, onClose }: CvModalProps) {
  return (
    <Modal open={open} onClose={onClose} titleId="cvModalTitle" wide closeLabel="Fermer le CV">
      <div className={styles.header}>
        <div>
          <h2 id="cvModalTitle" className={styles.title}>
            {CV_IDENTITY.name}
          </h2>
          <p className={styles.role}>{CV_IDENTITY.title}</p>
        </div>
        <a className={styles.downloadBtn} href={CV_IDENTITY.pdfUrl} download>
          ⭳ Télécharger le PDF
        </a>
      </div>

      <p className={styles.tagline}>{CV_IDENTITY.tagline}</p>

      <section className={styles.section} aria-labelledby="cvExperienceTitle">
        <h3 id="cvExperienceTitle" className={styles.sectionTitle}>
          Expériences
        </h3>
        {EXPERIENCES.map((exp) => (
          <article className={styles.experience} key={`${exp.company}-${exp.period}`}>
            <div className={styles.experienceHead}>
              <p className={styles.experienceRole}>
                {exp.role} · {exp.company}
              </p>
              <p className={styles.experienceMeta}>
                {exp.period} — {exp.location}
              </p>
            </div>
            <ul>
              {exp.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="cvEducationTitle">
        <h3 id="cvEducationTitle" className={styles.sectionTitle}>
          Formation
        </h3>
        {EDUCATION.map((edu) => (
          <div className={styles.education} key={edu.title}>
            <p className={styles.educationTitle}>{edu.title}</p>
            <p className={styles.educationMeta}>
              {edu.school} — {edu.period}
            </p>
          </div>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="cvSkillsTitle">
        <h3 id="cvSkillsTitle" className={styles.sectionTitle}>
          Compétences
        </h3>
        <div className={styles.skillGroups}>
          {SKILLS.map((group) => (
            <div key={group.category}>
              <p className={styles.skillGroupTitle}>{group.category}</p>
              <div className={styles.skillTags}>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Modal>
  );
}
