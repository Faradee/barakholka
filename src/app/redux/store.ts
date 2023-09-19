import { useSelector, TypedUseSelectorHook } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import dimReducer from './slices/dimSlice'
export const store = configureStore({
    reducer: {
        dimReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector