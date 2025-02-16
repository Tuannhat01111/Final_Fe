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

const CategoryItem = ({ name, btn, isActive }) => {
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
  return (
    <>
      <div className="flex">
        <div
          className="flex flex-col w-32 sm:w-20 pl-2 h-full sm:h-16 border-b-2 border-b-transparent border-solid hover:border-b-2 hover:border-b-black hover:border-solid items-center "
          onClick={btn}
        >
          {RandomIcon && <RandomIcon className="pt-1" size={30} color="" />}
          <h1 className={`{${isActive ? "" : ""} text-sm`}>{name}</h1>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
