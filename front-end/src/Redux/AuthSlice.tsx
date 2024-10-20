import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStore";

interface authState {
    userName: string | null,
    role: string | null,
    token: string | null,
};

const initialState : authState ={
    userName:'',
    role:'',
    token:''
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredential:(state, action:PayloadAction<{userName:string, role:string, token:string}>)=>{
            state.userName = action.payload.userName;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        logout:(state)=>{
            state.userName = null;
            state.role = null;
            state.token = null;
        },
        updateRole:(state, action:PayloadAction<string>)=>{
            state.role = action.payload
        }
    }
});

export const {setCredential, logout, updateRole} = authSlice.actions;

export const currentRole = (state:RootState) => state.auth.role;
export const currentUserName = (state:RootState) => state.auth.userName;

export default authSlice.reducer 