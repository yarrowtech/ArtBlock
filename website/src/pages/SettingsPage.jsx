// src/pages/SettingsPage.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SettingsPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <h1>Settings</h1>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Profile Edit
        </NavLink>
        <NavLink
          to="email-notifications"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Email Notifications
        </NavLink>
        <NavLink
          to="payment-history"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Payment History
        </NavLink>
        <NavLink
          to="blocked-accounts"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Blocked Accounts
        </NavLink>
        <NavLink
          to="saved"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Saved
        </NavLink>
      </nav>
      <main className={styles.content}>
        <button className={styles.back} onClick={() => navigate('/feed')}>
          <FontAwesomeIcon className={styles.faArrowLeft} icon={faArrowLeft} />
          Back to Feed
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsPage;
