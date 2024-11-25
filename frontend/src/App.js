// src/App.jsx
import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import HeaderMainStore from "./Components/HeaderMainStore";
import CategoryHeader from "./Components/CategoriesHeader";
import ProductCards from "./Components/ProductCards";

library.add(fab, faUser, faMagnifyingGlass)

const App = () => {
  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col">
      <HeaderMainStore />
      <CategoryHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
</div>

      
    </div>
  );
};

export default App;
