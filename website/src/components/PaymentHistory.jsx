import React, { useEffect, useState } from 'react';
import styles from '../styles/SettingsPage.module.css';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch payment history (replace with actual API call)
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // const response = await fetch('/api/payments');
        // const data = await response.json();
        // setPayments(data);

        // Mocked response
        const data = [
          { id: 1, date: '2025-05-01', amount: '$10.00', status: 'Completed' },
          { id: 2, date: '2025-04-15', amount: '$20.00', status: 'Completed' },
          { id: 3, date: '2025-04-01', amount: '$5.00', status: 'Refunded' },
        ];
        setPayments(data);
      } catch (err) {
        setError('Failed to load payment history.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <section className={styles.section}>
      <h2>Payment History</h2>

      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
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
      )}
    </section>
  );
};

export default PaymentHistory;
