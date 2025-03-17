import { FaAirbnb } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <div className="flex bg-[#222b3c] w-[100%] p-5  items-center justify-between">
      <div className="flex items-center font-bold gap-[10px]">
        <FaAirbnb className="w-[26px] h-[26px] object-cover rounded-[50%] text-white"/>
        <span className="text-white font-sans">EarthPnP</span>
      </div>
      <div className="flex items-center gap-5">
        <img src="/search.svg" alt="" className="hidden sm:flex " />
        <img src="/app.svg" alt="" className="hidden sm:flex" />
        <img src="/expand.svg" alt="" className="hidden sm:flex" />
        <div className="flex items-center gap-[10px]">
          <img
            className="w-[26px] h-[26px] object-cover rounded-[50px]"
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span className="text-white">Hoang bui Ne</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default AdminNavbar;