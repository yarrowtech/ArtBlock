import React, { useState, useEffect } from 'react';
import styles from '../styles/NotificationPanel.module.css';

const sampleNotifications = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    message: '<strong>username</strong> liked your photo.',
    time: '2m ago',
    read: false,
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    message: '<strong>username</strong> subscribed your profile.',
    time: '10m ago',
    read: false,
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    message: '<strong>username</strong> shared your portfolio',
    time: '30m ago',
    read: true,
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    message: '<strong>username</strong> tagged you in a photo.',
    time: '1h ago',
    read: true,
  },
  {
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    message: '<strong>username</strong> sent you a message.',
    time: '2h ago',
    read: true,
  },
];

const NotificationPanel = ({ open, setOpen }) => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const hasUnread = notifications.some((n) => !n.read);

  const handleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* <div
        className={styles.notificationBell}
        data-unread={hasUnread}
        onClick={togglePanel}
        aria-label="Open notifications"
        role="button"
        tabIndex="0"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
      </div> */}

      <div
        className={`${styles.panel} ${open ? styles.open : ''}`}
        aria-live="polite"
      >
        <div className={styles.panelHeader}>
          Notifications
          <button className={styles.closeBtn} onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.notificationsList}>
          {notifications.map((n) => (
            <div
              key={n.id}
              className={styles.notificationItem}
              onClick={() => handleRead(n.id)}
              tabIndex="0"
            >
              <div
                className={styles.avatar}
                style={{ backgroundImage: `url(${n.avatar})` }}
              />
              <div className={styles.notificationContent}>
                <div
                  className={styles.notificationMessage}
                  dangerouslySetInnerHTML={{ __html: n.message }}
                />
                <div className={styles.notificationTime}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.overlay} ${open ? styles.overlayActive : ''}`}
        onClick={() => setOpen(false)}
      />
    </>
  );
};

export default NotificationPanel;
