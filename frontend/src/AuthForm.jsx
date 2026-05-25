import React, { useCallback, useState, useEffect } from 'react';
import { X, User, Lock, Mail, Eye, EyeOff, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

const AuthForm = React.memo(({
  isLogin,
  authForm,
  setAuthForm,
  handleAuth,
  loading,
  error,
  setCurrentView,
  setError,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  const handleInputChange = useCallback((field, value) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  }, [setAuthForm]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleAuth(isLogin);
  }, [handleAuth, isLogin]);

  const handleViewChange = useCallback(() => {
    setCurrentView(isLogin ? 'signup' : 'login');
    setError('');
    setAuthForm({ email: '', password: '', name: '' });
  }, [isLogin, setCurrentView, setError, setAuthForm]);

  if (!mounted) return null;

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 44px',
    background: focusedField === field ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${focusedField === field ? 'rgba(124,58,237,0.5)' : 'var(--border)'}`,
    borderRadius: 10,
    color: 'var(--text-primary)',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(124,58,237,0.12)' : 'none',
  });

  const iconStyle = {
    position: 'absolute', left: 14, top: '50%',
    transform: 'translateY(-50%)', pointerEvents: 'none',
    color: 'var(--text-muted)',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)',
      }} />

      {/* Card */}
      <div
        className="animate-scale-in"
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: 400,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '36px 32px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset',
        }}
      >
        {/* Close */}
        <button
          id="auth-close-btn"
          onClick={() => setCurrentView('landing')}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '6px', cursor: 'pointer',
            color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          <X size={16} />
        </button>

        {/* Logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)',
          }}>
            <CheckCircle size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>TaskFlow</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.5px' }}>
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            {isLogin ? 'Sign in to continue to TaskFlow.' : 'Start organizing your tasks today.'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            background: 'rgba(244,63,94,0.1)',
            border: '1px solid rgba(244,63,94,0.25)',
            borderRadius: 10, padding: '12px 14px',
            marginBottom: 20,
            animation: 'fade-up 0.3s ease',
          }}>
            <AlertCircle size={15} color="#f43f5e" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 13, color: '#fb7185', lineHeight: 1.45 }}>{error}</span>
          </div>
        )}

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Name field (signup only) */}
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User size={16} style={iconStyle} />
              <input
                id="signup-name-input"
                type="text"
                placeholder="Full name"
                value={authForm.name}
                onChange={e => handleInputChange('name', e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                onKeyDown={handleKeyDown}
                style={inputStyle('name')}
              />
            </div>
          )}

          {/* Email */}
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={iconStyle} />
            <input
              id="auth-email-input"
              type="email"
              placeholder="Email address"
              value={authForm.email}
              onChange={e => handleInputChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              onKeyDown={handleKeyDown}
              style={inputStyle('email')}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={iconStyle} />
            <input
              id="auth-password-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={authForm.password}
              onChange={e => handleInputChange('password', e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              onKeyDown={handleKeyDown}
              style={{ ...inputStyle('password'), paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', display: 'flex', padding: 4,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Submit */}
          <button
            id="auth-submit-btn"
            onClick={() => handleAuth(isLogin)}
            disabled={loading}
            style={{
              marginTop: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: loading ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              border: '1px solid rgba(124,58,237,0.5)',
              color: '#fff', fontSize: 14, fontWeight: 600,
              padding: '13px 24px', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 0 24px rgba(124,58,237,0.35)',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.5)'; } }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.35)'; }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Processing…
              </>
            ) : (
              <>
                {isLogin ? 'Sign in' : 'Create account'}
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>

        {/* Toggle */}
        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            id="auth-toggle-btn"
            onClick={handleViewChange}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#a78bfa', fontWeight: 600, fontSize: 13,
              fontFamily: 'inherit', padding: 0, transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
            onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
});

export default AuthForm;