import { createSlice } from "@reduxjs/toolkit";
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom, getRoomOrdersStats, getRoomOrdersStatsById, sendFeedback,deleteRoomImages, sendFeedbackByEmail, getRoomByOwnerHotel } from "./RoomThunks";



const initialState ={
    loading: false,
    error: '',
    rooms: [],
    detail:{},
    status: [],
    dataChart: [],
    dataRoom: {}
}


const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers:{
        filterByName: (state, action) => {
            const data = state.rooms
            state.rooms = data.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
        }
    },
    extraReducers: builder=>{
        builder.addCase(getAllRooms.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllRooms.fulfilled, (state, action) =>{
            state.loading=false
            state.rooms = action.payload
            state.error = ''
        })
        builder.addCase(getAllRooms.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(getRoomByOwnerHotel.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getRoomByOwnerHotel.fulfilled, (state, action) =>{
            state.loading=false
            state.rooms = action.payload
            state.error = ''
        })
        builder.addCase(getRoomByOwnerHotel.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(getRoomOrdersStats.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getRoomOrdersStats.fulfilled, (state, action) =>{
            state.loading=false
            state.dataChart = action.payload
            state.error = ''
        })
        builder.addCase(getRoomOrdersStats.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(getRoomOrdersStatsById.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getRoomOrdersStatsById.fulfilled, (state, action) =>{
            state.loading=false
            state.dataRoom = action.payload
            state.error = ''
        })
        builder.addCase(getRoomOrdersStatsById.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(getRoomById.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(getRoomById.fulfilled, (state, action) =>{
            state.loading=false
            state.detail = action.payload
            state.error = ''
        })
        builder.addCase(getRoomById.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(createRoom.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(createRoom.fulfilled, (state, action) =>{
            state.loading=false
            state.rooms = [...state.rooms, action.payload]
            state.error = ''
        })
        builder.addCase(createRoom.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })

        builder.addCase(deleteRoom.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(deleteRoom.fulfilled, (state, action) =>{
            state.loading=false
            state.rooms = action.payload
            state.error = ''
        })
        builder.addCase(deleteRoom.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        
        builder.addCase(updateRoom.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(updateRoom.fulfilled, (state, action) =>{
            state.loading=false
            state.detail = action.payload
            state.error = ''
        })
        builder.addCase(updateRoom.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        
        builder.addCase(sendFeedback.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(sendFeedback.fulfilled, (state, action) =>{
            state.loading=false
            state.error = ''
        })
        builder.addCase(sendFeedback.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(sendFeedbackByEmail.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(sendFeedbackByEmail.fulfilled, (state, action) =>{
            state.loading=false
            state.detail = action.payload
            state.error = ''
        })
        builder.addCase(sendFeedbackByEmail.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(deleteRoomImages.pending,(state,action)=>{
            state.loading = true
            state.error = ''
        })
        builder.addCase(deleteRoomImages.fulfilled, (state, action) =>{
            state.loading=false
            state.rooms = action.payload
            state.error = ''
        })
        builder.addCase(deleteRoomImages.rejected, (state,action) =>{
            state.loading= false
            state.error = action.payload
        })
        
    }
   
});

export const {filterByName} = roomSlice.actions
export default roomSlice.reducer