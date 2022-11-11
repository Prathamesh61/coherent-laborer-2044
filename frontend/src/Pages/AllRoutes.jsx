import React from 'react';
import { Route, Routes } from "react-router-dom";
import Checkout from './Checkout/Checkout';
import Home from './Home';
import Product from './Product';
import Profile from './Profile';
import Signup from './Signup';


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/product' element={<Product />}/>
      </Routes>
    </div>
  )
}

export default AllRoutes;
