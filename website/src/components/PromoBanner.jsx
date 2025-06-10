import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <section className={styles.promoBanner}>
      <div className={`${styles.promoCard} ${styles.bgRed600}`}>
        <h2>Create Freely. Share Passionately.</h2>
        <p>
          Thousands of creators use Art Block to publish videos, podcasts,
          writing, music, art, recipes, and more with their most dedicated
          supporters.
        </p>
        <button>Learn more</button>
      </div>
      <div className={`${styles.promoCard} ${styles.bgPurple800}`}>
        <h2>Explore Art Block Features</h2>
        <ul>
          <li>What is Art Block?</li>
          <li>See subscription plans</li>
          <li>Discover creator tools</li>
          <li>Browse top creators</li>
          <li>Access exclusive content</li>
          <li>For creators</li>
          <li>For supporters</li>
        </ul>
      </div>
    </section>
  );
}
