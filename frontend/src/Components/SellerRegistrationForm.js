import React, { useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 


const ecommerceTexts = [
  "Empower Your Business",
  "Sell Globally, Grow Locally",
  "Your Success, Our Platform",
  "Unleash Your Potential",
  "Connect, Sell, Thrive",
];

export default function SellerRegistrationForm() {
  const [formData, setFormData] = useState({
    businessEmail: '',
    IBAN: '',
    NTN: '',
    CNIC: '',
  });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  // Regex Patterns for CNIC, IBAN, and NTN
  const cnicPattern = /^\d{5}-\d{7}-\d{1}$/; // CNIC: xxxxx-yyyyyyy-z
  const ibanPattern = /^PK\d{2}[A-Z]{4}\d{16}$/; // IBAN: PKXX[4 chars][16 digits]
  const ntnPattern = /^\d{7}-\d{1}$/; // NTN: xxxxxxx-x
  const token = document.cookie.match(/(?:^|;\s*)token=([^;]*)/)?.[1];

  useEffect( ()=>{
    async function GetSellerStatus(){
      try {
        const response = await fetch('http://localhost:5000/users/sellerRegistrationStatus', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${token}`,
          }
        }).then(async() => {
          if(response.status === 200)
            return await response.json();
          
        }).then(data => {
          if(data.status === "buyer"){
            setIsFormVisible(true);
            return;
          }
          else if(data.status === "isPending"){
            setSuccessMessage("Your request for Seller account is pending.\nPlease check again, later.\nThankyou!");
            setTimeout(() => {
              setSuccessMessage('');
              navigate('/');
            }, 5000);
    
          }
    
        })
      } catch (error) {
        setErrorMessage("An Error Occured!\nPlease try again, later.")
      }
    }

  GetSellerStatus();
  }, [token]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % ecommerceTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!cnicPattern.test(formData.CNIC)) {
      setErrorMessage('Invalid CNIC format. Correct format: xxxxx-yyyyyyy-z');
      return false;
    }
    if (!ibanPattern.test(formData.IBAN)) {
      setErrorMessage('Invalid IBAN format. Correct format: PKXX[4 chars][16 digits]');
      return false;
    }
    if (!ntnPattern.test(formData.NTN)) {
      setErrorMessage('Invalid NTN format. Correct format: xxxxxxx-x');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message
    setSuccessMessage(''); // Clear any previous success message

    // Validate form
    if (!validateForm()) return;

    // Read the token from the cookie

    if (!token) {
      setErrorMessage('Authentication token not found.');
      return;
    }

    try {
      // Send the POST request with form data and authorization header
      const response = await fetch('http://localhost:5000/users/sellerRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Registration successful!');
        setIsFormVisible(false);

        // Wait 5 seconds, then navigate to '/'
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 5000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Registration failed.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }

    // Clear error message after 5 seconds
    setTimeout(() => setErrorMessage(''), 5000);
  };

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
            repeatType: 'reverse',
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
            repeatType: 'reverse',
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
            repeatType: 'reverse',
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
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
          {isFormVisible && (
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
                    placeholder={
                      key === 'CNIC'
                        ? 'xxxxx-yyyyyyy-z'
                        : key === 'IBAN'
                        ? 'PKxx[4 chars][16 digits]'
                        : key === 'NTN'
                        ? 'xxxxxxx-x'
                        : `Enter your ${key}`
                    }
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
          )}
        </motion.div>
      </div>
      
    </div>
  );
}
