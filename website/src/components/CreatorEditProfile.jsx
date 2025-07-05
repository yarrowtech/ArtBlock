import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CreatorEdit.module.css';
import axios from 'axios';

const DEFAULT_PROFILE_PIC = 'https://randomuser.me/api/portraits/men/1.jpg';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    role: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(DEFAULT_PROFILE_PIC);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profile/${username}`);
        const data = res.data;

        setForm({
          name: data.name || '',
          username: data.username || '',
          email: data.email || '',
          bio: data.bio || '',
          role: data.role || '',
        });

        if (data.profilePhoto) {
          setPreviewPhoto(`http://localhost:5000/${data.profilePhoto}`);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, [username]);

  // Live preview for newly selected profile photo
  useEffect(() => {
    if (profilePhoto) {
      const objectUrl = URL.createObjectURL(profilePhoto);
      setPreviewPhoto(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profilePhoto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (profilePhoto) formData.append('profilePhoto', profilePhoto);
      if (coverPhoto) formData.append('coverPhoto', coverPhoto);

      await axios.post('/api/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/creatorprofile');
      }, 2000);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
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
          <img src={previewPhoto} alt="User avatar" />
          <span>{form.name}</span>
        </div>
      </header>

      <div className={styles.pageWrapper}>
        <section className={styles.section}>
          <div className={styles.profilePhotoContainer}>
            <img
              src={previewPhoto}
              alt="Profile"
              className={styles.profilePhoto}
            />
            <label htmlFor="profile-photo" className={styles.uploadLabel}>
              Change Profile Photo
            </label>
            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProfilePhoto)}
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
              onChange={(e) => handleFileChange(e, setCoverPhoto)}
              hidden
            />
          </div>

          <form onSubmit={handleSubmit} className={styles.profileForm}>
            {['name', 'username', 'email'].map((field) => (
              <React.Fragment key={field}>
                <label htmlFor={field}>
                  {field[0].toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  readOnly={field === 'username'} // Prevent editing username
                />
              </React.Fragment>
            ))}

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
