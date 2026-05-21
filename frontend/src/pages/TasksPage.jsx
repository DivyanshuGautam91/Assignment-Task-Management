import React, { useState, useEffect, useContext } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { AuthContext } from '../context/AuthContext';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Filters and Pagination
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(AuthContext);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let query = `/tasks?page=${page}&limit=9`;
      if (search) query += `&search=${search}`;
      if (status) query += `&status=${status}`;
      if (priority) query += `&priority=${priority}`;
      
      const res = await api.get(query);
      setTasks(res.data.data);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, priority]); // Don't add search to array, we'll trigger search manually or on delay

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        alert('Failed to delete task');
      }
    }
  };

  const handleSave = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save task');
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Task Management</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={openCreateModal}>
          <FaPlus /> New Task
        </button>
      </div>

      <div className="card mb-4" style={{ padding: '16px' }}>
        <form onSubmit={handleSearch} style={styles.filtersWrapper}>
          <div style={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchBtn}><FaSearch /></button>
          </div>
          
          <select 
            value={status} 
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            style={styles.filterSelect}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select 
            value={priority} 
            onChange={(e) => { setPriority(e.target.value); setPage(1); }}
            style={styles.filterSelect}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </form>
      </div>

      {loading ? (
        <div className="text-center mt-4">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center mt-4 card" style={{ padding: '40px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No tasks found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div style={styles.tasksGrid}>
            {tasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={openEditModal} 
                onDelete={handleDelete} 
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button 
                className="btn btn-secondary" 
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button 
                className="btn btn-secondary" 
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        task={editingTask} 
      />
    </div>
  );
};

const styles = {
  filtersWrapper: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  searchBox: {
    display: 'flex',
    flex: '1',
    minWidth: '250px',
  },
  searchInput: {
    flex: '1',
    padding: '10px 12px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px 0 0 6px',
    outline: 'none',
  },
  searchBtn: {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    padding: '0 16px',
    borderRadius: '0 6px 6px 0',
  },
  filterSelect: {
    padding: '10px 12px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    outline: 'none',
    minWidth: '150px',
  },
  tasksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '40px',
  }
};

export default TasksPage;
