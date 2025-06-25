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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSaveSuccess(false);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('username', form.username);
      formData.append('email', form.email);
      formData.append('bio', form.bio);
      formData.append('role', form.role);
      if (profilePhoto) formData.append('profilePhoto', profilePhoto);

      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: formData,
        // credentials: 'include' if using cookies/session
      });

      if (!response.ok) throw new Error('Failed to save profile');

      setSaveSuccess(true);
      setTimeout(() => {
        navigate('/feed');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
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
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={4}
        />

        <label htmlFor="role">Role</label>
        <input type="text" name="role" value={form.role} disabled />

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        {saveSuccess && (
          <div className={styles.saveSuccess}>Profile saved successfully!</div>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </section>
  );
};

export default ProfileEdit;
