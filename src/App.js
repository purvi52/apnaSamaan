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
import { selectLoggedInUser} from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPassword from './features/auth/components/ForgotPassword';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions,Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options={
  timeout:5000,
  position:positions.BOTTOM_LEFT
}
const router= createBrowserRouter([
  {
    path:"/",
    element:(
      <Protected><Home></Home></Protected>
    ),
  },
  {
    path:"/admin",
    element:(
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
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
  },
  {
    path:'/admin/product-detail/:id',
    element:(
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>)
  },
  {
    path:'/admin/product-form',
    element:(
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>)
  },
  {
    path:'/admin/orders',
    element:(
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>)
  },
  {
    path:'/admin/product-form/edit/:id',
    element:(
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>)
  },
  {
    path:'*',
    element:(
      <PageNotFound></PageNotFound>
    )
  },
  {
    path:'/order-success/:id',
    element:(
      <OrderSuccessPage></OrderSuccessPage>
    )
  },
  {
    path:'/orders',
    element:(
      <UserOrdersPage></UserOrdersPage>
    )
  }
  ,
  {
    path:'/profile',
    element:(
      <UserProfilePage></UserProfilePage>
    )
  },
  {
    path:'/logout',
    element:(
      <Logout></Logout>
    ),
  },
  {
    path:'/forgot-password',
    element:(
      <ForgotPasswordPage></ForgotPasswordPage>
    ),
  }

])
function App() {

  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);
  // const userChecked=useSelector(selectUserChecked);

  // useEffect(()=>{
  //   dispatch(checkAuthAsync())
  // },[dispatch])

  useEffect(()=>{
    if(user)
    {
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
    
  },[dispatch,user]);
  return (
    <div className="App">
     <Provider template={AlertTemplate} {...options}>
     <RouterProvider router={router} />
     </Provider>
    </div>
  );
}

export default App;
