import React from "react";

const LoginForm = () => {
  return (
    <div className="bg-green-500 p-8 rounded-[68px] text-black w-full md:w-5/6 flex justify-center items-center md:justify-between ">
  <div className="hidden md:block w-1/2">
    <img src="SHOPPINGMAN.png" alt="shopping man" className="max-w-full h-auto" />
  </div>
  <div
className="md:w-1/2 md:pl-8 md:justify-center w-full relative bg-cover bg-center bg-login-form-bg md:bg-none"
>
    <form className="space-y-3 flex flex-col items-center">
     
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p className="mb-6 text-lg">Please Login to your account</p>

      <div className="w-3/4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>
      <div className="w-3/4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-green-300"
        />
         <div className="text-right">
        <a href="www.google.com" className="text-sm text-black hover:underline">
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
