import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalSlice from "./Modal/ModalSlice";
import authSlice from "./Auth/AuthSlice";

const reducer = combineReducers({
  modal: modalSlice,
  auth: authSlice,
});

const store = configureStore({
  reducer,
});

export default store;
