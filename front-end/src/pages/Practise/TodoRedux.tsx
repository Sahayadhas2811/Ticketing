// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from '../../Redux/ReduxStore'
// import {addtodo, removetodo, updatetodo, updateStatustodo} from '../../Redux/ReduxPractise/TodoSlice'

// function TodoRedux() {
//     const todos = useSelector((state:RootState)=>state.to_do.todo)
//     const dispatch = useDispatch();
//     const [newList, setNewList] = useState<string>('');

//     const handleAdd = ()=>{
//         if(newList.trim()){
//             dispatch(addtodo({id:Date.now().toString(), title:newList}));
//             setNewList('')
//         }
//     };

//     const handleRemove = (id:string)=>{
//         dispatch(removetodo(id))
//     };

//     const handleUpdate = (id:string, newTitle:string)=>{
//         dispatch(updatetodo({id, title:newTitle}))
//     }

//     const handleUpdateStatus = (id:string)=>{
//         dispatch(updateStatustodo(id))
//     }
//   return (
//     <div>
//         <h1>To DO List</h1>
//         <input
//             type='text'
//             value={newList}
//             onChange={(e)=> setNewList(e.target.value)}
//             placeholder='To Do '
//         ></input>
//         <button
//             onClick={handleAdd}
//         >Add</button>

//         <ul>
//             {todos.map((todo)=>
//                 <li key={todo.id}>
//                     <input
//                         type='checkbox'
//                         checked={todo.completed}
//                         onChange={()=> handleUpdateStatus(todo.id)}
//                     />
//                     <input
//                         type='text'
//                         value={todo.title}
//                         onChange={(e)=>handleUpdate(todo.id,e.target.value )}
//                     />
//                     <button
//                         onClick={()=>handleRemove(todo.id)}
//                     >Delete</button>
//                 </li>
//             )}
//         </ul>
//     </div>
//   )
// }

// export default TodoRedux

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addtodo, removetodo, updateStatustodo, updatetodo} from '../../Redux/ReduxPractise/TodoSlice'
import { RootState } from '../../Redux/ReduxStore';

function TodoRedux() {
    const dotos = useSelector((state: RootState)=> state.to_do.todo);
    const dispatch = useDispatch();
    const [newList, setNewList] = useState<string>('')

    const handleAddTodo = ()=>{
        if(newList.trim()){
            dispatch(addtodo({id:Date.now().toString(), title:newList}));
            setNewList('')
        }
    };

    const handleRemove = (id:string)=>{
        dispatch(removetodo(id))
    };

    const handleUpdate = (id:string, newTitle:string)=>{
        dispatch(updatetodo({id, title:newTitle}))
    };

    const handleUpdateStatus = (id:string)=>{
        dispatch(updateStatustodo(id))
    }

  return (
    <div>
        <h1>TO Do list</h1>
        <input
            type='text'
            value={newList}
            onChange={(e)=>setNewList(e.target.value)}
            placeholder='todo'
        />
        <button
            onClick={handleAddTodo}
        >add</button>

        <ul>
            {dotos.map((todo)=>(
                <li key={todo.id}>
                    <input
                        type='checkbox'
                        checked={todo.completed}
                        onChange={()=>handleUpdateStatus(todo.id)}
                    />
                    <input
                        type='text'
                        value={todo.title}
                        onChange={(e)=>handleUpdate(todo.id, e.target.value)}
                    />
                    <button onClick={()=>handleRemove(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TodoRedux