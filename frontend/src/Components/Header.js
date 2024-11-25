import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-14 my-1 text-green-500">
      <div className="flex items-center">
        <Link to='/'><img
          src="KaroobarLogo.png" 
          alt="KAROOBAR Logo"
          className="h-16"
        />
        </Link>
      </div>
      <nav className="hidden md:flex space-x-10 text-lg items-center">
        <Link to="/" className="hover:text-green-300">Home</Link>
        <Link to="/" className="hover:text-green-300">Contact</Link>
        <Link to="/" className="hover:text-green-300">About</Link>
        <Link
          to="/"
          className="text-black bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Signup
        </Link>
      </nav>
    </header>
  );
};

export default Header;
