import React from 'react';
import styles from '../styles/Subscribe.module.css';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9.99/mo',
    features: [
      'Access to basic features',
      'Email support',
      'Single user license',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$19.99/mo',
    features: ['All Basic features', 'Priority email support', 'Up to 5 users'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29.99/mo',
    features: [
      'All Standard features',
      'Unlimited users',
      'Advanced analytics',
    ],
  },
];

const Subscribe = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planId) => {
    // For demo: Navigate to a checkout or confirmation page (you can create that page)
    navigate(`/subscribe/${planId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Choose Your Subscription Plan</h1>
      <div className={styles.plans}>
        {plans.map((plan) => (
          <div key={plan.id} className={styles.planCard}>
            <h2 className={styles.planName}>{plan.name}</h2>
            <p className={styles.price}>{plan.price}</p>
            <ul className={styles.features}>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button
              className={styles.subscribeButton}
              onClick={() => handleSubscribe(plan.id)}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
