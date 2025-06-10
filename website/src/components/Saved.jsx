import React from 'react';
import styles from '../styles/SettingsPage.module.css';
import VideoCard from '../components/VideoCard';

const videos = [
  // 🎵 Music
  {
    title: 'Original Track Release: “Midnight Echoes”',
    thumbnail: '../images/music.jpg', // Ambient / original music
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    meta: '5.3K listens • 1 week ago',
    category: 'music',
  },
  {
    title: 'Live Performance: Acoustic Vibes Vol. 2',
    thumbnail: 'https://i.ytimg.com/vi/tAGnKpE4NCI/hqdefault.jpg', // Acoustic live performance
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    meta: '2.1K views • 3 days ago',
    category: 'music',
  },

  // 🎥 Videos
  {
    title: 'Animation Breakdown: “Dream Loop” Short Film',
    thumbnail: 'https://i.ytimg.com/vi/e4dT8FJ2GE0/hqdefault.jpg', // Animation short film
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    meta: '1.1K views • 2 days ago',
    category: 'videos',
  },

  // 🎙️ Podcasts
  {
    title: 'Creative Hustle Ep. 12: Monetizing Passion Projects',
    thumbnail: '../images/podcast.jpg', // Podcast / creative hustle
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/73.jpg',
    meta: '900 plays • 4 days ago',
    category: 'podcast',
  },
  {
    title: 'Art & Identity: Deep Conversations with Creators',
    thumbnail: 'https://i.ytimg.com/vi/60ItHLz5WEA/hqdefault.jpg', // Conversation / deep discussion
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    meta: '1.5K plays • 6 days ago',
    category: 'podcast',
  },

  // 🧑‍🏫 Live Classes
  {
    title: 'Live Art Class: Watercolor Basics for Beginners',
    thumbnail: '../images/creator.jpg', // Watercolor painting tutorial
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
    meta: 'Live • 150 participants',
    category: 'live classes',
  },
  {
    title: 'Interactive Q&A: Building a Creative Career',
    thumbnail: '../images/fantasy.webp', // Q&A / creative industry
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    meta: 'Live • 89 participants',
    category: 'live classes',
  },

  // 🎨 Art & Craft
  {
    title: 'Polymer Clay Charms: Step-by-Step Guide',
    thumbnail: '../images/dancing.jpg', // Clay charms DIY
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
    meta: '2.4K views • 1 week ago',
    category: 'art and craft',
  },
];

function Saved() {
  return (
    <div>
      <div className={styles.container}>
        <section className={styles.subscriptionsContent}>
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Saved;
