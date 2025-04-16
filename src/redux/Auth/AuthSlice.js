import { createSlice } from "@reduxjs/toolkit";
import { activeUser, bandUser,activeHotelOwner,bandHotelOwner, changePassword, getAllStore, getAllUser, getTopDeals, login, register, registerByGoogleAccount, resetPassword, loginByGoogleAccount, complain } from "./AuthThunks";
import { jwtDecode } from "jwt-decode";
import decodeTokenAndCheckExpiration from "../../api/decodeTokenAndCheckExpiration";

let userSignedIn = "";
let isLoggedIn = "";

if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    isLoggedIn = decodeTokenAndCheckExpiration(token);
    userSignedIn = jwtDecode(token);
}

const initialState = {
    isLoggedIn: isLoggedIn.isValid,
    avatarUrl: userSignedIn.AvatarUrl,
    role: userSignedIn.Roles,
    loading: false,
    error: '',
    token: [],
    user: [],
    data: [],
    store: [],
    topDeals: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state, action) => {
            localStorage.removeItem('token')
            state.isLoggedIn = false;
            window.location.href = "/"
        },
        setIsLogin: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
            state.user = jwtDecode(action.payload.token)
            userSignedIn = jwtDecode(action.payload.token);
            if (userSignedIn.Roles == "Administrator") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";

            }

            state.isLoggedIn = true
            state.error = ''
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(register.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(complain.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(complain.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
        })
        builder.addCase(complain.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(registerByGoogleAccount.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(registerByGoogleAccount.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
            state.isLoggedIn = true
            state.error = ''
        })
        builder.addCase(registerByGoogleAccount.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(loginByGoogleAccount.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(loginByGoogleAccount.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
            state.isLoggedIn = true
            state.error = ''
        })
        builder.addCase(loginByGoogleAccount.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(resetPassword.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(changePassword.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
        })
        builder.addCase(changePassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(getAllUser.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(getAllStore.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(getAllStore.fulfilled, (state, action) => {
            state.loading = false
            state.store = action.payload
            state.error = ''
        })
        builder.addCase(getAllStore.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(getTopDeals.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(getTopDeals.fulfilled, (state, action) => {
            state.loading = false
            state.topDeals = action.payload
            state.error = ''
        })
        builder.addCase(getTopDeals.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(bandUser.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(bandUser.fulfilled, (state, action) => {
            state.loading = false
            state.details = action.payload
            const { id } = action.payload;
            const user = state.data.find((user) => user.id == id);
            user.isBanned = true
            state.error = ''
        })
        builder.addCase(bandUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(activeUser.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(activeUser.fulfilled, (state, action) => {
            state.loading = false
            state.details = action.payload
            const { id } = action.payload;
            const user = state.data.find((user) => user.id == id);
            user.isBanned = false
            state.error = ''
        })
        builder.addCase(activeUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(bandHotelOwner.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(bandHotelOwner.fulfilled, (state, action) => {
            state.loading = false
            state.details = action.payload
            const { id } = action.payload;
            const hotelOwner = state.store.find((hotelOwner) => hotelOwner.id == id);
            hotelOwner.isBanned = true
            state.error = ''
        })
        builder.addCase(bandHotelOwner.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(activeHotelOwner.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(activeHotelOwner.fulfilled, (state, action) => {
            state.loading = false
            state.details = action.payload
            const { id } = action.payload;
            const hotelOwner = state.store.find((hotelOwner) => hotelOwner.id == id);
            hotelOwner.isBanned = false
            state.error = ''
        })
        builder.addCase(activeHotelOwner.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }

});

export const { logOut, setIsLogin, setToken } = authSlice.actions
export default authSlice.reducer