import React, { useState, useRef } from 'react';
import styles from '../styles/CreatorStories.module.css';

const CreatorStories = ({ stories = [], onAddStory = () => {} }) => {
  const [showStoryUpload, setShowStoryUpload] = useState(false);
  const fileInputRef = useRef(null);
  const [previewMedia, setPreviewMedia] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is image or video
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setPreviewMedia({
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: URL.createObjectURL(file),
          file,
        });
      } else {
        alert('Please select an image or video file');
      }
    }
  };

  const handleStoryUpload = async () => {
    if (previewMedia) {
      const newStory = {
        id: Date.now(),
        type: previewMedia.type,
        url: previewMedia.url,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      };

      onAddStory(newStory);
      setShowStoryUpload(false);
      setPreviewMedia(null);
    }
  };

  const StoryUploadModal = () => (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={() => {
            setShowStoryUpload(false);
            setPreviewMedia(null);
          }}
        >
          ×
        </button>
        <h3>Add Story</h3>

        <div className={styles.uploadArea}>
          {!previewMedia ? (
            <>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <button
                className={styles.uploadButton}
                onClick={() => fileInputRef.current.click()}
              >
                Select Media
              </button>
            </>
          ) : (
            <div className={styles.preview}>
              {previewMedia.type === 'image' ? (
                <img src={previewMedia.url} alt="Story preview" />
              ) : (
                <video src={previewMedia.url} controls />
              )}
              <button
                className={styles.uploadButton}
                onClick={handleStoryUpload}
              >
                Share Story
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.storiesContainer}>
      {/* Add Story Button */}
      <div>
      <div
        className={styles.addStoryButton}
        onClick={() => setShowStoryUpload(true)}
      >
        <div className={styles.addIcon}>+</div>
      </div>
      <span>Add Story</span>
      </div>

      {/* Story Circles */}
      {stories.length === 0 ? (
        <div className={styles.noStories}></div>
      ) : (
        stories.map((story) => (
          <div key={story.id} className={styles.storyCircle}>
            <img
              src={story.type === 'image' ? story.url : story.thumbnail}
              alt="Story thumbnail"
            />
          </div>
        ))
      )}

      {/* Story Upload Modal */}
      {showStoryUpload && <StoryUploadModal />}
    </div>
  );
};

export default CreatorStories;
