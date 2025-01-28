import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from '../../Redux/ReduxPractise/CounterSlice';
import { RootState } from '../../Redux/ReduxStore';

function ReduxCounterReact() {
    const data = useSelector((state: RootState) => state.counter.count);
    const dispatch = useDispatch();

  return (
    <div>
        <h1>The Value is {data}</h1>
        <button onClick={()=>dispatch(increment())}>Increment</button>
        <button onClick={()=>dispatch(decrement())}>Decrement</button>
        <button onClick={()=>dispatch(reset())}>Reset</button>
    </div>
  )
}

export default ReduxCounterReact;
