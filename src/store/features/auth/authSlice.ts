import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../lib/axios";

interface User {
    _id: string
    email: string
    fullName: string
    profile?: string
}

interface AuthState {
    user: User | null
    isSigningUP: boolean
    isLoggingiN: boolean
    isUpdatingProfile: boolean
    isCheckAuth: boolean
    onlineUser: User[] | null
    error: string | null

}
const initialState: AuthState = {
    user: null,
    isSigningUP: false,
    isLoggingiN: false,
    isUpdatingProfile: false,
    isCheckAuth: true,
    onlineUser: null,
    error: null
}

export const checkAuth = createAsyncThunk<User, void, { rejectValue: string }>('auth/check', async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get('/auth/check');
        return res.data as User
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Authentication check failed");
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, (state) => {
            state.isCheckAuth = true,
            state.error = null
        })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isCheckAuth = false
                state.user = action.payload
                state.error = null
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isCheckAuth = false
                state.error = action.payload || "Check Auth failed"
            })
    }
})

export default authSlice.reducer