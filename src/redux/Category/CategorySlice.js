import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory, getAllCategoryForAdmin } from "./CategoryThunks";

const initialState ={
    loading: false,
    error: '',
    categories: [],
    categoriesChart: [],
    category: {}
}


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{

    },
    extraReducers: builder=>{
        builder.addCase(getAllCategory.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllCategory.fulfilled, (state, action) =>{
            state.loading=false
            state.categories = action.payload
            state.error = ''
        })
        builder.addCase(getAllCategory.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(getAllCategoryForAdmin.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllCategoryForAdmin.fulfilled, (state, action) =>{
            state.loading=false
            state.categoriesChart = action.payload
            state.error = ''
        })
        builder.addCase(getAllCategoryForAdmin.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
    }
});


export default categorySlice.reducer