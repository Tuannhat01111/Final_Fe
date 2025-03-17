import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { openMessage } from "../Modal/ModalSlice";
import http from "../../api/axios-interceptor";

const axiosClient = axios.create({
    baseURL: "",
});
export const getProfileByToken = createAsyncThunk('profile/getProfileByToken', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('api/Profiles')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Get Profile Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const getProfileByUserID = createAsyncThunk('profile/getProfileByUserID', async(data, thunkApi)=>{
    try {
        const reponse = await http.get(`api/Profiles/${data}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Get Profile Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const updateProfile = createAsyncThunk('profile/updateProfile', async(data, thunkApi)=>{
    const {id , profile} = data
    try {
        const reponse = await http.put(`api/Profiles/${id}`,profile)

        thunkApi.dispatch(openMessage({message:"Update Success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Get Profile Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const uploadAvatar = createAsyncThunk('profile/uploadAvatar', async (data, thunkApi) => {
    try {
        const reponse = await http.get(`api/Profiles/PreSignUrlToUploadAvatar`)
         await axiosClient.put(reponse.result.preSignedUrl, data);
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Update Avatar Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})
