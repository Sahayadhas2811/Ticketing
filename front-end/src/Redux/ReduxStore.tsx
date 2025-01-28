import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './AuthSlice';
import countSlice from '../Redux/ReduxPractise/CounterSlice';
import TodoSlice from '../Redux/ReduxPractise/TodoSlice'

const store = configureStore({
    reducer:{
        auth: AuthSlice,
        counter: countSlice,
        to_do:TodoSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type dispatch = typeof store.dispatch;

export default store;