import React, { useState, useRef } from 'react';
import DOMupdateRef from './DOMupdateRef';
import CounterRender from './CounterRender';

interface DumyProps {}

const FocusPointInput:React.FC = ({}:DumyProps)=>{
    const [input, setInput] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const onsubmit = ()=>{
        inputRef.current?.focus()
        console.log(input)
    }
    return(
        <div>
            <input
            ref={inputRef}
            type='text'
            placeholder='Write Your Name'
            onChange={(e)=>setInput(e.target.value)}
            value={input}
            
            />
            <p>{input}</p>
            <button onClick={onsubmit}>Submit</button>
            <div>
                <DOMupdateRef/>
                <CounterRender/>
            </div>
        </div>
    )
};

export default FocusPointInput