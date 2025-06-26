import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../lib/axios";
import type { signUpState } from "../../../types/types";
import type { AxiosError } from "axios";

interface User {
    _id: string
    email: string
    fullName: string
    profile?: string
}

interface signUpResponse {
    user: User
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

export const checkAuthThunk = createAsyncThunk<User, void, { rejectValue: string }>('auth/check', async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get('/auth/check');
        return res.data as User
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Authentication check failed");
    }
})

export const signUpThunk = createAsyncThunk<signUpResponse, signUpState, { rejectValue: string }>('auth/signup', async (signUpFormData, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/auth/signup', signUpFormData);
        return res.data as signUpResponse
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const errorMsg = err.response?.data?.message || "Signup failed";
        return rejectWithValue(errorMsg);
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //check auth
        builder.addCase(checkAuthThunk.pending, (state) => {
            state.isCheckAuth = true,
                state.error = null
        })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.isCheckAuth = false
                state.user = action.payload
                state.error = null
            })
            .addCase(checkAuthThunk.rejected, (state, action) => {
                state.isCheckAuth = false
                state.error = action.payload || "Check Auth failed"
            })
            //sign up
            .addCase(signUpThunk.pending,(state)=>{
                state.isSigningUP = true
                state.error = null
            })
            .addCase(signUpThunk.fulfilled,(state,action)=>{
                state.isSigningUP=false
                state.user=action.payload.user
                state.error=null
            })
            .addCase(signUpThunk.rejected,(state,action)=>{
                state.isSigningUP=false
                state.error=action.payload || "Signup failed"
            })
    }
})

export default authSlice.reducer