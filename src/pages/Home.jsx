import { useEffect, useState } from "react";

import CategorySlide from "../components/CategorySlide/CategorySlide";
import RoomItem from "../components/RoomItem/RoomItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../redux/room/roomThunks";

const room = [
  {
    id: "aa",
    name: "rôm 1",
    country: "Viet Nam",
    city: "Ha Noi",
    category: "Hotel",
    price: 100,
    roomImages: [
      {
        url: "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg",
      },
    ],
  },
];
const Home = () => {
  const [favorite, setFavorite] = useState(false);
  const favoriteButton = () => {
    setFavorite(!favorite);
  };
  const dispatch = useDispatch()
  const { rooms } = useSelector((state) => state.room)

  useEffect(() => {
      dispatch(getAllRooms())
  }, [])

  return (
    <>
      <div className="relative h-24 sm:h-20 z-1">
        <CategorySlide />
      </div>
      <div className=" w-full sm:w-[90%] px-6 sm:mx-auto ">
        <div className=" pt-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 transition-all duration-500 ">
          {rooms?.map((item) => {
            return (
              <RoomItem
                key={item?.id}
                data={item}
                isFavorite={favorite}
                btn={() => {
                  favoriteButton();
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
