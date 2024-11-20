// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-green-500">
      <div className="flex items-center">
        <img
          src="KaroobarLogo.png" // Path relative to public folder
          alt="KAROOBAR Logo"
          className="h-10"
        />
      </div>
      {/* Responsive Navigation */}
      <nav className="hidden md:flex space-x-6 text-lg">
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
