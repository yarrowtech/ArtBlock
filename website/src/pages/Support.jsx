// src/components/Support.jsx
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from '../styles/Support.module.css';

const Support = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.supportContainer}>
        <h1 className={styles.heading}>Need Help? We're Here!</h1>
        <p className={styles.intro}>
          Whether you're a creator or supporter, our team is always ready to
          help you get the best experience on Art Block.
        </p>

        <div className={styles.sections}>
          <div className={styles.card}>
            <h2>Contact Us</h2>
            <p>
              Email:{' '}
              <a href="mailto:support@artblock.com">support@artblock.com</a>
            </p>
            <p>Phone: +91 99999 99999</p>
          </div>

          <div className={styles.card}>
            <h2>FAQ</h2>
            <p>
              Find answers to commonly asked questions about subscriptions,
              content access, and creator tools.
            </p>
            <a className={styles.link} href="/faq">
              Go to FAQ →
            </a>
          </div>

          <div className={styles.card}>
            <h2>Report a Bug</h2>
            <p>
              Encountered a problem on the site? Let us know and we’ll get it
              fixed quickly.
            </p>
            <a className={styles.link} href="/bug-report">
              Report a Bug →
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
