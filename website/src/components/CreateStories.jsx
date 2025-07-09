import React, { useState, useRef } from 'react';
import styles from '../styles/CreatorStories.module.css';

const CreatorStories = ({ stories = [], onAddStory = () => {}, hideAddStory = false }) => {
  const [showStoryUpload, setShowStoryUpload] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (isImage || isVideo) {
      setPreviewMedia({
        type: isImage ? 'image' : 'video',
        url: URL.createObjectURL(file),
        file,
      });
    } else {
      alert('Please select an image or video file');
    }
  };

  const handleStoryUpload = async () => {
    if (!previewMedia) return;

    // TODO: Replace with actual API call
    // const formData = new FormData();
    // formData.append('media', previewMedia.file);
    // await uploadStoryToServer(formData);

    const newStory = {
      id: Date.now(),
      type: previewMedia.type,
      url: previewMedia.url,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    onAddStory(newStory);
    setShowStoryUpload(false);
    setPreviewMedia(null);
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
                hidden
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
      {!hideAddStory && (
        <div className={styles.addStoryWrapper}>
          <div
            className={styles.addStoryButton}
            onClick={() => setShowStoryUpload(true)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.addIcon}>+</div>
          </div>
          <span>Add Story</span>
        </div>
      )}

      {/* Story Circles */}
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story.id} className={styles.storyCircle}>
            {story.type === 'image' ? (
              <img src={story.url} alt="Story preview" />
            ) : (
              <video src={story.url} muted />
            )}
          </div>
        ))
      ) : (
        <div className={styles.noStories}>No stories yet</div>
      )}

      {/* Modal */}
      {showStoryUpload && <StoryUploadModal />}
    </div>
  );
};

export default CreatorStories;
