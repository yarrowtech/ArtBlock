import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from '../styles/FeedPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark as regularBookmark,
  faComment,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Reusable Post Component
const Post = ({ post, onJoin }) => {
  // Format createdAt as e.g. '2h ago' or date string
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };
  return (
    <div className={styles.post}>
      <div className={styles.postProfile}>
        {post.profilePhoto ? (
          <img
            src={post.profilePhoto.startsWith('http')
              ? post.profilePhoto
              : `http://localhost:5000/${post.profilePhoto.replace(/\\/g, '/')}`}
            alt="profile"
            className={styles.profilePic}
          />
        ) : (
          <div className={styles.profilePic}></div>
        )}
        <div className={styles.username}>{post.username}</div>
        <div className={styles.postTime}>{formatTime(post.createdAt)}</div>
        <FontAwesomeIcon icon={regularBookmark} className={styles.bookmark} />
      </div>
      <div className={styles.caption}>{post.caption}</div>
      <div className={styles.content}>
        {post.mediaType === 'image' ? (
          <img src={post.mediaUrl} alt="post" />
        ) : (
          <video controls>
            <source src={post.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className={styles.interact}>
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faComment} />
        <FontAwesomeIcon icon={faShare} />
        <button type="button" className={styles.join} onClick={onJoin}>
          Join
        </button>
      </div>
    </div>
  );
};

// Reusable Story Component
const Story = ({ imgUrl, name }) => (
  <div className={styles.story}>
    <div className={styles.storyRing}>
      <img src={imgUrl} alt={name} className={styles.profilePic} />
    </div>
    <h5>{name}</h5>
  </div>
);

const DEFAULT_PROFILE_PHOTO = 'https://ui-avatars.com/api/?name=User&background=random';

const FeedPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [suggestedCreators, setSuggestedCreators] = useState([]);

  const handleNavigation = (path) => navigate(path);
  const handleJoin = () => handleNavigation('/creatorprofile');

  const scroll = (direction) => {
    const scrollAmount = 150;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        const fetchedPosts = response.data.map((post) => ({
          ...post,
          mediaUrl: post.mediaUrl.startsWith('http')
            ? post.mediaUrl
            : `http://localhost:5000${post.mediaUrl}`,
          profilePhoto: post.profilePhoto
            ? (post.profilePhoto.startsWith('http')
                ? post.profilePhoto
                : `http://localhost:5000${post.profilePhoto}`)
            : null,
        }));
        // Sort posts by createdAt descending (latest first)
        fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchCreators = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/role/creator');
        console.log('Fetched creators:', response.data);
        setSuggestedCreators(response.data);
      } catch (error) {
        console.error('Error fetching creators:', error);
      }
    };

    fetchPosts();
    fetchCreators();

    setUsernames([
      'john',
      'emma',
      'alex',
      'lisa',
      'mark',
      'sara',
      'dave',
      'nina',
      'max',
      'olivia',
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.item2}>
        {/* Story section */}
        <div className={styles.storyContainer}>
          <button className={styles.arrowLeft} onClick={() => scroll('left')}>
            &#8249;
          </button>
          <div className={styles.storyDiv} ref={scrollRef}>
            {usernames.map((name, index) => (
              <Story
                key={index}
                imgUrl={`https://i.pravatar.cc/150?img=${index + 1}`}
                name={name}
              />
            ))}
          </div>
          <button className={styles.arrowRight} onClick={() => scroll('right')}>
            &#8250;
          </button>
        </div>

        {/* Posts section */}
        {posts.map((post, i) => (
          <Post key={i} post={post} onJoin={handleJoin} />
        ))}
      </div>

      {/* Suggested Creators */}
      <div className={styles.item3}>
        <h3 className={styles.suggestionTitle}>Suggested Creators</h3>
        <ul className={styles.creatorList}>
          {suggestedCreators.map((creator) => (
            <li key={creator._id} className={styles.creatorItem}>
              <img
                src={
                  creator.profilePhoto
                    ? (creator.profilePhoto.startsWith('http')
                        ? creator.profilePhoto
                        : `http://localhost:5000/${creator.profilePhoto.replace(/\\/g, '/')}`)
                    : DEFAULT_PROFILE_PHOTO
                }
                alt={creator.username}
                className={styles.avatar}
              />
              <div className={styles.creatorInfo}>
                <span className={styles.creatorName}>{creator.username}</span>
                {creator.bio && <span className={styles.creatorHandle}>{creator.bio}</span>}
              </div>
              <button className={styles.followBtn} onClick={handleJoin}>
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedPage;
