import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getCategoryId } from "../../redux/category/categoryThunks";
import { getAllRooms } from "../../redux/room/roomThunks";

import {
  TbAnchor,
  TbBackpack,
  TbBalloon,
  TbBeach,
  TbBuilding,
  TbBus,
  TbBusStop,
  TbCamera,
  TbCampfire,
  TbCaravan,
  TbCompass,
  TbFlower,
  TbGasStation,
  TbHelicopter,
  TbKayak,
  TbLifebuoy,
  TbMap,
  TbMotorbike,
  TbMountain,
  TbParking,
  TbPlane,
  TbRoad,
  TbRocket,
  TbSailboat,
  TbShip,
  TbSun,
  TbSunrise,
  TbSunset,
  TbSwimming,
  TbTent,
  TbTower,
  TbTrain,
  TbTree,
} from "react-icons/tb";
import "./CategorySlide.scss";

const icons = [
  TbBeach,
  TbMountain,
  TbTree,
  TbSun,
  TbFlower,
  TbCampfire,
  TbSunset,
  TbSunrise,
  TbSwimming,
  TbSailboat,
  TbKayak,
  TbTent,
  TbCompass,
  TbMap,
  TbCamera,
  TbBackpack,
  TbAnchor,
  TbShip,
  TbLifebuoy,
  TbCaravan,
  TbMotorbike,
  TbTrain,
  TbBus,
  TbPlane,
  TbHelicopter,
  TbRocket,
  TbBalloon,
  TbBuilding,
  TbTower,
  TbRoad,
  TbBusStop,
  TbParking,
  TbGasStation,
];


const CategorySlide = () => {
  const dispatch = useDispatch();

  const [activeCategory, setActiveCategory] = useState(null);
  const [isAtTop, setIsAtTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { categories } = useSelector((state) => state.category)
  useEffect(() => {
    dispatch(getAllCategory())
  }, [])
  const handleClickCategory = (id) => {
    setActiveCategory(id);
    dispatch(getAllRooms({ categoryId: id }))

  };
  return (
    <>
      <div
        className={`fixed h-20 w-full z-10 bg-white ${!isAtTop ? "" : "border-b border-b-gray-200 "
          } `}
      >
        <div className="flex overflow-hidden overflow-x-auto py-4 flex-row items-center md:items-start md:justify-start justify-center mx-2 px-4  sm:py-2  sm:px-6 gap-0 lg:gap-8 scrollable-div ">
          {categories?.map((item, index) => {
            const Icon = icons[index];
            return (
              <div className="flex" key={item?.id}>
                <div
                  className="flex flex-col w-32 sm:w-20 pl-2 h-full sm:h-16 border-b-2 border-b-transparent border-solid hover:border-b-2 hover:border-b-black hover:border-solid items-center "
                  onClick={() => {
                    handleClickCategory(item?.id);
                  }}
                >
                  {Icon && <Icon className="pt-1" size={30} color="" />}
                  <h1
                    className={`${item?.id === activeCategory ? "" : ""
                      } text-sm`}
                  >
                    {item?.name}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategorySlide;
