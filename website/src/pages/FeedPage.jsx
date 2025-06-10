import React, { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from '../styles/FeedPage.module.css'; // CSS Module

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// icons
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const FeedPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 150;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const usernames = [
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
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.item2}>
        <div className={styles.storyContainer}>
          <button className={styles.arrowLeft} onClick={() => scroll('left')}>
            &#8249;
          </button>

          <div className={styles.storyDiv} ref={scrollRef}>
            {usernames.map((name, index) => (
              <div className={styles.story} key={index}>
                <div className={styles.storyRing}>
                  <img
                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                    alt={name}
                    className={styles.profilePic}
                  />
                </div>
                <h5>{name}</h5>
              </div>
            ))}
          </div>

          <button className={styles.arrowRight} onClick={() => scroll('right')}>
            &#8250;
          </button>
        </div>

        <div className={styles.post}>
          <div className={styles.postProfile}>
            <div className={styles.profilePic}></div>
            <div className={styles.username}>amitsaha2002</div>
            <div className={styles.postTime}>.5h</div>
            <FontAwesomeIcon
              icon={regularBookmark}
              className={styles.bookmark}
            />
          </div>

          <div className={styles.caption}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore,
            libero!
          </div>

          <div className={styles.content}>
            <img src="../images/podcast.jpg" alt="" />
          </div>

          <div className={styles.interact}>
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faComment} />
            <FontAwesomeIcon icon={faShare} />
            <button
              type="button"
              className={styles.join}
              onClick={() => handleNavigation('/subscribe')}
            >
              Join
            </button>
          </div>
        </div>
        <div className={styles.post}>
          <div className={styles.postProfile}>
            <div className={styles.profilePic}></div>
            <div className={styles.username}>amitsaha2002</div>
            <div className={styles.postTime}>.5h</div>
            <FontAwesomeIcon
              icon={regularBookmark}
              className={styles.bookmark}
            />
          </div>

          <div className={styles.caption}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore,
            libero!
          </div>

          <div className={styles.content}>
            <img src="../images/dancing.jpg" alt="" />
          </div>

          <div className={styles.interact}>
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faComment} />
            <FontAwesomeIcon icon={faShare} />

            <button
              type="button"
              className={styles.join}
              onClick={() => handleNavigation('/subscribe')}
            >
              Join
            </button>
          </div>
        </div>
        <div className={styles.post}>
          <div className={styles.postProfile}>
            <div className={styles.profilePic}></div>
            <div className={styles.username}>amitsaha2002</div>
            <div className={styles.postTime}>.5h</div>
            <FontAwesomeIcon
              icon={regularBookmark}
              className={styles.bookmark}
            />
          </div>

          <div className={styles.caption}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore,
            libero!
          </div>

          <div className={styles.content}>
            <img src="../images/music.jpg" alt="" />
          </div>

          <div className={styles.interact}>
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faComment} />
            <FontAwesomeIcon icon={faShare} />
            <button
              type="button"
              className={styles.join}
              onClick={() => handleNavigation('/subscribe')}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div className={styles.item3}>
        <h3 className={styles.suggestionTitle}>Suggested Creators</h3>
        <ul className={styles.creatorList}>
          {[
            {
              name: 'Creator Name',
              handle: '@username',
              avatar: 'https://i.pravatar.cc/40?img=1',
            },
            {
              name: 'Creator Name',
              handle: '@username',
              avatar: 'https://i.pravatar.cc/40?img=2',
            },
            {
              name: 'Creator Name',
              handle: '@username',
              avatar: 'https://i.pravatar.cc/40?img=3',
            },
            {
              name: 'Creator Name',
              handle: '@username',
              avatar: 'https://i.pravatar.cc/40?img=4',
            },
            {
              name: 'Creator Name',
              handle: '@username',
              avatar: 'https://i.pravatar.cc/40?img=5',
            },
            {
              name: 'Creator Name',
              handle: '@username',
              avatar: 'https://i.pravatar.cc/40?img=6',
            },
            {
              name: 'Creator Name',
              handle: '@username',
              avatar: 'https://i.pravatar.cc/40?img=7',
            },
            {
              name: 'Creator Name',
              handle: '@username',
              avatar: 'https://i.pravatar.cc/40?img=8',
            },
          ].map((creator, index) => (
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
              <button
                className={styles.followBtn}
                onClick={() => handleNavigation('/subscribe')}
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
