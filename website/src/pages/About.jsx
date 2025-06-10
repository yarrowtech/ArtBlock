// src/components/About.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.aboutContainer}>
        <h1 className={styles.heading}>About Art Block</h1>
        <p className={styles.description}>
          Art Block is a creator-first platform that helps artists, designers,
          musicians, and all types of creators connect directly with their
          supporters. Whether you're sharing exclusive content, offering
          subscription tiers, or hosting live classes, Art Block empowers you to
          turn your passion into a sustainable journey.
        </p>
        <div className={styles.features}>
          <h2>Why Art Block?</h2>
          <ul>
            <li>👥 Direct connection with your community</li>
            <li>💰 Custom subscription plans for supporters</li>
            <li>📹 Host live sessions and classes</li>
            <li>📦 Share downloadable content securely</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
