import React, { useCallback, useState, useEffect } from 'react';
import { CheckCircle, X, User, Lock, Mail, Eye, EyeOff, Sparkles } from 'lucide-react';

const AuthForm = React.memo(({ 
  isLogin, 
  authForm, 
  setAuthForm, 
  handleAuth, 
  loading, 
  error, 
  setCurrentView, 
  setError 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  }, [setAuthForm]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleAuth(isLogin);
    }
  }, [handleAuth, isLogin]);

  const handleViewChange = useCallback(() => {
    setCurrentView(isLogin ? 'signup' : 'login');
    setError('');
    setAuthForm({ email: '', password: '', name: '' });
  }, [isLogin, setCurrentView, setError, setAuthForm]);

  const handleBackToLanding = useCallback(() => {
    setCurrentView('landing');
  }, [setCurrentView]);

  const inputVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: custom * 0.1 + 0.3,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`
      }}
    />
  ));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div
        className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md relative z-10 border border-white/10 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header with enhanced animation */}
        <div className="text-center mb-8 relative">
          <div className="relative inline-block mb-4">
            <CheckCircle 
              className="w-16 h-16 text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text mx-auto"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))',
                animation: 'glow 2s ease-in-out infinite alternate'
              }}
            />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pink-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          <h2 
            className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3"
            style={{
              textShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
              animation: 'slideInDown 0.8s ease-out'
            }}
          >
            {isLogin ? 'Welcome Back' : 'Join the Magic'}
          </h2>
          <p 
            className="text-gray-300 text-lg"
            style={{ animation: 'fadeInUp 1s ease-out 0.3s both' }}
          >
            {isLogin ? 'Continue your journey' : 'Begin your adventure'}
          </p>
        </div>

        {/* Enhanced error message */}
        {error && (
          <div
            className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/50 rounded-2xl p-4 mb-6 backdrop-blur-sm"
            style={{
              animation: 'shake 0.5s ease-in-out, fadeInLeft 0.5s ease-out',
              boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)'
            }}
          >
            <p className="text-red-200 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Enhanced form fields */}
        <div className="space-y-6">
          {!isLogin && (
            <div
              className="relative group"
              style={{ animation: 'slideInRight 0.6s ease-out 0.2s both' }}
            >
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Full Name"
                value={authForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
                style={{
                  boxShadow: focusedField === 'name' ? '0 0 30px rgba(168, 85, 247, 0.3)' : 'none'
                }}
              />
              {focusedField === 'name' && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-sm" />
              )}
            </div>
          )}
          
          <div
            className="relative group"
            style={{ animation: 'slideInRight 0.6s ease-out 0.3s both' }}
          >
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
            <input
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
              style={{
                boxShadow: focusedField === 'email' ? '0 0 30px rgba(168, 85, 247, 0.3)' : 'none'
              }}
            />
            {focusedField === 'email' && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-sm" />
            )}
          </div>

          <div
            className="relative group"
            style={{ animation: 'slideInRight 0.6s ease-out 0.4s both' }}
          >
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
              style={{
                boxShadow: focusedField === 'password' ? '0 0 30px rgba(168, 85, 247, 0.3)' : 'none'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {focusedField === 'password' && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-sm" />
            )}
          </div>

          {/* Enhanced submit button */}
          <button
            onClick={() => handleAuth(isLogin)}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            style={{
              animation: 'slideInUp 0.6s ease-out 0.5s both',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)',
              backgroundSize: '200% 200%'
            }}
            onMouseEnter={(e) => {
              e.target.style.animation = 'gradientShift 2s ease infinite';
            }}
          >
            <span className="relative z-10">
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <Sparkles className="w-5 h-5" />
                </span>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* Enhanced toggle section */}
        <div 
          className="text-center mt-8"
          style={{ animation: 'fadeIn 0.8s ease-out 0.6s both' }}
        >
          <span className="text-gray-300 text-lg">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={handleViewChange}
            className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold text-lg hover:from-purple-300 hover:to-pink-300 transition-all duration-300"
            style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>

        {/* Enhanced close button */}
        <button
          onClick={handleBackToLanding}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.5s ease-out 0.8s both' }}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <style jsx>{`
        @keyframes glow {
          0% { filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.4)); }
          100% { filter: drop-shadow(0 0 30px rgba(236, 72, 153, 0.6)); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
});

export default AuthForm;