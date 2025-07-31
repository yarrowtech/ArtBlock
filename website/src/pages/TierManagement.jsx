import React, { useState } from 'react';
import styles from '../styles/TierManagement.module.css';
import {
  FaEdit,
  FaTrash,
  FaArchive,
  FaArrowUp,
  FaArrowDown,
  FaChartBar,
} from 'react-icons/fa';

const initialTiers = [
  {
    id: 1,
    name: 'Bronze',
    description: 'Access to exclusive posts',
    price: 100,
    currency: '₹',
    benefits: ['Exclusive posts'],
    supporterLimit: 0,
    supporters: 34,
    archived: false,
  },
  {
    id: 2,
    name: 'Silver',
    description: 'Early access + behind-the-scenes',
    price: 5,
    currency: '$',
    benefits: ['Early access', 'Behind-the-scenes'],
    supporterLimit: 100,
    supporters: 80,
    archived: false,
  },
  {
    id: 3,
    name: 'Gold',
    description: 'All perks + monthly shoutout',
    price: 15,
    currency: '$',
    benefits: ['All perks', 'Monthly shoutout'],
    supporterLimit: 50,
    supporters: 50,
    archived: false,
  },
];

const TierManagement = () => {
  const [tiers, setTiers] = useState(initialTiers);
  const [editingTier, setEditingTier] = useState(null);
  const [newTier, setNewTier] = useState({
    name: '',
    description: '',
    price: '',
    currency: '$',
    benefits: [],
    supporterLimit: '',
  });
  const [benefitInput, setBenefitInput] = useState('');

  const handleCreateTier = (e) => {
    e.preventDefault();
    if (!newTier.name || !newTier.price) return;
    setTiers([
      ...tiers,
      {
        ...newTier,
        id: Date.now(),
        price: Number(newTier.price),
        supporterLimit: Number(newTier.supporterLimit) || 0,
        supporters: 0,
        archived: false,
      },
    ]);
    setNewTier({
      name: '',
      description: '',
      price: '',
      currency: '$',
      benefits: [],
      supporterLimit: '',
    });
    setBenefitInput('');
  };

  const handleEditTier = (tier) => setEditingTier({ ...tier });
  const handleUpdateTier = (e) => {
    e.preventDefault();
    setTiers(
      tiers.map((t) =>
        t.id === editingTier.id
          ? {
              ...editingTier,
              price: Number(editingTier.price),
              supporterLimit: Number(editingTier.supporterLimit) || 0,
            }
          : t
      )
    );
    setEditingTier(null);
  };
  const handleDeleteTier = (id) => setTiers(tiers.filter((t) => t.id !== id));
  const handleArchiveTier = (id) =>
    setTiers(tiers.map((t) => (t.id === id ? { ...t, archived: true } : t)));

  const moveTier = (idx, direction) => {
    const newTiers = [...tiers];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newTiers.length) return;
    [newTiers[idx], newTiers[targetIdx]] = [newTiers[targetIdx], newTiers[idx]];
    setTiers(newTiers);
  };

  const addBenefit = (isEdit = false) => {
    if (!benefitInput.trim()) return;
    if (isEdit) {
      setEditingTier({
        ...editingTier,
        benefits: [...editingTier.benefits, benefitInput.trim()],
      });
    } else {
      setNewTier({
        ...newTier,
        benefits: [...newTier.benefits, benefitInput.trim()],
      });
    }
    setBenefitInput('');
  };

  const removeBenefit = (idx, isEdit = false) => {
    if (isEdit) {
      setEditingTier({
        ...editingTier,
        benefits: editingTier.benefits.filter((_, i) => i !== idx),
      });
    } else {
      setNewTier({
        ...newTier,
        benefits: newTier.benefits.filter((_, i) => i !== idx),
      });
    }
  };

  return (
    <div className={styles.tierManagement}>
      <h2 className={styles.sectionTitle}>Subscription Tier Management</h2>

      {/* Create New Tier */}
      <form className={styles.card} onSubmit={handleCreateTier}>
        <h3>Create New Tier</h3>
        <input
          type="text"
          placeholder="Tier Name"
          value={newTier.name}
          onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newTier.description}
          onChange={(e) =>
            setNewTier({ ...newTier, description: e.target.value })
          }
        />

        <div className={styles.inlineGroup}>
          <input
            type="number"
            placeholder="Price"
            value={newTier.price}
            onChange={(e) => setNewTier({ ...newTier, price: e.target.value })}
            required
            min="0"
          />
          <select
            value={newTier.currency}
            onChange={(e) =>
              setNewTier({ ...newTier, currency: e.target.value })
            }
          >
            <option value="$">$</option>
            <option value="₹">₹</option>
            <option value="€">€</option>
          </select>
          <span>/month</span>
        </div>

        <input
          type="number"
          placeholder="Supporter Limit (optional)"
          value={newTier.supporterLimit}
          onChange={(e) =>
            setNewTier({ ...newTier, supporterLimit: e.target.value })
          }
          min="0"
        />

        <div>
          <label>Benefits:</label>
          <div className={styles.inlineGroup}>
            <input
              type="text"
              placeholder="Add benefit"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
            />
            <button
              type="button"
              className={styles.button}
              onClick={() => addBenefit(false)}
            >
              Add
            </button>
          </div>
          <ul>
            {newTier.benefits.map((b, idx) => (
              <li key={idx}>
                {b}{' '}
                <button
                  type="button"
                  onClick={() => removeBenefit(idx, false)}
                  className={styles.removeBtn}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className={styles.button}>
          Create Tier
        </button>
      </form>

      {/* Edit Tier */}
      {editingTier && (
        <form className={styles.card} onSubmit={handleUpdateTier}>
          <h3>Edit Tier: {editingTier.name}</h3>
          <input
            type="text"
            value={editingTier.name}
            onChange={(e) =>
              setEditingTier({ ...editingTier, name: e.target.value })
            }
            required
          />
          <textarea
            value={editingTier.description}
            onChange={(e) =>
              setEditingTier({ ...editingTier, description: e.target.value })
            }
          />
          <div className={styles.inlineGroup}>
            <input
              type="number"
              value={editingTier.price}
              onChange={(e) =>
                setEditingTier({ ...editingTier, price: e.target.value })
              }
              required
              min="0"
            />
            <select
              value={editingTier.currency}
              onChange={(e) =>
                setEditingTier({ ...editingTier, currency: e.target.value })
              }
            >
              <option value="$">$</option>
              <option value="₹">₹</option>
              <option value="€">€</option>
            </select>
            <span>/month</span>
          </div>
          <input
            type="number"
            value={editingTier.supporterLimit}
            onChange={(e) =>
              setEditingTier({ ...editingTier, supporterLimit: e.target.value })
            }
            min="0"
          />

          <div>
            <label>Benefits:</label>
            <div className={styles.inlineGroup}>
              <input
                type="text"
                placeholder="Add benefit"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
              />
              <button
                type="button"
                className={styles.button}
                onClick={() => addBenefit(true)}
              >
                Add
              </button>
            </div>
            <ul>
              {editingTier.benefits.map((b, idx) => (
                <li key={idx}>
                  {b}{' '}
                  <button
                    type="button"
                    onClick={() => removeBenefit(idx, true)}
                    className={styles.removeBtn}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className={styles.button}>
            Save Changes
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.cancel}`}
            onClick={() => setEditingTier(null)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Tier List */}
      <div className={styles.card}>
        <h3>Existing Tiers</h3>
        <ul className={styles.tierList}>
          {tiers.map((tier, idx) => (
            <li
              key={tier.id}
              className={`${styles.tierCard} ${
                tier.archived ? styles.archived : ''
              }`}
            >
              <div className={styles.tierContent}>
                <div>
                  <strong>{tier.name}</strong>{' '}
                  {tier.archived && (
                    <span className={styles.archivedLabel}>(Archived)</span>
                  )}
                  <div>{tier.description}</div>
                  <div className={styles.price}>
                    {tier.currency}
                    {tier.price}/month
                  </div>
                  {tier.supporterLimit > 0 && (
                    <div className={styles.meta}>
                      Limit: {tier.supporterLimit} supporters
                    </div>
                  )}
                  <div className={styles.meta}>
                    Benefits: {tier.benefits.join(', ')}
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.button}
                    title="Edit"
                    onClick={() => handleEditTier(tier)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.button}
                    title="Delete"
                    onClick={() => handleDeleteTier(tier.id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className={styles.button}
                    title="Archive"
                    onClick={() => handleArchiveTier(tier.id)}
                  >
                    <FaArchive />
                  </button>
                  <button
                    className={styles.button}
                    title="Move Up"
                    onClick={() => moveTier(idx, 'up')}
                    disabled={idx === 0}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    className={styles.button}
                    title="Move Down"
                    onClick={() => moveTier(idx, 'down')}
                    disabled={idx === tiers.length - 1}
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
              <div className={styles.supporterStats}>
                <FaChartBar /> <strong>{tier.supporters}</strong> supporter
                {tier.supporters !== 1 ? 's' : ''}
                {tier.supporterLimit > 0 && (
                  <span className={styles.meta}>
                    {' '}
                    ({tier.supporters}/{tier.supporterLimit} filled)
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TierManagement;
