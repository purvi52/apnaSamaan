import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";
function OrderSuccessPage(){
  const params= useParams()
  const dispatch=useDispatch()
  
  useEffect(()=>{
    dispatch(resetCartAsync())
    //to reset currentOrder
    dispatch(resetOrder())
  },[dispatch])

  
    return (
      <>
      {!params.id && <Navigate to='/' replace={true}></Navigate>}
        <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-base font-semibold text-indigo-600">Order Successfully Placed!</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
    Order Number #{params?.id}</h1>
    <p class="mt-6 text-base leading-7 text-gray-600">
    You can check your order in My Account</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <Link to="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
       hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-indigo-600">Go back home</Link>
      <div class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></div>
    </div>
  </div>
</main>
</>

    );
}

export default OrderSuccessPage;