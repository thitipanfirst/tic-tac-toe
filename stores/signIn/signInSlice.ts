import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface DrawerState {
    username: string;
    password: string;
}

const initialState: DrawerState = {
    username: '',
    password: ''
};

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    },
});

export const { setUsername, setPassword } = signInSlice.actions

export default signInSlice.reducer

