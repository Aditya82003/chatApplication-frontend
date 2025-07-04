import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../auth/authSlice";
import axiosInstance from "../../../lib/axios";
import type { AxiosError } from "axios";

type Message = {
    _id: string
    senderId: string
    receiverId: string
    text: string
    image: string
}

type ChatState = {
    chatUsers: User[]
    messages: Message[]
    selectedUser: User | null
    isUserLoading: boolean
    isMessageLoading: boolean
    error: string | null
}
const initialState: ChatState = {
    chatUsers: [],
    messages: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
    error: null
}

export const getUsersThunk = createAsyncThunk<User[], void, { rejectValue: string }>('chat/getUsers', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/message/users')
        return res.data.users as User[]
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
})

export const getMessagethunk = createAsyncThunk<Message[], string, { rejectValue: string }>('chat/messages', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`/message/${id}`)
        return res.data.chats as Message[]
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        }
    },
    extraReducers: (builder) => {
        //get all user
        builder.addCase(getUsersThunk.pending, (state) => {
            state.isUserLoading = true
            state.error = null
        })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.isUserLoading = false
                state.chatUsers = action.payload
                state.error = null
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.isUserLoading = false
                state.error = action.payload || "Can't fetch users"
            })
            //getMessages
            .addCase(getMessagethunk.pending, (state) => {
                state.isMessageLoading = true
                state.error = null
            })
            .addCase(getMessagethunk.fulfilled, (state, action) => {
                state.isMessageLoading = false
                state.messages = action.payload
            })
            .addCase(getMessagethunk.rejected, (state, action) => {
                state.isUserLoading = false
                state.error = action.payload || "Can't fetch messages"
            })
    }
})

export const { setSelectedUser } = chatSlice.actions

export default chatSlice.reducer