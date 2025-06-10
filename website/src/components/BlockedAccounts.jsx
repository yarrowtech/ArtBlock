// src/components/BlockedAccounts.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SettingsPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BlockedAccounts = () => {
  const [blocked, setBlocked] = useState([
    { id: 1, name: 'John Doe', username: '@john' },
    { id: 2, name: 'Jane Smith', username: '@jane' },
  ]);

  const unblock = (id) => {
    setBlocked((prev) => prev.filter((user) => user.id !== id));
  };
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <button className={styles.back} onClick={() => navigate('/feed')}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Feed
      </button>
      <h2>Blocked Accounts</h2>
      {blocked.length === 0 ? (
        <p>No accounts blocked.</p>
      ) : (
        <ul className={styles.blockedList}>
          {blocked.map((user) => (
            <li key={user.id} className={styles.blockedUser}>
              <div>
                <strong>{user.name}</strong> <span>{user.username}</span>
              </div>
              <button
                onClick={() => unblock(user.id)}
                className={styles.unblockBtn}
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default BlockedAccounts;
