import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalSlice from "./Modal/ModalSlice";

const reducer = combineReducers({
  modal: modalSlice,
});

const store = configureStore({
  reducer,
});

export default store;
