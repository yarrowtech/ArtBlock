// ✅ Updated NotificationPanel.jsx
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

const NotificationPanel = ({ open, setOpen, mode = 'creator' }) => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const hasUnread = notifications.some((n) => !n.read);

  const handleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [setOpen]);

  return (
    <>
      <div
        className={`${styles.panel} ${styles[mode]} ${open ? styles.open : ''}`}
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
