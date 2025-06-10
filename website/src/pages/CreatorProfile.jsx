import React, { useState } from 'react';
import styles from '../styles/CreatorProfile.module.css';
import { useNavigate } from 'react-router-dom';
import NotificationPanel from '../components/NotificationPanel';
import MessageSlide from '../components/MessageSlide';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// icons
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import CreatorStories from '../components/CreateStories';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const CreatorProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('post');
  const [open, setOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

const toggleSidebar = () => {
  setMenuOpen(!menuOpen);
};


  const togglePanel = () => setOpen(!open);

  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    link: '',
  });

  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClasses([...classes, form]);
    setForm({ title: '', description: '', date: '', time: '', link: '' });
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
  ];

  const user = {
    name: 'Amit Saha',
    username: 'amitsaha',
    role: 'Creator',
    bio: 'Passionate digital artist sharing tutorials, time-lapses, and behind-the-scenes of my artwork.',
    subscriberCount: '1M',
    posts: [
      {
        id: 1,
        title: 'How I Made This Fantasy Illustration',
        type: 'image',
        mediaUrl: '../images/fantasy.webp',
        content: 'A deep dive into my process and tools...',
        date: '2025-05-10',
      },
      {
        id: 2,
        title: 'Speed Painting Session',
        type: 'video',
        mediaUrl: '../images/loginbg.mp4',
        content: 'Watch how I speed paint a full piece in 30 minutes...',
        date: '2025-05-08',
      },
      {
        id: 3,
        title: 'Art Tips for Beginners',
        type: 'text',
        content: 'Start simple. Don’t aim for perfection...',
        date: '2025-05-07',
      },
    ],
  };

  const handleLogout = () => navigate('/auth?mode=login');

  const handleSubscribe = (planId) => navigate(`/subscribe/${planId}`);

  const CreatePostPopup = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [mediaFile, setMediaFile] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!mediaFile) {
        alert('Please upload a media file.');
        return;
      }

      const fileType = mediaFile.type.startsWith('image')
        ? 'image'
        : mediaFile.type.startsWith('video')
        ? 'video'
        : 'unknown';

      if (fileType === 'unknown') {
        alert('Only image and video files are allowed.');
        return;
      }

      const postData = {
        title,
        caption,
        media: mediaFile,
        type: fileType,
      };

      console.log('Post Created:', postData);
      onClose();
    };

    return (
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
          <h2>Create New Post</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Post Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            ></textarea>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMediaFile(e.target.files[0])}
              required
            />

            {mediaFile && mediaFile.type.startsWith('image') && (
              <img
                src={URL.createObjectURL(mediaFile)}
                alt="Preview"
                className={styles.preview}
              />
            )}

            {mediaFile && mediaFile.type.startsWith('video') && (
              <video controls className={styles.preview}>
                <source
                  src={URL.createObjectURL(mediaFile)}
                  type={mediaFile.type}
                />
                Your browser does not support the video tag.
              </video>
            )}

            <button type="submit" className={styles.primaryBtn}>
              Publish
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {/* Hamburger Icon */}
      <button className={styles.hamburger} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <h2>Art Block</h2>
        <nav className={styles.nav}>
          <button onClick={() => navigate('/creatorprofile')}>Profile</button>
          <button onClick={() => navigate('/creatordashboard')}>Dashboard</button>
          <button onClick={() => setIsMessageOpen(true)}>Messages</button>
          <button onClick={togglePanel}>Notifications</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      <main className={styles.container}>
        <div className={styles.profile}>
          <img src="../images/fantasy.webp" alt="" className={styles.cover} />
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Creator Avatar"
            className={styles.avatar}
          />
          <h2>{user.name}</h2>
          <p className={styles.role}>{user.role}</p>
          <p className={styles.username}>@{user.username}</p>
          <p className={styles.bio}>{user.bio}</p>
          <p className={styles.subscribers}>
            Subscribers: <strong>{user.subscriberCount}</strong>
          </p>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => handleNavigation('/creatoredit')}
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
        <CreatorStories/>

        <div className={styles.profileDiv}>
          <div className={styles.profileBtn}>
            <button onClick={() => setData('post')}>Posts</button>
            <button onClick={() => setData('liveclasses')}>Live Classes</button>
            <button onClick={() => setData('membership')}>Membership</button>
          </div>

          {data === 'post' && (
            <div className={styles.posts}>
              <div className={styles.post}>
                <div className={styles.postProfile}>
                  <div className={styles.profilePic}></div>
                  <div className={styles.username}>amitsaha2002</div>
                  <div className={styles.postTime}>.5h</div>
                </div>

                <div className={styles.caption}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore, libero!
                </div>

                <div className={styles.content}>
                  <img src="../images/podcast.jpg" alt="" />
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
              <div className={styles.post}>
                <div className={styles.postProfile}>
                  <div className={styles.profilePic}></div>
                  <div className={styles.username}>amitsaha2002</div>
                  <div className={styles.postTime}>.5h</div>
                </div>
                <div className={styles.caption}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore, libero!
                </div>

                <div className={styles.content}>
                  <img src="../images/dancing.jpg" alt="" />
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
              <div className={styles.post}>
                <div className={styles.postProfile}>
                  <div className={styles.profilePic}></div>
                  <div className={styles.username}>amitsaha2002</div>
                  <div className={styles.postTime}>.5h</div>
                </div>

                <div className={styles.caption}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore, libero!
                </div>

                <div className={styles.content}>
                  <img src="../images/music.jpg" alt="" />
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
            </div>
          )}

          {data === 'liveclasses' && (
            <div className={styles.container}>
              <section className={styles.createSection}>
                <h2>Schedule a New Class</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
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
                    placeholder="Live Stream URL (Zoom/YouTube/etc)"
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
                  <h5>No classes scheduled.</h5>
                ) : (
                  <ul>
                    {classes.map((cls, index) => (
                      <li key={index} className={styles.classCard}>
                        <h3>{cls.title}</h3>
                        <p>{cls.description}</p>
                        <p>
                          📅 {cls.date} 🕒 {cls.time}
                        </p>
                        <a
                          href={cls.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button>Join Live</button>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}

          {data === 'membership' && (
            <div className={styles.container}>
              <h1 className={styles.heading}>Subscription Plans</h1>
              <div className={styles.plans}>
                {plans.map((plan) => (
                  <div key={plan.id} className={styles.planCard}>
                    <h2 className={styles.planName}>{plan.name}</h2>
                    <p className={styles.price}>{plan.price}</p>
                    <ul className={styles.features}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <button
                      className={styles.subscribeButton}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      Subscribe
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <NotificationPanel open={open} setOpen={setOpen} />
      <MessageSlide isOpen={isMessageOpen} setIsOpen={setIsMessageOpen} />

      {showCreatePopup && (
        <CreatePostPopup onClose={() => setShowCreatePopup(false)} />
      )}
    </div>
  );
};

export default CreatorProfile;
