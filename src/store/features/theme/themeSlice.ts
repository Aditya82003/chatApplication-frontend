import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type themeState = {
    theme: string
}

const initialTheme = (): string => {
    const saved = localStorage.getItem('chat-theme')
    return saved as string || "coffee"
}

const initialState: themeState = {
    theme: initialTheme()
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
            localStorage.setItem("chat-theme", action.payload)
        }
    }
})


export const { setTheme } = themeSlice.actions
export default themeSlice.reducer