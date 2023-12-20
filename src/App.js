import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import ProductList from './features/product-list/components/ProductList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/Cart';
import ProductDetail from './features/product-list/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';

const router= createBrowserRouter([
  {
    path:"/",
    element:(
      <Home></Home>
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
    element:<CartPage></CartPage>
  },
  {
    path:'/checkout',
    element:<Checkout></Checkout>
  },
  {
    path:'/product-detail/:id',
    element:<ProductDetailPage></ProductDetailPage>
  }

])
function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
