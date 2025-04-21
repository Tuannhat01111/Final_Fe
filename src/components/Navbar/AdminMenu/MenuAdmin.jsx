import { Link } from "react-router-dom";
import { logOut } from "../../../redux/Auth/AuthSlice";
import { useDispatch } from "react-redux";

const MenuAdmin = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOut())
  };

  return (
    <div className="flex flex-col gap-5 bg-[#ffffff] border-r-2 border-solid border-[#384256] h-[93vh] px-6">
      <div className="text-sm  text-[dark] uppercase flex flex-col  py-6">
        <Link to={`/admin`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#96b8fd]">
          <span>Dashboard</span>
        </Link>
        <Link to={`/admin/categories`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#96b8fd]">
          <span>Manage Categories</span>
        </Link>
        <Link to={`/admin/users`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#96b8fd]">
          <span>Manage Users</span>
        </Link>
        <Link to={`/admin/owner`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#96b8fd]">
          <span>Manage Owner Hotels</span>
        </Link>
        <Link to={`/admin/orders`} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#96b8fd]">
          <span>Manage Orders</span>
        </Link>
        <Link onClick={() => { logout() }} className="flex items-center gap-[10px] p-[10px] rounded-[5px] hover:bg-[#96b8fd]">
          <span>Log out </span>
        </Link>
      </div>
    </div>
  );
};

export default MenuAdmin;