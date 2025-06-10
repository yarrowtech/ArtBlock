import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Art Block. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/cookies">Cookie preferences</Link>
      </div>
    </footer>
  );
}
