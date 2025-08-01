import React, { useState, useEffect } from 'react';
import styles from '../styles/Explore.module.css';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const ExplorePage = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState({});
  const [featuredCreators, setFeaturedCreators] = useState([]);
  const [newCreators, setNewCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/explore/creators'
        );
        setFeaturedCreators(res.data.featuredCreators);
        setNewCreators(res.data.newCreators);
      } catch (error) {
        console.error('Failed to fetch creators:', error);
      }
    };

    fetchCreators();
  }, []);

  const toggleLike = (caption) => {
    setLiked((prev) => ({
      ...prev,
      [caption]: !prev[caption],
    }));
  };

  const goToProfile = (name) => {
    navigate(`/creatorprofile/${encodeURIComponent(name)}`);
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
            {featuredCreators.map(({ _id, name, bio, profilePhoto }) => (
              <div className={styles.creatorCard} key={_id}>
                <img
                  src={
                    profilePhoto
                      ? `http://localhost:5000/${profilePhoto.replace(
                          /\\/g,
                          '/'
                        )}`
                      : 'https://placehold.co/150x150'
                  }
                  alt={name}
                  className={styles.avatar}
                />

                <h3 className={styles.creatorName}>{name}</h3>
                <p className={styles.creatorBio}>{bio}</p>
                <button
                  className={styles.joinButton}
                  onClick={() => goToProfile(name)}
                >
                  Join
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
          {newCreators.map(({ _id, name, profilePhoto }) => (
            <div className={styles.smallCreatorCard} key={_id}>
              <img
                src={
                  profilePhoto
                    ? `http://localhost:5000/${profilePhoto.replace(
                        /\\/g,
                        '/'
                      )}`
                    : 'https://placehold.co/150x150'
                }
                alt={name}
                className={styles.smallAvatar}
              />

              <h3 className={styles.creatorName}>{name}</h3>
              <button
                className={styles.joinButton}
                onClick={() => goToProfile(name)}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
