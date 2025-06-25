import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from '../styles/SettingsPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SettingsPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: 'profile', label: 'Profile Edit' },
    { path: 'email-notifications', label: 'Email Notifications' },
    { path: 'payment-history', label: 'Payment History' },
    { path: 'blocked-accounts', label: 'Blocked Accounts' },
    { path: 'saved', label: 'Saved' },
  ];

  return (
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <nav className={styles.sidebar}>
        <h1 className={styles.heading}>Settings</h1>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className={styles.content}>
        <button className={styles.back} onClick={() => navigate('/feed')}>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.faArrowLeft} />
          Back to Feed
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsPage;
