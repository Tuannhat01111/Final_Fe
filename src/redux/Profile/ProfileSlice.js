import { createSlice } from "@reduxjs/toolkit";
import { getProfileByToken, updateProfile, uploadAvatar, getProfileByUserID } from "./ProfileThunks";


const initialState ={
    loading: false,
    error: '',
    profile: []
}


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(getProfileByToken.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getProfileByToken.fulfilled, (state, action) =>{
            state.loading=false

            state.profile = action.payload
            state.error = ''
        })
        builder.addCase(getProfileByToken.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(getProfileByUserID.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getProfileByUserID.fulfilled, (state, action) =>{
            state.loading=false

            state.profile = action.payload
            state.error = ''
        })
        builder.addCase(getProfileByUserID.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(updateProfile.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(updateProfile.fulfilled, (state, action) =>{
            state.loading=false
            state.profile = action.payload
            state.error = ''
        })
        builder.addCase(updateProfile.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(uploadAvatar.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(uploadAvatar.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(uploadAvatar.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
   
});


export default profileSlice.reducer
