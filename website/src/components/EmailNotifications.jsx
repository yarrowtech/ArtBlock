// src/components/EmailNotifications.jsx
import React, { useState } from 'react';
import styles from '../styles/SettingsPage.module.css';

const EmailNotifications = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <section className={styles.section}>
      <h2>Email Notifications</h2>
      <div className={styles.toggleContainer}>
        <span className={styles.emailNotificationLabel}>
          Receive Email Notifications
        </span>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
    </section>
  );
};

export default EmailNotifications;
