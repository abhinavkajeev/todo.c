import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Zap, Shield, BarChart2 } from 'lucide-react';

const LandingPage = ({ setCurrentView }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      desc: 'Instant sync across all your devices with zero latency.',
      color: '#f59e0b',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      desc: 'Your data is encrypted end-to-end. Always.',
      color: '#10b981',
    },
    {
      icon: BarChart2,
      title: 'Track Progress',
      desc: 'Visualise completion rates and stay on top of goals.',
      color: '#8b5cf6',
    },
  ];

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'fixed', bottom: '-20%', right: '-10%', width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Nav */}
      <nav style={{
        position: 'relative', zIndex: 10,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(10,10,15,0.8)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            }}>
              <CheckCircle size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
              TaskFlow
            </span>
          </div>

          {/* Nav actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              id="nav-login-btn"
              onClick={() => setCurrentView('login')}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500,
                padding: '8px 16px', borderRadius: 8,
                transition: 'color 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              Sign in
            </button>
            <button
              id="nav-signup-btn"
              onClick={() => setCurrentView('signup')}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                border: '1px solid rgba(124,58,237,0.5)',
                color: '#fff', fontSize: 14, fontWeight: 600,
                padding: '8px 20px', borderRadius: 8, cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                boxShadow: '0 0 20px rgba(124,58,237,0.25)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.25)'; }}
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '100px 24px 80px' }}>
        {/* Badge */}
        <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 99,
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.25)',
            fontSize: 13, fontWeight: 500, color: '#a78bfa',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', display: 'inline-block', boxShadow: '0 0 6px #7c3aed' }} />
            Now with real-time sync
          </div>
        </div>

        {/* Headline */}
        <div className="animate-fade-up" style={{ animationDelay: '0.08s', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 76px)', fontWeight: 800,
            letterSpacing: '-2.5px', lineHeight: 1.08,
            color: 'var(--text-primary)', marginBottom: 24,
          }}>
            Get more done,<br />
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 60%, #f59e0b 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 4s ease infinite',
            }}>
              with less friction.
            </span>
          </h1>
          <p style={{
            fontSize: 19, color: 'var(--text-secondary)', maxWidth: 520,
            margin: '0 auto 40px', lineHeight: 1.6, fontWeight: 400,
          }}>
            A minimal, fast todo app built for people who want to focus — not fiddle with settings.
          </p>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up" style={{ animationDelay: '0.16s', display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button
            id="hero-signup-btn"
            onClick={() => setCurrentView('signup')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              border: '1px solid rgba(124,58,237,0.6)',
              color: '#fff', fontSize: 15, fontWeight: 600,
              padding: '13px 28px', borderRadius: 10, cursor: 'pointer',
              transition: 'all 0.2s', fontFamily: 'inherit',
              boxShadow: '0 0 30px rgba(124,58,237,0.35)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(124,58,237,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.35)'; }}
          >
            Start for free
            <ArrowRight size={16} />
          </button>
          <button
            id="hero-login-btn"
            onClick={() => setCurrentView('login')}
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-hover)',
              color: 'var(--text-secondary)', fontSize: 15, fontWeight: 500,
              padding: '13px 28px', borderRadius: 10, cursor: 'pointer',
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            Sign in
          </button>
        </div>

        {/* Social proof */}
        <div className="animate-fade-up" style={{ animationDelay: '0.24s', textAlign: 'center', marginTop: 48, color: 'var(--text-muted)', fontSize: 13 }}>
          Trusted by <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>12,000+</span> productive people
        </div>

        {/* Feature cards */}
        <div className="animate-fade-up" style={{ animationDelay: '0.32s', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 80 }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '28px 28px',
                transition: 'all 0.25s',
                cursor: 'default',
                animationDelay: `${0.36 + i * 0.08}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${f.color}18`,
                border: `1px solid ${f.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                <f.icon size={20} color={f.color} strokeWidth={2} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;