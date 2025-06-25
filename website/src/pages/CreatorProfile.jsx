import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CreatorProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faShare,
  faBookmark as solidBookmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faComment,
  faBookmark as regularBookmark,
} from '@fortawesome/free-regular-svg-icons';

import NotificationPanel from '../components/NotificationPanel';
import MessageSlide from '../components/MessageSlide';
import CreatorStories from '../components/CreateStories';

// Dummy data (replace with backend fetch)
const userData = {
  name: 'Amit Saha',
  username: 'amitsaha',
  role: 'Creator',
  bio: 'Passionate digital artist...',
  subscriberCount: '1M',
};

const plans = [
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
    features: ['All Basic features', 'Priority email support', 'Up to 5 users'],
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
];

const CreatorProfile = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    // TODO: Replace static data with actual fetch
    setUser(userData);
    setPosts([
      {
        id: 1,
        title: 'Fantasy Art',
        mediaUrl: '',
        caption: 'A fantasy piece...',
        type: 'image',
      },
      {
        id: 2,
        title: 'Speed Paint',
        mediaUrl: '',
        caption: 'Speed painting session...',
        type: 'image',
      },
      {
        id: 3,
        title: 'Art Tips',
        mediaUrl: '',
        caption: 'Tips for beginners...',
        type: 'image',
      },
    ]);
  }, []);

  const handleToggleSidebar = () => setMenuOpen(!menuOpen);
  const handleLogout = () => navigate('/auth?mode=login');
  const handleSubscribe = (planId) => navigate(`/subscribe/${planId}`);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateClass = (e) => {
    e.preventDefault();
    setClasses([...classes, form]);
    setForm({ title: '', description: '', date: '', time: '', link: '' });

    // TODO: Send this class to backend
  };

  const renderPosts = () => (
    <div className={styles.posts}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <div className={styles.postProfile}>
            <div className={styles.profilePic}></div>
            <div className={styles.username}>@{user.username}</div>
            <div className={styles.postTime}>.5h</div>
          </div>
          <div className={styles.caption}>{post.caption}</div>
          <div className={styles.content}>
            {post.type === 'image' && <img src={post.mediaUrl} alt="" />}
            {post.type === 'video' && (
              <video controls>
                <source src={post.mediaUrl} type="video/mp4" />
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
    <div>
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
      {plans.map((plan) => (
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
      {/* Sidebar Toggle */}
      <button className={styles.hamburger} onClick={handleToggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <h2>Art Block</h2>
        <nav className={styles.nav}>
          <button onClick={() => navigate('/creatorprofile')}>Profile</button>
          <button onClick={() => navigate('/creatordashboard')}>
            Dashboard
          </button>
          <button onClick={() => setIsMessageOpen(true)}>Messages</button>
          <button onClick={() => setOpenNotifications(!openNotifications)}>
            Notifications
          </button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.container}>
        <div className={styles.profile}>
          <img src="../images/fantasy.webp" alt="" className={styles.cover} />
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
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
              onClick={() => navigate('/creatoredit')}
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

        {/* Tabs */}
        <div className={styles.profileBtn}>
          <button onClick={() => setView('post')}>Posts</button>
          <button onClick={() => setView('liveclasses')}>Live Classes</button>
          <button onClick={() => setView('membership')}>Membership</button>
        </div>

        {/* Content */}
        {view === 'post' && renderPosts()}
        {view === 'liveclasses' && renderLiveClasses()}
        {view === 'membership' && renderPlans()}
      </main>

      {/* Notification & Messages */}
      <NotificationPanel
        open={openNotifications}
        setOpen={setOpenNotifications}
      />
      <MessageSlide isOpen={isMessageOpen} setIsOpen={setIsMessageOpen} />

      {/* Post Popup */}
      {showCreatePopup && (
        <div className={styles.popupOverlay}>
          {/* TODO: Extract CreatePostPopup into its own component */}
          <div className={styles.popupContent}>
            <button onClick={() => setShowCreatePopup(false)}>&times;</button>
            <h2>Create New Post</h2>
            {/* Form to handle file upload and submit */}
            {/* TODO: Integrate API for media upload */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorProfile;
