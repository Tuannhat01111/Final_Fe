import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../Modal/ModalSlice"

export const getAllCategory = createAsyncThunk('category/getAllCategory', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('Categories')

        return reponse
    } catch (error) {
        if(error.statusCode ===403){

        }
        return thunkApi.rejectWithValue(error)
    }
})

export const getAllCategoryForAdmin = createAsyncThunk('category/getAllCategoryForAdmin', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('Categories/GetCategoriesForAdmin')

        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            thunkApi.dispatch(openMessage({message:"Error", notificationType: 'error'}))

        }
        return thunkApi.rejectWithValue(error)
    }
})