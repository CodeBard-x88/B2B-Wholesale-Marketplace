// src/App.jsx
import React from "react";
import Header from "./Components/Header";
import HeroImage from "./Components/HeroImage";
import LoginForm from "./Components/LoginForm";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col">
      <Header />
      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row items-center justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
        <HeroImage />
        <LoginForm />
      </div>
    </div>
  );
};

export default App;
