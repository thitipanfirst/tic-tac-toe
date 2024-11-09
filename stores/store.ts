import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import SignInSlice from '@/stores/signIn/signInSlice'


export const store = configureStore({
    reducer: {
        signInSlice: SignInSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
