// CreatorProfile.js (final version after backend integration)

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/CreatorProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShare } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faComment,
  faBookmark as regularBookmark,
} from '@fortawesome/free-regular-svg-icons';

import NotificationPanel from '../components/NotificationPanel';
import MessageSlide from '../components/MessageSlide';
import CreatorStories from '../components/CreateStories';

const CreatorProfile = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [openMenuPostId, setOpenMenuPostId] = useState(null); // Add this state
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('post');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    link: '',
  });
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const handleMenuToggle = (postId) => {
    setOpenMenuPostId(openMenuPostId === postId ? null : postId);
  };
  const handleEditPost = (post) => {
    // TODO: Implement edit logic
    alert(`Edit post: ${post._id}`);
    setOpenMenuPostId(null);
  };
  // Handler for delete (implement as needed)
  const handleDeletePost = async (post) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`);

      // Remove deleted post from state
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
      setMessage('Post deleted successfully');
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage('Failed to delete post');
    } finally {
      setOpenMenuPostId(null);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch creator data:', err);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/creator/${id}`
        );
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchCreatorData();
    fetchPosts();
  }, [id]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) setMediaType(file.type.split('/')[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('content', content); // Caption
    formData.append('media', media);
    formData.append('mediaType', mediaType);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Post created successfully!');
      setPosts((prev) => [res.data, ...prev]);
      setContent('');
      setMedia(null);
      setMediaType('');
      setShowCreatePopup(false);
    } catch (error) {
      setMessage('Failed to create post');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSidebar = () => setMenuOpen(!menuOpen);
  const handleLogout = () => navigate('/auth?mode=login');
  const handleSubscribe = (planId) => navigate(`/subscribe/${planId}`);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleCreateClass = (e) => {
    e.preventDefault();
    setClasses([...classes, form]);
    setForm({ title: '', description: '', date: '', time: '', link: '' });
  };

  const onClose = () => setShowCreatePopup(false);

  const renderPosts = () => (
    <div className={styles.posts}>
      {posts.map((post) => (
        <div key={post._id} className={styles.post}>
          <div className={styles.postProfile}>
            <div className={styles.profilePic}></div>
            <div className={styles.username}>@{user.username}</div>
            <div className={styles.postTime}>
              {new Date(post.createdAt).toLocaleTimeString()}
            </div>
            {/* Three-dot menu */}
            <div
              className={styles.postMenuWrapper}
              style={{ position: 'relative', marginLeft: 'auto' }}
            >
              <button
                className={styles.postMenuBtn}
                onClick={() => handleMenuToggle(post._id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
              {openMenuPostId === post._id && (
                <div
                  className={styles.postMenuDropdown}
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: 0,
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 10,
                  }}
                >
                  <button
                    className={styles.postMenuItem}
                    onClick={() => handleEditPost(post)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.postMenuItem}
                    onClick={() => handleDeletePost(post)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: 'red',
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.caption}>{post.content}</div>
          <div className={styles.content}>
            {post.mediaType === 'image' && (
              <img src={`http://localhost:5000${post.mediaUrl}`} alt="" />
            )}
            {post.mediaType === 'video' && (
              <video controls>
                <source
                  src={`http://localhost:5000${post.mediaUrl}`}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
          <div className={styles.interact}>
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faComment} />
            <FontAwesomeIcon icon={faShare} />
            <FontAwesomeIcon
              icon={regularBookmark}
              className={styles.bookmark}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderLiveClasses = () => (
    <div className={styles.live}>
      <section className={styles.createSection}>
        <h2>Schedule a New Class</h2>
        <form onSubmit={handleCreateClass} className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Class Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="link"
            placeholder="Live Stream URL"
            value={form.link}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Class</button>
        </form>
      </section>
      <section className={styles.upcomingSection}>
        <h2>Upcoming Classes</h2>
        {classes.length === 0 ? (
          <p>No classes scheduled.</p>
        ) : (
          <ul>
            {classes.map((cls, idx) => (
              <li key={idx} className={styles.classCard}>
                <h3>{cls.title}</h3>
                <p>{cls.description}</p>
                <p>
                  📅 {cls.date} 🕒 {cls.time}
                </p>
                <a href={cls.link} target="_blank" rel="noopener noreferrer">
                  <button>Join Live</button>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );

  const renderPlans = () => (
    <div className={styles.plans}>
      {[
        {
          id: 'basic',
          name: 'Basic',
          price: '$9.99/mo',
          features: [
            'Access to basic features',
            'Email support',
            'Single user license',
          ],
        },
        {
          id: 'standard',
          name: 'Standard',
          price: '$19.99/mo',
          features: [
            'All Basic features',
            'Priority email support',
            'Up to 5 users',
          ],
        },
        {
          id: 'premium',
          name: 'Premium',
          price: '$29.99/mo',
          features: [
            'All Standard features',
            'Unlimited users',
            'Advanced analytics',
          ],
        },
      ].map((plan) => (
        <div key={plan.id} className={styles.planCard}>
          <h2>{plan.name}</h2>
          <p>{plan.price}</p>
          <ul>
            {plan.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <button onClick={() => handleSubscribe(plan.id)}>Subscribe</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <button className={styles.hamburger} onClick={handleToggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <aside className={styles.sidebar}>
        <h2>Art Block</h2>
        <nav className={styles.nav}>
          <button onClick={() => navigate('/creatorprofile')}>Profile</button>
          <button onClick={() => navigate('/creatordashboard')}>
            Dashboard
          </button>
          <button onClick={() => setIsMessageOpen((prev) => !prev)}>
            Messages
          </button>
          <button onClick={() => setOpenNotifications((prev) => !prev)}>
            Notifications
          </button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      <main className={styles.container}>
        <div className={styles.profile}>
          <img
            src={user.coverPhoto ? `http://localhost:5000/${user.coverPhoto}` : '../images/fantasy.webp'}
            alt="cover"
            className={styles.cover}
          />
          <img
            src={user.profilePhoto ? `http://localhost:5000/${user.profilePhoto}` : 'https://randomuser.me/api/portraits/men/1.jpg'}
            alt="avatar"
            className={styles.avatar}
          />
          <h2>{user.name}</h2>
          <p className={styles.role}>{user.role}</p>
          <p className={styles.username}>@{user.username}</p>
          <p className={styles.bio}>{user.bio}</p>
          <p>
            Subscribers: <strong>{user.subscriberCount}</strong>
          </p>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => navigate(`/creatoredit/${user._id}`)}
              className={styles.secondaryBtn}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setShowCreatePopup(true)}
              className={styles.primaryBtn}
            >
              Create Post
            </button>
          </div>
        </div>

        <CreatorStories />

        <div className={styles.profileBtn}>
          <button onClick={() => setView('post')}>Posts</button>
          <button onClick={() => setView('liveclasses')}>Live Classes</button>
          <button onClick={() => setView('membership')}>Membership</button>
        </div>

        {view === 'post' && renderPosts()}
        {view === 'liveclasses' && renderLiveClasses()}
        {view === 'membership' && renderPlans()}
      </main>

      <NotificationPanel
        open={openNotifications}
        setOpen={setOpenNotifications}
        mode="creator"
      />
      <MessageSlide
        isOpen={isMessageOpen}
        setIsOpen={setIsMessageOpen}
        mode="creator"
      />

      {showCreatePopup && (
        <div className={styles.popupOverlay} onClick={onClose}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Create a New Post</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handlePostSubmit}>
              <div className={styles.formGroup}>
                <label>Caption</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Upload Image or Video</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorProfile;
