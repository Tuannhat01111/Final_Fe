import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../Modal/ModalSlice"

export const getAllCategory = createAsyncThunk('category/getAllCategory', async(_, thunkApi)=>{
    try {
        const reponse = await http.get('Categories')

        return reponse
    } catch (error) {
        if(error.statusCode ===403){
            // thunkApi.dispatch(a({message:"Your account is block! Please contact Admin", notificationType: 'error'}))

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

        }
        return thunkApi.rejectWithValue(error)
    }
})

export const getCategoryId = createAsyncThunk('category/getCategoryId', async(data, thunkApi)=>{
    try {
        const reponse = await http.get(`Categories/${data}`)
        return reponse
    } catch (error) {
        if(error.statusCode ===403){

        }
        return thunkApi.rejectWithValue(error)
    }
})

export const createCategory = createAsyncThunk('category/createCategory', async(data, thunkApi)=>{
    try {
        const reponse = await http.post('Categories', data)
        thunkApi.dispatch(openMessage({message:"Create Category success!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Create Category Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})


export const updateCategory = createAsyncThunk('category/updateCategory', async(data, thunkApi)=>{
    try {
        const {id} = data
        const reponse = await http.put(`Categories/${id}`, data)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Update Category Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteCategory = createAsyncThunk('category/deleteCategory', async(data, thunkApi)=>{
    try {
        const reponse = await http.delete(`Categories/${data}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Delete Category Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})