import { createSlice } from "@reduxjs/toolkit";

interface User {
    _id: string
    email: string
    fullName: string
    avatar?: string
    token: string
}

interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
}
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{}
})

export default authSlice.reducer