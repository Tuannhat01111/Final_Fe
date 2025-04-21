import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../../redux/room/roomThunks";
import DetailsRoomModal from "../../components/Modal/DetailsRoomModal";
import { openDetails, openDetailsChart } from "../../redux/Modal/ModalSlice";
import DetailsChartModal from "../../components/Modal/DetailsChartModal";

function ListRoomInHotelOwner({ rooms }) {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState('');
  const open = useSelector((state) => state.modal.detailsChart)

  const handleDelete = (id) => {
    dispatch(deleteRoom(id));
  }

  const handleView = (id) => {
    setSelectedId(id);
    dispatch(openDetails());
  }
  
  const handleViewChart = (id) => {
    setSelectedId(id);
    dispatch(openDetailsChart());
  }


  return (
    <div className="flex flex-col gap-8 border border-gray-200 rounded-2xl">
      {rooms?.map((item) => (
        <div className="flex flex-col lg:flex-row lg:gap-20 mx-4 md:mx-auto lg:mx-0 px-4 py-4 shadow-2xl rounded-2xl ">

          <div className="flex flex-2 px-2 py-2  w-full ">
            <Link to={`/${item.id}`} className="block w-full h-full">
              <img src={item?.roomImages?.[0] ? item?.roomImages?.[0]?.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5z6MCCSYYRWCiVDmoNaRZ1qEwl6MlQCOzkSBJbdMlg&s'} alt="" className="w-full h-full object-cover rounded-lg" />
            </Link>
          </div>

          <div className="flex-3 flex flex-col justify-between  gap-4 px-4 lg:px-0">
            <h2 className="text-20 font-semibold text-3xl text-gray-700 transition-colors duration-400 hover:text-black">
              <Link to={`/${item?.id}`}>{item?.name}</Link>
            </h2>

            <p className="flex items-center gap-5 text-gray-800">
              <img src="/pin.png" alt="" className="w-4 h-4" />
              <span>{item?.street}</span>

            </p>
            <div className="line-clamp-3 pr-12 text-justify" dangerouslySetInnerHTML={{ __html: item?.description }}></div>

            <p className="text-20 font-light text-green-500 text-xl sm:font-semibold flex gap-4 max-w-40 items-center">
              <IoPricetagOutline /> {item?.price} $
            </p>
            <div className="flex justify-around pb-4 px-10">
              <div className="flex flex-col md:flex-row  gap-5">
                <button className="py-2 px-4 bg-[#59a1ff] hover:bg-[#61d2ff] text-white rounded-md" onClick={() => { handleView(item?.id) }}> View as a customer</button>
                  <button className="py-2 px-4 bg-[#008489] hover:bg-[#008972] text-white rounded-md" onClick={() => { handleViewChart(item?.id) }}>View data of room</button>
                <Link to={`/editRoom/${item?.id}`}>
                  <button className="py-2 px-4 bg-[#b3ca31] hover:bg-[#fdef6f] text-white rounded-md" >Edit</button>
                </Link>
                <button className="py-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-md" onClick={() => { handleDelete(item?.id) }}>Delete</button>
              </div>
            </div>
          </div>
          {selectedId === item.id && open ? <DetailsChartModal id={item?.id} /> : null}
          {selectedId === item.id ? <DetailsRoomModal id={item?.id} /> : null}
        </div>
      ))}
    </div>
  );
}

export default ListRoomInHotelOwner;
