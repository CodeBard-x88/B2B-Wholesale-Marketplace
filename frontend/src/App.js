// src/App.jsx
import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import HeaderMainStore from "./Components/HeaderMainStore";
import HeaderSimple from "./Components/Header";
import CategoryHeader from "./Components/CategoriesHeader";
import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";

library.add(fab, faUser, faMagnifyingGlass)

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><HeaderMainStore/><CategoryHeader/><Home/></>
    },
    {
      path: '/login',
      element: <><HeaderSimple/><LoginForm /></>
    }
  ]);
  return (
   <>
      <RouterProvider router={router} />
   </>
  );
};

export default App;
