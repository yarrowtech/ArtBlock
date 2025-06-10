// src/pages/Explore.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Explore.module.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Explore = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/subscribe');
  };
  return (
    <div>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <h2>Featured Creators</h2>
          <section className={styles.featuredCreators}>
            <div className={styles.creatorCard}>
              <img src="https://randomuser.me/api/portraits/men/7.jpg" alt="" />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt=""
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img
                src="https://randomuser.me/api/portraits/women/5.jpg"
                alt=""
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="" />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
          </section>

          <h2>Categories</h2>
          <section className={styles.categories}>
            <div className={styles.category}>
              <img src="../images/creator.jpg" alt="" />
              <h5 className={styles.cardTitle}>Explore</h5>
              <p className={styles.cardText}>Art</p>
            </div>
            <div className={styles.category}>
              <img src="../images/music.jpg" alt="" />
              <h5 className={styles.cardTitle}>Explore</h5>
              <p className={styles.cardText}>Music</p>
            </div>
            <div className={styles.category}>
              <img src="../images/dancing.jpg" alt="" />
              <h5 className={styles.cardTitle}>Explore</h5>
              <p className={styles.cardText}>Dance</p>
            </div>
            <div className={styles.category}>
              <img src="../images/podcast.jpg" alt="" />
              <h5 className={styles.cardTitle}>Explore</h5>
              <p className={styles.cardText}>Podcast</p>
            </div>
            <div className={styles.category}>
              <img src="../images/content.webp" alt="" />
              <h5 className={styles.cardTitle}>Explore</h5>
              <p className={styles.cardText}>Vlogs</p>
            </div>
          </section>

          <h2>New Creators</h2>
          <section className={styles.featuredCreators}>
            <div className={styles.creatorCard}>
              <img src="https://randomuser.me/api/portraits/men/6.jpg" alt="" />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img
                src="https://randomuser.me/api/portraits/women/7.jpg"
                alt=""
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img
                src="https://randomuser.me/api/portraits/women/8.jpg"
                alt=""
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img
                src="https://randomuser.me/api/portraits/men/10.jpg"
                alt=""
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img
                src="https://randomuser.me/api/portraits/men/16.jpg"
                alt=""
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Creator Name</h5>
                <p className={styles.cardText}>Video Creator</p>
                <button className={styles.cardBtn} onClick={handleClick}>
                  Join
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Explore;
