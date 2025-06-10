import React from 'react';
import styles from '../styles/CreatorDashboard.module.css';
import { useNavigate } from 'react-router-dom';

const CreatorDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.dashboardContainer}>
      <header>
        <h1>Professional Dashboard</h1>
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

      <main>
        <section className={styles.overviewCards}>
          {[
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
          ].map((item, idx) => (
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

        <section className={styles.chartContainer}>
          <h3>Supporter Growth (Last 7 Days)</h3>
          <canvas
            id="followerChart"
            width="400"
            height="200"
            role="img"
            aria-label="Line chart showing supporters growth"
          ></canvas>
        </section>
      </main>

      <section className={styles.insights}>
        <h3>Recent Activities</h3>
        {[
          ['New supporters today', '245'],
          ['Posts engaged', '134'],
          ['Comments responded', '58'],
        ].map(([label, value], i) => (
          <div className={styles.insightItem} key={i}>
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CreatorDashboard;
