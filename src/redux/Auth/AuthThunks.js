
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../api/axios-interceptor";
import { closeLogin, openComplain, openMessage } from "../Modal/ModalSlice";

export const login = createAsyncThunk('auth/login', async(data, thunkApi)=>{
    try {
        return await http.post('Login', data)
    } catch (error) {
        if (error=== "Account is banned"){
            thunkApi.dispatch(closeLogin())
            thunkApi.dispatch(openComplain())
        }
        thunkApi.dispatch(openMessage({message:error, notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const complain = createAsyncThunk('auth/complain', async(data, thunkApi)=>{
    const {email, content} = data
    try {
        const response = await http.post(`Complain/${email}?content=${content}`, data)
        thunkApi.dispatch(openMessage({message:"Complain Success!", notificationType: 'success'}))
return response
    } catch (error) {
        thunkApi.dispatch(openMessage({message:error, notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const register = createAsyncThunk('auth/register', async(data, thunkApi)=>{
    try {
        const reponse = await http.post('Register', data)
        thunkApi.dispatch(openMessage({message:"Register Success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Register Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const getAllUser = createAsyncThunk('auth/getAllUser', async(_, thunkApi)=>{
    try {
        return await http.get('GetAllUser')
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const getAllStore = createAsyncThunk('auth/getAllStore', async(_, thunkApi)=>{
    try {
        return await http.get('GetAllStore')
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const changePassword = createAsyncThunk('auth/changePassword', async(data, thunkApi)=>{
    try {
        const reponse = await http.post('ChangePassword', data)
        thunkApi.dispatch(openMessage({message:"Change Password Success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Change Password Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async(data, thunkApi)=>{
    const {email} = data
    try {
        const reponse = await http.post(`ResetPassword/${email}`)
        thunkApi.dispatch(openMessage({message:"Check your email, the new password has been sent to your email.", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Reset Password Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const activeUser = createAsyncThunk('auth/activeUser', async(data, thunkApi)=>{
    try {
        const reponse = await http.post(`/BanUser/${data}?isBanned=false`)
        thunkApi.dispatch(openMessage({message:"Active User Success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Active User Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const bandUser = createAsyncThunk('auth/bandUser', async(data, thunkApi)=>{
    try {
        const reponse = await http.post(`/BanUser/${data}?isBanned=true`)
        thunkApi.dispatch(openMessage({message:"Band User Success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Band User Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const activeHotelOwner = createAsyncThunk('auth/activeHotelOwner', async(data, thunkApi)=>{
    try {
        const reponse = await http.post(`/BanUser/${data}?isBanned=false`)
        thunkApi.dispatch(openMessage({message:"Active Hotel Owner Success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Active Hotel Owner Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const bandHotelOwner = createAsyncThunk('auth/bandHotelOwner', async(data, thunkApi)=>{
    try {
        const reponse = await http.post(`/BanUser/${data}?isBanned=true`)
        thunkApi.dispatch(openMessage({message:"Band Hotel Owner Success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Band Hotel Owner Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})