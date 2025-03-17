import { createSlice } from "@reduxjs/toolkit";
import { upgrateToOwnerStore, disableOwnerStore } from "./UserRoleThunks";


const initialState ={
    loading: false,
    error: '',
}


const userRoleSlice = createSlice({
    name: "userRole",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(upgrateToOwnerStore.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(upgrateToOwnerStore.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(upgrateToOwnerStore.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(disableOwnerStore.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(disableOwnerStore.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(disableOwnerStore.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
       
    }
   
});


export default userRoleSlice.reducer
