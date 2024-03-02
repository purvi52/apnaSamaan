import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../userSlice';

export default function UserProfile() {
  const user=useSelector(selectUserInfo)
  const dispatch = useDispatch();
  const handleEdit=(e)=>{

  }
  const handleRemove=()=>{
    
  }

  return (
    <div>
      <div className="mx-auto mt-7 max-w-7xl px-4 py-6 bg-white sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                   
                <h2 className='text-2xl font-bold mb-5'>
                  Name: {user.name?user.name:'New User'}
                </h2>
                <h3 className='text-xl font-bold text-red-900 mb-5'>
                email address: {user?.email}
                </h3>
                
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <p className="mt-0.5 text-sm text-gray-500">Your Addresses: </p>
                    {user.addresses.map((address,index)=>
                      <div className="flex justify-between gap-x-6 py-5 border-gray-400 border-2 px-4">
          <div className="flex min-w-0 gap-x-4">
  
          {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p> */}
            <div className="min-w-0 flex-auto">

              <p className="text-sm font-semibold leading-6 text-gray-900">{address?.name}</p>
              
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address?.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address?.pinCode}</p>
              
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{address?.phoneNo}</p>
            <p className="text-sm leading-6 text-gray-900">{address?.city}</p>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <button
                                    onClick={e=>handleEdit(e,index)}
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Edit
                                    </button>
                                    <button
                                    onClick={e=>handleRemove(e,index)}
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
          </div>
          
                    </div>)}

                  </div>  
                    
                
            </div>

      </div>
  );
}
