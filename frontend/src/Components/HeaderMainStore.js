import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  return (
    <header className="flex justify-between items-center px-14 bg-[#34383A]">
      <div className="flex items-center">
        <img
          src="KaroobarLogo.png" 
          alt="KAROOBAR Logo"
          className="h-12"
        />
      </div>

      <div className="w-1/2 items-center flex justify-center">
        <input type="text" placeholder="Search Products here..." className="outline-none h-10 w-full rounded-2xl p-5 text-black"/>
      </div>

      <nav className="hidden md:flex space-x-10 items-center">
      <img alt="cart" src="/cart-icon.png" className="object-contain" style={{ width: '40px', height: '40px' }} />
      <img alt="notifications" src="/notification-icon.png" className="object-contain" style={{ width: '40px', height: '40px' }} />
      <div className="bg-[#FF7104] w-[1px] h-14"></div>
      <FontAwesomeIcon icon="user" size="lg" color="white" />
      </nav>
    </header>
  );
};

export default Header;
