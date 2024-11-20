// src/components/HeroImage.jsx
import React from "react";

const HeroImage = () => {
  return (
    <div className="hidden md:flex md:flex-1">
      <img
        src="SHOPPINGMAN.png" // Path relative to public folder
        alt="Shopping Hero"
        className="w-full h-auto"
      />
    </div>
  );
};

export default HeroImage;
