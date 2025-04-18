import { Route, Routes } from "react-router-dom";
import LoginModal from "./components/Modal/LoginModal";
import RegisterModal from "./components/Modal/RegisterModal";
import ForgetPassword from "./components/Modal/ForgetPassword";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/HomeAdmin/Dashboard/Dashboard";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";
import AccountSetting from "./pages/Setting/AccountSetting";
import Security from "./pages/Setting/ChangePassword";
import ContractPage from "./pages/Setting/ContractPage";
import UpdateProfile from "./pages/Setting/UpdateProfile"
import ManagerUser from "./pages/HomeAdmin/ManageUser/ManageUser"
import Details from "./pages/Room/Details"
import ManageCategories from "./pages/HomeAdmin/ManageCategories/ManageCategory"
import OwnerPage from "./pages/HomeOwner/OwnerPage";
import CreateRoom from "./pages/Room/CreateRoom";
import UpdateRoom from './pages/Room/UpdateRoom';
import ToastNotification from './components/toast/ToastNotification';
import CheckoutOrder from './pages/Orders/CheckoutOrder';
import ListOrder from './pages/Orders/ListOrder';
import ManagerOwner from './pages/HomeAdmin/ManageOwner/ManageOwner';
import PublicElement from './components/commonAuth/PublicElement';
import HotelOwnerElement from './components/commonAuth/HotelOwnerElement';
import AdminElement from './components/commonAuth/AdminElement';
import ComplainModal from "./components/Modal/ComplainModal";





function App() {
  const currentPath = window.location.pathname.split('/');

  return (
    <>
      {currentPath[1] === "admin" ? (
        <>
        </>
      ) : (
        <div className={currentPath[1] === "admin" ? '' : ' max-md:h-14 md:h-16 relative '} style={{ padding: '0px', margin: '0px' }}>
          <div className={currentPath[1] === "admin" ? '' : 'fixed top-0 w-full z-50'}>
            <Navbar />
          </div>
        </div>
      )}

      <LoginModal />
      <ForgetPassword />
      <ToastNotification />
      <RegisterModal />
      <ComplainModal />
      <Routes>
        <Route path="/" element={
          <PublicElement>
            <Home />
          </PublicElement>
        }
        />
        <Route
          path="/details/:id"
          element={
            <PublicElement>
              <Details />
            </PublicElement>
          }
        />
        <Route
          path="/owner"
          element={

            <HotelOwnerElement>
              <OwnerPage />
            </HotelOwnerElement>

          }
        />
        <Route
          path="/order/:id"
          element={
            <PublicElement>
              <CheckoutOrder />
            </PublicElement>
          }
        />
        <Route
          path="/orders"
          element={
            <PublicElement>
              <ListOrder />
            </PublicElement>
          }
        />
        <Route
          path="/editRoom/:id"
          element={
            <HotelOwnerElement>
              <UpdateRoom />
            </HotelOwnerElement>
          }
        />
        <Route
          path="/createRoom"
          element={

            <HotelOwnerElement>
              <CreateRoom />
            </HotelOwnerElement>

          }
        />
        <Route path='admin' element={<HomeAdmin />} >
          <Route
            index path=""
            element={
              <AdminElement>
                <Dashboard />
              </AdminElement>
            }
          />
          <Route
            path="categories"
            element={
              <AdminElement>
                <ManageCategories />
              </AdminElement>
            }
          />
          <Route
            path="users"
            element={
              <AdminElement>
                <ManagerUser />
              </AdminElement>
            }
          />
          <Route
            path="owner"
            element={
              <AdminElement>
                <ManagerOwner />
              </AdminElement>
            }
          />
        </Route>
        <Route path='account-setting' >
          <Route
            path=""
            element={
              <PublicElement>
                <AccountSetting />
              </PublicElement>
            }
          />
          <Route
            path="personal-info"
            element={
              <PublicElement>
                <UpdateProfile />
              </PublicElement>
            }
          />
          <Route
            path="secutiry"
            element={
              <PublicElement>
                <Security />
              </PublicElement>
            }
          />
          <Route
            path="contract"
            element={
              <PublicElement>
                <ContractPage />
              </PublicElement>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
