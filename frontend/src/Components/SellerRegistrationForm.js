import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ecommerceTexts = [
  "Empower Your Business",
  "Sell Globally, Grow Locally",
  "Your Success, Our Platform",
  "Unleash Your Potential",
  "Connect, Sell, Thrive",
]

export default function SellerRegistrationForm() {
  const [formData, setFormData] = useState({
    businessEmail: '',
    IBAN: '',
    NTN: '',
    CNIC: '',
    buyerEmail: '',
  })
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % ecommerceTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="min-h-screen flex bg-[#34383A]">
      {/* Left side with shapes and text */}
      <div className="hidden lg:flex w-1/2 bg-[#FF7104] relative overflow-hidden rounded-r-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-white text-5xl font-bold text-center px-8">
            <motion.div
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {ecommerceTexts[currentTextIndex]}
            </motion.div>
          </div>
        </motion.div>
        {/* Shapes */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-lg opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-white transform rotate-45 opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-[#FF7104]">Seller Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(formData).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key.includes('Email') ? 'email' : 'text'}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7104] transition-all duration-200"
                  placeholder={`Enter your ${key}`}
                />
              </motion.div>
            ))}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#FF7104] text-white py-2 px-4 rounded-md hover:bg-[#FF8C3D] transition-colors duration-200 font-semibold text-lg mt-6"
            >
              Register
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

