import React from 'react';
import styles from '../styles/VideoCard.module.css';

function VideoCard({ title, thumbnail, avatar, channel, meta }) {
  return (
    <article className={styles.videoCard}>
      <div
        className={styles.thumbnail}
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      <div className={styles.videoInfo}>
        <div className={styles.details}>
          <div className={styles.title} title={title}>
            {title}
          </div>
          <div className={styles.channelName}>{channel}</div>
          <div className={styles.meta}>{meta}</div>
        </div>
      </div>
    </article>
  );
}

export default VideoCard;
