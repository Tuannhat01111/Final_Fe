import { Link,  Await } from "react-router-dom";
import { Suspense, useEffect } from "react";
import ListRoomInHotelOwner from "./ListRoomInHotelOwner";
import { useDispatch, useSelector } from "react-redux";
import {  getRoomByOwnerHotel, getRoomOrdersStats } from "../../redux/room/roomThunks";
import SpinLoading from "../../components/spin/Spin";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function OwnerPage() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms)
  const { dataChart } = useSelector((state) => state.room)

  useEffect(() => {
    dispatch(getRoomByOwnerHotel())
    dispatch(getRoomOrdersStats())
  }, [])

  const chart = dataChart.slice(0, 6)
  return (

      <>
        <div className=" sm:container sm:mx-auto py-8 ">
          <div className="details flex-[3_3_0%] pb-50">
            <div className="wrapper p-0 pr-12.5 flex flex-col gap-12">

              <div className="title flex items-center justify-between">
                <h1 className="text-3xl font-semibold">User Information</h1>
              </div> 
              <div className="flex flex-col items-center justify-center w-full border border-gray-200 shadow-xl px-6 pb-4 pt-8 rounded-2xl ">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="roomName" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="yearlyOrders" dataChart="yearlyOrders" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                  <h1 className="text-center mt-4">Total Order In Year Per Room</h1>
                </div>

              <div className="title flex items-center justify-between">
                <h1 className="font-[100] text-3xl">My List Room</h1>
                <Link to="/createRoom">
                  <button className="max-w-[20] bg-[#008982] hover:opacity-90 text-white py-2.5 px-5 rounded cursor-pointer">Create New Room</button>
                </Link>
              </div>
              <Suspense fallback={
                <>
                  <SpinLoading />
                </>
              }>
                <Await
                  resolve={rooms}
                  errorElement={<p>Error loading posts!</p>}

                >
                  <ListRoomInHotelOwner rooms={rooms} />
                </Await>
              </Suspense>
            </div>
          </div>
          <div className="chatContainer flex-[2_2_0%] bg-fcf5f3 h-full"></div>
        </div>
    </>
  );

}

export default OwnerPage;