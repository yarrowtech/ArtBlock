import React, { useEffect, useState } from 'react';
import styles from '../styles/CreatorDashboard.module.css';
import { useNavigate } from 'react-router-dom';

const CreatorDashboard = () => {
  const navigate = useNavigate();

  const [overviewData, setOverviewData] = useState([]);
  const [activityStats, setActivityStats] = useState([]);
  const [user, setUser] = useState({});

  // Simulate fetching data from backend
  useEffect(() => {
    // TODO: Replace with actual API calls
    setUser({
      name: 'Amit Saha',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    });

    setOverviewData([
      {
        title: 'Supporters',
        count: '12.4K',
        trend: '5.3% increase',
        type: 'positive',
      },
      {
        title: 'Impressions',
        count: '32.7K',
        trend: '1.8% decrease',
        type: 'negative',
      },
      {
        title: 'Profile Visits',
        count: '8.1K',
        trend: '7.1% increase',
        type: 'positive',
      },
    ]);

    setActivityStats([
      { label: 'New supporters today', value: '245' },
      { label: 'Posts engaged', value: '134' },
      { label: 'Comments responded', value: '58' },
    ]);
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Professional Dashboard</h1>
        <div
          onClick={() => navigate('/creatorprofile')}
          className={styles.userProfile}
          role="button"
          tabIndex={0}
        >
          <img src={user.avatar} alt="User avatar" />
          <span>{user.name}</span>
        </div>
      </header>

      {/* Metrics Cards */}
      <main>
        <section className={styles.overviewCards}>
          {overviewData.map((item, idx) => (
            <article className={styles.card} key={idx}>
              <h3>{item.title}</h3>
              <div className={styles.metric}>{item.count}</div>
              <div className={`${styles.metricChange} ${styles[item.type]}`}>
                <svg
                  viewBox="0 0 20 20"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={
                      item.type === 'positive'
                        ? 'M5 10a1 1 0 011-1h3V6a1 1 0 012 0v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 01-1-1z'
                        : 'M15 10a1 1 0 00-1 1h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 012 0v3h3a1 1 0 001 1z'
                    }
                    fill="currentColor"
                  />
                </svg>
                {item.trend}
              </div>
            </article>
          ))}
        </section>

        {/* Chart.js Integration (optional) */}
        <section className={styles.chartContainer}>
          <h3>Supporter Growth (Last 7 Days)</h3>
          <canvas
            id="followerChart"
            width="400"
            height="200"
            aria-label="Supporter Growth Chart"
            role="img"
          ></canvas>
        </section>
      </main>

      {/* Insights Section */}
      <section className={styles.insights}>
        <h3>Recent Activities</h3>
        {activityStats.map((item, i) => (
          <div key={i} className={styles.insightItem}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CreatorDashboard;
