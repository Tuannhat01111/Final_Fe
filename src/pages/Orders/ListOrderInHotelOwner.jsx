import { useEffect, useState } from "react";
import { format } from "date-fns";
import * as React from 'react';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SpinLoading from "../../components/spin/Spin";
import { getOrderByHotelOwner } from "../../redux/order/orderThunks";
import './ListOrder.css';
import { jwtDecode } from "jwt-decode";

const ListOrderInHotelOwner = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.order)
  const user = jwtDecode(localStorage.getItem('token'))

  useEffect(() => {
    dispatch(getOrderByHotelOwner({id: user.UserId}))
  }, [])


  return (
    <>
      {loading ? (
        <SpinLoading />
      ) : (
        <div className="flex flex-col container mx-auto">
          <div className="py-10">
            <h1 className=" text-3xl font-semibold">Welcome, {user.UserName}!</h1>
          </div>
          <div className=" flex flex-col">
            {data ? (
              <>
                {data.map((item, index) => (
                  <div>
                    <div className="flex flex-col sm:flex-row py-4 px-2 gap-4 mb-4 bg-[#F7F7F7]" key={item?.id}>
                      <div className=" flex items-center relative w-full sm:h-48 sm:w-48">
                        <img className=" object-cover sm:max-w-48 sm:max-h-48 rounded-xl" src={item?.room?.roomImages?.[0]?.url} alt="" />
                      </div>
                      <div className=' grid-cols-1 sm:grid-cols-2 w-full'>
                        <div className="flex flex-col justify-center  sm:items-start gap-3">
                          <h1 className="text-xl font-medium md:w-full md:text-center">{item?.room?.name}</h1>
                          <div className='flex justify-around w-full'>
                            <p>Start Date</p>
                            <p>End Date</p>
                            <p>Paid</p>
                            <p>Name Customer</p>
                          </div>
                          <div className='flex justify-around w-full'>
                            <p>{format(item?.startDate, "MM/dd/yyyy")}</p>
                            <p>{format(item?.endDate, "MM/dd/yyyy")}</p>
                            <p>${item?.price}</p>
                            <p>{item?.user?.userName}</p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 italic">
                            <strong>Note:</strong> Please ensure that guests provide accurate check-in and check-out dates. To optimize room availability and prevent last-minute issues, encourage guests to complete their bookings at least 24 hours in advance. Make sure all necessary requirements, such as valid guest identification and payment, are fulfilled promptly to avoid booking cancellations.
                            </p>
                          </div>
                        </div>
                     
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className=" w-full h-[30vh] flex flex-col items-center justify-center gap-4">
                  <MdOutlineRemoveShoppingCart className="opacity-50" size={100} spacing={1} />
                  <h1 className=" text-2xl text-gray-600">Don't have any order</h1>
                </div>
              </>
            )}

          </div>

        </div>
      )}
    </>
  )
}
export default ListOrderInHotelOwner;

