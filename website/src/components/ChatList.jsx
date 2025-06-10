import React from 'react';
import styles from '../styles/MessageSlide.module.css';

const ChatList = ({ onClose }) => {
  return (
    <section className={styles.chatList}>
      <div className={styles.chatListHeader}>
        Chats
        <button onClick={onClose} aria-label="Close Messages">
          &times;
        </button>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="search"
          placeholder="Search"
          className={styles.chatSearch}
        />
      </div>
      <div className={styles.chatListItems}>
        {/* Map your chat items here */}
      </div>
    </section>
  );
};

export default ChatList;
