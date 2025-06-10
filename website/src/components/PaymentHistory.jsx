// src/components/PaymentHistory.jsx
import React from 'react';
import styles from '../styles/SettingsPage.module.css';

const PaymentHistory = () => {
  const payments = [
    { id: 1, date: '2025-05-01', amount: '$10.00', status: 'Completed' },
    { id: 2, date: '2025-04-15', amount: '$20.00', status: 'Completed' },
    { id: 3, date: '2025-04-01', amount: '$5.00', status: 'Refunded' },
  ];

  return (
    <section className={styles.section}>
      <h2>Payment History</h2>
      <table className={styles.paymentTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.date}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PaymentHistory;
