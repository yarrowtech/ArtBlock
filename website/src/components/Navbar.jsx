import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/how-it-works">How It Works</Link>
        </li>
        <li>
          <Link to="/support">Support</Link>
        </li>
      </ul>
      <div className={styles.authButtons}>
        <Link to="/auth?mode=login">
          <button className={styles.loginButton}>Log In</button>
        </Link>
      </div>
    </nav>
  );
}
