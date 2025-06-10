// src/components/ProfileEdit.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CreatorEdit.module.css';

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: 'Amit Saha',
    username: 'amitsaha',
    email: 'amit.saha@example.com',
    bio: 'Passionate digital artist sharing tutorials, time-lapses, and behind-the-scenes of my artwork.',
    role: 'Creator',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
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

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate save operation
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      navigate('/creatorprofile');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Edit Profile</h1>
        <div
          onClick={() => navigate('/creatorprofile')}
          className={styles.userProfile}
          role="button"
          tabIndex="0"
        >
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User avatar"
          />
          <span>Amit Saha</span>
        </div>
      </header>
      <div className={styles.pageWrapper}>
        <section className={styles.section}>
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

          <div className={styles.coverPhotoContainer}>
            <label htmlFor="cover-photo" className={styles.uploadLabel}>
              Change Cover Photo
            </label>
            <input
              type="file"
              id="cover-photo"
              accept="image/*"
              onChange={handleCoverPhotoChange}
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

            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows="4"
              required
            />

            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={form.role}
              disabled
            />

            <button type="submit">Save Changes</button>

            {saveSuccess && (
              <div className={styles.saveSuccess}>
                Profile saved successfully!
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProfileEdit;
