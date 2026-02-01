import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Central Texas with Love
      </motion.h1>

      <motion.p
        className="mt-6 text-xl text-gray-400 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Plants. Lights. Neon vibes.
      </motion.p>

      <motion.div
        className="mt-12 text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Coming soon to Austin
      </motion.div>
    </div>
  )
}

export default App
