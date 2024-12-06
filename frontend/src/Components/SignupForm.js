import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {toggleLoginStatus} from "../redux/Slices/LoginSlice";
import { SetStoreStatus } from "../redux/Slices/Store";
import { SetUserRole } from "../redux/Slices/UserRole";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    Name: '',
    username: '',
    Email: '',
    password: '',
    Phone: '',
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [errorText, setErrorText] = useState('');
  const encouragingTexts = [
    "Join the wholesale revolution!",
    "Unlock bulk savings today!",
    "Grow your business with us!",
    "Wholesale made easy!",
    "Connect with top suppliers!"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % encouragingTexts.length)
    }, 4000) // Change text every 4 seconds

    return () => clearInterval(interval)
  }, [encouragingTexts.length])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/users/submitSignupForm",
        {
            method: 'POST',
            body: formData
        }
    )
    if(response.Ok){
        const loginResponse = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.Email, password: formData.password })
        });

        if(loginResponse.ok){
            const data = await loginResponse.json();
            dispatch(SetUserRole(data.role));
          dispatch(SetStoreStatus(data.storeStatus));
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 2); // Set expiration to 2 days from now
          document.cookie = `token=${data.token}; path=/; expires=${expirationDate.toUTCString()}`;;
          dispatch(toggleLoginStatus());
          navigate('/');
        }
        else{
            setErrorText("Signed Up.\nUnable to Login!");
            setTimeout(()=> navigate("/login"), 5000);
        }
    }
    else{
        setErrorText("Unable to Signup!");
        setTimeout(() => setErrorText(""), 5000);
    }
  }

  const shapes = [
    { type: 'circle', size: 100, x: '20%', y: '20%', duration: 5 },
    { type: 'square', size: 80, x: '70%', y: '60%', duration: 7 },
    { type: 'triangle', size: 120, x: '40%', y: '80%', duration: 6 },
  ]

  return (
    <div className="flex h-screen">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 bg-[#FF7104] flex items-center justify-center rounded-r-3xl overflow-hidden relative"
      >
        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              y: { duration: shape.duration, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: shape.duration * 2, repeat: Infinity, ease: 'linear' },
            }}
          >
            {shape.type === 'circle' && (
              <div className="w-full h-full rounded-full bg-[#ffffff] bg-opacity-20" />
            )}
            {shape.type === 'square' && (
              <div className="w-full h-full bg-[#ffffff] bg-opacity-20" />
            )}
            {shape.type === 'triangle' && (
              <div className="w-full h-full bg-[#ffffff] bg-opacity-20" style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }} />
            )}
          </motion.div>
        ))}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center z-10"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to WholesaleHub</h2>
            <p className="text-2xl text-white">{encouragingTexts[currentTextIndex]}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="w-1/2 bg-[#ffffff] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-[#34383A]">Sign Up</h2>
          <p className='text-red-800 font-semibold'>{errorText}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-[#34383A]">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.Name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-[#34383A]">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#34383A]">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.Email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#34383A]">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-[#34383A]">Phone (Pakistani format)</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.Phone}
                onChange={handleChange}
                pattern="^(\+92|0092|0)[3][0-9]{9}$"
                placeholder="+923XXXXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#FF7104] text-white py-2 px-4 rounded-md hover:bg-[#e66700] transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

