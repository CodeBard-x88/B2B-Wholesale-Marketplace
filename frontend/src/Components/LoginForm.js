// src/components/LoginForm.jsx
import React from "react";

const LoginForm = () => {
  return (
    <div className="bg-green-500 p-8 rounded-lg text-black w-full md:w-1/2 lg:w-1/3">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <p className="mb-6 text-lg">Please Login to your account</p>

      <form className="space-y-4">
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="text-right">
          <a href="www.google.com" className="text-sm text-black hover:underline">
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
