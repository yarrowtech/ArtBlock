import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';
import NotificationPanel from './NotificationPanel';
import MessageSlide from './MessageSlide';

const Sidebar = () => {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (path) => {
    setSidebarOpen(false); // close sidebar on mobile
    navigate(path);
  };

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className={styles.hamburger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.grid}>
          <div className={styles.logo}>Art Block</div>

          <button
            className={styles.btn}
            onClick={() => handleNavigation('/feed')}
          >
            Feed
          </button>

          <button
            className={styles.btn}
            onClick={() => handleNavigation('/explore')}
          >
            Explore
          </button>

          <button
            className={styles.btn}
            onClick={() => handleNavigation('/subscriptions')}
          >
            Subscriptions
          </button>

          <button
            className={styles.btn}
            onClick={() => setMessageOpen((prev) => !prev)}
          >
            Messages
          </button>

          <button
            className={styles.btn}
            onClick={() => {
              setNotificationOpen(true);
              setMessageOpen(false);
            }}
          >
            Notification
          </button>

          <button
            className={styles.btn}
            onClick={() => handleNavigation('/settings/profile')}
          >
            Settings
          </button>
          <button
            className={styles.btn}
            onClick={() => handleNavigation('/auth?mode=login')}
          >
            Logout
          </button>
        </div>
        <NotificationPanel
          open={notificationOpen}
          setOpen={setNotificationOpen}
          mode="supporter"
        />
        <MessageSlide
          isOpen={messageOpen}
          setIsOpen={setMessageOpen}
          mode="supporter"
        />
      </aside>
    </>
  );
};

export default Sidebar;
