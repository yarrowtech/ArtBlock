import styles from './BusinessSection.module.css';

export default function BusinessSection() {
  return (
    <section className={styles.businessSection}>
      <img
        src="/images/creator.jpg"
        alt="Creator"
        className={styles.businessSectionImage}
      />
    </section>
  );
}
