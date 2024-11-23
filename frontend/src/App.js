// src/App.jsx
import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import HeaderMainStore from "./Components/HeaderMainStore";

library.add(fab, faUser, faMagnifyingGlass)

const App = () => {
  return (
    <div className="min-h-screen bg-blck  text-green-500 flex flex-col">
      <HeaderMainStore />
      
    </div>
  );
};

export default App;
