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
const Post = ({ post, onJoin }) => (
  <div className={styles.post}>
    <div className={styles.postProfile}>
      <div className={styles.profilePic}></div>
      <div className={styles.username}>{post.username}</div>
      <div className={styles.postTime}>.5h</div>
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

// Reusable Story Component
const Story = ({ imgUrl, name }) => (
  <div className={styles.story}>
    <div className={styles.storyRing}>
      <img src={imgUrl} alt={name} className={styles.profilePic} />
    </div>
    <h5>{name}</h5>
  </div>
);

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
          caption: post.content,
          mediaUrl: post.mediaUrl.startsWith('http')
            ? post.mediaUrl
            : `http://localhost:5000${post.mediaUrl}`,
          mediaType: post.mediaType,
          username: 'amitsaha2002', // temporary
          createdAt: post.createdAt,
        }));
        console.log('Fetched posts:', fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

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

    setSuggestedCreators(
      Array.from({ length: 8 }, (_, i) => ({
        name: `Creator ${i + 1}`,
        handle: `@creator${i + 1}`,
        avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
      }))
    );
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
          {suggestedCreators.map((creator, index) => (
            <li key={index} className={styles.creatorItem}>
              <img
                src={creator.avatar}
                alt={creator.name}
                className={styles.avatar}
              />
              <div className={styles.creatorInfo}>
                <span className={styles.creatorName}>{creator.name}</span>
                <span className={styles.creatorHandle}>{creator.handle}</span>
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
