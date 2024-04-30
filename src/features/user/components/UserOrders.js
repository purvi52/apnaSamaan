import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserOrders } from '../userSlice';
import { useEffect } from 'react';
import { discountedPrice } from '../../../app/constants';

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders= useSelector(selectUserOrders)

  useEffect(()=>{
    dispatch(fetchLoggedInUserOrderAsync())
  },[dispatch])

  return (
    <div>
    {orders && orders.map((order)=>(
        <div key={order.id}>
        <div className="mx-auto mt-7 max-w-7xl px-4 py-6 bg-white sm:px-6 lg:px-8">
                <h2 className='text-2xl font-bold mb-5'>Order Number is :
                {order?.id}</h2>
                <h3 className='text-xl font-bold text-red-900 mb-5'>
                Order Status :{order?.status}
                </h3>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.product.thumbnail}
                                  alt={item.product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.product.id}>{item.product.title}</a>
                                    </h3>
                                    <p className="ml-4">${discountedPrice(item.product)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="text-gray-500 ml-3">
                                  <label htmlFor="quantity" className="inline mr-2 text-sm font-medium leading-6 text-gray-900">
              Qty:{item.quantity}
            </label>
                                  </div>

                                  <div className="flex">
                                    
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                </div>
                 

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${order.totalAmount }</p>
                    </div>
                    <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                      <p>Total Items in Cart</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping Address: </p>


                    <div className="flex justify-between gap-x-6 py-5 border-gray-400 border-2 px-4">
          <div className="flex min-w-0 gap-x-4">
  
          {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p> */}
            <div className="min-w-0 flex-auto">

              <p className="text-sm font-semibold leading-6 text-gray-900">{order?.selectedAdd?.name}</p>
              
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order?.selectedAdd?.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order?.selectedAdd?.state}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order?.selectedAdd?.phoneNo}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order?.selectedAdd?.email}</p>
            <p className="text-sm leading-6 text-gray-900">{order?.selectedAdd?.city}</p>
            <p className="text-sm leading-6 text-gray-900">{order?.selectedAdd?.pinCode}</p>
            </div>
          
        </div>
                    
                </div>
            </div>
        </div>))}
    </div>
  );
}