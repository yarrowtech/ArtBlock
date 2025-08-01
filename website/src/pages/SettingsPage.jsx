import React, { useState } from 'react';
import styles from '../styles/SettingsPage.module.css';
import Sidebar from '../components/Sidebar';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const [profileData, setProfileData] = useState({
    profilePhoto: null,
    name: '',
    email: '',
    country: '',
    password: '',
    language: '',
    privacy: '',
    notifications: false,
    paymentMethod: '',
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState('card');
  const [cardData, setCardData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    postcode: '',
  });
  const [upiData, setUpiData] = useState({ upiId: '' });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpiChange = (e) => {
    setUpiData({ upiId: e.target.value });
  };

  const handlePaymentSubmit = () => {
    if (paymentType === 'card') {
      console.log('Card Payment Method:', cardData);
    } else {
      console.log('UPI Payment Method:', upiData);
    }
    alert('Payment method added!');
    setShowPaymentModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'profilePhoto' && files.length > 0) {
      const file = files[0];
      setProfileData((prev) => ({ ...prev, profilePhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    for (const key in profileData) {
      formData.append(key, profileData[key]);
    }

    console.log('FormData prepared:', profileData);
    alert('Settings saved (check console for form data)');
    // You can send `formData` to the backend via Axios or fetch here
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.settingsContainer}>
        <h1 className={styles.heading}>Settings</h1>

        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab('basic')}
            className={activeTab === 'basic' ? styles.active : ''}
          >
            Basic
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={activeTab === 'account' ? styles.active : ''}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={activeTab === 'notifications' ? styles.active : ''}
          >
            Email Notification
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={activeTab === 'payment' ? styles.active : ''}
          >
            Payment Methods
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'basic' && (
            <div>
              <h2>Profile Information</h2>

              <label>Profile Photo:</label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={styles.preview}
                />
              )}

              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
              />

              <label>Country of Residence:</label>
              <input
                type="text"
                name="country"
                value={profileData.country}
                onChange={handleChange}
              />

              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
            </div>
          )}

          {activeTab === 'account' && (
            <div>
              <h2>Account</h2>
              <label>Reset Password:</label>
              <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
              />

              <label>Language Preference:</label>
              <input
                type="text"
                name="language"
                value={profileData.language}
                onChange={handleChange}
              />

              <label>Privacy:</label>
              <input
                type="text"
                name="privacy"
                value={profileData.privacy}
                onChange={handleChange}
              />

              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2>Email Notifications</h2>
              <label>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={profileData.notifications}
                  onChange={handleChange}
                />
                Receive email notifications
              </label>
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
            </div>
          )}

          {activeTab === 'payment' && (
            <div>
              <h2>Payment Methods</h2>

              <label>Current Method:</label>
              <input
                type="text"
                name="paymentMethod"
                value={profileData.paymentMethod}
                onChange={handleChange}
              />

              <button
                className={styles.addBtn}
                onClick={() => setShowPaymentModal(true)}
              >
                Add Payment Method
              </button>

              {showPaymentModal && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modal}>
                    <h3>Add Payment Method</h3>

                    <div className={styles.tabButtons}>
                      <button
                        className={
                          paymentType === 'card' ? styles.activeTab : ''
                        }
                        onClick={() => setPaymentType('card')}
                      >
                        Card
                      </button>
                      <button
                        className={
                          paymentType === 'upi' ? styles.activeTab : ''
                        }
                        onClick={() => setPaymentType('upi')}
                      >
                        UPI
                      </button>
                    </div>

                    {paymentType === 'card' && (
                      <div>
                        <label>Name on Card:</label>
                        <input
                          type="text"
                          name="name"
                          value={cardData.name}
                          onChange={handleCardChange}
                        />

                        <label>Card Number:</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardData.cardNumber}
                          onChange={handleCardChange}
                        />

                        <label>MM / YY:</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                        />

                        <label>Billing Postcode:</label>
                        <input
                          type="text"
                          name="postcode"
                          value={cardData.postcode}
                          onChange={handleCardChange}
                        />
                      </div>
                    )}

                    {paymentType === 'upi' && (
                      <div>
                        <label>UPI ID:</label>
                        <input
                          type="text"
                          value={upiData.upiId}
                          onChange={handleUpiChange}
                        />
                      </div>
                    )}

                    <div className={styles.modalButtons}>
                      <button onClick={handlePaymentSubmit}>Add</button>
                      <button onClick={() => setShowPaymentModal(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
