import React, { useState, useEffect } from 'react';
import { CheckCircle, Target, Zap, Calendar, Star, ArrowRight, Sparkles } from 'lucide-react';

const LandingPage = ({ setCurrentView }) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Target, title: "Stay Focused", desc: "Prioritize tasks and focus on what matters most", color: "from-pink-500 to-violet-500" },
    { icon: Zap, title: "Lightning Fast", desc: "Quick and responsive interface for seamless productivity", color: "from-cyan-500 to-blue-500" },
    { icon: Calendar, title: "Never Forget", desc: "Smart reminders and due date tracking", color: "from-emerald-500 to-teal-500" }
  ];

  const FloatingOrb = ({ size, delay, duration, color }) => (
    <div
      className={`absolute rounded-full opacity-20`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent)`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
        
        {/* Floating Orbs */}
        <FloatingOrb size="300px" delay="0" duration="8" color="#8b5cf6" />
        <FloatingOrb size="200px" delay="2" duration="6" color="#ec4899" />
        <FloatingOrb size="150px" delay="4" duration="10" color="#06b6d4" />
        <FloatingOrb size="250px" delay="1" duration="7" color="#10b981" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16 opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <CheckCircle className="w-8 h-8 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              TodoMaster
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('login')}
              className="px-6 py-2 text-purple-300 hover:text-white transition-all duration-300 hover:scale-105 relative group"
            >
              Login
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </button>
            <button
              onClick={() => setCurrentView('signup')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] relative overflow-hidden group"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            <h1 className="text-7xl md:text-8xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                Organize Your Life
              </span>
              <div className="text-6xl md:text-7xl mt-2 relative">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Get Things Done
                </span>
                <Sparkles className="absolute -top-2 -right-8 w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </h1>
          </div>
          
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The ultimate todo app that transforms chaos into clarity. Experience productivity 
              like never before with our revolutionary task management system.
            </p>
          </div>
          
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards] flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setCurrentView('signup')}
              className="group px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-lg rounded-full font-bold hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-500 hover:scale-110 relative overflow-hidden"
              style={{ backgroundSize: '200% 100%' }}
              onMouseEnter={(e) => e.target.style.backgroundPosition = '100% 0'}
              onMouseLeave={(e) => e.target.style.backgroundPosition = '0% 0'}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
              <span className="ml-2 text-gray-300">Trusted by 50k+ users</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Why Choose TodoMaster?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)] ${
                  currentFeature === index ? 'ring-2 ring-purple-400/50 scale-105' : ''
                }`}
                style={{
                  animation: `slideInUp 0.8s ease-out ${0.2 * index}s forwards`,
                }}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="relative mb-6 inline-block">
                    <feature.icon className="w-16 h-16 text-purple-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-400/20">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Productivity?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who've revolutionized their workflow
            </p>
            <button
              onClick={() => setCurrentView('signup')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg rounded-full font-semibold hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105 group"
            >
              Start Your Journey
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }


      `}</style>
    </div>
  );
};

export default LandingPage;