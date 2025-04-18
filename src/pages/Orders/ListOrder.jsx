import { useEffect, useState } from "react";
import { format } from "date-fns";
import * as React from 'react';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SpinLoading from "../../components/spin/Spin";
import { getOrder } from "../../redux/order/orderThunks";
import './ListOrder.css';
import TextField from '@mui/material/TextField';
import { jwtDecode } from "jwt-decode";
import { sendFeedback } from "../../redux/room/roomThunks";

const ListOrder = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.order)
  const [selectedFeedbackIndex, setSelectedFeedbackIndex] = useState(null);
  const [feedbacks, setFeedbacks] = useState(Array(data.length).fill(''));

  const handleChange = (index, event) => {
    const newFeedbacks = [...feedbacks];
    newFeedbacks[index] = event.target.value;
    setFeedbacks(newFeedbacks);
  };

  const handleSelectFeedback = (index) => {
    setSelectedFeedbackIndex(index);
  };
  useEffect(() => {
    dispatch(getOrder())
  }, [])

  const user = jwtDecode(localStorage.getItem('token'))

  const handleSendFeedback = (roomId, index) => {
    dispatch(sendFeedback({ userId: user.UserId, roomId: roomId, content: feedbacks[index] }))
  };
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
                      <div className='grid grid-cols-1 sm:grid-cols-2 w-full'>
                        <div className="flex flex-col justify-center  sm:items-start gap-3">
                          <h1 className="text-xl font-medium md:w-full md:text-center">{item?.room?.name}</h1>
                          <div className='flex justify-around w-full'>
                            <p>Start Date</p>
                            <p>End Date</p>
                            <p>Paid</p>
                          </div>
                          <div className='flex justify-around w-full'>
                            <p>{format(item?.startDate, "MM/dd/yyyy")}</p>
                            <p>{format(item?.endDate, "MM/dd/yyyy")}</p>
                            <p>${item?.price}</p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 italic">
                              <strong>Note:</strong> Please confirm the exact start and end dates of your stay. To ensure your accommodation at the hotel, please complete your booking at least 24 hours in advance. Ensure that all necessary requirements, such as valid identification and payment, are completed on time to avoid cancellation of your reservation.
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-col md:flex-row justify-center items-center w-full relative'>
                          <div className='w-full sm:gap-6 sm:px-6'>
                            <TextField
                              id={`feedback-${index}`}
                              value={selectedFeedbackIndex === index ? feedbacks[index] : ''}
                              onChange={(event) => handleChange(index, event)}
                              onFocus={() => handleSelectFeedback(index)}
                              multiline
                              rows={6}
                              fullWidth
                              placeholder="If you have any problems, please enter here and the system will send an email to the store owner"
                            />

                            <div className="py-4 flex justify-center">
                              <button
                                className="bg-blue-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full"
                                onClick={() => handleSendFeedback(item?.roomId, index)}
                              >
                                Send feedback to owner room
                              </button>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
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

          <div className="my-4">
            {/* <p className=" font-medium underline underline-offset-2 ">All reservations(0)</p> */}
          </div>
        </div>
      )}
    </>
  )
}
export default ListOrder;

