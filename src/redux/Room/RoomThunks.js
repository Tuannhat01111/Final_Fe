import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import axios from "axios";
import { openMessage } from "../Modal/ModalSlice";

const axiosClient = axios.create({
    baseURL: "",
});

export const getPreSignURL = createAsyncThunk('file/getPreSignURL', async (_, thunkApi) => {
    try {
        const reponse = await http.get(`api/Profiles/PreSignUrlToUploadAvatar`)
        return reponse
    } catch (error) {
        if (error.statusCode === 403) {
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})

export const getAllRooms = createAsyncThunk('room/getAllRooms', async(data, thunkApi)=>{
    const{categoryId, name} = data
    try {
            const reponse = await http.get(`api/Rooms${categoryId ? `?id=${categoryId}` : '?'} ${name? `&name=${name}` : `&`}`)
            return reponse
        
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const getRoomByOwnerHotel = createAsyncThunk('room/getRoomByOwnerHotel', async(data, thunkApi)=>{
    try {
            const reponse = await http.get(`api/Rooms/GetRoomByOwnerHotel`)
            return reponse
        
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const getRoomById = createAsyncThunk('room/getRoomById', async(data, thunkApi)=>{
    try {    
        const {id} = data

        const reponse = await http.get(`api/Rooms/GetRoomById/${id}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const getRoomOrdersStats = createAsyncThunk('room/RoomOrdersStats', async(_, thunkApi)=>{
    try {
        const reponse = await http.get(`api/Rooms/GetRoomOrdersStats`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))


        return thunkApi.rejectWithValue(error)
    }
})

export const getRoomOrdersStatsById = createAsyncThunk('room/getRoomOrdersStatsById', async(id, thunkApi)=>{
    try {
        const reponse = await http.get(`api/Rooms/getRoomOrdersStatsById/${id}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))


        return thunkApi.rejectWithValue(error)
    }
})

export const createRoom = createAsyncThunk('room/createRoom', async(data, thunkApi)=>{
    try {
        console.log("first")
        const {name, street, country, codeCountry, city, codeCity, description, district, email, userId, categoryId, files, price} = data 
        // const longitudeAndLatitude = await  getLongitudeAndLatitudeByAddress(street, city, country)
        const response1 = await http.post(`api/Rooms/`,{categoryId: categoryId, userId: userId,  name:name, street:street, city:city, country:country, description:description, district:district, email:email, latitude:"123", longitude:"123", price:price})

        const response2 = await http.get(`api/Rooms/PreSignUrlToUploadImage/${response1.id}/${data.files.length}`)
  
        for (let index = 0; index < response2.length; index++) {
            const reponse = await axiosClient.put(response2[index].preSignedUrl, data.files[index]);

        }
        thunkApi.dispatch(openMessage({message:"Create Sucessfull", notificationType: 'success'}))

        return 
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))

        return thunkApi.rejectWithValue(error)
    }
})

export const updateRoom = createAsyncThunk('room/updateRoom', async(data, thunkApi)=>{
    try {    const {id} = data

        const response1 = await http.put(`api/Rooms/${id}`,data)
        thunkApi.dispatch(openMessage({message:"Update Sucessfull", notificationType: 'success'}))

        return 
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))

        return thunkApi.rejectWithValue(error)
    }
})

export const deleteRoom = createAsyncThunk('room/deleteRoom', async(data, thunkApi)=>{
    try {
        const reponse = await http.delete(`api/Rooms/${data}`)
        thunkApi.dispatch(openMessage({message:"Delete Sucessfull", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const sendFeedback = createAsyncThunk('room/sendFeedback', async(data, thunkApi)=>{
    const {roomId} = data
    try {    
        const reponse = await http.post(`api/Rooms/SendFeedback/${roomId}`, data)
        thunkApi.dispatch(openMessage({ message: "Send feedback successfully !", notificationType: 'success' }))

        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const sendFeedbackByEmail = createAsyncThunk('room/sendFeedbackByEmail', async(data, thunkApi)=>{
    try {    
        const reponse = await http.post(`api/Feedbacks`, data)
        thunkApi.dispatch(openMessage({ message: "Send feedback successfully !", notificationType: 'success' }))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Call Api Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})