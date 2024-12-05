import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { SetStoreStatus } from '../redux/Slices/Store'
import { useNavigate } from 'react-router-dom'


const categories = [
  "Electronics", "Clothing", "Home & Garden", "Books", "Toys", "Sports", "Beauty", "Jewelry", "Food", "Automotive"
]

export default function StoreCreator() {
    const navigate  = useNavigate();
  const [logo, setLogo] = useState(null)
  const [storeName, setStoreName] = useState('')
  const [selectedCategories, setSelectedCategories] = useState('') // Comma-separated string
  const [customCategory, setCustomCategory] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const dispatch = useDispatch();

  const handleLogoChange = (e) => {
    if (e.target.files) {
      setLogo(e.target.files[0])
    }
  }

  const handleCategoryChange = (category) => {
    const categoriesArray = selectedCategories.split(',').filter(Boolean); // Convert string to array
    
    if (categoriesArray.includes(category)) 
    {
      // Remove category
      const updatedCategories = categoriesArray.filter(c => c !== category);
      setSelectedCategories(updatedCategories.join(',')); // Convert back to string
    }
    else 
    {
      // Add category
      setSelectedCategories([...categoriesArray, category].join(','));
    }

    
  }

  const handleAddCustomCategory = () => {
    const categoriesArray = selectedCategories.split(',').filter(Boolean);
    if (customCategory && !categoriesArray.includes(customCategory)) {
      setSelectedCategories([...categoriesArray, customCategory].join(',')); // Add custom category
      setCustomCategory(''); // Reset custom category input
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("storeName", storeName);
    formData.append("category", [selectedCategories]); // Submit categories as a comma-separated string
    try {
        const response = await fetch('http://localhost:5000/seller/createstore', {
          method: 'POST',
          body: formData, 
        });

        if(response.ok){
            const result = await response.json();
            if(result.storeStatus){
                dispatch(SetStoreStatus(result.storeStatus));
                setInterval(() => navigate("/"),5000);
            }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    setIsFormSubmitted(true);
    console.log('Form submitted:', { logo, storeName, selectedCategories });
  }

  return (
    <div className="min-h-screen flex bg-[#ffffff] text-[#34383C]">
      <motion.div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#FF7104] rounded-full opacity-10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="w-1/2 p-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#FF7104]"
        >
          Start your
          <img
            src="KaroobarLogo.png"
            alt="KAROOBAR Logo"
          />
          Create Your E-commerce Empire
          <p className="mt-4 text-lg font-normal text-[#34383C]">
            Start your journey to success. Build a store that reflects your brand and reaches customers all over Pakistan.
          </p>
        </motion.div>
      </div>

      <div className="w-1/2 p-12">
        {!isFormSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-[#34383C] mb-1">Store Logo</label>
              <input
                id="logo"
                type="file"
                onChange={handleLogoChange}
                accept="image/*"
                className="block w-full text-sm text-[#34383C] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF7104] file:text-white hover:file:bg-[#FF7104]/80"
              />
            </div>
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-[#34383C] mb-1">Store Name</label>
              <input
                id="storeName"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Enter your store name"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-[#34383C]/20 rounded-md text-sm shadow-sm placeholder-[#34383C]/50 focus:outline-none focus:border-[#FF7104] focus:ring-1 focus:ring-[#FF7104]"
              />
            </div>
            <div className="space-y-2">
              <p className="block text-sm font-medium text-[#34383C]">Select Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.split(',').includes(category)} // Check from string
                      onChange={() => handleCategoryChange(category)}
                      className="rounded border-[#34383C]/20 text-[#FF7104] focus:ring-[#FF7104]"
                    />
                    <label htmlFor={category} className="text-sm text-[#34383C]">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Add custom category"
                className="flex-grow px-3 py-2 bg-white border border-[#34383C]/20 rounded-md text-sm shadow-sm placeholder-[#34383C]/50 focus:outline-none focus:border-[#FF7104] focus:ring-1 focus:ring-[#FF7104]"
              />
              <button
                type="button"
                onClick={handleAddCustomCategory}
                className="px-4 py-2 bg-[#FF7104] text-white rounded-md hover:bg-[#FF7104]/80 focus:outline-none focus:ring-2 focus:ring-[#FF7104] focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF7104] text-white rounded-md hover:bg-[#FF7104]/80 focus:outline-none focus:ring-2 focus:ring-[#FF7104] focus:ring-offset-2"
              >
                Create Store
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-[#34383C]">Random E-commerce Categories</h2>
            <ul className="list-disc pl-5 space-y-2 text-[#34383C]">
              {categories.sort(() => Math.random() - 0.5).slice(0, 5).map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
            <p className="text-[#34383C]">Selected categories: {selectedCategories}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
