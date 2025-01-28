import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TODO{
    id:string,
    title:string,
    completed:boolean
};

interface TodoType {
    todo: TODO[]
};

const initialState : TodoType ={
    todo: []
};

const todoSlice = createSlice({
    name:'to_do',
    initialState,
    reducers:{
        addtodo: (state, action: PayloadAction<{id:string, title:string}>)=>{
            state.todo.push({id:action.payload.id, title:action.payload.title, completed:false})
        },

        removetodo:(state, action:PayloadAction<string>)=>{
            state.todo = state.todo.filter((todo)=>todo.id !== action.payload)
        },

        updatetodo: (state, action:PayloadAction<{id:string, title:string}>)=>{
            const todo = state.todo.find((todo)=> todo.id === action.payload.id);
            if(todo){
                todo.title = action.payload.title;
            }
        },

        updateStatustodo: (state, action:PayloadAction<string>)=>{
            const todo = state.todo.find((todo)=> todo.id === action.payload);
            if(todo){
                todo.completed = !todo.completed
            }
        }
    }
});

export const {addtodo, removetodo, updatetodo, updateStatustodo} = todoSlice.actions;

export default todoSlice.reducer;