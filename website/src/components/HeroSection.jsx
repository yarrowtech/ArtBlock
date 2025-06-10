import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <img
          src="/images/logo.png"
          alt="Creative Cloud Logo"
          className={styles.logo}
        />
        <h1 className={styles.heading}>
          Empower Your Creativity, Share Your Passion
        </h1>
        <p className={styles.description}>
          Unlock exclusive content, connect with passionate creators, and
          support the art you love.
        </p>
        <Link to="/auth">
          <button className={styles.button}>Get Started</button>
        </Link>
      </div>
    </section>
  );
}
