import React from 'react';
import styles from '../styles/MessageSlide.module.css';

const ChatDetail = ({ onClose }) => {
  return (
    <section className={styles.chatDetail}>
      <div className={styles.chatDetailHeader}>
        <img src="" alt="" className={styles.chatAvatar} />
        <div className={styles.chatDetailName}>User Name</div>
        <button onClick={onClose} aria-label="Close Chat">
          ×
        </button>
      </div>
      <div className={styles.messagesContainer}></div>
      <form className={styles.messageInputContainer}>
        <input
          type="text"
          placeholder="Message..."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendBtn}>
          Send
        </button>
      </form>
    </section>
  );
};

export default ChatDetail;
