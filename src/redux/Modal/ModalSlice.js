import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  register: false,
  forgetPassword: false,
  details: false,
  detailsChart: false,
  notification: { message: "", notificationType: "" },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.login = true;
    },
    closeLogin: (state) => {
      state.login = false;
    },

    openRegister: (state) => {
      state.register = true;
    },
    closeRegister: (state) => {
      state.register = false;
    },
  },
});

export const { openLogin, closeLogin, openRegister, closeRegister } =
  modalSlice.actions;

export default modalSlice.reducer;
