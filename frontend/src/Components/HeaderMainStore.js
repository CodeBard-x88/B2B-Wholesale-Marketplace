import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "react-router-dom";
import { TextAnimationClasses, IconsAnimationClasses } from "../Utilities";

const Header = () => {
  const location = useLocation();
  const { isLoggedIn = false } = location.state || {};
  const [profileOptionsVisible, setProfileOptionsVisible] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 h-14 bg-[#34383A]">
      <div className="flex items-center">
        <img
          src="KaroobarLogo.png"
          alt="KAROOBAR Logo"
          className="h-12"
        />
      </div>

      <div className="hidden md:w-1/2 md:items-center md:flex md:justify-center">
        <input
          type="text"
          placeholder="Search Products here..."
          className="outline-none h-10 w-full rounded-2xl p-5 text-black"
        />
        <FontAwesomeIcon icon="magnifying-glass" size="3xl" color="black" className="relative right-10" />
      </div>

      <nav className="flex space-x-10 items-center">
        <button className={`appearance-button border-0 rounded-md text-[#FF7104] font-bold text-lg ${TextAnimationClasses.OrangeToWhite}`}>
          Track your order
        </button>
        <img alt="cart" src="/cart-icon.png" className={`object-contain ${IconsAnimationClasses.TranslateY}`} style={{ width: '30px', height: '30px' }} />

        {isLoggedIn === true ? (
          <>
            <img alt="notifications" src="/notification-icon.png" className={`object-contain ${IconsAnimationClasses.TranslateY}`} style={{ width: '40px', height: '40px' }} />
            <div className="bg-[#FF7104] w-[1px] h-8"></div>
            <div className="relative">
              <button
                onClick={() => setProfileOptionsVisible(!profileOptionsVisible)}
                className={`relative ${IconsAnimationClasses.TranslateY}`}
              >
                <FontAwesomeIcon icon="user" size="lg" color="white" />
              </button>
              {profileOptionsVisible && (
                <div className="absolute top-12 right-0 bg-[#2B2B2B] rounded-md shadow-lg w-64
                 h-72 flex flex-col text-white items-start">
                    <button className={`px-4 py-2 cursor-pointer ${TextAnimationClasses.WhiteToOrange_SmallText} `}>
                      <Link to="/profile">Go to Profile</Link>
                    </button>
                    <button className={`px-4 py-2 cursor-pointer ${TextAnimationClasses.WhiteToOrange_SmallText} `}>
                      <Link to="/seller">Become a Seller</Link>
                    </button>
                    <button className={`px-4 py-2 cursor-pointer ${TextAnimationClasses.WhiteToOrange_SmallText} `}>
                      <Link to="/orders">Current Orders</Link>
                    </button>
                    <button className={`px-4 py-2 cursor-pointer ${TextAnimationClasses.WhiteToOrange_SmallText} `}>
                      <Link to="/history">History</Link>
                    </button>
                    <button
                      className={`px-4 py-2  cursor-pointer text-[#FF7104] ${TextAnimationClasses.OrangeToWhite_SmallText}`}
                      onClick={() => console.log("Logout function here")}>
                      Logout
                    </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[#FF7104] font-semibold">Login</Link>
            <div className="bg-[#FF7104] w-[1px] h-8"></div>
            <button className="bg-red-500 border border-red-500 rounded-md shadow-sm text-white font-bold text-sm leading-4 min-h-[40px] px-4 py-3 hover:bg-transparent hover:text-red-500 active:opacity-50">
              Signup
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
