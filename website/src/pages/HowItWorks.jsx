// src/components/HowItWorks.jsx
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from '../styles/HowItWorks.module.css';

const HowItWorks = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>How Art Block Works</h1>
        <p className={styles.subheading}>
          A simple platform for creators to earn and supporters to connect.
        </p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.icon}>🎨</div>
            <h2>1. Create Your Profile</h2>
            <p>
              Sign up as a creator, set up your profile, and showcase your work
              to the world.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.icon}>📦</div>
            <h2>2. Add Exclusive Content</h2>
            <p>
              Upload posts, videos, downloadable content, and more for your
              supporters.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.icon}>💰</div>
            <h2>3. Set Subscription Tiers</h2>
            <p>
              Offer various tier plans to give your community flexible ways to
              support you.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.icon}>📹</div>
            <h2>4. Go Live & Engage</h2>
            <p>
              Host live sessions, share updates, and build direct relationships
              with your supporters.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.icon}>🤝</div>
            <h2>5. Support & Enjoy</h2>
            <p>
              Supporters get access to exclusive perks while helping creators
              grow sustainably.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
