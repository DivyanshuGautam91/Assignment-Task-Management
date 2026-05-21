import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTasks, FaUserCircle, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <FaTasks style={{ marginRight: '8px' }} /> TaskMaster
        </Link>
        <div style={styles.links}>
          {user ? (
            <>
              <Link to="/dashboard" style={styles.link}>
                <FaTachometerAlt /> Dashboard
              </Link>
              <Link to="/tasks" style={styles.link}>
                <FaTasks /> Tasks
              </Link>
              <Link to="/profile" style={styles.link}>
                <FaUserCircle /> Profile
              </Link>
              {user.role === 'admin' && (
                <span style={styles.adminBadge}>Admin</span>
              )}
              <button onClick={handleLogout} style={styles.logoutBtn}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'var(--surface-color)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--primary-color)',
    display: 'flex',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    fontWeight: '500',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'color 0.2s',
  },
  adminBadge: {
    backgroundColor: 'var(--warning-color)',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  logoutBtn: {
    background: 'none',
    color: 'var(--danger-color)',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }
};

export default Navbar;
