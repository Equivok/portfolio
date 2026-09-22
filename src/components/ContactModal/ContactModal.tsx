import { useState } from 'react';
import { Modal } from '../Modal';
import { CONTACT, SOCIAL_LINKS } from '../../data/contact';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modale "Contact" : liens actionnables (mailto:, tel:), bouton
 * copier pour l'email, liens vers les réseaux.
 */
export function ContactModal({ open, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} titleId="contactModalTitle" closeLabel="Fermer les informations de contact">
      <h2 id="contactModalTitle" className={styles.title}>
        Contact
      </h2>
      <p className={styles.intro}>Contenu factice — Toujours disponible pour discuter d’une opportunité ou d’un projet.</p>

      <div className={styles.list}>
        <div className={styles.row}>
          <div className={styles.rowLabel}>
            <span>Email</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
          <button type="button" className={styles.copyBtn} onClick={copyEmail}>
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>

        <div className={styles.row}>
          <div className={styles.rowLabel}>
            <span>Téléphone</span>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phoneDisplay}</a>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowLabel}>
            <span>Localisation</span>
            <span style={{ display: 'block', fontWeight: 600 }}>{CONTACT.location}</span>
          </div>
        </div>
      </div>

      <h3 className={styles.socialTitle}>Réseaux</h3>
      <div className={styles.socialList}>
        {SOCIAL_LINKS.map((link) => (
          <a key={link.label} className={styles.socialLink} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label} ↗
          </a>
        ))}
      </div>
    </Modal>
  );
}
