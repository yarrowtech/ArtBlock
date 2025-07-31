import React from 'react';
import styles from '../styles/CreatorDashboard.module.css';

import { FaDollarSign, FaUsers, FaFileAlt, FaClock } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CreatorDashboard = () => {
  const stats = [
    { icon: <FaDollarSign />, label: 'Total Earnings', value: '$10,000' },
    { icon: <FaDollarSign />, label: 'Monthly Revenue', value: '$1,200' },
    { icon: <FaUsers />, label: 'Total Supporters', value: '150' },
    { icon: <FaUsers />, label: 'New Supporters This Month', value: '20' },
    { icon: <FaFileAlt />, label: 'Total Posts', value: '30' },
    { icon: <FaClock />, label: 'Pending Payouts', value: '$500' },
    { icon: <FaClock />, label: 'Next Payout Date', value: '2023-10-15' },
  ];

  const chartData = {
    labels: ['7 Days', '30 Days', '90 Days'],
    datasets: [
      {
        label: 'Earnings',
        data: [200, 800, 3000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const supporters = [
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'John Doe',
      pledge: '$10',
      date: '2023-10-01',
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Jane Smith',
      pledge: '$20',
      date: '2023-10-02',
    },
  ];

  const posts = [
    { title: 'Post 1', date: '2023-10-01', visibility: 'Public' },
    { title: 'Post 2', date: '2023-10-02', visibility: 'Patron-only' },
    { title: 'Post 3', date: '2023-10-03', visibility: 'Public' },
  ];

  const tiers = [
    { name: 'Basic', supporters: 50, income: '$500' },
    { name: 'Premium', supporters: 30, income: '$900' },
  ];

  const notifications = [
    { message: 'New supporter joined', timestamp: '2023-10-01' },
    { message: 'Comment on your post', timestamp: '2023-10-02' },
  ];

  const messages = [
    { from: 'Patron 1', content: 'Hello!', date: '2023-10-01' },
    {
      from: 'Patron 2',
      content: 'Thanks for the content!',
      date: '2023-10-02',
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Creator Dashboard</h1>

      {/* Stat Cards */}
      <div className={styles.statGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.icon}>{stat.icon}</div>
            <div className={styles.label}>{stat.label}</div>
            <div className={styles.value}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className={styles.analyticsSection}>
        <h2 className={styles.sectionTitle}>Earnings Analytics</h2>
        <div className={styles.card}>
          <Bar data={chartData} />
        </div>
        <div className={styles.timeRangeFilters}>
          <button className={styles.filterButton}>7 Days</button>
          <button className={styles.filterButton}>30 Days</button>
          <button className={styles.filterButton}>90 Days</button>
        </div>
      </div>

      {/* Supporters */}
      <div className={styles.supportersSection}>
        <h2 className={styles.sectionTitle}>Recent Supporters</h2>
        {supporters.map((supporter, index) => (
          <div key={index} className={`${styles.card} ${styles.supporterCard}`}>
            <img
              src={supporter.avatar}
              alt={supporter.name}
              className={styles.avatar}
            />
            <div className={styles.supporterDetails}>
              <div className="font-bold">{supporter.name}</div>
              <div>{supporter.pledge}</div>
              <div className={styles.textGray}>{supporter.date}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className={styles.postManagement}>
        <h2 className={styles.sectionTitle}>Post Management</h2>
        <h3>Total Posts: {posts.length}</h3>
        {posts.slice(0, 3).map((post, index) => (
          <div key={index} className={styles.card}>
            <div className="font-bold">{post.title}</div>
            <div>{post.date}</div>
            <div className={styles.textGray}>{post.visibility}</div>
          </div>
        ))}
        <button className={styles.button}>Create New Post</button>
      </div>

      {/* Tiers */}
      <div className={styles.tierOverview}>
        <h2 className={styles.sectionTitle}>Membership Tier Overview</h2>
        {tiers.map((tier, index) => (
          <div key={index} className={styles.tierCard}>
            <h4 className="font-bold">{tier.name}</h4>
            <div>Supporters: {tier.supporters}</div>
            <div>Monthly Income: {tier.income}</div>
            <button className={styles.button}>Edit Tier</button>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className={styles.notificationsSection}>
        <h2 className={styles.sectionTitle}>Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={index} className={styles.notification}>
            <div>{notification.message}</div>
            <div className={styles.textGray}>{notification.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className={styles.messagesPreview}>
        <h2 className={styles.sectionTitle}>Messages / Inbox</h2>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            <div className="font-bold">{message.from}</div>
            <div>{message.content}</div>
            <div className={styles.textGray}>{message.date}</div>
          </div>
        ))}
        <a href="/messages" className={styles.link}>
          View All Messages
        </a>
      </div>

      {/* Payout Details */}
      <div className={styles.payoutDetails}>
        <div>Next Payout Date: 2023-10-15</div>
        <div>Current Pending Amount: $500</div>
        <button className={styles.button}>View Payout History</button>
      </div>
    </div>
  );
};

export default CreatorDashboard;
