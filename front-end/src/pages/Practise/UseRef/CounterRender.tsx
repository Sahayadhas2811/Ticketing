import react, { useRef, useState } from 'react';

const CounterRender:React.FC = ()=>{
    const [value, setValue] = useState<number>(0);
    const valueRef = useRef<number>(0)

    valueRef.current += 1

    const onhandleChange = ()=>{
        setValue(value+1);
        
    }
    return(
        <div>
            <p>the state count{value}</p>
            <p>The Ref value {valueRef.current}</p>
            <button onClick={onhandleChange}>Click</button>
        </div>
    )
}

export default CounterRender