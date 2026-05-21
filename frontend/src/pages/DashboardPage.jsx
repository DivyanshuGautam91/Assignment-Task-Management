import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/tasks');
        const tasks = res.data.data;
        
        setStats({
          total: tasks.length,
          completed: tasks.filter(t => t.status === 'completed').length,
          inProgress: tasks.filter(t => t.status === 'in-progress').length,
          pending: tasks.filter(t => t.status === 'pending').length,
        });
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Welcome back, {user.name}!</h2>
        <span className="badge" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
          Role: {user.role}
        </span>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Here is a summary of {user.role === 'admin' ? 'all system' : 'your'} tasks.
      </p>

      <div style={styles.grid}>
        <div className="card" style={{...styles.statCard, borderTop: '4px solid var(--primary-color)'}}>
          <div style={styles.statIcon}><FaTasks style={{color: 'var(--primary-color)'}}/></div>
          <div>
            <div style={styles.statLabel}>Total Tasks</div>
            <div style={styles.statValue}>{stats.total}</div>
          </div>
        </div>
        
        <div className="card" style={{...styles.statCard, borderTop: '4px solid #059669'}}>
          <div style={styles.statIcon}><FaCheckCircle style={{color: '#059669'}}/></div>
          <div>
            <div style={styles.statLabel}>Completed</div>
            <div style={styles.statValue}>{stats.completed}</div>
          </div>
        </div>

        <div className="card" style={{...styles.statCard, borderTop: '4px solid #4f46e5'}}>
          <div style={styles.statIcon}><FaSpinner style={{color: '#4f46e5'}}/></div>
          <div>
            <div style={styles.statLabel}>In Progress</div>
            <div style={styles.statValue}>{stats.inProgress}</div>
          </div>
        </div>

        <div className="card" style={{...styles.statCard, borderTop: '4px solid #d97706'}}>
          <div style={styles.statIcon}><FaExclamationCircle style={{color: '#d97706'}}/></div>
          <div>
            <div style={styles.statLabel}>Pending</div>
            <div style={styles.statValue}>{stats.pending}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Need to import FaTasks
import { FaTasks } from 'react-icons/fa';

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '30px',
  },
  statIcon: {
    fontSize: '2.5rem',
  },
  statLabel: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  }
};

export default DashboardPage;
