import React, { useEffect, useState } from 'react';
import styles from '../styles/SettingsPage.module.css';
import VideoCard from '../components/VideoCard';

// TODO: Replace mock data with API fetch
const mockSavedVideos = [
  {
    title: 'Original Track Release: “Midnight Echoes”',
    thumbnail: '../images/music.jpg',
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    meta: '5.3K listens • 1 week ago',
    category: 'music',
  },
  {
    title: 'Live Performance: Acoustic Vibes Vol. 2',
    thumbnail: 'https://i.ytimg.com/vi/tAGnKpE4NCI/hqdefault.jpg',
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    meta: '2.1K views • 3 days ago',
    category: 'music',
  },
  {
    title: 'Animation Breakdown: “Dream Loop” Short Film',
    thumbnail: 'https://i.ytimg.com/vi/e4dT8FJ2GE0/hqdefault.jpg',
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    meta: '1.1K views • 2 days ago',
    category: 'videos',
  },
  {
    title: 'Creative Hustle Ep. 12: Monetizing Passion Projects',
    thumbnail: '../images/podcast.jpg',
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/73.jpg',
    meta: '900 plays • 4 days ago',
    category: 'podcast',
  },
  {
    title: 'Art & Identity: Deep Conversations with Creators',
    thumbnail: 'https://i.ytimg.com/vi/60ItHLz5WEA/hqdefault.jpg',
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    meta: '1.5K plays • 6 days ago',
    category: 'podcast',
  },
  {
    title: 'Live Art Class: Watercolor Basics for Beginners',
    thumbnail: '../images/creator.jpg',
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
    meta: 'Live • 150 participants',
    category: 'live classes',
  },
  {
    title: 'Interactive Q&A: Building a Creative Career',
    thumbnail: '../images/fantasy.webp',
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    meta: 'Live • 89 participants',
    category: 'live classes',
  },
  {
    title: 'Polymer Clay Charms: Step-by-Step Guide',
    thumbnail: '../images/dancing.jpg',
    channel: 'username',
    avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
    meta: '2.4K views • 1 week ago',
    category: 'art and craft',
  },
];

function Saved() {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    // Replace with real API call in the future
    // Example:
    // fetch('/api/saved')
    //   .then((res) => res.json())
    //   .then((data) => setSavedVideos(data));

    setSavedVideos(mockSavedVideos);
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.subscriptionsContent}>
        {savedVideos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </section>
    </div>
  );
}

export default Saved;
