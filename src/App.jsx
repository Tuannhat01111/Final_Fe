import { Route, Routes } from "react-router-dom";
import LoginModal from "./components/Modal/LoginModal";
import RegisterModal from "./components/Modal/RegisterModal";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/HomeAdmin/Dashboard/Dashboard";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";
import AccountSetting from "./pages/Setting/AccountSetting";
import Security from "./pages/Setting/ChangePassword";
import ContractPage from "./pages/Setting/ContractPage";
import ProfilePage from "./pages/Setting/Profile";
import UpdateProfile from "./pages/Setting/UpdateProfile"
import ManagerUser from "./pages/HomeAdmin/ManageUser/ManageUser"
import Details from "./pages/Room/Details"
import ManageCategories from "./pages/HomeAdmin/ManageCategories/ManageCategory"
import OwnerPage from "./pages/HomeOwner/OwnerPage";
import CreateRoom from "./pages/Room/CreateRoom";
import UpdateRoom from './pages/Room/UpdateRoom';



function App() {
  return (
    <>
      <Navbar />
      <LoginModal />
      <RegisterModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
            path="/details/:id"
            element={
                <Details />
            }
          />
             <Route
            path="/owner"
            element={

                <OwnerPage />
    
            }
          />
          <Route
            path="/editRoom/:id"
            element={
                <UpdateRoom />
            }
          />
          <Route
            path="/createRoom"
            element={
           
                <CreateRoom />
         
            }
          />
        <Route path='admin' element={<HomeAdmin />} >
            <Route
              index path=""
              element={
                  <Dashboard />
              }
            />
                        <Route
              path="categories"
              element={
                  <ManageCategories />
              }
            />
            <Route
              path="users"
              element={
                  <ManagerUser />
              }
            />
          </Route>
          <Route path='account-setting' >
            <Route
              path=""
              element={
                  <AccountSetting />
              }
            />
            <Route
              path="personal-info"
              element={
                  <UpdateProfile />
              }
            />
            <Route
              path="secutiry"
              element={
                  <Security />
              }
            />
            <Route
              path="contract"
              element={
                  <ContractPage />
              }
            />

            <Route
              path="profile"
              element={
                  <ProfilePage />
              }
            />
          </Route>
      </Routes>
    </>
  );
}

export default App;
