import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalSlice from "./Modal/ModalSlice";
import authSlice from "./Auth/AuthSlice";
import roomSlice from './Room/RoomSlice'
import categorySlice from './Category/CategorySlice';
import orderSlice from './Order/OrderSlice'
import profileSlice from './Profile/ProfileSlice'
import userRoleSlice from "./UserRole/UserRoleSlice";

const reducer = combineReducers({
  modal: modalSlice,
  auth: authSlice,
  room: roomSlice,
  category: categorySlice,
  order: orderSlice,
  profile: profileSlice,
  userRole: userRoleSlice
});

const store = configureStore({
  reducer,
});

export default store;
