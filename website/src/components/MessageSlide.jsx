import React, { useState } from 'react';
import styles from '../styles/MessageSlide.module.css';
import ChatList from './ChatList';
import ChatDetail from './ChatDetail';

const MessageSlide = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* <button
        className={styles.openBtn}
        onClick={() => setIsOpen(true)}
        aria-label="Open Messages"
      >
        &#9993;
      </button> */}

      <div
        className={`${styles.messageSlide} ${isOpen ? styles.active : ''}`}
        aria-hidden={!isOpen}
        aria-label="Messages panel"
        role="complementary"
        tabIndex="-1"
      >
        <ChatList onClose={() => setIsOpen(false)} />
        <ChatDetail onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default MessageSlide;
