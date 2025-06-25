// src/pages/Explore.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Explore.module.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Card component
const CreatorCard = ({ image, name, role, onClick }) => (
  <div className={styles.creatorCard}>
    <img src={image} alt={name} />
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
    navigate('/subscribe');
  };

  // Fetch data on mount (replace with real APIs later)
  useEffect(() => {
    // Simulated API data
    setFeaturedCreators([
      {
        image: 'https://randomuser.me/api/portraits/men/7.jpg',
        name: 'Amit',
        role: 'Video Creator',
      },
      {
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'Priya',
        role: 'Video Creator',
      },
      {
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
        name: 'Sonal',
        role: 'Video Creator',
      },
      {
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'Ravi',
        role: 'Video Creator',
      },
      {
        image: 'https://randomuser.me/api/portraits/men/9.jpg',
        name: 'Karan',
        role: 'Video Creator',
      },
    ]);

    setNewCreators([
      {
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        name: 'Nikhil',
        role: 'Video Creator',
      },
      {
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
        name: 'Isha',
        role: 'Video Creator',
      },
      {
        image: 'https://randomuser.me/api/portraits/women/8.jpg',
        name: 'Megha',
        role: 'Video Creator',
      },
      {
        image: 'https://randomuser.me/api/portraits/men/10.jpg',
        name: 'Jay',
        role: 'Video Creator',
      },
      {
        image: 'https://randomuser.me/api/portraits/men/16.jpg',
        name: 'Raj',
        role: 'Video Creator',
      },
    ]);

    setCategories([
      { image: '../images/creator.jpg', label: 'Explore', sublabel: 'Art' },
      { image: '../images/music.jpg', label: 'Explore', sublabel: 'Music' },
      { image: '../images/dancing.jpg', label: 'Explore', sublabel: 'Dance' },
      { image: '../images/podcast.jpg', label: 'Explore', sublabel: 'Podcast' },
      { image: '../images/content.webp', label: 'Explore', sublabel: 'Vlogs' },
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
