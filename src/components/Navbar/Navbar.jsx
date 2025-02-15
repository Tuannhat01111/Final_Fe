import { AppBar, TextField, Toolbar } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FaAirbnb } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router";
import UserMenu from "./UserMenu/UserMenu";
const Navbar = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        position="static"
        sx={{
          divShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <div
            // onClick={(e) => {
            //   handleRefresh(e);
            // }}
            className="flex flex-row items-center cursor-pointer sm:ml-4 md:ml-6 lg:ml-16 "
          >
            <FaAirbnb
              className="font-semibold transform rotate-180 cursor-pointer"
              color="#F5385D"
              size={40}
            />
            <h1 className="text-primary text-lg font-semibold font-circular pl-3">
              EarthPnP
            </h1>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="h-[48px]  lg:h-[64] flex flex-row items-center justify-between border rounded-full">
              <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                  <div className="cursor-pointer w-[250px] h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Please enter name hotel"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      id="fullWidth"
                      value={name}
                      //   onChange={(e) => {
                      //     handleChange(e);
                      //   }}
                    />
                  </div>
                </div>
              </div>

              <Link
                to={"/list"}
                className="p-2 h-10 w-10 flex justify-center items-center rounded-full bg-primary lg:mr-2 cursor-pointer"
              >
                <div className="cursor-pointer p-2 lg:p-4 bg-airbnb hover:bg-airbnb-dark transition rounded-full text-white">
                  <IoIosSearch size={24} />
                </div>
              </Link>
            </div>
          </div>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFF",
    },
  },
});
