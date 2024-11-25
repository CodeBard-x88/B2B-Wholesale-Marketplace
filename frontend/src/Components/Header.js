import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-14 my-1 text-white">
      <div className="flex items-center">
        <Link to='/'><img
          src="KaroobarLogo.png" 
          alt="KAROOBAR Logo"
          className="h-16"
        />
        </Link>
      </div>
      <nav className="hidden md:flex space-x-10 text-lg items-center">
        <Link to="/">Home</Link>
        <Link to="/">Contact</Link>
        <Link to="/">About</Link>
        <Link
          to="/"
          className="text-[#F97404] bg-white px-4 py-2 rounded-lg"
        >
          Signup
        </Link>
      </nav>
    </header>
  );
};

export default Header;
