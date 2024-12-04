import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {toggleLoginStatus} from "../redux/Slices/LoginSlice"
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Correct state declaration
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  function ResetFormField(){
    setEmail("");
    setPassword("");
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
  })
  .then(response =>{
    if(response.status === 200)
      return response.json();

    if(response.status === 401)
    {
      ResetFormField();
      setErrorMessage("Incorrect Credentials!");
    }

    if(response.status === 500){
      ResetFormField();
      setErrorMessage("Internal Server Error!");
    }  

    setTimeout(() => setErrorMessage(""), 5000);
    return response.json();

  })
  .then(data => {
      if (data && data.token) {
          // Store the token in a cookie
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 2); // Set expiration to 2 days from now
          document.cookie = `token=${data.token}; path=/; secure; httponly; expires=${expirationDate.toUTCString()}`;;
          dispatch(toggleLoginStatus());
          navigate('/');
      } else {
          console.error('Token not received:', data);
      }
  })
  .catch(error => {
    ResetFormField();
    setErrorMessage("An error occurred. Try again later!");
    setTimeout(() => setErrorMessage(""), 5000);  // Clear error message after 5 seconds
});
  };

  return (
    <div className="bg-[#E8E8E8] p-8 rounded-[68px] text-black w-full md:w-5/6 flex justify-center items-center md:justify-between">
      <div className="hidden md:block w-1/2">
        <img src="SHOPPINGMAN.png" alt="shopping man" className="max-w-full h-auto" />
      </div>
      <div className="md:w-1/2 md:pl-8 md:justify-center w-full relative bg-cover bg-center bg-login-form-bg md:bg-none">
        <form className="space-y-3 flex flex-col items-center" onSubmit={onFormSubmit}>
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-lg">Please Login to your account</p>
          <p className="text-red-700 font-semibold">{errorMessage}</p>
          <div className="w-3/4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={HandleOnChange}
              placeholder="example@gmail.com"
              className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="w-3/4">
            <label className="block mb-2">Password</label>
            <input
              type={showPassword? "text": "password"}
              name="password"
              value={password}
              onChange={HandleOnChange}
              placeholder="Password"
              className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            
            <span
              onClick={togglePasswordVisibility}
              className="relative -top-[38px] -right-80"
            >
              {showPassword ? 
               <img src="/open-eye.png" alt="password visible" className="w-1/12 h-1/12" />
               : <img src="/close-eye.png" alt="password hidden" className="w-1/12 h-1/12" />}
            </span>
            <div className="text-right">
              <a href="https://www.google.com" className="text-sm text-black hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
