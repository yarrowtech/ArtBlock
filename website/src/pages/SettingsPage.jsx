// src/pages/SettingsPage.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from '../styles/SettingsPage.module.css';

const SettingsPage = () => (
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
    </nav>
    <main className={styles.content}>
      <Outlet />
    </main>
  </div>
);

export default SettingsPage;
