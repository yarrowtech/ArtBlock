// src/components/ProfileEdit.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SettingsPage.module.css';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: 'Amit Saha',
    username: 'amitsaha',
    email: 'amit.saha@example.com',
    bio: 'Passionate digital artist sharing tutorials, time-lapses, and behind-the-scenes of my artwork.',
    role: 'Supporter',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you would typically send the data to your backend
    // For now, we'll just simulate a successful update
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      navigate('/feed');
    }, 2000);
  };

  return (
    <section className={styles.section}>
      <h2>Edit Profile</h2>

      <div className={styles.profilePhotoContainer}>
        <img
          src={
            profilePhoto
              ? URL.createObjectURL(profilePhoto)
              : 'https://randomuser.me/api/portraits/men/1.jpg'
          }
          alt="Profile"
          className={styles.profilePhoto}
        />
        <br />
        <label htmlFor="profile-photo" className={styles.uploadLabel}>
          Change Profile Photo
        </label>
        <input
          type="file"
          id="profile-photo"
          accept="image/*"
          onChange={handleProfilePhotoChange}
          hidden
        />
      </div>

      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role</label>
        <input type="text" id="role" name="role" value={form.role} disabled />

        <button type="submit">Save Changes</button>

        {saveSuccess && (
          <div className={styles.saveSuccess}>Profile saved successfully!</div>
        )}
      </form>
    </section>
  );
};

export default ProfileEdit;
