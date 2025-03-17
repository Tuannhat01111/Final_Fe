    import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../Modal/ModalSlice"

export const getOrderByAdmin = createAsyncThunk('order/getOrderByAdmin', async (_, thunkApi) => {
    try {
        const reponse = await http.get('/Orders/GetOrdersForAdmin')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({ message: "Get Order Failed!", notificationType: 'error' }))
        return thunkApi.rejectWithValue(error)
    }
})

export const getCountByMonth = createAsyncThunk('order/getCountByMonth', async (_, thunkApi) => {
    try {
        const reponse = await http.get('/Orders/GetOrderCountByMonth')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({ message: "Get Order Failed!", notificationType: 'error' }))
        return thunkApi.rejectWithValue(error)
    }
})