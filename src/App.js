import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import ProductList from './features/product-list/components/ProductList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import { useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/Cart';
import ProductDetail from './features/product-list/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
const router= createBrowserRouter([
  {
    path:"/",
    element:(
      <Protected><Home></Home></Protected>
    ),
  },
  {
    path:'/login',
    element:<LoginPage></LoginPage>
  },
  {
    path:'/signup',
    element:<SignupPage></SignupPage>
  },
  {
    path:'/cart',
    element:<Protected><CartPage></CartPage></Protected> 
  },
  {
    path:'/checkout',
    element:<Protected><Checkout></Checkout></Protected>
  },
  {
    path:'/product-detail/:id',
    element:<Protected><ProductDetailPage></ProductDetailPage></Protected>
  }

])
function App() {

  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser)
  useEffect(()=>{
    if(user)
    {
      dispatch(fetchItemsByUserIdAsync(user.Id))
    }
    
  },[dispatch,user])
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
