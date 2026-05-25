import React, { useState } from 'react';
import {
  CheckCircle, Plus, Trash2, Edit3, Check, X,
  LogOut, ListTodo, Clock, TrendingUp,
} from 'lucide-react';

const Dashboard = React.memo(({
  user = { name: 'Alex' },
  handleLogout = () => {},
  newTodo = '',
  setNewTodo = () => {},
  addTodo = () => {},
  todoStats = { total: 0, completed: 0, pending: 0 },
  todos = [],
  toggleTodo = () => {},
  editingId = null,
  setEditingId = () => {},
  editText = '',
  setEditText = () => {},
  updateTodo = () => {},
  deleteTodo = () => {},
}) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const progress = todoStats.total > 0
    ? Math.round((todoStats.completed / todoStats.total) * 100)
    : 0;

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteTodo(id);
    setDeletingId(null);
  };

  const statCards = [
    {
      id: 'total',
      label: 'Total tasks',
      value: todoStats.total,
      icon: ListTodo,
      color: '#8b5cf6',
      bg: 'rgba(139,92,246,0.1)',
      border: 'rgba(139,92,246,0.2)',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: todoStats.completed,
      icon: CheckCircle,
      color: '#10b981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.2)',
    },
    {
      id: 'pending',
      label: 'Remaining',
      value: todoStats.pending,
      icon: Clock,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.2)',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>

      {/* Top nav */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', padding: '0 24px',
          height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(124,58,237,0.4)',
            }}>
              <CheckCircle size={16} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>TaskFlow</span>
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed40, #ec489940)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#a78bfa',
              }}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>
                {user?.name}
              </span>
            </div>

            <button
              id="logout-btn"
              onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', fontSize: 13, fontWeight: 500,
                padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; e.currentTarget.style.borderColor = 'rgba(244,63,94,0.3)'; e.currentTarget.style.color = '#f43f5e'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, maxWidth: 900, margin: '0 auto', width: '100%', padding: '40px 24px 80px' }}>

        {/* Page title */}
        <div className="animate-fade-up" style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 4 }}>
            My Tasks
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stat cards */}
        <div className="animate-fade-up" style={{ animationDelay: '0.05s', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {statCards.map(s => (
            <div
              key={s.id}
              id={`stat-${s.id}`}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${s.border}`,
                borderRadius: 14, padding: '20px 20px',
                display: 'flex', flexDirection: 'column', gap: 12,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</span>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: s.bg, border: `1px solid ${s.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <s.icon size={16} color={s.color} strokeWidth={2} />
                </div>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, letterSpacing: '-1px', lineHeight: 1 }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {todoStats.total > 0 && (
          <div className="animate-fade-up" style={{ animationDelay: '0.1s', marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
                <TrendingUp size={14} color="#10b981" />
                Progress
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>{progress}%</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                background: 'linear-gradient(90deg, #7c3aed, #10b981)',
                width: `${progress}%`,
                transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 0 12px rgba(16,185,129,0.4)',
              }} />
            </div>
          </div>
        )}

        {/* Add todo input */}
        <div className="animate-fade-up" style={{ animationDelay: '0.12s', marginBottom: 28 }}>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '8px 8px 8px 18px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
            onFocus={() => { }}
          >
            <input
              id="new-todo-input"
              type="text"
              placeholder="Add a new task…"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit',
                placeholder: 'var(--text-muted)',
              }}
            />
            <button
              id="add-todo-btn"
              onClick={addTodo}
              disabled={!newTodo.trim()}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: newTodo.trim() ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (newTodo.trim() ? 'rgba(124,58,237,0.5)' : 'var(--border)'),
                color: newTodo.trim() ? '#fff' : 'var(--text-muted)',
                fontSize: 13, fontWeight: 600, padding: '9px 18px',
                borderRadius: 9, cursor: newTodo.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit', transition: 'all 0.2s',
                boxShadow: newTodo.trim() ? '0 0 20px rgba(124,58,237,0.3)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <Plus size={15} strokeWidth={2.5} />
              Add task
            </button>
          </div>
        </div>

        {/* Todo list */}
        <div className="animate-fade-up" style={{ animationDelay: '0.16s' }}>
          {todos.length === 0 ? (
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '60px 32px',
              textAlign: 'center',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <ListTodo size={24} color="#8b5cf6" strokeWidth={1.5} />
              </div>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                No tasks yet
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Add your first task above to get started
              </p>
            </div>
          ) : (
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 14, overflow: 'hidden',
            }}>
              {todos.map((todo, index) => (
                <div
                  key={todo._id}
                  id={`todo-item-${todo._id}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px',
                    borderBottom: index < todos.length - 1 ? '1px solid var(--border)' : 'none',
                    background: hoveredId === todo._id ? 'rgba(255,255,255,0.025)' : 'transparent',
                    transition: 'background 0.15s',
                    opacity: deletingId === todo._id ? 0.4 : 1,
                  }}
                  onMouseEnter={() => setHoveredId(todo._id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Checkbox */}
                  <button
                    id={`toggle-todo-${todo._id}`}
                    onClick={() => toggleTodo(todo._id, todo.completed)}
                    style={{
                      flexShrink: 0,
                      width: 22, height: 22, borderRadius: 6,
                      border: `1.5px solid ${todo.completed ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
                      background: todo.completed ? '#10b981' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                      boxShadow: todo.completed ? '0 0 12px rgba(16,185,129,0.35)' : 'none',
                    }}
                    onMouseEnter={e => { if (!todo.completed) { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.background = 'rgba(16,185,129,0.12)'; } }}
                    onMouseLeave={e => { if (!todo.completed) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent'; } }}
                  >
                    {todo.completed && (
                      <Check size={13} color="#fff" strokeWidth={3} style={{ animation: 'check-pop 0.25s ease' }} />
                    )}
                  </button>

                  {/* Text or edit input */}
                  {editingId === todo._id ? (
                    <input
                      id={`edit-todo-input-${todo._id}`}
                      type="text"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') updateTodo(todo._id, editText);
                        if (e.key === 'Escape') { setEditingId(null); setEditText(''); }
                      }}
                      autoFocus
                      style={{
                        flex: 1, background: 'rgba(124,58,237,0.08)',
                        border: '1px solid rgba(124,58,237,0.4)', borderRadius: 8,
                        padding: '6px 12px', color: 'var(--text-primary)',
                        fontSize: 14, fontFamily: 'inherit', outline: 'none',
                        boxShadow: '0 0 0 3px rgba(124,58,237,0.12)',
                      }}
                    />
                  ) : (
                    <span style={{
                      flex: 1, fontSize: 14, color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      transition: 'color 0.2s',
                      lineHeight: 1.5,
                    }}>
                      {todo.text}
                    </span>
                  )}

                  {/* Actions */}
                  <div style={{
                    display: 'flex', gap: 4, flexShrink: 0,
                    opacity: editingId === todo._id ? 1 : (hoveredId === todo._id ? 1 : 0),
                    transition: 'opacity 0.15s',
                  }}>
                    {editingId === todo._id ? (
                      <>
                        <button
                          id={`save-todo-${todo._id}`}
                          onClick={() => updateTodo(todo._id, editText)}
                          style={actionBtnStyle('#10b981', 'rgba(16,185,129,0.1)')}
                          title="Save"
                        >
                          <Check size={14} strokeWidth={2.5} />
                        </button>
                        <button
                          id={`cancel-edit-${todo._id}`}
                          onClick={() => { setEditingId(null); setEditText(''); }}
                          style={actionBtnStyle('var(--text-muted)', 'rgba(255,255,255,0.05)')}
                          title="Cancel"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          id={`edit-todo-${todo._id}`}
                          onClick={() => { setEditingId(todo._id); setEditText(todo.text); }}
                          style={actionBtnStyle('#8b5cf6', 'rgba(139,92,246,0.1)')}
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          id={`delete-todo-${todo._id}`}
                          onClick={() => handleDelete(todo._id)}
                          style={actionBtnStyle('#f43f5e', 'rgba(244,63,94,0.1)')}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        {todos.length > 0 && (
          <p style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
            {todoStats.completed} of {todoStats.total} tasks completed
          </p>
        )}
      </main>

      <style>{`
        @keyframes check-pop {
          0%   { transform: scale(0) rotate(-45deg); opacity: 0; }
          60%  { transform: scale(1.25) rotate(5deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        input::placeholder { color: var(--text-muted); }
      `}</style>
    </div>
  );
});

function actionBtnStyle(color, bg) {
  return {
    width: 30, height: 30, borderRadius: 7,
    background: bg, border: `1px solid ${color}25`,
    color: color, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.15s', fontFamily: 'inherit',
  };
}

export default Dashboard;