import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="mb-4">My Profile</h2>
      <div className="card text-center" style={{ padding: '40px' }}>
        <FaUserCircle style={{ fontSize: '6rem', color: 'var(--border-color)', marginBottom: '20px' }} />
        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{user.name}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{user.email}</p>
        <div style={{ marginTop: '20px' }}>
          <span className="badge" style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontSize: '1rem', padding: '6px 12px' }}>
            {user.role.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
