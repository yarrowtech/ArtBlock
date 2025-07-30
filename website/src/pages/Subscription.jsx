import React, { useState } from 'react';
import styles from '../styles/Subscription.module.css';
import Sidebar from '../components/Sidebar';

const SubscriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');
  const [billingHistoryVisible, setBillingHistoryVisible] = useState(false);

  const creators = [
    {
      id: 1,
      avatar: '../images/profilePhoto.png',
      name: 'Amit Saha',
      tierName: 'Gold',
      price: 10,
      nextBillingDate: '2023-11-01',
    },
    {
      id: 2,
      avatar: '../images/music.jpg',
      name: 'Creator Two',
      tierName: 'Silver',
      price: 5,
      nextBillingDate: '2023-11-15',
    },
    // Add more creators as needed
  ];

  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTier === 'All' || creator.tierName === selectedTier)
  );

  const totalMonthlySpend = filteredCreators.reduce(
    (total, creator) => total + creator.price,
    0
  );

  const toggleBillingHistory = () => {
    setBillingHistoryVisible(!billingHistoryVisible);
  };

  return (
    <div className={styles.subscriptionPage}>
      <Sidebar />

      <div className={styles.container}>
        <h1>Subscriptions</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search creators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            <option value="All">All Tiers</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>
        <div className={styles.creatorList}>
          {filteredCreators.map((creator) => (
            <div key={creator.id} className={styles.creatorCard}>
              <img src={creator.avatar} alt={`${creator.name}'s avatar`} />
              <div className={styles.creatorInfo}>
                <h2>{creator.name}</h2>
                <p>Tier: {creator.tierName}</p>
                <p>Price: ${creator.price}</p>
                <p>Next Billing Date: {creator.nextBillingDate}</p>
              </div>
              <div className={styles.actionButtons}>
                <button>View Creator</button>
                <button>Edit Tier</button>
                <button>Cancel Subscription</button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.billingSummary}>
          <h2>Billing Summary</h2>
          <p>Total Monthly Spend: ${totalMonthlySpend}</p>
          <p>
            Next Payment:{' '}
            {filteredCreators.length > 0
              ? filteredCreators[0].nextBillingDate
              : 'N/A'}
          </p>
        </div>
        <div className={styles.billingHistory}>
          <button onClick={toggleBillingHistory}>
            {billingHistoryVisible
              ? 'Hide Billing History'
              : 'Show Billing History'}
          </button>
          {billingHistoryVisible && (
            <div className={styles.historyDetails}>
              <h3>Billing History</h3>
              <ul>
                <li>Payment on 2023-10-01: $10</li>
                <li>Payment on 2023-09-01: $15</li>
                {/* Add more payment history as needed */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
