import { createSlice } from "@reduxjs/toolkit";
import {  createOrderPaypal, getCountByMonth, getOrder, getOrderByAdmin, getOrderById, onApprove } from "./orderThunks";



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
        builder.addCase(getOrderById.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getOrderById.fulfilled, (state, action) =>{
            state.loading=false
            state.details = action.payload
            state.error = ''
        })
        builder.addCase(getOrderById.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(getOrder.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getOrder.fulfilled, (state, action) =>{
            state.loading=false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getOrder.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(createOrderPaypal.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(createOrderPaypal.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(createOrderPaypal.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(onApprove.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(onApprove.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(onApprove.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

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