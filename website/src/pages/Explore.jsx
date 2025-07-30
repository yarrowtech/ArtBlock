import React, { useState } from 'react';
import styles from '../styles/Explore.module.css';
import Sidebar from '../components/Sidebar';

const categories = [
  'All',
  'Art',
  'Music',
  'Photography',
  'Writing',
  'Design',
  'Video',
  'Podcasts',
  'Tutorials',
  'Education',
];

const featuredCreators = [
  {
    name: 'Amit Saha',
    bio: 'Digital artist creating vibrant fantasy worlds and characters',
    img: '../images/profilePhoto.png',
  },
  {
    name: 'James Rodriguez',
    bio: 'Guitarist and composer blending jazz and electronic influences',
    img: '../images/music.jpg',
  },
  {
    name: 'Mia Johnson',
    bio: "Landscape photographer capturing Earth's most breathtaking views",
    img: '../images/podcast.jpg',
  },
  {
    name: 'David Park',
    bio: '2D animator specializing in cartoon shorts and motion graphics',
    img: '../images/content.webp',
  },
  {
    name: 'Priya Kapoor',
    bio: 'Science fiction author exploring AI and human consciousness',
    img: '../images/fantasy.webp',
  },
];

const posts = [
  {
    caption: 'New Series: Geometric Dreams',
    creator: 'Sarah Chen',
    likes: '1.2K',
    img: '../images/creator.jpg',
  },
  {
    caption: 'Behind the Scenes: Album Recording',
    creator: 'James Rodriguez',
    likes: '956',
    img: '../images/music.jpg',
  },
  {
    caption: 'Alpine Dawn (New Print Available)',
    creator: 'Mia Johnson',
    likes: '2.3K',
    img: '../images/fantasy.webp',
  },
  {
    caption: 'Character Concept: Space Explorer Nova',
    creator: 'David Park',
    likes: '1.8K',
    img: '../images/podcast.jpg',
  },
];

const newCreators = [
  'Amit Saha',
  'Arjo Dey',
  'Sarah Chen',
  'Emma Lee',
  'Noah Williams',
  'Amina Diallo',
  'Lucas Kim',
  'Sofia Martinez',
];

const ExplorePage = () => {
  const [following, setFollowing] = useState({});

  const toggleFollow = (name) => {
    setFollowing((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const [liked, setLiked] = useState({});

  const toggleLike = (caption) => {
    setLiked((prev) => ({
      ...prev,
      [caption]: !prev[caption],
    }));
  };

  return (
    <div className={styles.exploreContainer}>
      <Sidebar />

      <div className={styles.explorePage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Explore</h1>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search creators, topics, and more..."
            />
            <button>🔍</button>
          </div>
        </div>

        <div className={styles.categories}>
          {categories.map((cat, idx) => (
            <div key={idx} className={styles.category}>
              {cat}
            </div>
          ))}
        </div>

        <h2 className={styles.sectionTitle}>Featured Creators</h2>
        <div className={styles.featuredCreators}>
          <div className={styles.carousel}>
            {featuredCreators.map(({ name, bio, img }) => (
              <div className={styles.creatorCard} key={name}>
                <img src={img} alt={name} className={styles.avatar} />
                <h3 className={styles.creatorName}>{name}</h3>
                <p className={styles.creatorBio}>{bio}</p>
                <button
                  className={styles.followButton}
                  onClick={() => toggleFollow(name)}
                  style={{ backgroundColor: following[name] ? '#4CAF50' : '' }}
                >
                  {following[name] ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Trending Posts</h2>
        <div className={styles.postsGrid}>
          {posts.map(({ caption, creator, likes, img }) => (
            <div className={styles.postCard} key={caption}>
              <img src={img} alt={caption} className={styles.postImage} />
              <div className={styles.postInfo}>
                <p className={styles.postCaption}>{caption}</p>
                <p className={styles.postCreator}>By {creator}</p>
                <p className={styles.postLikes}>
                  <span
                    onClick={() => toggleLike(caption)}
                    style={{ color: liked[caption] ? 'red' : '' }}
                  >
                    ❤️
                  </span>
                  <span>{likes}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className={styles.sectionTitle}>New Creators</h2>
        <div className={styles.smallCreators}>
          {newCreators.map((name, idx) => (
            <div className={styles.smallCreatorCard} key={idx}>
              <img
                src="https://placehold.co/150x150"
                alt={name}
                className={styles.smallAvatar}
              />
              <h3 className={styles.creatorName}>{name}</h3>
              <button
                className={styles.followButton}
                onClick={() => toggleFollow(name)}
                style={{ backgroundColor: following[name] ? '#4CAF50' : '' }}
              >
                {following[name] ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
