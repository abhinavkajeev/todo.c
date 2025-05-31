import React, { useState, useEffect, useCallback, useMemo } from 'react';
import LandingPage from './LandingPage';
import AuthForm from './AuthForm';
import Dashboard from './Dashboard';

// API Base URL - change this to your backend URL
const API_BASE = 'https://todo-c-backend.vercel.app/api';

const TodoApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auth forms state
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Todo form state
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setCurrentView('dashboard');
      fetchTodos();
    }
  }, []);

  // API calls
  const apiCall = useCallback(async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      throw new Error(error.message || 'Something went wrong');

    }

    return response.json();
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      const data = await apiCall('/todos');
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
    }
  }, [apiCall]);

  const handleAuth = useCallback(async (isLogin) => {
    setLoading(true);
    setError('');
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email: authForm.email, password: authForm.password }
        : authForm;

      const data = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setCurrentView('dashboard');
      await fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authForm, apiCall, fetchTodos]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setTodos([]);
    setCurrentView('landing');
    setAuthForm({ email: '', password: '', name: '' });
  }, []);

  const addTodo = useCallback(async () => {
    if (!newTodo.trim()) return;
    
    try {
      const data = await apiCall('/todos', {
        method: 'POST',
        body: JSON.stringify({ text: newTodo })
      });
      setTodos(prev => [...prev, data]);
      setNewTodo('');
    } catch (err) {
      setError('Failed to add todo');
    }
  }, [newTodo, apiCall]);

  const toggleTodo = useCallback(async (id, completed) => {
    try {
      const data = await apiCall(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !completed })
      });
      setTodos(prev => prev.map(todo => todo._id === id ? data : todo));
    } catch (err) {
      setError('Failed to update todo');
    }
  }, [apiCall]);

  const updateTodo = useCallback(async (id, text) => {
    try {
      const data = await apiCall(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ text })
      });
      setTodos(prev => prev.map(todo => todo._id === id ? data : todo));
      setEditingId(null);
      setEditText('');
    } catch (err) {
      setError('Failed to update todo');
    }
  }, [apiCall]);

  const deleteTodo = useCallback(async (id) => {
    try {
      await apiCall(`/todos/${id}`, { method: 'DELETE' });
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  }, [apiCall]);

  // Memoized stats calculation
  const todoStats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length
  }), [todos]);

  // Main render
  return (
    <div className="App">
      {currentView === 'landing' && (
        <LandingPage setCurrentView={setCurrentView} />
      )}
      {(currentView === 'login' || currentView === 'signup') && (
        <AuthForm
          isLogin={currentView === 'login'}
          authForm={authForm}
          setAuthForm={setAuthForm}
          handleAuth={handleAuth}
          loading={loading}
          error={error}
          setCurrentView={setCurrentView}
          setError={setError}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard
          user={user}
          handleLogout={handleLogout}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
          todoStats={todoStats}
          todos={todos}
          toggleTodo={toggleTodo}
          editingId={editingId}
          setEditingId={setEditingId}
          editText={editText}
          setEditText={setEditText}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  );
};

export default TodoApp;