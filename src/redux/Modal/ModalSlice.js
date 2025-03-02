import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    login: false,
    register: false,
    forgetPassword:false,
    details: false,
    detailsChart: false,
    notification: {message: '', notificationType:''}
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        openLogin:(state, action)=>{
            state.login = true; 
        } ,
        closeLogin: (state, action)=>{
            state.login = false; 
        },
        openDetails:(state, action)=>{
            state.details = true; 
        } ,
        closeDetails: (state, action)=>{
            state.details = false; 
        },
        openDetailsChart:(state, action)=>{
            state.detailsChart = true; 
        } ,
        closeDetailsChart: (state, action)=>{
            state.detailsChart = false; 
        },
        openForgetPassword:(state, action)=>{
            state.forgetPassword = true; 
        } ,
        closeFotgetPassword: (state, action)=>{
            state.forgetPassword = false; 
        },
        openRegister: (state, action)=>{
            state.register = true;
        },
        closeRegister: (state, action)=>{
            state.register = false
        },
        openMessage:(state,action)=>{
            state.notification.message = action.payload.message
            state.notification.notificationType = action.payload.notificationType
        },
        resetMessage: (state) => {
            state.notification.message = '';
            state.notification.notificationType = '';
          }
    },
   
});

export const {openDetailsChart,closeDetailsChart,openLogin, closeLogin,openRegister,closeRegister, openMessage,resetMessage, closeFotgetPassword, openForgetPassword, openDetails, closeDetails} = modalSlice.actions
export default modalSlice.reducer