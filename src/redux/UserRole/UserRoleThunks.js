import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../Modal/ModalSlice"

export const upgrateToOwnerStore = createAsyncThunk('userRole/upgrateToOwnerStore', async(_, thunkApi)=>{
    try {
        const reponse = await http.put('api/UserRoles/UpgradeToOwnerStore')
        thunkApi.dispatch(openMessage({message:"Upgrade To OwnerRoom Successful!", notificationType: 'success'}))
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"Upgrade To OwnerRoom Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})

export const disableOwnerStore = createAsyncThunk('userRole/disableOwnerStore', async(_, thunkApi)=>{
    try {
        const reponse = await http.put('api/UserRoles/DisableOwnerStore')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({message:"DisableOwnerStore Failed!", notificationType: 'error'}))
        return thunkApi.rejectWithValue(error)
    }
})
