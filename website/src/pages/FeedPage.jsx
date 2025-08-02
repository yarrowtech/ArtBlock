import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from '../styles/FeedPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBookmark as regularBookmark,
  faComment,
  faHeart as regularHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  faShare,
  faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { posts as postsApi } from '../services/api';

// Reusable Post Component
const Post = ({
  post,
  onJoin,
  onCommentClick,
  onLike,
  likeCount,
  liked,
  likeLoading,
}) => {
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
            src={
              post.profilePhoto.startsWith('http')
                ? post.profilePhoto
                : `http://localhost:5000/${post.profilePhoto.replace(
                    /\\/g,
                    '/'
                  )}`
            }
            alt="profile"
            className={styles.profilePic}
          />
        ) : (
          <div className={styles.profilePic}></div>
        )}
        <div className={styles.username}>{post.username}</div>
        <div className={styles.postTime}>{formatTime(post.createdAt)}</div>
        {/* <FontAwesomeIcon icon={regularBookmark} className={styles.bookmark} /> */}
      </div>
      <div className={styles.caption}>{post.caption}</div>
      <div
        className={styles.content}
        onClick={() => onCommentClick(post)}
        style={{ cursor: 'pointer' }}
      >
        {post.mediaType === 'image' ? (
          <img src={post.mediaUrl} alt="post" />
        ) : (
          <video autoPlay muted loop playsInline className={styles.video}>
            <source src={post.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className={styles.interact}>
        <button
          className={styles.likeBtn}
          onClick={() => onLike(post)}
          disabled={likeLoading}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <FontAwesomeIcon
            icon={liked ? solidHeart : regularHeart}
            style={{ color: liked ? '#e74c3c' : undefined }}
          />
        </button>
        <span className={styles.likeCount}>{likeCount}</span>
        <FontAwesomeIcon
          icon={faComment}
          onClick={() => onCommentClick(post)}
          style={{ cursor: 'pointer' }}
        />
        <FontAwesomeIcon icon={faShare} />
        <button
          type="button"
          className={styles.join}
          onClick={() => onJoin(post.creatorId)}
        >
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

const DEFAULT_PROFILE_PHOTO =
  'https://ui-avatars.com/api/?name=User&background=random';

const FeedPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [suggestedCreators, setSuggestedCreators] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  // Like state
  const [likeInfo, setLikeInfo] = useState({}); // { [postId]: { count, liked, loading } }

  const handleNavigation = (path) => navigate(path);
  const handleJoin = (creatorId) => navigate(`/creatorprofile/${creatorId}`);

  const scroll = (direction) => {
    const scrollAmount = 150;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Open comment modal and fetch comments for the post
  const handleCommentClick = async (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
    setLoadingComments(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/${post._id}/comments`
      );
      setComments(res.data);
    } catch (err) {
      setComments([]);
    }
    setLoadingComments(false);
  };

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${selectedPost._id}/comments`,
        {
          text: newComment,
        }
      );
      setComments((prev) => [...prev, res.data]);
      setNewComment('');
    } catch (err) {
      // Optionally show error
    }
  };

  const closeModal = () => {
    setShowCommentModal(false);
    setSelectedPost(null);
    setComments([]);
    setNewComment('');
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
            ? post.profilePhoto.startsWith('http')
              ? post.profilePhoto
              : `http://localhost:5000${post.profilePhoto}`
            : null,
        }));
        // Sort posts by createdAt descending (latest first)
        fetchedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(fetchedPosts);

        // Fetch like info for all posts
        const likeResults = await Promise.all(
          fetchedPosts.map(async (post) => {
            try {
              const res = await postsApi.getLikes(post._id);
              return { postId: post._id, ...res.data };
            } catch {
              return { postId: post._id, count: 0, liked: false };
            }
          })
        );
        const likeMap = {};
        likeResults.forEach(({ postId, count, liked }) => {
          likeMap[postId] = { count, liked, loading: false };
        });
        setLikeInfo(likeMap);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchCreators = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/role/creator'
        );
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
  // Like/unlike handler
  const handleLike = async (post) => {
    const postId = post._id;
    setLikeInfo((prev) => ({
      ...prev,
      [postId]: { ...prev[postId], loading: true },
    }));
    try {
      const res = await postsApi.toggleLike(postId);
      // Get new like count
      const likeRes = await postsApi.getLikes(postId);
      setLikeInfo((prev) => ({
        ...prev,
        [postId]: {
          count: likeRes.data.count,
          liked: likeRes.data.liked,
          loading: false,
        },
      }));
    } catch {
      setLikeInfo((prev) => ({
        ...prev,
        [postId]: { ...prev[postId], loading: false },
      }));
    }
  };

  // Format createdAt for comments
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
          <Post
            key={i}
            post={post}
            onJoin={handleJoin}
            onCommentClick={handleCommentClick}
            onLike={handleLike}
            likeCount={likeInfo[post._id]?.count || 0}
            liked={likeInfo[post._id]?.liked || false}
            likeLoading={likeInfo[post._id]?.loading || false}
          />
        ))}
      </div>

      {/* Comment Modal */}
      {showCommentModal && selectedPost && (
        <div className={styles.commentModalOverlay} onClick={closeModal}>
          <div
            className={styles.commentModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.commentModalContent}>
              {/* Post preview */}
              <div className={styles.commentModalPost}>
                {selectedPost.mediaType === 'image' ? (
                  <img
                    src={selectedPost.mediaUrl}
                    alt="post"
                    className={styles.commentModalImg}
                  />
                ) : (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.commentModalImg}
                  >
                    <source src={selectedPost.mediaUrl} type="video/mp4" />
                  </video>
                )}
                <div className={styles.commentModalCaption}>
                  {selectedPost.caption}
                </div>
              </div>
              {/* Comments list */}
              <div className={styles.commentListSection}>
                <h4>Comments</h4>
                {loadingComments ? (
                  <div>Loading...</div>
                ) : comments.length === 0 ? (
                  <div>No comments yet.</div>
                ) : (
                  <ul className={styles.commentList}>
                    {comments.map((c, idx) => (
                      <li key={c._id || idx} className={styles.commentItem}>
                        <span className={styles.commentUser}>
                          {c.username || 'User'}
                        </span>
                        <span className={styles.commentText}>{c.text}</span>
                        <span className={styles.commentTime}>
                          {formatTime(c.createdAt)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className={styles.commentInputSection}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={styles.commentInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment();
                    }}
                  />
                  <button
                    className={styles.commentSendBtn}
                    onClick={handleAddComment}
                  >
                    Post
                  </button>
                </div>
              </div>
              <button className={styles.commentModalClose} onClick={closeModal}>
                &times;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Creators */}
      <div className={styles.item3}>
        <h3 className={styles.suggestionTitle}>Suggested Creators</h3>
        <ul className={styles.creatorList}>
          {suggestedCreators.map((creator) => (
            <li key={creator._id} className={styles.creatorItem}>
              <img
                src={
                  creator.profilePhoto
                    ? creator.profilePhoto.startsWith('http')
                      ? creator.profilePhoto
                      : `http://localhost:5000/${creator.profilePhoto.replace(
                          /\\/g,
                          '/'
                        )}`
                    : DEFAULT_PROFILE_PHOTO
                }
                alt={creator.username}
                className={styles.avatar}
              />
              <div className={styles.creatorInfo}>
                <span className={styles.creatorName}>{creator.username}</span>
                {creator.bio && (
                  <span className={styles.creatorHandle}>
                    {creator.bio.slice(0, 10)}
                    {creator.bio.length > 10 ? '...' : ''}
                  </span>
                )}
              </div>
              <button
                className={styles.followBtn}
                onClick={() => handleJoin(creator._id)}
              >
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
