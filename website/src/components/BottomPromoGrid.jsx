import styles from './BottomPromoGrid.module.css';

export default function BottomPromoGrid() {
  return (
    <section className={styles.bottomPromoGrid}>
      <div className={`${styles.promoBox} ${styles.bgRed100}`}>
        <h3>Turn insights into growth</h3>
        <p>
          Discover how to build real-time supporter profiles and deliver
          personalized experiences using Art Block’s powerful tools.
        </p>
        <button className={styles.textRed600}>Learn More</button>
      </div>

      <div
        className={`${styles.promoBox} ${styles.bgCyan100} ${styles.promoCardCentered}`}
      >
        <img
          src="/images/influencer.webp"
          alt="Creator Tools"
          className={styles.centeredImage}
        />
        <h3 className={styles.centeredHeading}>
          Empower Your Creative Journey
        </h3>
        <p className={styles.centeredParagraph}>
          Discover powerful tools and insights designed to help creators
          connect, grow, and thrive in the digital world.
        </p>
      </div>

      <div className={`${styles.promoBox} ${styles.bgGray100}`}>
        <h3>Experience Creators Live</h3>
        <p>
          Missed the event? No worries. Stream all our exclusive sessions on
          demand and discover actionable tips, creative strategies, and insights
          for thriving in today’s creator economy.
        </p>
        <button className={styles.textGray700}>Learn More</button>
      </div>
    </section>
  );
}
