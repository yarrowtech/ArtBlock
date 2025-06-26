// ✅ Updated MessageSlide.jsx
import React from 'react';
import styles from '../styles/MessageSlide.module.css';
import ChatList from './ChatList';
import ChatDetail from './ChatDetail';

const MessageSlide = ({ isOpen, setIsOpen, mode = 'creator' }) => {
  return (
    <div
      className={`${styles.messageSlide} ${styles[mode]} ${
        isOpen ? styles.active : ''
      }`}
      aria-hidden={!isOpen}
      aria-label="Messages panel"
      role="complementary"
      tabIndex="-1"
    >
      <ChatList onClose={() => setIsOpen(false)} />
      <ChatDetail onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default MessageSlide;
