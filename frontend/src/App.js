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
import ProductDescription from "./Components/ProductDescription";
import SellerRegistrationForm from "./Components/SellerRegistrationForm"
import CreateStoreForm from "./Components/CreateStoreForm";
import SignupPage from "./Components/SignupForm";

library.add(fab, faUser, faMagnifyingGlass)

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><HeaderMainStore/><CategoryHeader/><Home/></>
    },
    {
      path: '/login',
      element: <><div className="min-h-screen bg-[#34383A] flex flex-col">
      <HeaderSimple />
      <div className="flex flex-col md:flex-row items-center justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
        <LoginForm />
      </div>
    </div></>
    },
    {
      path: '/productDescription',
      element: <><HeaderMainStore/><CategoryHeader/><ProductDescription/></>
    },
    {
      path: '/SellerRegistration',
      element: <><HeaderMainStore/><SellerRegistrationForm /></>
    },
    {
      path: "/CreateStore",
      element: <><HeaderMainStore /><CreateStoreForm/></>
    },
    {
      path: "/signup",
      element: <><HeaderMainStore/><SignupPage/></>
    }
  ]);
  return (
   <>
      <RouterProvider router={router} />
   </>
  );
};

export default App;
