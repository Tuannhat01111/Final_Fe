import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openLogin, openRegister } from "../../../redux/Modal/ModalSlice";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router";
import { logOut } from "../../../redux/Auth/AuthSlice";

const Avatar = ({ src }) => {
  return (
    <img
      className="rounded-full"
      height="35"
      width="35"
      src={
        src ||
        "https://github.com/AntonioErdeljac/next13-airbnb-clone/blob/master/public/images/placeholder.jpg?raw=true"
      }
      alt=""
    />
  );
};

const UserMenu = () => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)
  const avatarUrl = useSelector((state) => state.auth.avatarUrl)

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const loginModal = () => {
    dispatch(openLogin())
  };
  const registerModal = () => {
    dispatch(openRegister())
  };

  const logout = () => {
    dispatch(logOut())
  };

  return (
    <div className="relative flex items-center justify-center h-6 w-[20%]">
      <div className="flex flex-row items-center  h-full gap-2 ">
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-3
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          justify-center
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={"https://www.w3schools.com/howto/img_avatar.png"} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[100vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-[-15px]
            md:right-1
            top-11 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
          {isLoggedIn ? (
              <>
                {role == "Hotel Owner" && (
                  <MenuItem
                    label="Manage Rooms"
                    onClick={() => navigate('/owner')}
                  />
                )}
                 {role == "Hotel Owner" && (
                  <MenuItem
                    label="Manage Orders By Owner"
                    onClick={() => navigate('/ordersByHotelOwner')}
                  />
                )}
                <MenuItem
                  label="My Orders"
                  onClick={() => navigate('/orders')}
                />
                <MenuItem
                  label="My Account"
                  onClick={() => navigate('/account-setting')}
                />

                <MenuItem
                  label="Logout"
                  onClick={() => { logout() }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => { loginModal() }}
                />

                <MenuItem
                  label="Sign up"
                  onClick={() => { registerModal() }}
                />

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
