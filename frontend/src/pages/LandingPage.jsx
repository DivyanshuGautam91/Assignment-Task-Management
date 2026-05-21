import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaLock, FaUsers } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Manage Your Tasks Effectively</h1>
          <p style={styles.heroSubtitle}>
            A modern, secure, and professional task management system built for teams and individuals.
          </p>
          <div style={styles.ctaGroup}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 className="text-center" style={{ marginBottom: '40px', fontSize: '2rem' }}>Why Choose TaskMaster?</h2>
        <div style={styles.featureGrid}>
          <div className="card" style={styles.featureCard}>
            <FaCheckCircle style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Organize Everything</h3>
            <p style={styles.featureDesc}>Create, update, and track your tasks with priorities and due dates.</p>
          </div>
          <div className="card" style={styles.featureCard}>
            <FaLock style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Role-Based Security</h3>
            <p style={styles.featureDesc}>Secure your data with JWT authentication and Admin/User roles.</p>
          </div>
          <div className="card" style={styles.featureCard}>
            <FaUsers style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>Team Collaboration</h3>
            <p style={styles.featureDesc}>Admins can monitor team progress while users manage their own workload.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    padding: '80px 20px',
    textAlign: 'center',
    backgroundColor: 'var(--surface-color)',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    marginBottom: '60px',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    marginBottom: '40px',
  },
  ctaGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
  },
  features: {
    padding: '40px 0',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  featureCard: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  featureIcon: {
    fontSize: '3rem',
    color: 'var(--primary-color)',
    marginBottom: '20px',
  },
  featureTitle: {
    fontSize: '1.5rem',
    marginBottom: '15px',
  },
  featureDesc: {
    color: 'var(--text-secondary)',
  }
};

export default LandingPage;
