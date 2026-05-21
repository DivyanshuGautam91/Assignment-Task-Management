import React, { useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const canEdit = user.role === 'admin' || user._id === task.createdBy._id;

  return (
    <div className="card" style={styles.card}>
      <div className="flex justify-between items-center mb-2">
        <h3 style={styles.title}>{task.title}</h3>
        <div className="flex gap-2">
          <span className={`badge status-${task.status}`}>{task.status.replace('-', ' ')}</span>
          <span style={{...styles.badge, ...styles[`priority-${task.priority}`]}}>{task.priority}</span>
        </div>
      </div>
      
      <p style={styles.desc}>{task.description}</p>
      
      <div className="flex justify-between items-center mt-4">
        <div style={styles.meta}>
          <div style={{ color: isOverdue ? 'var(--danger-color)' : 'inherit', fontWeight: isOverdue ? '600' : 'normal' }}>
            Due: {formatDate(task.dueDate)}
          </div>
          {user.role === 'admin' && task.createdBy && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              By: {task.createdBy.name}
            </div>
          )}
        </div>
        
        {canEdit && (
          <div className="flex gap-2">
            <button onClick={() => onEdit(task)} style={styles.iconBtnEdit} title="Edit Task">
              <FaEdit />
            </button>
            <button onClick={() => onDelete(task._id)} style={styles.iconBtnDelete} title="Delete Task">
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.2s',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
  },
  desc: {
    color: 'var(--text-secondary)',
    flexGrow: 1,
    marginTop: '10px',
    marginBottom: '10px',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  'priority-low': { backgroundColor: '#e2e8f0', color: '#475569' },
  'priority-medium': { backgroundColor: '#fef08a', color: '#854d0e' },
  'priority-high': { backgroundColor: '#fecaca', color: '#991b1b' },
  meta: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
  },
  iconBtnEdit: {
    background: 'none',
    color: 'var(--primary-color)',
    fontSize: '1.1rem',
    padding: '4px',
  },
  iconBtnDelete: {
    background: 'none',
    color: 'var(--danger-color)',
    fontSize: '1.1rem',
    padding: '4px',
  }
};

export default TaskCard;
