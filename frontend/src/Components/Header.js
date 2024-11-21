import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-14 my-6 bg-black text-green-500">
      <div className="flex items-center">
        <img
          src="KaroobarLogo.png" 
          alt="KAROOBAR Logo"
          className="h-16"
        />
      </div>
      <nav className="hidden md:flex space-x-10 text-lg items-center">
        <a href="www.google.com" className="hover:text-green-300">Home</a>
        <a href="www.google.com" className="hover:text-green-300">Contact</a>
        <a href="www.google.com" className="hover:text-green-300">About</a>
        <a
          href="#signup"
          className="text-black bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Signup
        </a>
      </nav>
    </header>
  );
};

export default Header;
