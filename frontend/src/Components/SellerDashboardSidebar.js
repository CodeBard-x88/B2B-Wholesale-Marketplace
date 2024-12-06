import React, { useState } from 'react';

const MenuItem = ({ label, isActive, onClick }) => (
  <li 
    className={`mb-2 ${isActive ? 'bg-[#FF7104] text-white' : 'text-[#34383A] hover:bg-[#FF7104] hover:bg-opacity-10'}`}
    onClick={onClick}
  >
    <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors duration-200">
      <div className={`w-6 h-6 mr-3 flex items-center justify-center rounded ${isActive ? 'bg-white text-[#FF7104]' : 'bg-[#FF7104] bg-opacity-10 text-[#34383A]'}`}>
        {label.charAt(0)}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </a>
  </li>
);

export default function SellerDashboardSidebar() {
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { label: 'Home' },
    { label: 'Product Management' },
    { label: 'Order Management' },
    { label: 'Discount Management' },
    { label: 'Store Management' },
  ];

  return (
    <aside className="fixed left-0 top-15 h-[93vh] w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#34383A]">Seller Dashboard</h1>
        </div>
        <nav className="flex-grow">
          <ul className="px-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                label={item.label}
                isActive={activeItem === item.label}
                onClick={() => setActiveItem(item.label)}
              />
            ))}
          </ul>
        </nav>
        <div className="p-6 mt-auto">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#FF7104] flex items-center justify-center text-white font-bold text-lg">
              SD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-[#34383A]">Seller Name</p>
              <p className="text-xs text-gray-500">seller@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

