import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  LogOut,
  Sparkles,
  Target,
  Clock
} from 'lucide-react';

const Dashboard = React.memo(({ 
  user = { name: "Alex" }, 
  handleLogout = () => {}, 
  newTodo = "", 
  setNewTodo = () => {}, 
  addTodo = () => {}, 
  todoStats = { total: 12, completed: 8, pending: 4 }, 
  todos = [
    { _id: 1, text: "Complete dashboard redesign", completed: true },
    { _id: 2, text: "Review code with team", completed: false },
    { _id: 3, text: "Update documentation", completed: false },
    { _id: 4, text: "Plan next sprint", completed: true }
  ], 
  toggleTodo = () => {}, 
  editingId = null, 
  setEditingId = () => {}, 
  editText = "", 
  setEditText = () => {}, 
  updateTodo = () => {}, 
  deleteTodo = () => {} 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Large gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-violet-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl"
      >
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <CheckCircle className="w-10 h-10 text-white drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))' }} />
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
              </motion.div>
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                TodoMaster
              </h1>
              <p className="text-white/70 text-sm">Productivity reimagined</p>
            </div>
          </motion.div>
          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/90"
            >
              <span className="text-lg">Welcome back, </span>
              <span className="font-semibold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                {user?.name}
              </span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-8 relative z-10"
      >
        {/* Enhanced Add Todo */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl" />
          <div className="relative flex space-x-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="What amazing thing will you accomplish today?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="flex-1 px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:border-pink-400/50 focus:bg-white/20 text-white placeholder-white/60 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
            />
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTodo}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-lg font-semibold relative overflow-hidden group"
            >
              <Plus className="w-5 h-5" />
              <span>Create</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Todo Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { 
              title: "Total Tasks", 
              value: todoStats.total, 
              color: "from-blue-400 to-blue-600", 
              icon: Target,
              bgGlow: "bg-blue-500/20",
              shadowColor: "shadow-blue-500/25"
            },
            { 
              title: "Completed", 
              value: todoStats.completed, 
              color: "from-violet-400 to-purple-600", 
              icon: CheckCircle,
              bgGlow: "bg-violet-500/20",
              shadowColor: "shadow-violet-500/25"
            },
            { 
              title: "Pending", 
              value: todoStats.pending, 
              color: "from-pink-400 to-rose-600", 
              icon: Clock,
              bgGlow: "bg-pink-500/20",
              shadowColor: "shadow-pink-500/25"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group"
            >
              <div className={`absolute inset-0 ${stat.bgGlow} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`} />
              <motion.div 
                className={`relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20 hover:${stat.shadowColor} transition-all duration-300`}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white/90">{stat.title}</h3>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <stat.icon className="w-6 h-6 text-white/70" />
                  </motion.div>
                </div>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, delay: 0.2 + index * 0.1 }}
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))' }}
                >
                  {stat.value}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Todo List */}
        <motion.div
          variants={cardVariants}
          className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="p-8 border-b border-white/20 bg-gradient-to-r from-violet-500/20 via-purple-500/15 to-pink-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3 relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Your Epic Tasks</span>
            </h2>
          </div>
          <div className="divide-y divide-white/10">
            <AnimatePresence>
              {todos.map((todo, index) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.02, x: 10, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 24,
                    delay: index * 0.05
                  }}
                  className="p-6 flex items-center space-x-4 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTodo(todo._id, todo.completed)}
                    className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      todo.completed
                        ? 'bg-gradient-to-r from-violet-400 to-purple-500 border-violet-400 text-white shadow-lg shadow-violet-500/25'
                        : 'border-white/30 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/25'
                    }`}
                  >
                    {todo.completed && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </motion.div>
                    )}
                  </motion.button>

                  {editingId === todo._id ? (
                    <div className="flex-1 flex items-center space-x-3 relative z-10">
                      <motion.input
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 px-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-violet-400/50 text-white placeholder-white/60 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                        autoFocus
                      />
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateTodo(todo._id, editText)}
                        className="p-3 text-violet-400 hover:text-violet-300 hover:bg-violet-500/20 rounded-xl transition-all duration-300"
                      >
                        <Save className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setEditingId(null);
                          setEditText('');
                        }}
                        className="p-3 text-gray-400 hover:text-gray-300 hover:bg-gray-500/20 rounded-xl transition-all duration-300"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.span 
                        className={`flex-1 text-lg transition-all duration-300 relative z-10 ${
                          todo.completed 
                            ? 'line-through text-white/50' 
                            : 'text-white group-hover:text-white/90'
                        }`}
                        animate={todo.completed ? { opacity: 0.5 } : { opacity: 1 }}
                      >
                        {todo.text}
                      </motion.span>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10">
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setEditingId(todo._id);
                            setEditText(todo.text);
                          }}
                          className="p-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-xl transition-all duration-300"
                        >
                          <Edit className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteTodo(todo._id)}
                          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {todos.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 text-center"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-6"
                >
                  <CheckCircle className="w-16 h-16 mx-auto text-white/30" style={{ filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.2))' }} />
                </motion.div>
                <p className="text-white/60 text-lg">
                  Your canvas awaits! Create your first masterpiece above.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default Dashboard;