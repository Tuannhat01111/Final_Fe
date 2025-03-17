import { createSlice } from "@reduxjs/toolkit";
import { getCountByMonth, getOrderByAdmin } from "./OrderThunks";



const initialState ={
    loading: false,
    error: '',
    details: [],
    data: [],
    countByMonth: []
}


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(getOrderByAdmin.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getOrderByAdmin.fulfilled, (state, action) =>{
            state.loading=false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getOrderByAdmin.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(getCountByMonth.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getCountByMonth.fulfilled, (state, action) =>{
            state.loading=false
            state.countByMonth = action.payload
            state.error = ''
        })
        builder.addCase(getCountByMonth.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
   
});


export default profileSlice.reducer