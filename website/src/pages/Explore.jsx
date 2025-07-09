// src/pages/Explore.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Explore.module.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { explore } from '../services/api';

const BASE_URL = 'http://localhost:5000'; // ⚠️ Replace with deployed URL if needed
const DEFAULT_PROFILE = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

// Card component
const CreatorCard = ({ profilePhoto, name, role, onClick }) => (
  <div className={styles.creatorCard}>
    <img
      src={profilePhoto || DEFAULT_PROFILE}
      alt={name}
      onError={(e) => (e.target.src = DEFAULT_PROFILE)}
    />
    <div className={styles.cardBody}>
      <h5 className={styles.cardTitle}>{name}</h5>
      <p className={styles.cardText}>{role}</p>
      <button className={styles.cardBtn} onClick={onClick}>
        Join
      </button>
    </div>
  </div>
);

const CategoryCard = ({ image, label, sublabel }) => (
  <div className={styles.category}>
    <img src={image} alt={label} />
    <h5 className={styles.cardTitle}>{label}</h5>
    <p className={styles.cardText}>{sublabel}</p>
  </div>
);

const Explore = () => {
  const navigate = useNavigate();

  const [featuredCreators, setFeaturedCreators] = useState([]);
  const [newCreators, setNewCreators] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleClick = () => {
    navigate('/creatorprofile');
  };

  const formatCreators = (creators) =>
    creators.map((creator) => ({
      ...creator,
      profilePhoto: creator.profilePhoto
        ? creator.profilePhoto.startsWith('http')
          ? creator.profilePhoto
          : `${BASE_URL}/${creator.profilePhoto}`
        : '',
    }));

    useEffect(() => {
      explore
        .getFeaturedCreators()
        .then((res) => {
          setFeaturedCreators(formatCreators(res.data));
        })
        .catch(() => setFeaturedCreators([]));
    
      explore
        .getNewCreators()
        .then((res) => {
          // ✅ Sort by recent (assuming backend returns all)
          const sorted = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          // ✅ Take latest 5
          const latestFive = sorted.slice(0, 5);
          setNewCreators(formatCreators(latestFive));
        })
        .catch(() => setNewCreators([]));
    
      // Static categories
      setCategories([
        { image: '../images/creator.jpg', label: 'Explore', sublabel: 'Art' },
        { image: '../images/music.jpg', label: 'Explore', sublabel: 'Music' },
        { image: '../images/dancing.jpg', label: 'Explore', sublabel: 'Dance' },
        { image: '../images/podcast.jpg', label: 'Explore', sublabel: 'Podcast' },
      ]);
    }, []);
    

  return (
    <div>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <h2>Featured Creators</h2>
          <section className={styles.featuredCreators}>
            {featuredCreators.map((creator, i) => (
              <CreatorCard key={i} {...creator} onClick={handleClick} />
            ))}
          </section>

          <h2>Categories</h2>
          <section className={styles.categories}>
            {categories.map((cat, i) => (
              <CategoryCard key={i} {...cat} />
            ))}
          </section>

          <h2>New Creators</h2>
          <section className={styles.featuredCreators}>
            {newCreators.map((creator, i) => (
              <CreatorCard key={i} {...creator} onClick={handleClick} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Explore;
