import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/CreatePost.module.css'; // Assuming you will add styles for this component

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('art');

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);

    if (file) {
      const type = file.type.split('/')[0];
      setMediaType(type); // Set media type as either 'image' or 'video'
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('media', media);
    formData.append('mediaType', mediaType);
    formData.append('category', category);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage('Post created successfully!');
      setTitle('');
      setContent('');
      setMedia(null);
      setMediaType('');
    } catch (error) {
      setMessage('Failed to create post');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create a New Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handlePostSubmit}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Upload Media</label>
          <input type="file" onChange={handleMediaChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="art">Art</option>
            <option value="music">Music</option>
            <option value="dance">Dance</option>
            <option value="podcast">Podcast</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
