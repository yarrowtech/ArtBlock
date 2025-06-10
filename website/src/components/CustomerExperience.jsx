import styles from './CustomerExperience.module.css';

export default function CustomerExperience() {
  return (
    <section className={styles.customerExperienceSection}>
      <div className={styles.customerExperienceContainer}>
        <img
          src="/images/content.webp"
          alt="Experience Devices"
          className={styles.customerExperienceImage}
        />
        <div className={styles.customerExperienceText}>
          <h2>Creators Come First</h2>
          <p>
            Art Block gives you the tools to connect directly with your
            supporters and grow your creative brand, all in one place.
          </p>
          <button className={styles.customerExperienceButton}>
            Discover Art Block
          </button>
        </div>
      </div>
    </section>
  );
}
