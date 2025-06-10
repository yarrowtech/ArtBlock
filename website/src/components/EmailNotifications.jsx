// src/components/EmailNotifications.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SettingsPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EmailNotifications = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);

  return (
    <section className={styles.section}>
      <button className={styles.back} onClick={() => navigate('/feed')}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Feed
      </button>
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
