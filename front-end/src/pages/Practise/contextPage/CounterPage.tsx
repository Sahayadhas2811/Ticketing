import React from 'react';
import { useCount, CounterContext } from '../contextApi/CounterContext';
import { reset } from '../../../Redux/ReduxPractise/CounterSlice';

function CounterPage() {
    const {count, increment, decrement,reset} = useCount()
  return (
    <div>
        <h1>Count: {count}</h1>
    <button onClick={increment}>Increment</button>
    <button onClick={()=>decrement()}>decrement</button>
    <button onClick={()=>reset()}>reset</button>
    </div>
  )
}

export default CounterPage